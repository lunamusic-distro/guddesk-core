import { redirect, notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getWorkspaceBySlug, requireWorkspaceRole } from "@/lib/workspace";
import { prisma } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/header";
import { ArticleEditor } from "@/components/articles/article-editor";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; articleId: string }>;
}) {
  const { workspaceSlug, articleId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const workspace = await getWorkspaceBySlug(workspaceSlug);
  if (!workspace) redirect("/dashboard");

  await requireWorkspaceRole(workspace.id, user.id!, ["OWNER", "ADMIN", "AGENT"]);

  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: {
      id: true,
      title: true,
      slug: true,
      body: true,
      excerpt: true,
      collectionId: true,
      isPublished: true,
      workspaceId: true,
    },
  });

  if (!article || article.workspaceId !== workspace.id) notFound();

  const collections = await prisma.collection.findMany({
    where: { workspaceId: workspace.id },
    select: { id: true, name: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <DashboardHeader heading="Edit Article" text="Update your article." />
      <ArticleEditor
        workspaceId={workspace.id}
        workspaceSlug={workspaceSlug}
        collections={collections}
        article={article}
      />
    </>
  );
}
