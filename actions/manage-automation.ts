"use server";

import { Prisma } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceRole } from "@/lib/workspace";
import { automationRuleSchema } from "@/lib/validations/automation";
import { revalidatePath } from "next/cache";

export async function createAutomationRule(workspaceId: string, data: unknown) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    await requireWorkspaceRole(workspaceId, session.user.id, ["OWNER", "ADMIN"]);
    const parsed = automationRuleSchema.parse(data);

    const rule = await prisma.automationRule.create({
      data: {
        workspaceId,
        name: parsed.name,
        description: parsed.description,
        trigger: parsed.trigger,
        conditions: parsed.conditions ?? Prisma.JsonNull,
        action: parsed.action,
        actionConfig: parsed.actionConfig,
      },
    });

    revalidatePath("/workspace");
    return { status: "success" as const, rule };
  } catch (error) {
    console.error("Create automation error:", error);
    return { status: "error" as const, message: "Failed to create automation" };
  }
}

export async function updateAutomationRule(
  ruleId: string,
  data: unknown,
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    const rule = await prisma.automationRule.findUnique({
      where: { id: ruleId },
      select: { workspaceId: true },
    });
    if (!rule) {
      return { status: "error" as const, message: "Rule not found" };
    }

    await requireWorkspaceRole(rule.workspaceId, session.user.id, ["OWNER", "ADMIN"]);
    const parsed = automationRuleSchema.parse(data);

    const updated = await prisma.automationRule.update({
      where: { id: ruleId },
      data: {
        name: parsed.name,
        description: parsed.description,
        trigger: parsed.trigger,
        conditions: parsed.conditions ?? Prisma.JsonNull,
        action: parsed.action,
        actionConfig: parsed.actionConfig,
      },
    });

    revalidatePath("/workspace");
    return { status: "success" as const, rule: updated };
  } catch (error) {
    console.error("Update automation error:", error);
    return { status: "error" as const, message: "Failed to update automation" };
  }
}

export async function toggleAutomationRule(ruleId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    const rule = await prisma.automationRule.findUnique({
      where: { id: ruleId },
      select: { workspaceId: true, isEnabled: true },
    });
    if (!rule) {
      return { status: "error" as const, message: "Rule not found" };
    }

    await requireWorkspaceRole(rule.workspaceId, session.user.id, ["OWNER", "ADMIN"]);

    await prisma.automationRule.update({
      where: { id: ruleId },
      data: { isEnabled: !rule.isEnabled },
    });

    revalidatePath("/workspace");
    return { status: "success" as const };
  } catch (error) {
    console.error("Toggle automation error:", error);
    return { status: "error" as const, message: "Failed to toggle automation" };
  }
}

export async function deleteAutomationRule(ruleId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { status: "error" as const, message: "Not authenticated" };
    }

    const rule = await prisma.automationRule.findUnique({
      where: { id: ruleId },
      select: { workspaceId: true },
    });
    if (!rule) {
      return { status: "error" as const, message: "Rule not found" };
    }

    await requireWorkspaceRole(rule.workspaceId, session.user.id, ["OWNER", "ADMIN"]);

    await prisma.automationRule.delete({ where: { id: ruleId } });

    revalidatePath("/workspace");
    return { status: "success" as const };
  } catch (error) {
    console.error("Delete automation error:", error);
    return { status: "error" as const, message: "Failed to delete automation" };
  }
}
