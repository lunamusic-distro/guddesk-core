import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { generateDailySnapshot } from "@/lib/analytics";

// GET /api/cron/analytics
// Called daily by a cron job (e.g. Vercel Cron) to generate analytics snapshots
export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sends Authorization: Bearer <CRON_SECRET>)
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || process.env.AUTH_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const workspaces = await prisma.workspace.findMany({
      select: { id: true },
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const results = await Promise.allSettled(
      workspaces.map((workspace) => generateDailySnapshot(workspace.id, yesterday)),
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return NextResponse.json({
      success: true,
      processed: workspaces.length,
      succeeded,
      failed,
    });
  } catch (error) {
    console.error("Analytics cron error:", error);
    return NextResponse.json(
      { error: "Failed to generate snapshots" },
      { status: 500 },
    );
  }
}
