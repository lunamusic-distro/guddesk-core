import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { authenticateExternal } from "@/lib/external-auth";

// POST /api/external/conversations/[id]/resolve — resolve a ticket
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.text();
    const path = `/api/external/conversations/${id}/resolve`;
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
    const { resolutionNote } = data;

    const updated = await prisma.conversation.update({
      where: { id },
      data: {
        status: "CLOSED",
        closedAt: new Date(),
      },
    });

    if (resolutionNote) {
      await prisma.message.create({
        data: {
          conversationId: id,
          type: "NOTE",
          body: resolutionNote,
          senderName: "System",
        },
      });
    }

    return NextResponse.json({
      ok: true,
      data: {
        conversationId: updated.id,
        status: updated.status,
        closedAt: updated.closedAt?.toISOString() || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("External resolve ticket error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to resolve ticket" } },
      { status: 500 },
    );
  }
}
