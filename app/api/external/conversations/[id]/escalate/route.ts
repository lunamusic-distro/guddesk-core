import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { authenticateExternal } from "@/lib/external-auth";

// POST /api/external/conversations/[id]/escalate — escalate a ticket
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.text();
    const auth = authenticateExternal(req, "POST", body);
    if (auth instanceof NextResponse) return auth;
    const { workspaceId } = auth;

    const conversation = await prisma.conversation.findFirst({
      where: { id, workspaceId },
    });
    if (!conversation) {
      return NextResponse.json(
        { ok: false, error: { code: "NOT_FOUND", message: "Conversation not found" } },
        { status: 404 },
      );
    }

    const data = JSON.parse(body);
    const { priority = 5, tags, reason } = data;

    const currentTags = conversation.tags;
    const newTags = tags ? [...new Set([...currentTags, ...tags])] : currentTags;

    const updated = await prisma.conversation.update({
      where: { id },
      data: {
        priority: Math.max(conversation.priority, priority),
        tags: newTags,
      },
    });

    if (reason) {
      await prisma.message.create({
        data: {
          conversationId: id,
          type: "SYSTEM",
          body: `Ticket escalated to priority ${priority}. Reason: ${reason}`,
          senderName: "System",
        },
      });
    }

    return NextResponse.json({
      ok: true,
      data: {
        conversationId: updated.id,
        priority: updated.priority,
        tags: updated.tags,
      },
    });
  } catch (error) {
    console.error("External escalate ticket error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to escalate ticket" } },
      { status: 500 },
    );
  }
}
