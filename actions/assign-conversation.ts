"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceMember } from "@/lib/workspace";
import { getPusherServer } from "@/lib/pusher-server";
import { revalidatePath } from "next/cache";

export async function assignConversation(
  conversationId: string,
  assigneeId: string | null,
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { workspaceId: true },
    });

    if (!conversation) {
      return { status: "error" as const, message: "Conversation not found" };
    }

    await requireWorkspaceMember(conversation.workspaceId, session.user.id);

    // Validate assignee is a workspace member if provided
    if (assigneeId) {
      const member = await prisma.workspaceMember.findUnique({
        where: { id: assigneeId },
        select: { workspaceId: true },
      });
      if (!member || member.workspaceId !== conversation.workspaceId) {
        return { status: "error" as const, message: "Invalid assignee" };
      }
    }

    const updated = await prisma.conversation.update({
      where: { id: conversationId },
      data: { assigneeId },
      include: {
        assignee: {
          include: { user: { select: { name: true } } },
        },
      },
    });

    // Create system message
    const assigneeName = updated.assignee?.user.name ?? "Unassigned";
    await prisma.message.create({
      data: {
        conversationId,
        type: "SYSTEM",
        body: assigneeId
          ? `Assigned to ${assigneeName}`
          : "Unassigned",
        senderId: session.user.id,
        senderName: session.user.name,
      },
    });

    // Broadcast update
    const pusher = getPusherServer();
    if (pusher) {
      await pusher.trigger(
        `private-workspace-${conversation.workspaceId}`,
        "conversation:updated",
        { conversationId, assigneeId },
      );
    }

    revalidatePath(`/workspace`);
    return { status: "success" as const };
  } catch (error) {
    console.error("Assign conversation error:", error);
    return { status: "error" as const, message: "Failed to assign conversation" };
  }
}
