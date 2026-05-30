/**
 * Resolves standard public shared URLs (like Google Photos, Unsplash, etc.)
 * in raw markdown and translates them into standard markdown image tags.
 */
export async function resolveEmbeddableMedia(content: string): Promise<string> {
  if (!content) return "";

  let resolvedContent = content;

  // 1. Resolve Google Photos shared links
  // Pattern: https://photos.app.goo.gl/NZDbizqSq3NGeLVm9
  const googlePhotosRegex = /https:\/\/photos\.app\.goo\.gl\/[a-zA-Z0-9_-]+/gi;
  const googlePhotosMatches = content.match(googlePhotosRegex) || [];

  for (const link of googlePhotosMatches) {
    try {
      const res = await fetch(link, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (res.ok) {
        const html = await res.text();
        const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
        if (ogImageMatch && ogImageMatch[1]) {
          const directSrc = ogImageMatch[1];
          // Replace link in markdown with a proper markdown image tag
          resolvedContent = resolvedContent.replace(link, `![Google Photo Illustration](${directSrc})`);
        }
      }
    } catch (err) {
      console.error(`[resolveEmbeddableMedia] Failed to resolve Google Photos link: ${link}`, err);
    }
  }

  // 2. Resolve Unsplash photo page links
  // Pattern: https://unsplash.com/photos/modern-glass-building-with-reflective-facade-B2T68Z6f2_U
  const unsplashRegex = /https:\/\/unsplash\.com\/photos\/([a-zA-Z0-9_-]+)/gi;
  
  // Create a separate copy for matching since we mutate resolvedContent
  const unsplashMatches = Array.from(content.matchAll(unsplashRegex));
  for (const match of unsplashMatches) {
    const fullUrl = match[0];
    const pathSegment = match[1];
    const parts = pathSegment.split("-");
    const id = parts[parts.length - 1];
    const directSrc = `https://unsplash.com/photos/${id}/download?force=true`;
    resolvedContent = resolvedContent.replace(fullUrl, `![Unsplash Photo Illustration](${directSrc})`);
  }

  // 3. Resolve direct links on their own line that aren't already image tags
  // E.g., direct image URLs (png, jpg, jpeg, etc.) that are just written as plain text in the markdown.
  // We can match links on a single line ending in common extensions:
  const lineUrlRegex = /^(https?:\/\/[^\s]+?\.(?:png|jpg|jpeg|gif|svg|webp|bmp|ico))$/gim;
  resolvedContent = resolvedContent.replace(lineUrlRegex, "![Embedded Illustration]($1)");

  return resolvedContent;
}
