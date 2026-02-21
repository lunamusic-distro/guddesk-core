"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function articleFeedback(
  articleId: string,
  helpful: boolean,
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { isPublished: true },
    });

    if (!article || !article.isPublished) {
      return { status: "error" as const, message: "Article not found" };
    }

    await prisma.article.update({
      where: { id: articleId },
      data: helpful
        ? { helpfulCount: { increment: 1 } }
        : { notHelpfulCount: { increment: 1 } },
    });

    revalidatePath(`/help`);
    return { status: "success" as const };
  } catch (error) {
    console.error("Article feedback error:", error);
    return { status: "error" as const, message: "Failed to submit feedback" };
  }
}
