"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceRole } from "@/lib/workspace";
import { revalidatePath } from "next/cache";

export async function saveSlackWebhook(workspaceId: string, webhookUrl: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    await requireWorkspaceRole(workspaceId, session.user.id, ["OWNER", "ADMIN"]);

    await prisma.slackIntegration.upsert({
      where: { workspaceId },
      create: {
        workspaceId,
        accessToken: "",
        webhookUrl,
      },
      update: {
        webhookUrl,
      },
    });

    revalidatePath("/workspace");
    return { status: "success" as const };
  } catch (error) {
    console.error("Save Slack webhook error:", error);
    return { status: "error" as const, message: "Failed to save webhook" };
  }
}

export async function updateSlackNotificationPrefs(
  workspaceId: string,
  prefs: {
    notifyOnNew?: boolean;
    notifyOnClose?: boolean;
    notifyOnAssign?: boolean;
  },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    await requireWorkspaceRole(workspaceId, session.user.id, ["OWNER", "ADMIN"]);

    await prisma.slackIntegration.update({
      where: { workspaceId },
      data: prefs,
    });

    revalidatePath("/workspace");
    return { status: "success" as const };
  } catch (error) {
    console.error("Update Slack prefs error:", error);
    return { status: "error" as const, message: "Failed to update preferences" };
  }
}

export async function disconnectSlack(workspaceId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    await requireWorkspaceRole(workspaceId, session.user.id, ["OWNER", "ADMIN"]);

    await prisma.slackIntegration.delete({ where: { workspaceId } });

    revalidatePath("/workspace");
    return { status: "success" as const };
  } catch (error) {
    console.error("Disconnect Slack error:", error);
    return { status: "error" as const, message: "Failed to disconnect" };
  }
}
