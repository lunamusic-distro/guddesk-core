import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getUserWorkspaces } from "@/lib/workspace";
import { constructMetadata } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { Icons } from "@/components/shared/icons";

export const metadata = constructMetadata({
  title: "Analytics – GudDesk",
  description: "Conversation and support analytics.",
});

export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  if (!user?.id) redirect("/login");

  const workspaces = await getUserWorkspaces(user.id);

  if (workspaces.length === 0) {
    return (
      <>
        <DashboardHeader
          heading="Analytics"
          text="Track your support performance."
        />
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed p-12">
          <div className="flex max-w-md flex-col items-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <Icons.analytics className="size-8 text-muted-foreground" />
            </div>
            <h2 className="mt-5 font-heading text-xl font-bold">
              No analytics yet
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create a workspace and start handling conversations to see analytics
              here.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader
        heading="Analytics"
        text="Track your support performance across all workspaces."
      />
      <div className="space-y-6">
        {/* Workspace analytics links */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((workspace) => (
            <Link
              key={workspace.id}
              href={`/workspace/${workspace.slug}/analytics`}
              className="group rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 font-heading text-sm font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  {workspace.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-heading text-sm">
                    {workspace.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    View conversation analytics
                  </div>
                </div>
                <Icons.arrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>

        {/* Tip */}
        <div className="rounded-xl border bg-muted/30 p-5">
          <div className="flex items-start gap-3">
            <Icons.help className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                Analytics are tracked per workspace
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Select a workspace above to view detailed conversation metrics,
                resolution times, AI agent performance, and customer
                satisfaction data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
