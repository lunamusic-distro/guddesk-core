"use client";

import type { AnalyticsSnapshot } from "@prisma/client";
import { format } from "date-fns";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatDuration(ms: number | null): string {
  if (ms === null) return "N/A";
  if (ms < 60000) return `${Math.round(ms / 1000)}s`;
  if (ms < 3600000) return `${Math.round(ms / 60000)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
}

interface AnalyticsDashboardProps {
  snapshots: AnalyticsSnapshot[];
  summary: {
    totalNew: number;
    totalClosed: number;
    totalMessages: number;
    totalVisitors: number;
    avgFirstResponseMs: number | null;
    avgResolutionMs: number | null;
  };
}

export function AnalyticsDashboard({
  snapshots,
  summary,
}: AnalyticsDashboardProps) {
  const chartData = snapshots.map((s) => ({
    date: format(new Date(s.date), "MMM d"),
    conversations: s.newConversations,
    closed: s.closedConversations,
    messages: s.totalMessages,
    visitors: s.visitorCount,
    responseTime: s.avgFirstResponseMs
      ? Math.round(s.avgFirstResponseMs / 60000)
      : 0,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          label="New Conversations"
          value={summary.totalNew.toString()}
        />
        <SummaryCard
          label="Closed Conversations"
          value={summary.totalClosed.toString()}
        />
        <SummaryCard
          label="Total Messages"
          value={summary.totalMessages.toString()}
        />
        <SummaryCard
          label="Unique Visitors"
          value={summary.totalVisitors.toString()}
        />
        <SummaryCard
          label="Avg First Response"
          value={formatDuration(summary.avgFirstResponseMs)}
        />
        <SummaryCard
          label="Avg Resolution Time"
          value={formatDuration(summary.avgResolutionMs)}
        />
      </div>

      {/* Conversations Chart */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Conversations Over Time</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="conversations"
                name="New"
                stackId="1"
                stroke="#3ECF8E"
                fill="#3ECF8E"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="closed"
                name="Closed"
                stackId="2"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            No data yet. Analytics will appear after your first day of activity.
          </div>
        )}
      </div>

      {/* Messages Chart */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Messages & Visitors</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar
                dataKey="messages"
                name="Messages"
                fill="#3ECF8E"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="visitors"
                name="Visitors"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            No data yet.
          </div>
        )}
      </div>

      {/* Response Time Chart */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Average First Response Time (min)</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="responseTime"
                name="Response (min)"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
            No data yet.
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
