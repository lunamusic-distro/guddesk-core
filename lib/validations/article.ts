import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  body: z.string().min(1).max(100000),
  excerpt: z.string().max(500).optional(),
  collectionId: z.string().min(1).nullable(),
  isPublished: z.boolean().optional(),
});

export const collectionSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().max(500).optional(),
  icon: z.string().max(50).optional(),
});

export const helpCenterSettingsSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  subtitle: z.string().max(300).optional(),
  primaryColor: z.string().max(20).optional(),
  logoUrl: z.string().url().optional().nullable(),
});
