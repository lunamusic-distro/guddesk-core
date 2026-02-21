import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { createVisitorToken } from "@/lib/visitor-auth";

// POST /api/widget/auth
// Generate a visitor token for an anonymous or identified visitor
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { appId: rawAppId } = body;

    if (!rawAppId) {
      return NextResponse.json(
        { error: "App ID is required" },
        { status: 400 },
      );
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

    // Create anonymous visitor
    const visitor = await prisma.visitor.create({
      data: {
        workspaceId: workspace.id,
        lastSeenAt: new Date(),
      },
    });

    const token = createVisitorToken(visitor.id, workspace.id);

    return NextResponse.json({
      visitorId: visitor.id,
      visitorToken: token,
    });
  } catch (error) {
    console.error("Widget auth error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 },
    );
  }
}
