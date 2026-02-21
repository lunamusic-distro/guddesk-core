import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getWorkspaceBySlug, requireWorkspaceRole } from "@/lib/workspace";
import { prisma } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/header";
import { CollectionManager } from "@/components/articles/collection-manager";

export default async function CollectionsPage({
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

  const collections = await prisma.collection.findMany({
    where: { workspaceId: workspace.id },
    include: {
      _count: { select: { articles: true } },
    },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <DashboardHeader
        heading="Collections"
        text="Organize your articles into collections."
      />
      <CollectionManager
        workspaceId={workspace.id}
        collections={collections.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          icon: c.icon,
          isPublished: c.isPublished,
          articleCount: c._count.articles,
        }))}
      />
    </>
  );
}
