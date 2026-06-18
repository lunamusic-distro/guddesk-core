import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { authenticateExternal } from "@/lib/external-auth";

// GET /api/external/stats?days=30
export async function GET(req: NextRequest) {
  try {
    const auth = authenticateExternal(req, "GET");
    if (auth instanceof NextResponse) return auth;
    const { workspaceId } = auth;

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "30");
    const since = new Date();
    since.setDate(since.getDate() - days);

    const [
      totalNewConversations,
      totalClosedConversations,
      totalMessages,
      totalVisitors,
      currentOpenCount,
      snapshots,
    ] = await Promise.all([
      prisma.conversation.count({
        where: { workspaceId, createdAt: { gte: since } },
      }),
      prisma.conversation.count({
        where: { workspaceId, status: "CLOSED", closedAt: { gte: since } },
      }),
      prisma.message.count({
        where: {
          conversation: { workspaceId },
          createdAt: { gte: since },
        },
      }),
      prisma.visitor.count({
        where: { workspaceId, createdAt: { gte: since } },
      }),
      prisma.conversation.count({
        where: { workspaceId, status: "OPEN" },
      }),
      prisma.analyticsSnapshot.findMany({
        where: { workspaceId, date: { gte: since } },
        orderBy: { date: "asc" },
      }),
    ]);

    const avgFirstResponseMs =
      snapshots.reduce((sum, s) => sum + (s.avgFirstResponseMs || 0), 0) /
        snapshots.filter((s) => s.avgFirstResponseMs).length || null;
    const avgResolutionMs =
      snapshots.reduce((sum, s) => sum + (s.avgResolutionMs || 0), 0) /
        snapshots.filter((s) => s.avgResolutionMs).length || null;

    const formatMs = (ms: number | null): string | null => {
      if (ms === null) return null;
      if (ms < 60000) return `${Math.round(ms / 1000)}s`;
      if (ms < 3600000) return `${Math.round(ms / 60000)}m`;
      if (ms < 86400000) return `${Math.round(ms / 3600000)}h`;
      return `${Math.round(ms / 86400000)}d`;
    };

    return NextResponse.json({
      ok: true,
      data: {
        summary: {
          totalNewConversations,
          totalClosedConversations,
          totalMessages,
          totalVisitors,
          avgFirstResponseMs: avgFirstResponseMs ? Math.round(avgFirstResponseMs) : null,
          avgResolutionMs: avgResolutionMs ? Math.round(avgResolutionMs) : null,
          avgFirstResponseFormatted: formatMs(avgFirstResponseMs),
          avgResolutionFormatted: formatMs(avgResolutionMs),
        },
        currentOpenCount,
        snapshots: snapshots.map((s) => ({
          date: s.date.toISOString(),
          newConversations: s.newConversations,
          closedConversations: s.closedConversations,
          totalMessages: s.totalMessages,
          visitorCount: s.visitorCount,
        })),
      },
    });
  } catch (error) {
    console.error("External stats error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to get stats" } },
      { status: 500 },
    );
  }
}
