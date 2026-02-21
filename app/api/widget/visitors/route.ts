import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { createVisitorToken, verifyVisitorToken } from "@/lib/visitor-auth";

// POST /api/widget/visitors
// Identify a visitor (set name, email, externalId, metadata)
// Used when the host application identifies a logged-in user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { appId: rawAppId, visitorToken, externalId, name, email, metadata } = body;

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

    // If we have an externalId, try to find an existing visitor
    if (externalId) {
      const existingVisitor = await prisma.visitor.findUnique({
        where: {
          workspaceId_externalId: { workspaceId: workspace.id, externalId },
        },
      });

      if (existingVisitor) {
        // Update existing visitor
        await prisma.visitor.update({
          where: { id: existingVisitor.id },
          data: {
            ...(name !== undefined && { name }),
            ...(email !== undefined && { email }),
            ...(metadata !== undefined && { metadata }),
            lastSeenAt: new Date(),
          },
        });

        const token = createVisitorToken(existingVisitor.id, workspace.id);
        return NextResponse.json({
          visitorId: existingVisitor.id,
          visitorToken: token,
        });
      }
    }

    // If we have a visitorToken, update that visitor
    if (visitorToken) {
      const payload = verifyVisitorToken(visitorToken);
      if (payload && payload.workspaceId === workspace.id) {
        await prisma.visitor.update({
          where: { id: payload.visitorId },
          data: {
            ...(externalId && { externalId }),
            ...(name !== undefined && { name }),
            ...(email !== undefined && { email }),
            ...(metadata !== undefined && { metadata }),
            lastSeenAt: new Date(),
          },
        });

        return NextResponse.json({
          visitorId: payload.visitorId,
          visitorToken,
        });
      }
    }

    // Create a new visitor
    const visitor = await prisma.visitor.create({
      data: {
        workspaceId: workspace.id,
        externalId: externalId ?? null,
        name: name ?? null,
        email: email ?? null,
        metadata: metadata ?? null,
        lastSeenAt: new Date(),
      },
    });

    const token = createVisitorToken(visitor.id, workspace.id);
    return NextResponse.json({
      visitorId: visitor.id,
      visitorToken: token,
    });
  } catch (error) {
    console.error("Widget visitor error:", error);
    return NextResponse.json(
      { error: "Failed to identify visitor" },
      { status: 500 },
    );
  }
}
