import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, localizePath, resolveLocale, type SiteLocale } from "./i18n";

export type ProjectEntry = CollectionEntry<"projects">;
export type BlogEntry = CollectionEntry<"blog">;
export interface BlogTagSummary {
  tag: string;
  count: number;
  href: string;
}

export interface PaginationResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  previousPageHref: string | undefined;
  nextPageHref: string | undefined;
}

export const BLOG_PAGE_SIZE = 6;

interface LocalizedQueryOptions {
  includeDrafts?: boolean;
  fallbackLocale?: SiteLocale;
}

type LocalizedContentData = {
  slug: string;
  locale: SiteLocale;
  translationGroup: string;
  draft: boolean;
  publishedAt: Date;
  updatedAt?: Date | undefined;
};

type LocalizedEntry = {
  id: string;
  data: LocalizedContentData;
};

function sortByNewest<T extends { data: { publishedAt: Date; updatedAt?: Date | undefined } }>(
  entries: T[],
): T[] {
  return [...entries].sort((a, b) => {
    const left = a.data.updatedAt ?? a.data.publishedAt;
    const right = b.data.updatedAt ?? b.data.publishedAt;
    return right.getTime() - left.getTime();
  });
}

export async function getPublishedProjects(): Promise<ProjectEntry[]> {
  return getLocalizedProjects(DEFAULT_LOCALE, { includeDrafts: false });
}

export async function getPublishedBlogPosts(): Promise<BlogEntry[]> {
  return getLocalizedBlogPosts(DEFAULT_LOCALE, { includeDrafts: false });
}

export async function getBlogPosts(options?: { includeDrafts?: boolean }): Promise<BlogEntry[]> {
  const includeDrafts = options?.includeDrafts ?? !import.meta.env.PROD;
  const entries = await getCollection("blog", ({ data }) => (includeDrafts ? true : !data.draft));
  return sortByNewest(entries);
}

function isVisibleEntry(entry: LocalizedEntry, includeDrafts: boolean): boolean {
  return includeDrafts || !entry.data.draft;
}

export function resolveLocalizedEntries<T extends LocalizedEntry>(
  entries: T[],
  locale: SiteLocale,
  options?: LocalizedQueryOptions,
): T[] {
  const requestedLocale = resolveLocale(locale);
  const fallbackLocale = resolveLocale(options?.fallbackLocale ?? DEFAULT_LOCALE);
  const includeDrafts = options?.includeDrafts ?? !import.meta.env.PROD;
  const groups = new Map<string, T[]>();

  for (const entry of entries) {
    const bucket = groups.get(entry.data.translationGroup);
    if (bucket) {
      bucket.push(entry);
    } else {
      groups.set(entry.data.translationGroup, [entry]);
    }
  }

  const resolved: T[] = [];
  for (const groupEntries of groups.values()) {
    const orderedGroup = sortByNewest(groupEntries);
    const localeCandidate = orderedGroup.find((entry) => entry.data.locale === requestedLocale);
    const fallbackCandidate = orderedGroup.find((entry) => entry.data.locale === fallbackLocale);

    if (localeCandidate && isVisibleEntry(localeCandidate, includeDrafts)) {
      resolved.push(localeCandidate);
      continue;
    }

    if (fallbackCandidate && isVisibleEntry(fallbackCandidate, includeDrafts)) {
      resolved.push(fallbackCandidate);
    }
  }

  return sortByNewest(resolved);
}

export function resolveLocalizedEntryBySlug<T extends LocalizedEntry>(
  entries: T[],
  slug: string,
  locale: SiteLocale,
  options?: LocalizedQueryOptions,
): T | undefined {
  const requestedLocale = resolveLocale(locale);
  const fallbackLocale = resolveLocale(options?.fallbackLocale ?? DEFAULT_LOCALE);
  const includeDrafts = options?.includeDrafts ?? !import.meta.env.PROD;
  const slugEntries = sortByNewest(entries.filter((entry) => entry.data.slug === slug));

  const localeCandidate = slugEntries.find((entry) => entry.data.locale === requestedLocale);
  if (localeCandidate && isVisibleEntry(localeCandidate, includeDrafts)) {
    return localeCandidate;
  }

  const fallbackCandidate = slugEntries.find((entry) => entry.data.locale === fallbackLocale);
  if (fallbackCandidate && isVisibleEntry(fallbackCandidate, includeDrafts)) {
    return fallbackCandidate;
  }

  return undefined;
}

export async function getLocalizedProjects(locale: SiteLocale, options?: LocalizedQueryOptions): Promise<ProjectEntry[]> {
  const entries = await getCollection("projects");
  return resolveLocalizedEntries(entries, locale, options);
}

export async function getLocalizedBlogPosts(locale: SiteLocale, options?: LocalizedQueryOptions): Promise<BlogEntry[]> {
  const entries = await getCollection("blog");
  return resolveLocalizedEntries(entries, locale, options);
}

export async function getLocalizedProjectBySlug(
  slug: string,
  locale: SiteLocale,
  options?: LocalizedQueryOptions,
): Promise<ProjectEntry | undefined> {
  const entries = await getCollection("projects");
  return resolveLocalizedEntryBySlug(entries, slug, locale, options);
}

export async function getLocalizedBlogPostBySlug(
  slug: string,
  locale: SiteLocale,
  options?: LocalizedQueryOptions,
): Promise<BlogEntry | undefined> {
  const entries = await getCollection("blog");
  return resolveLocalizedEntryBySlug(entries, slug, locale, options);
}

export async function getProjectRouteSlugs(options?: LocalizedQueryOptions): Promise<string[]> {
  const projects = await getLocalizedProjects(DEFAULT_LOCALE, options);
  return projects.map((project) => project.data.slug);
}

export async function getBlogRouteSlugs(options?: LocalizedQueryOptions): Promise<string[]> {
  const posts = await getLocalizedBlogPosts(DEFAULT_LOCALE, options);
  return posts.map((post) => post.data.slug);
}

export function getBlogTagSummaries(entries: BlogEntry[], locale: SiteLocale = DEFAULT_LOCALE): BlogTagSummary[] {
  const activeLocale = resolveLocale(locale);
  const counts = new Map<string, number>();

  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => (a[1] === b[1] ? a[0].localeCompare(b[0]) : b[1] - a[1]))
    .map(([tag, count]) => ({
      tag,
      count,
      href: localizePath(activeLocale, `/blog/tags/${encodeURIComponent(tag)}/`),
    }));
}

function getPageHref(page: number, basePath: string, locale: SiteLocale): string {
  const relativePath = page <= 1 ? `${basePath}/` : `${basePath}/page/${page}/`;
  return localizePath(locale, relativePath);
}

export function paginateEntries<T>(
  entries: T[],
  page: number,
  pageSize: number,
  basePath: string,
  locale: SiteLocale = DEFAULT_LOCALE,
): PaginationResult<T> {
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const totalItems = entries.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(Math.max(1, Math.floor(page)), totalPages);
  const activeLocale = resolveLocale(locale);
  const start = (currentPage - 1) * safePageSize;
  const end = start + safePageSize;
  const items = entries.slice(start, end);

  return {
    items,
    page: currentPage,
    pageSize: safePageSize,
    totalItems,
    totalPages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    previousPageHref: currentPage > 1 ? getPageHref(currentPage - 1, basePath, activeLocale) : undefined,
    nextPageHref: currentPage < totalPages ? getPageHref(currentPage + 1, basePath, activeLocale) : undefined,
  };
}
