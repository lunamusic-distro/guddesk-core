"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceMember } from "@/lib/workspace";
import { getPusherServer } from "@/lib/pusher-server";
import { revalidatePath } from "next/cache";

export async function updateConversationStatus(
  conversationId: string,
  status: "OPEN" | "SNOOZED" | "CLOSED",
  snoozedUntil?: string,
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { workspaceId: true, status: true },
    });

    if (!conversation) {
      return { status: "error" as const, message: "Conversation not found" };
    }

    await requireWorkspaceMember(conversation.workspaceId, session.user.id);

    const data: Record<string, unknown> = {
      status,
      snoozedUntil: status === "SNOOZED" && snoozedUntil ? new Date(snoozedUntil) : null,
      closedAt: status === "CLOSED" ? new Date() : null,
    };

    await prisma.conversation.update({
      where: { id: conversationId },
      data,
    });

    // System message
    const statusLabels = { OPEN: "reopened", SNOOZED: "snoozed", CLOSED: "closed" };
    await prisma.message.create({
      data: {
        conversationId,
        type: "SYSTEM",
        body: `Conversation ${statusLabels[status]} by ${session.user.name ?? "Agent"}`,
        senderId: session.user.id,
        senderName: session.user.name,
      },
    });

    const pusher = getPusherServer();
    if (pusher) {
      await pusher.trigger(
        `private-workspace-${conversation.workspaceId}`,
        "conversation:updated",
        { conversationId, status },
      );
      await pusher.trigger(
        `private-conversation-${conversationId}`,
        "conversation:updated",
        { status },
      );
    }

    revalidatePath(`/workspace`);
    return { status: "success" as const };
  } catch (error) {
    console.error("Update conversation status error:", error);
    return { status: "error" as const, message: "Failed to update status" };
  }
}
