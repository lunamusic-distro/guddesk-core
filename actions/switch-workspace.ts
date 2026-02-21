"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function switchWorkspace(workspaceId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Verify the user is a member of the target workspace
    const membership = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: { workspaceId, userId: session.user.id },
      },
      include: {
        workspace: { select: { slug: true } },
      },
    });

    if (!membership) {
      return { status: "error", message: "Not a member of this workspace" };
    }

    // The actual workspace switch happens via session update trigger.
    // We return the slug so the client can navigate.
    return {
      status: "success",
      workspaceSlug: membership.workspace.slug,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Failed to switch workspace" };
  }
}
