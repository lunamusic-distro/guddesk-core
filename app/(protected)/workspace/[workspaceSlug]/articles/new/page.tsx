import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getWorkspaceBySlug, requireWorkspaceRole } from "@/lib/workspace";
import { prisma } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/header";
import { ArticleEditor } from "@/components/articles/article-editor";

export default async function NewArticlePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) redirect("/dashboard");

  await requireWorkspaceRole(workspace.id, user.id!, ["OWNER", "ADMIN", "AGENT"]);

  const collections = await prisma.collection.findMany({
    where: { workspaceId: workspace.id },
    select: { id: true, name: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <DashboardHeader heading="New Article" text="Create a new help article." />
      <ArticleEditor
        workspaceId={workspace.id}
        workspaceSlug={workspaceSlug}
        collections={collections}
      />
    </>
  );
}
