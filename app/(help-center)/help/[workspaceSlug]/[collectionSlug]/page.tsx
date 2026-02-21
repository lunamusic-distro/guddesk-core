import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; collectionSlug: string }>;
}) {
  const { workspaceSlug, collectionSlug } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { slug: workspaceSlug },
    select: { id: true, name: true, helpCenterSettings: true },
  });

  if (!workspace) notFound();

  const collection = await prisma.collection.findUnique({
    where: { workspaceId_slug: { workspaceId: workspace.id, slug: collectionSlug } },
  });

  if (!collection || !collection.isPublished) notFound();

  const articles = await prisma.article.findMany({
    where: {
      workspaceId: workspace.id,
      collectionId: collection.id,
      isPublished: true,
    },
    select: { id: true, title: true, slug: true, excerpt: true },
    orderBy: { order: "asc" },
  });

  const primaryColor = workspace.helpCenterSettings?.primaryColor ?? "#3ECF8E";

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="px-4 py-10 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/help/${workspaceSlug}`}
            className="text-sm opacity-80 hover:opacity-100"
          >
            &larr; Back to Help Center
          </Link>
          <h1 className="mt-2 text-2xl font-bold">
            {collection.icon && <span className="mr-2">{collection.icon}</span>}
            {collection.name}
          </h1>
          {collection.description && (
            <p className="mt-1 opacity-90">{collection.description}</p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">
            No articles in this collection yet.
          </p>
        ) : (
          <div className="space-y-1">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/help/${workspaceSlug}/${collectionSlug}/${article.slug}`}
                className="block rounded-lg border bg-white px-5 py-4 transition-shadow hover:shadow-sm"
              >
                <h3 className="font-medium text-gray-900">{article.title}</h3>
                {article.excerpt && (
                  <p className="mt-1 text-sm text-gray-500">
                    {article.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
