import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceSlug: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { workspaceSlug } = await params;
  const { q } = await searchParams;

  const workspace = await prisma.workspace.findUnique({
    where: { slug: workspaceSlug },
    select: { id: true, helpCenterSettings: true },
  });

  if (!workspace) notFound();

  const query = q?.trim() ?? "";
  let articles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    collection: { slug: string; name: string } | null;
  }> = [];

  if (query) {
    articles = await prisma.article.findMany({
      where: {
        workspaceId: workspace.id,
        isPublished: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { body: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        collection: { select: { slug: true, name: true } },
      },
      take: 20,
    });
  }

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
          <h1 className="mt-2 text-2xl font-bold">Search Results</h1>
          <form action={`/help/${workspaceSlug}/search`} className="mt-4">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search articles..."
              className="w-full rounded-lg px-4 py-3 text-gray-900 shadow-md outline-none"
            />
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        {!query ? (
          <p className="text-center text-gray-500">
            Enter a search term to find articles.
          </p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500">
            No articles found for &quot;{query}&quot;
          </p>
        ) : (
          <div className="space-y-2">
            <p className="mb-4 text-sm text-gray-500">
              {articles.length} result{articles.length !== 1 ? "s" : ""} for
              &quot;{query}&quot;
            </p>
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/help/${workspaceSlug}/${article.collection?.slug ?? "uncategorized"}/${article.slug}`}
                className="block rounded-lg border bg-white px-5 py-4 transition-shadow hover:shadow-sm"
              >
                <h3 className="font-medium text-gray-900">{article.title}</h3>
                {article.excerpt && (
                  <p className="mt-1 text-sm text-gray-500">
                    {article.excerpt}
                  </p>
                )}
                {article.collection && (
                  <span className="mt-2 inline-block text-xs text-gray-400">
                    {article.collection.name}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
