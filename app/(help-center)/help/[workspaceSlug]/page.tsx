import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";

export default async function HelpCenterPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { slug: workspaceSlug },
    select: {
      id: true,
      name: true,
      helpCenterSettings: true,
    },
  });

  if (!workspace) notFound();

  const settings = workspace.helpCenterSettings;

  const collections = await prisma.collection.findMany({
    where: { workspaceId: workspace.id, isPublished: true },
    include: {
      _count: { select: { articles: { where: { isPublished: true } } } },
    },
    orderBy: { order: "asc" },
  });

  const primaryColor = settings?.primaryColor ?? "#3ECF8E";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div
        className="px-4 py-16 text-center text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <h1 className="text-3xl font-bold">
          {settings?.title ?? `${workspace.name} Help Center`}
        </h1>
        {settings?.subtitle && (
          <p className="mx-auto mt-2 max-w-lg text-lg opacity-90">
            {settings.subtitle}
          </p>
        )}

        {/* Search */}
        <form
          action={`/help/${workspaceSlug}/search`}
          className="mx-auto mt-6 max-w-md"
        >
          <input
            type="search"
            name="q"
            placeholder="Search articles..."
            className="w-full rounded-lg px-4 py-3 text-gray-900 shadow-md outline-none"
          />
        </form>
      </div>

      {/* Collections */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        {collections.length === 0 ? (
          <p className="text-center text-gray-500">
            No articles published yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/help/${workspaceSlug}/${col.slug}`}
                className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {col.icon && <span className="text-2xl">{col.icon}</span>}
                <h2 className="mt-2 text-lg font-semibold">{col.name}</h2>
                {col.description && (
                  <p className="mt-1 text-sm text-gray-500">
                    {col.description}
                  </p>
                )}
                <p className="mt-3 text-xs text-gray-400">
                  {col._count.articles} article
                  {col._count.articles !== 1 ? "s" : ""}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
