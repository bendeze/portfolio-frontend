import { getAllContent } from "@/lib/content";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bonheur-ndeze.vercel.app";
const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = getAllContent("articles");
  const posts = getAllContent("posts");
  const projects = getAllContent("projects");

  const allItems = [...articles, ...posts, ...projects].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>E. Ndeze Bonheur | Engineering &amp; Networks</title>
    <link>${SITE_URL}</link>
    <description>Technical publications, autonomous system architectures, and backend engineering notes.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${allItems
      .map((item) => {
        const itemUrl = `${SITE_URL}/${item.type}/${item.slug}`;
        const pubDate = new Date(item.publishedAt).toUTCString();
        return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(item.type)}</category>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
