import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getWorkspaceBySlug, requireWorkspaceMember } from "@/lib/workspace";
import { prisma } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function ArticlesPage({
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

  const articles = await prisma.article.findMany({
    where: { workspaceId: workspace.id },
    include: {
      collection: { select: { name: true } },
      author: { select: { name: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <DashboardHeader
        heading="Knowledge Base"
        text="Manage articles and collections for your help center."
      />

      <div className="flex gap-2">
        <Link href={`/workspace/${workspaceSlug}/articles/new`}>
          <Button size="sm">New Article</Button>
        </Link>
        <Link href={`/workspace/${workspaceSlug}/articles/collections`}>
          <Button size="sm" variant="outline">
            Collections
          </Button>
        </Link>
      </div>

      <div className="mt-6 rounded-lg border">
        {articles.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No articles yet. Create your first article to get started.
          </div>
        ) : (
          <div className="divide-y">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/workspace/${workspaceSlug}/articles/${article.id}/edit`}
                className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {article.title}
                    </span>
                    <Badge variant={article.isPublished ? "default" : "secondary"}>
                      {article.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    {article.collection && (
                      <span>{article.collection.name}</span>
                    )}
                    {article.author?.name && (
                      <span>by {article.author.name}</span>
                    )}
                    <span>{article.viewCount} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
