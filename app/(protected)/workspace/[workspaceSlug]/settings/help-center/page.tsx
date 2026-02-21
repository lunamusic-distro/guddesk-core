import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getWorkspaceBySlug, requireWorkspaceRole } from "@/lib/workspace";
import { prisma } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/header";
import { HelpCenterSettingsForm } from "@/components/articles/help-center-settings-form";

export default async function HelpCenterSettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) redirect("/dashboard");

  await requireWorkspaceRole(workspace.id, user.id!, ["OWNER", "ADMIN"]);

  const settings = await prisma.helpCenterSettings.findUnique({
    where: { workspaceId: workspace.id },
  });

  return (
    <>
      <DashboardHeader
        heading="Help Center Settings"
        text="Customize the appearance of your public help center."
      />
      <HelpCenterSettingsForm
        workspaceId={workspace.id}
        workspaceSlug={workspaceSlug}
        settings={{
          title: settings?.title ?? `${workspace.name} Help Center`,
          subtitle: settings?.subtitle ?? "",
          primaryColor: settings?.primaryColor ?? "#3ECF8E",
          logoUrl: settings?.logoUrl ?? null,
        }}
      />
    </>
  );
}
