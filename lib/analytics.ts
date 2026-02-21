import { prisma } from "@/lib/db";

export async function generateDailySnapshot(workspaceId: string, date: Date) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  const [
    newConversations,
    closedConversations,
    totalMessages,
    visitorCount,
  ] = await Promise.all([
    prisma.conversation.count({
      where: {
        workspaceId,
        createdAt: { gte: dayStart, lte: dayEnd },
      },
    }),
    prisma.conversation.count({
      where: {
        workspaceId,
        closedAt: { gte: dayStart, lte: dayEnd },
      },
    }),
    prisma.message.count({
      where: {
        conversation: { workspaceId },
        createdAt: { gte: dayStart, lte: dayEnd },
      },
    }),
    prisma.visitor.count({
      where: {
        workspaceId,
        lastSeenAt: { gte: dayStart, lte: dayEnd },
      },
    }),
  ]);

  // Calculate average first response time (ms)
  // Find conversations created today that have at least one agent message
  const conversationsWithResponse = await prisma.conversation.findMany({
    where: {
      workspaceId,
      createdAt: { gte: dayStart, lte: dayEnd },
      messages: { some: { type: "AGENT" } },
    },
    select: {
      createdAt: true,
      messages: {
        where: { type: "AGENT" },
        orderBy: { createdAt: "asc" },
        take: 1,
        select: { createdAt: true },
      },
    },
  });

  let avgFirstResponseMs: number | null = null;
  if (conversationsWithResponse.length > 0) {
    const responseTimes = conversationsWithResponse
      .filter((c) => c.messages.length > 0)
      .map(
        (c) => c.messages[0].createdAt.getTime() - c.createdAt.getTime(),
      );
    if (responseTimes.length > 0) {
      avgFirstResponseMs = Math.round(
        responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length,
      );
    }
  }

  // Calculate average resolution time (ms)
  const closedConversationsData = await prisma.conversation.findMany({
    where: {
      workspaceId,
      closedAt: { gte: dayStart, lte: dayEnd },
    },
    select: {
      createdAt: true,
      closedAt: true,
    },
  });

  let avgResolutionMs: number | null = null;
  if (closedConversationsData.length > 0) {
    const resolutionTimes = closedConversationsData
      .filter((c) => c.closedAt)
      .map((c) => c.closedAt!.getTime() - c.createdAt.getTime());
    if (resolutionTimes.length > 0) {
      avgResolutionMs = Math.round(
        resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length,
      );
    }
  }

  await prisma.analyticsSnapshot.upsert({
    where: { workspaceId_date: { workspaceId, date: dayStart } },
    create: {
      workspaceId,
      date: dayStart,
      newConversations,
      closedConversations,
      totalMessages,
      avgFirstResponseMs,
      avgResolutionMs,
      visitorCount,
    },
    update: {
      newConversations,
      closedConversations,
      totalMessages,
      avgFirstResponseMs,
      avgResolutionMs,
      visitorCount,
    },
  });
}

export async function getAnalyticsData(
  workspaceId: string,
  days: number = 30,
) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  const snapshots = await prisma.analyticsSnapshot.findMany({
    where: {
      workspaceId,
      date: { gte: startDate },
    },
    orderBy: { date: "asc" },
  });

  // Aggregate summaries
  const totalNew = snapshots.reduce((s, r) => s + r.newConversations, 0);
  const totalClosed = snapshots.reduce((s, r) => s + r.closedConversations, 0);
  const totalMessages = snapshots.reduce((s, r) => s + r.totalMessages, 0);
  const totalVisitors = snapshots.reduce((s, r) => s + r.visitorCount, 0);

  const responseTimesMs = snapshots
    .filter((s) => s.avgFirstResponseMs !== null)
    .map((s) => s.avgFirstResponseMs!);
  const avgFirstResponse =
    responseTimesMs.length > 0
      ? Math.round(
          responseTimesMs.reduce((a, b) => a + b, 0) / responseTimesMs.length,
        )
      : null;

  const resolutionTimesMs = snapshots
    .filter((s) => s.avgResolutionMs !== null)
    .map((s) => s.avgResolutionMs!);
  const avgResolution =
    resolutionTimesMs.length > 0
      ? Math.round(
          resolutionTimesMs.reduce((a, b) => a + b, 0) /
            resolutionTimesMs.length,
        )
      : null;

  return {
    snapshots,
    summary: {
      totalNew,
      totalClosed,
      totalMessages,
      totalVisitors,
      avgFirstResponseMs: avgFirstResponse,
      avgResolutionMs: avgResolution,
    },
  };
}

export function formatDuration(ms: number | null): string {
  if (ms === null) return "N/A";
  if (ms < 60000) return `${Math.round(ms / 1000)}s`;
  if (ms < 3600000) return `${Math.round(ms / 60000)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
}
