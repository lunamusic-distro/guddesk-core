"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getPusherServer } from "@/lib/pusher-server";
import { requireWorkspaceMember } from "@/lib/workspace";
import { revalidatePath } from "next/cache";

export async function sendMessage(
  conversationId: string,
  data: { body: string; type?: "AGENT" | "NOTE" },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const { body, type = "AGENT" } = data;

    if (!body || body.trim().length === 0) {
      return { status: "error", message: "Message cannot be empty" };
    }

    // Verify conversation exists and user is a workspace member
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { workspaceId: true, visitorId: true },
    });

    if (!conversation) {
      return { status: "error", message: "Conversation not found" };
    }

    await requireWorkspaceMember(conversation.workspaceId, session.user.id);

    // Create the message
    const message = await prisma.message.create({
      data: {
        conversationId,
        type,
        body,
        senderId: session.user.id,
        senderName: session.user.name ?? "Agent",
      },
    });

    // Update conversation metadata
    const preview = body.length > 100 ? body.slice(0, 100) + "..." : body;
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        lastMessagePreview: type === "NOTE" ? `[Note] ${preview}` : preview,
      },
    });

    // Trigger real-time events
    const pusher = getPusherServer();
    if (pusher) {
      const messagePayload = {
        id: message.id,
        type: message.type,
        body: message.body,
        senderId: message.senderId,
        senderName: message.senderName,
        createdAt: message.createdAt,
      };

      // Notify agents watching this conversation
      await pusher.trigger(
        `private-conversation-${conversationId}`,
        "message:created",
        messagePayload,
      );

      // If it's an agent message (not a note), notify the visitor widget
      if (type === "AGENT") {
        await pusher.trigger(
          `presence-visitor-${conversationId}`,
          "message:created",
          messagePayload,
        );
      }

      // Notify workspace inbox
      await pusher.trigger(
        `private-workspace-${conversation.workspaceId}`,
        "conversation:new-message",
        {
          conversationId,
          lastMessageAt: new Date(),
          lastMessagePreview: preview,
        },
      );
    }

    revalidatePath(`/workspace`);
    return { status: "success", messageId: message.id };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Failed to send message" };
  }
}
