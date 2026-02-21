import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getWorkspaceBySlug, getWorkspaceMembership } from "@/lib/workspace";
import { WorkspaceProvider } from "@/components/workspace/workspace-context";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  params: Promise<{ workspaceSlug: string }>;
}

export default async function WorkspaceLayout({
  children,
  params,
}: WorkspaceLayoutProps) {
  const { workspaceSlug } = await params;
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) redirect("/dashboard");

  const membership = await getWorkspaceMembership(workspace.id, user.id!);
  if (!membership) redirect("/dashboard");

  return (
    <WorkspaceProvider workspaceSlug={workspaceSlug} workspaceRole={membership.role}>
      {children}
    </WorkspaceProvider>
  );
}
