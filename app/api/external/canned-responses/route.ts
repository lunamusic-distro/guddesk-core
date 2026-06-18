import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { authenticateExternal } from "@/lib/external-auth";

// GET /api/external/canned-responses — list all canned responses for workspace
export async function GET(req: NextRequest) {
  try {
    const auth = authenticateExternal(req, "GET");
    if (auth instanceof NextResponse) return auth;
    const { workspaceId } = auth;

    const cannedResponses = await prisma.cannedResponse.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      ok: true,
      data: {
        cannedResponses: cannedResponses.map((cr) => ({
          id: cr.id,
          title: cr.title,
          body: cr.body,
          createdAt: cr.createdAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    console.error("External list canned responses error:", error);
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Failed to list canned responses" } },
      { status: 500 },
    );
  }
}
