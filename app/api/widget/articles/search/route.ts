import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

// GET /api/widget/articles/search?appId=xxx&q=query
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawAppId = searchParams.get("appId");
    const q = searchParams.get("q");

    if (!rawAppId) {
      return NextResponse.json({ error: "App ID required" }, { status: 400 });
    }

    // Strip cosmetic gd_pub_ prefix before DB lookup
    const appId = rawAppId.replace(/^gd_pub_/, "");

    const workspace = await prisma.workspace.findUnique({
      where: { appId },
      select: { id: true },
    });

    if (!workspace) {
      return NextResponse.json({ error: "Invalid App ID" }, { status: 401 });
    }

    const where: Record<string, unknown> = {
      workspaceId: workspace.id,
      isPublished: true,
    };

    if (q && q.trim()) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { body: { contains: q, mode: "insensitive" } },
      ];
    }

    const articles = await prisma.article.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        collection: {
          select: { slug: true, name: true },
        },
      },
      orderBy: { viewCount: "desc" },
      take: 10,
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Widget article search error:", error);
    return NextResponse.json(
      { error: "Failed to search articles" },
      { status: 500 },
    );
  }
}
