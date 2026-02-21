import { redirect } from "next/navigation";

import { getAnalyticsData } from "@/lib/analytics";
import { getCurrentUser } from "@/lib/session";
import { getWorkspaceBySlug, requireWorkspaceMember } from "@/lib/workspace";
import { DashboardHeader } from "@/components/dashboard/header";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) redirect("/dashboard");

  await requireWorkspaceMember(workspace.id, user.id!);

  const { snapshots, summary } = await getAnalyticsData(workspace.id, 30);

  return (
    <>
      <DashboardHeader
        heading="Analytics"
        text="Conversation volume, response times, and visitor metrics over the last 30 days."
      />
      <AnalyticsDashboard snapshots={snapshots} summary={summary} />
    </>
  );
}
