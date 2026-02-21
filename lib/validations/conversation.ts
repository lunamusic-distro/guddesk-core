import { z } from "zod";

export const assignConversationSchema = z.object({
  conversationId: z.string().min(1),
  assigneeId: z.string().min(1).nullable(),
});

export const updateConversationStatusSchema = z.object({
  conversationId: z.string().min(1),
  status: z.enum(["OPEN", "SNOOZED", "CLOSED"]),
  snoozedUntil: z.string().datetime().optional(),
});

export const messageSchema = z.object({
  body: z.string().min(1).max(10000),
  type: z.enum(["AGENT", "NOTE"]).default("AGENT"),
});

export const cannedResponseSchema = z.object({
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(5000),
});

export const tagSchema = z.object({
  conversationId: z.string().min(1),
  tags: z.array(z.string().min(1).max(50)).max(20),
});

export const conversationFilterSchema = z.object({
  status: z.enum(["OPEN", "SNOOZED", "CLOSED"]).optional(),
  assigneeId: z.string().optional(),
  search: z.string().optional(),
});
