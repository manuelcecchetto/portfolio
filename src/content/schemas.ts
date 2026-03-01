import { z } from "astro:content";
import { SUPPORTED_LOCALES } from "../lib/i18n";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const coverImagePattern = /^\/images\/[a-z0-9/_-]+\.(?:avif|webp|png|jpe?g|svg)$/i;

const tagSchema = z
  .string()
  .trim()
  .min(1)
  .max(32)
  .transform((value) => value.toLowerCase().replace(/\s+/g, "-"));

const baseEntrySchema = z.object({
  title: z.string().trim().min(3).max(120),
  slug: z.string().regex(slugPattern, "Use lowercase kebab-case slugs."),
  locale: z.enum(SUPPORTED_LOCALES),
  translationGroup: z
    .string()
    .regex(/^(projects|blog):[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use '<collection>:<slug>' translation group format."),
  summary: z.string().trim().min(24).max(240),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  tags: z.array(tagSchema).default([]),
  coverImage: z.string().regex(coverImagePattern).optional(),
  draft: z.boolean().default(false),
});

export const blogEntrySchema = baseEntrySchema.extend({
  readingTimeMinutes: z.number().int().min(1).max(60).optional(),
});

export const projectEntrySchema = baseEntrySchema.extend({
  featured: z.boolean().default(false),
  repositoryUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
});
