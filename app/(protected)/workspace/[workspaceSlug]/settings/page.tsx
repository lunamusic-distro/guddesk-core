import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getWorkspaceBySlug, requireWorkspaceRole } from "@/lib/workspace";
import { DashboardHeader } from "@/components/dashboard/header";
import { WorkspaceSettingsForm } from "@/components/workspace/workspace-settings-form";

export default async function WorkspaceSettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) redirect("/dashboard");

  // Only OWNER and ADMIN can access settings
  await requireWorkspaceRole(workspace.id, user.id!, ["OWNER", "ADMIN"]);

  return (
    <>
      <DashboardHeader
        heading="Workspace Settings"
        text="Manage your workspace's name, slug, and other settings."
      />

      <div className="max-w-2xl">
        <WorkspaceSettingsForm
          workspaceId={workspace.id}
          defaultValues={{
            name: workspace.name,
            slug: workspace.slug,
            logo: workspace.logo,
          }}
        />
      </div>
    </>
  );
}
