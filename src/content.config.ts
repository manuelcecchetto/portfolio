import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { blogEntrySchema, projectEntrySchema } from "./content/schemas";

const entryPathId = ({ entry }: { entry: string }) =>
  entry
    .replace(/\.(md|mdx)$/i, "")
    .replace(/[\\/]/g, "--");

const projects = defineCollection({
  loader: glob({
    base: "./src/data/projects",
    pattern: "**/*.{md,mdx}",
    generateId: entryPathId,
  }),
  schema: projectEntrySchema,
});

const blog = defineCollection({
  loader: glob({
    base: "./src/data/blog",
    pattern: "**/*.{md,mdx}",
    generateId: entryPathId,
  }),
  schema: blogEntrySchema,
});

export const collections = {
  projects,
  blog,
};
