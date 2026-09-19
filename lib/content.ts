import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type ContentType = "articles" | "posts" | "projects";

export interface ContentMeta {
  slug: string;
  type: ContentType;
  title: string;
  publishedAt: string;
  modifiedAt?: string;
  description: string;
  tags: string[];
  draft?: boolean;
  ogImage?: string;
  readingTime: string;
  year: number;
  architecture?: string;
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ContentItem extends ContentMeta {
  content: string;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface ArchiveYear {
  year: number;
  items: ContentMeta[];
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function getDirectoryForType(type: ContentType): string {
  return path.join(CONTENT_DIR, type);
}

function getAllFilesRecursively(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFilesRecursively(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getAllContent(type: ContentType, includeDrafts = false): ContentMeta[] {
  const dir = getDirectoryForType(type);
  const filePaths = getAllFilesRecursively(dir);

  const items = filePaths
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const relativePath = path.relative(dir, filePath);
      const slug = relativePath
        .replace(/\\/g, "/")
        .replace(/\.(md|mdx)$/, "")
        .replace(/\/index$/, "");

      const readTime = readingTime(content);
      const dateStr = data.publishedAt || data.date || "2026-01-01";
      const year = new Date(dateStr).getFullYear() || 2026;

      const meta: ContentMeta = {
        slug,
        type,
        title: data.title || path.basename(slug),
        publishedAt: dateStr,
        modifiedAt: data.modifiedAt || data.updatedAt,
        description: data.description || data.summary || "",
        tags: Array.isArray(data.tags) ? data.tags.map((t: string) => t.toLowerCase()) : [],
        draft: Boolean(data.draft),
        ogImage: data.ogImage || data.coverImage,
        readingTime: readTime.text,
        year,
        architecture: data.architecture,
        metrics: data.metrics,
        liveUrl: data.liveUrl || data.link,
        githubUrl: data.githubUrl || data.github,
      };

      return meta;
    })
    .filter((item) => (includeDrafts ? true : !item.draft))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return items;
}

export function getContentBySlug(type: ContentType, slug: string | string[]): ContentItem | null {
  const normalizedSlug = Array.isArray(slug) ? slug.join("/") : slug;
  const dir = getDirectoryForType(type);

  const possiblePaths = [
    path.join(dir, `${normalizedSlug}.md`),
    path.join(dir, `${normalizedSlug}.mdx`),
    path.join(dir, normalizedSlug, "index.md"),
    path.join(dir, normalizedSlug, "index.mdx"),
  ];

  let targetPath = possiblePaths.find((p) => fs.existsSync(p));

  if (!targetPath) {
    const allFiles = getAllFilesRecursively(dir);
    targetPath = allFiles.find((p) => {
      const rel = path
        .relative(dir, p)
        .replace(/\\/g, "/")
        .replace(/\.(md|mdx)$/, "")
        .replace(/\/index$/, "");
      return rel === normalizedSlug || path.basename(rel) === normalizedSlug;
    });
  }

  if (!targetPath || !fs.existsSync(targetPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(targetPath, "utf8");
  const { data, content } = matter(fileContents);
  const readTime = readingTime(content);
  const dateStr = data.publishedAt || data.date || "2026-01-01";
  const year = new Date(dateStr).getFullYear() || 2026;

  return {
    slug: normalizedSlug,
    type,
    title: data.title || path.basename(normalizedSlug),
    publishedAt: dateStr,
    modifiedAt: data.modifiedAt || data.updatedAt,
    description: data.description || data.summary || "",
    tags: Array.isArray(data.tags) ? data.tags.map((t: string) => t.toLowerCase()) : [],
    draft: Boolean(data.draft),
    ogImage: data.ogImage || data.coverImage,
    readingTime: readTime.text,
    year,
    architecture: data.architecture,
    metrics: data.metrics,
    liveUrl: data.liveUrl || data.link,
    githubUrl: data.githubUrl || data.github,
    content,
  };
}

export function getAllTags(): TagCount[] {
  const articles = getAllContent("articles");
  const posts = getAllContent("posts");
  const projects = getAllContent("projects");

  const allItems = [...articles, ...posts, ...projects];
  const tagMap = new Map<string, number>();

  for (const item of allItems) {
    for (const tag of item.tags) {
      const normalized = tag.toLowerCase().trim();
      if (normalized) {
        tagMap.set(normalized, (tagMap.get(normalized) || 0) + 1);
      }
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getContentByTag(tag: string): ContentMeta[] {
  const normalizedTag = tag.toLowerCase().trim();
  const articles = getAllContent("articles");
  const posts = getAllContent("posts");
  const projects = getAllContent("projects");

  return [...articles, ...posts, ...projects]
    .filter((item) => item.tags.map((t) => t.toLowerCase()).includes(normalizedTag))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArchives(): ArchiveYear[] {
  const articles = getAllContent("articles");
  const posts = getAllContent("posts");
  const projects = getAllContent("projects");

  const allItems = [...articles, ...posts, ...projects].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const yearMap = new Map<number, ContentMeta[]>();

  for (const item of allItems) {
    const list = yearMap.get(item.year) || [];
    list.push(item);
    yearMap.set(item.year, list);
  }

  return Array.from(yearMap.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, items }));
}

export function getAdjacentContent(type: ContentType, currentSlug: string) {
  const items = getAllContent(type);
  const index = items.findIndex((item) => item.slug === currentSlug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    next: index > 0 ? items[index - 1] : null,
    prev: index < items.length - 1 ? items[index + 1] : null,
  };
}
