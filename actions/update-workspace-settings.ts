"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceRole } from "@/lib/workspace";
import { workspaceSettingsSchema } from "@/lib/validations/workspace";
import { revalidatePath } from "next/cache";

export async function updateWorkspaceSettings(
  workspaceId: string,
  data: { name?: string; slug?: string; logo?: string | null },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    await requireWorkspaceRole(workspaceId, session.user.id, ["OWNER", "ADMIN"]);

    const validated = workspaceSettingsSchema.parse(data);

    // If changing slug, check uniqueness
    if (validated.slug) {
      const existing = await prisma.workspace.findUnique({
        where: { slug: validated.slug },
      });

      if (existing && existing.id !== workspaceId) {
        return { status: "error", message: "This URL slug is already taken" };
      }
    }

    const updateData: Record<string, any> = {};
    if (validated.name !== undefined) updateData.name = validated.name;
    if (validated.slug !== undefined) updateData.slug = validated.slug;
    if (validated.logo !== undefined) updateData.logo = validated.logo;

    const workspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: updateData,
    });

    revalidatePath(`/workspace/${workspace.slug}`);
    return { status: "success", workspaceSlug: workspace.slug };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Failed to update workspace settings" };
  }
}
