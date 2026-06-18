import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { authenticateExternal } from "@/lib/external-auth";

// POST /api/external/conversations — create a new conversation
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const auth = authenticateExternal(req, "POST", body);
    if (auth instanceof NextResponse) return auth;
    const { workspaceId } = auth;

    const data = JSON.parse(body);
    const { externalUserId, message, subject, name, email, metadata, priority, tags } = data;

    if (!externalUserId || !message) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION", message: "externalUserId and message are required" } },
        { status: 400 },
      );
    }

    // Upsert visitor by workspaceId + externalId
    const visitor = await prisma.visitor.upsert({
      where: {
        workspaceId_externalId: { workspaceId, externalId: externalUserId },
      },
      create: {
        workspaceId,
        externalId: externalUserId,
        name: name || null,
        email: email || null,
        metadata: metadata || undefined,
        lastSeenAt: new Date(),
      },
      update: {
        name: name || undefined,
        email: email || undefined,
        metadata: metadata || undefined,
        lastSeenAt: new Date(),
      },
    });

    const conversation = await prisma.conversation.create({
      data: {
        workspaceId,
        visitorId: visitor.id,
        subject: subject || null,
        priority: priority || 0,
        tags: tags || [],
        lastMessageAt: new Date(),
        lastMessagePreview: message.slice(0, 200),
      },
    });

    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        type: "VISITOR",
        body: message,
        senderName: name || null,
      },
    });

    return NextResponse.json({
      ok: true,
      data: {
        conversationId: conversation.id,
        visitorId: visitor.id,
        status: conversation.status,
        createdAt: conversation.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("External create conversation error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to create conversation" } },
      { status: 500 },
    );
  }
}

// GET /api/external/conversations — list conversations
export async function GET(req: NextRequest) {
  try {
    const auth = authenticateExternal(req, "GET");
    if (auth instanceof NextResponse) return auth;
    const { workspaceId } = auth;

    const { searchParams } = new URL(req.url);
    const externalUserId = searchParams.get("externalUserId");
    const status = searchParams.get("status") as "OPEN" | "SNOOZED" | "CLOSED" | null;
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const cursor = searchParams.get("cursor");

    const where: Record<string, unknown> = { workspaceId };
    if (status) where.status = status;
    if (externalUserId) {
      const visitor = await prisma.visitor.findFirst({
        where: { workspaceId, externalId: externalUserId },
      });
      if (visitor) {
        where.visitorId = visitor.id;
      } else {
        return NextResponse.json({ ok: true, data: { conversations: [], nextCursor: null, total: 0 } });
      }
    }
    if (cursor) {
      where.createdAt = { lt: new Date(cursor) };
    }

    const conversations = await prisma.conversation.findMany({
      where,
      include: {
        visitor: {
          select: { id: true, externalId: true, name: true, email: true },
        },
        assignee: {
          include: {
            user: { select: { name: true, image: true } },
          },
        },
        _count: { select: { messages: true } },
      },
      orderBy: { lastMessageAt: "desc" },
      take: limit + 1,
    });

    const hasMore = conversations.length > limit;
    const items = hasMore ? conversations.slice(0, limit) : conversations;
    const nextCursor = hasMore ? items[items.length - 1].createdAt.toISOString() : null;

    const mapped = items.map((c) => ({
      id: c.id,
      subject: c.subject,
      status: c.status,
      priority: c.priority,
      tags: c.tags,
      createdAt: c.createdAt.toISOString(),
      lastMessageAt: c.lastMessageAt?.toISOString() || null,
      lastMessagePreview: c.lastMessagePreview,
      visitor: c.visitor
        ? {
            id: c.visitor.id,
            externalId: c.visitor.externalId,
            name: c.visitor.name,
            email: c.visitor.email,
          }
        : null,
      assignee: c.assignee
        ? { name: c.assignee.user.name, image: c.assignee.user.image }
        : null,
      messageCount: c._count.messages,
    }));

    const total = await prisma.conversation.count({ where });

    return NextResponse.json({
      ok: true,
      data: { conversations: mapped, nextCursor, total },
    });
  } catch (error) {
    console.error("External list conversations error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to list conversations" } },
      { status: 500 },
    );
  }
}
