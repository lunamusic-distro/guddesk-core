import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { authenticateExternal } from "@/lib/external-auth";

// GET /api/external/articles/search?q=query&collectionSlug=slug
export async function GET(req: NextRequest) {
  try {
    const auth = authenticateExternal(req, "GET");
    if (auth instanceof NextResponse) return auth;
    const { workspaceId } = auth;

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const collectionSlug = searchParams.get("collectionSlug");

    if (!q) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION", message: "q is required" } },
        { status: 400 },
      );
    }

    const where: Record<string, unknown> = {
      workspaceId,
      isPublished: true,
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { body: { contains: q, mode: "insensitive" } },
        { excerpt: { contains: q, mode: "insensitive" } },
      ],
    };

    if (collectionSlug) {
      where.collection = { slug: collectionSlug };
    }

    const articles = await prisma.article.findMany({
      where,
      include: {
        collection: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { viewCount: "desc" },
      take: 20,
    });

    return NextResponse.json({
      ok: true,
      data: {
        articles: articles.map((a) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          collection: a.collection,
          publishedAt: a.publishedAt?.toISOString() || null,
          viewCount: a.viewCount,
          helpfulCount: a.helpfulCount,
          notHelpfulCount: a.notHelpfulCount,
        })),
      },
    });
  } catch (error) {
    console.error("External search articles error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to search articles" } },
      { status: 500 },
    );
  }
}
