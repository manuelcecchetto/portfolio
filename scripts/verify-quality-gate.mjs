import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const failures = [];

function fileExists(relPath) {
  const absolutePath = resolve(root, relPath);
  if (!existsSync(absolutePath)) {
    failures.push(`Missing expected build artifact: ${relPath}`);
  }
}

function fileContains(relPath, snippets) {
  const absolutePath = resolve(root, relPath);
  if (!existsSync(absolutePath)) {
    failures.push(`Cannot validate content; file missing: ${relPath}`);
    return;
  }

  const content = readFileSync(absolutePath, "utf8");
  for (const snippet of snippets) {
    if (!content.includes(snippet)) {
      failures.push(`Expected string not found in ${relPath}: ${snippet}`);
    }
  }
}

const requiredArtifacts = [
  "dist/index.html",
  "dist/blog/index.html",
  "dist/blog/mdx-authoring-with-shared-prose-components/index.html",
  "dist/projects/index.html",
  "dist/rss.xml",
  "dist/sitemap-index.xml",
];

for (const artifact of requiredArtifacts) {
  fileExists(artifact);
}

fileContains("dist/index.html", [
  "application/rss+xml",
  'rel="sitemap"',
  "rel=\"canonical\"",
]);

fileContains("dist/blog/mdx-authoring-with-shared-prose-components/index.html", [
  "prose-callout",
  "prose-figure",
  "prose-code-note",
]);

if (failures.length > 0) {
  console.error("Quality gate artifact checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Quality gate artifact checks passed.");
