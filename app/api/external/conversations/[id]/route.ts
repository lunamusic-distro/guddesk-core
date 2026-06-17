import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { authenticateExternal } from "@/lib/external-auth";

// GET /api/external/conversations/[id] — get conversation with messages
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const path = `/api/external/conversations/${id}`;
    const auth = authenticateExternal(req, "GET", path);
    if (auth instanceof NextResponse) return auth;
    const { workspaceId } = auth;

    const conversation = await prisma.conversation.findFirst({
      where: { id, workspaceId },
      include: {
        visitor: {
          select: { id: true, externalId: true, name: true, email: true },
        },
        assignee: {
          include: {
            user: { select: { name: true, image: true } },
          },
        },
        messages: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            type: true,
            body: true,
            senderName: true,
            createdAt: true,
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { ok: false, error: { code: "NOT_FOUND", message: "Conversation not found" } },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      data: {
        id: conversation.id,
        subject: conversation.subject,
        status: conversation.status,
        priority: conversation.priority,
        tags: conversation.tags,
        createdAt: conversation.createdAt.toISOString(),
        lastMessageAt: conversation.lastMessageAt?.toISOString() || null,
        lastMessagePreview: conversation.lastMessagePreview,
        visitor: conversation.visitor
          ? {
              id: conversation.visitor.id,
              externalId: conversation.visitor.externalId,
              name: conversation.visitor.name,
              email: conversation.visitor.email,
            }
          : null,
        assignee: conversation.assignee
          ? { name: conversation.assignee.user.name, image: conversation.assignee.user.image }
          : null,
        messages: conversation.messages.map((m) => ({
          id: m.id,
          type: m.type,
          body: m.body,
          senderName: m.senderName,
          createdAt: m.createdAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    console.error("External get conversation error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to get conversation" } },
      { status: 500 },
    );
  }
}

// PATCH /api/external/conversations/[id] — update conversation
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.text();
    const path = `/api/external/conversations/${id}`;
    const auth = authenticateExternal(req, "PATCH", path, body);
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
    const updates: Record<string, unknown> = {};
    if (data.status !== undefined) updates.status = data.status;
    if (data.tags !== undefined) updates.tags = data.tags;
    if (data.priority !== undefined) updates.priority = data.priority;
    if (data.subject !== undefined) updates.subject = data.subject;
    if (data.assigneeId !== undefined) updates.assigneeId = data.assigneeId;
    if (data.status === "CLOSED") updates.closedAt = new Date();

    const updated = await prisma.conversation.update({
      where: { id },
      data: updates,
      include: {
        visitor: {
          select: { id: true, externalId: true, name: true, email: true },
        },
        assignee: {
          include: {
            user: { select: { name: true, image: true } },
          },
        },
      },
    });

    return NextResponse.json({
      ok: true,
      data: {
        id: updated.id,
        subject: updated.subject,
        status: updated.status,
        priority: updated.priority,
        tags: updated.tags,
        createdAt: updated.createdAt.toISOString(),
        lastMessageAt: updated.lastMessageAt?.toISOString() || null,
        lastMessagePreview: updated.lastMessagePreview,
        visitor: updated.visitor
          ? {
              id: updated.visitor.id,
              externalId: updated.visitor.externalId,
              name: updated.visitor.name,
              email: updated.visitor.email,
            }
          : null,
        assignee: updated.assignee
          ? { name: updated.assignee.user.name, image: updated.assignee.user.image }
          : null,
      },
    });
  } catch (error) {
    console.error("External update conversation error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to update conversation" } },
      { status: 500 },
    );
  }
}

// DELETE /api/external/conversations/[id] — delete conversation
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const path = `/api/external/conversations/${id}`;
    const auth = authenticateExternal(req, "DELETE", path);
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

    await prisma.message.deleteMany({ where: { conversationId: id } });
    await prisma.conversation.delete({ where: { id } });

    return NextResponse.json({ ok: true, data: null });
  } catch (error) {
    console.error("External delete conversation error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to delete conversation" } },
      { status: 500 },
    );
  }
}
