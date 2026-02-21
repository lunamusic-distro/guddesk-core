"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceRole } from "@/lib/workspace";
import { workspaceMemberRoleSchema } from "@/lib/validations/workspace";
import { revalidatePath } from "next/cache";

export async function updateWorkspaceMemberRole(
  workspaceId: string,
  data: { memberId: string; role: string },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    await requireWorkspaceRole(workspaceId, session.user.id, ["OWNER"]);

    const { memberId, role } = workspaceMemberRoleSchema.parse(data);

    const member = await prisma.workspaceMember.findUnique({
      where: { id: memberId },
    });

    if (!member || member.workspaceId !== workspaceId) {
      return { status: "error", message: "Member not found" };
    }

    // Prevent removing the last OWNER
    if (member.role === "OWNER" && role !== "OWNER") {
      const ownerCount = await prisma.workspaceMember.count({
        where: { workspaceId, role: "OWNER" },
      });

      if (ownerCount <= 1) {
        return {
          status: "error",
          message: "Cannot change role of the last owner",
        };
      }
    }

    await prisma.workspaceMember.update({
      where: { id: memberId },
      data: { role: role as any },
    });

    revalidatePath(`/workspace`);
    return { status: "success" };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Failed to update role" };
  }
}
