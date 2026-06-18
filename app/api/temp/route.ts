import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const workspace = await prisma.workspace.findFirst({
    where: { slug: "hertz" },
    select: { id: true },
  });
  return NextResponse.json({ id: workspace?.id || "not found" });
}
