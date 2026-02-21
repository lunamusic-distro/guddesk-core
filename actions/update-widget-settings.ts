"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceRole } from "@/lib/workspace";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const widgetSettingsSchema = z.object({
  primaryColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/)
    .optional(),
  position: z.enum(["bottom-right", "bottom-left"]).optional(),
  welcomeMessage: z.string().min(1).max(500).optional(),
  workspaceName: z.string().max(100).optional().nullable(),
  workspaceAvatarUrl: z.string().url().optional().nullable(),
  showBranding: z.boolean().optional(),
  requireEmail: z.boolean().optional(),
  suggestArticles: z.boolean().optional(),
  offlineFormTimeout: z.number().int().min(1).max(30).optional().nullable(),
});

export async function updateWidgetSettings(
  workspaceId: string,
  data: z.infer<typeof widgetSettingsSchema>,
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    await requireWorkspaceRole(workspaceId, session.user.id, ["OWNER", "ADMIN"]);

    const validated = widgetSettingsSchema.parse(data);

    await prisma.widgetSettings.upsert({
      where: { workspaceId },
      create: {
        workspaceId,
        ...validated,
      },
      update: validated,
    });

    revalidatePath(`/workspace`);
    return { status: "success" };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Failed to update widget settings" };
  }
}
