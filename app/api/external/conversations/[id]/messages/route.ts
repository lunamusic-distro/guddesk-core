import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { authenticateExternal } from "@/lib/external-auth";

// POST /api/external/conversations/[id]/messages — send a reply
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.text();
    const path = `/api/external/conversations/${id}/messages`;
    const auth = authenticateExternal(req, "POST", path, body);
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
    const { body: messageBody, type = "AGENT", senderName } = data;

    if (!messageBody) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION", message: "body is required" } },
        { status: 400 },
      );
    }

    const message = await prisma.message.create({
      data: {
        conversationId: id,
        type: type === "NOTE" ? "NOTE" : "AGENT",
        body: messageBody,
        senderName: senderName || null,
      },
    });

    await prisma.conversation.update({
      where: { id },
      data: {
        lastMessageAt: new Date(),
        lastMessagePreview: messageBody.slice(0, 200),
      },
    });

    return NextResponse.json({
      ok: true,
      data: {
        messageId: message.id,
        createdAt: message.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("External send reply error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to send reply" } },
      { status: 500 },
    );
  }
}
