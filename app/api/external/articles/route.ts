import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { authenticateExternal } from "@/lib/external-auth";

// GET /api/external/articles?collectionSlug=slug&cursor=xxx
export async function GET(req: NextRequest) {
  try {
    const auth = authenticateExternal(req, "GET");
    if (auth instanceof NextResponse) return auth;
    const { workspaceId } = auth;

    const { searchParams } = new URL(req.url);
    const collectionSlug = searchParams.get("collectionSlug");
    const cursor = searchParams.get("cursor");

    const where: Record<string, unknown> = {
      workspaceId,
      isPublished: true,
    };

    if (collectionSlug) {
      where.collection = { slug: collectionSlug };
    }

    if (cursor) {
      where.createdAt = { lt: new Date(cursor) };
    }

    const articles = await prisma.article.findMany({
      where,
      include: {
        collection: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 21,
    });

    const hasMore = articles.length > 20;
    const items = hasMore ? articles.slice(0, 20) : articles;
    const nextCursor = hasMore ? items[items.length - 1].createdAt.toISOString() : null;

    return NextResponse.json({
      ok: true,
      data: {
        articles: items.map((a) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          body: a.body,
          collection: a.collection,
          publishedAt: a.publishedAt?.toISOString() || null,
          viewCount: a.viewCount,
          helpfulCount: a.helpfulCount,
          notHelpfulCount: a.notHelpfulCount,
        })),
        nextCursor,
      },
    });
  } catch (error) {
    console.error("External list articles error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to list articles" } },
      { status: 500 },
    );
  }
}
