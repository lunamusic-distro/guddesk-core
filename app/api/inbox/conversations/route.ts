import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceMember } from "@/lib/workspace";

// GET /api/inbox/conversations?workspaceId=xxx&status=OPEN&assigneeId=yyy
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    const status = searchParams.get("status") as "OPEN" | "SNOOZED" | "CLOSED" | null;
    const assigneeId = searchParams.get("assigneeId");

    if (!workspaceId) {
      return NextResponse.json({ error: "workspaceId required" }, { status: 400 });
    }

    await requireWorkspaceMember(workspaceId, session.user.id);

    const where: Record<string, unknown> = { workspaceId };
    if (status) where.status = status;
    if (assigneeId) where.assigneeId = assigneeId;

    const conversations = await prisma.conversation.findMany({
      where,
      include: {
        visitor: {
          select: { id: true, name: true, email: true, avatarUrl: true },
        },
        assignee: {
          include: {
            user: { select: { name: true, image: true } },
          },
        },
        _count: { select: { messages: true } },
      },
      orderBy: { lastMessageAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("Fetch conversations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 },
    );
  }
}
