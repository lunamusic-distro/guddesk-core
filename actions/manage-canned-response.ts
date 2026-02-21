"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceRole } from "@/lib/workspace";
import { cannedResponseSchema } from "@/lib/validations/conversation";
import { revalidatePath } from "next/cache";

export async function createCannedResponse(
  workspaceId: string,
  data: { title: string; body: string },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    await requireWorkspaceRole(workspaceId, session.user.id, ["OWNER", "ADMIN", "AGENT"]);

    const validated = cannedResponseSchema.parse(data);

    const response = await prisma.cannedResponse.create({
      data: {
        workspaceId,
        title: validated.title,
        body: validated.body,
        createdById: session.user.id,
      },
    });

    revalidatePath(`/workspace`);
    return { status: "success" as const, id: response.id };
  } catch (error) {
    console.error("Create canned response error:", error);
    return { status: "error" as const, message: "Failed to create canned response" };
  }
}

export async function updateCannedResponse(
  id: string,
  data: { title: string; body: string },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    const existing = await prisma.cannedResponse.findUnique({
      where: { id },
      select: { workspaceId: true },
    });

    if (!existing) {
      return { status: "error" as const, message: "Not found" };
    }

    await requireWorkspaceRole(existing.workspaceId, session.user.id, ["OWNER", "ADMIN", "AGENT"]);

    const validated = cannedResponseSchema.parse(data);

    await prisma.cannedResponse.update({
      where: { id },
      data: { title: validated.title, body: validated.body },
    });

    revalidatePath(`/workspace`);
    return { status: "success" as const };
  } catch (error) {
    console.error("Update canned response error:", error);
    return { status: "error" as const, message: "Failed to update canned response" };
  }
}

export async function deleteCannedResponse(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    const existing = await prisma.cannedResponse.findUnique({
      where: { id },
      select: { workspaceId: true },
    });

    if (!existing) {
      return { status: "error" as const, message: "Not found" };
    }

    await requireWorkspaceRole(existing.workspaceId, session.user.id, ["OWNER", "ADMIN"]);

    await prisma.cannedResponse.delete({ where: { id } });

    revalidatePath(`/workspace`);
    return { status: "success" as const };
  } catch (error) {
    console.error("Delete canned response error:", error);
    return { status: "error" as const, message: "Failed to delete canned response" };
  }
}
