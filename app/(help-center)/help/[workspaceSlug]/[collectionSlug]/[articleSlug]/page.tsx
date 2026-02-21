import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";
import { ArticleFeedbackButtons } from "@/components/articles/article-feedback-buttons";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{
    workspaceSlug: string;
    collectionSlug: string;
    articleSlug: string;
  }>;
}) {
  const { workspaceSlug, collectionSlug, articleSlug } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { slug: workspaceSlug },
    select: { id: true, helpCenterSettings: true },
  });

  if (!workspace) notFound();

  const article = await prisma.article.findUnique({
    where: { workspaceId_slug: { workspaceId: workspace.id, slug: articleSlug } },
    include: {
      author: { select: { name: true } },
      collection: { select: { name: true, slug: true } },
    },
  });

  if (!article || !article.isPublished) notFound();

  // Increment view count
  await prisma.article.update({
    where: { id: article.id },
    data: { viewCount: { increment: 1 } },
  });

  const primaryColor = workspace.helpCenterSettings?.primaryColor ?? "#3ECF8E";

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="px-4 py-6 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-sm opacity-80">
            <Link href={`/help/${workspaceSlug}`} className="hover:opacity-100">
              Help Center
            </Link>
            <span>/</span>
            {article.collection && (
              <>
                <Link
                  href={`/help/${workspaceSlug}/${collectionSlug}`}
                  className="hover:opacity-100"
                >
                  {article.collection.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="truncate">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <article className="rounded-lg border bg-white px-8 py-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">{article.title}</h1>

          <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
            {article.author?.name && <span>By {article.author.name}</span>}
            {article.publishedAt && (
              <span>
                Published{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Article body rendered as prose */}
          <div className="prose prose-gray mt-6 max-w-none">
            {article.body.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        {/* Feedback */}
        <div className="mt-6 rounded-lg border bg-white px-8 py-6 text-center shadow-sm">
          <p className="text-sm font-medium text-gray-700">
            Was this article helpful?
          </p>
          <ArticleFeedbackButtons articleId={article.id} />
        </div>
      </div>
    </div>
  );
}
