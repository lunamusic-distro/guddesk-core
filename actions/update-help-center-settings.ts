"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceRole } from "@/lib/workspace";
import { helpCenterSettingsSchema } from "@/lib/validations/article";
import { revalidatePath } from "next/cache";

export async function updateHelpCenterSettings(
  workspaceId: string,
  data: {
    title?: string;
    subtitle?: string;
    primaryColor?: string;
    logoUrl?: string | null;
  },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    await requireWorkspaceRole(workspaceId, session.user.id, ["OWNER", "ADMIN"]);

    const validated = helpCenterSettingsSchema.parse(data);

    await prisma.helpCenterSettings.upsert({
      where: { workspaceId },
      create: {
        workspaceId,
        title: validated.title ?? "Help Center",
        subtitle: validated.subtitle ?? null,
        primaryColor: validated.primaryColor ?? "#3ECF8E",
        logoUrl: validated.logoUrl ?? null,
      },
      update: {
        ...(validated.title !== undefined && { title: validated.title }),
        ...(validated.subtitle !== undefined && { subtitle: validated.subtitle }),
        ...(validated.primaryColor !== undefined && { primaryColor: validated.primaryColor }),
        ...(validated.logoUrl !== undefined && { logoUrl: validated.logoUrl }),
      },
    });

    revalidatePath(`/workspace`);
    revalidatePath(`/help`);
    return { status: "success" as const };
  } catch (error) {
    console.error("Update help center settings error:", error);
    return { status: "error" as const, message: "Failed to update settings" };
  }
}
