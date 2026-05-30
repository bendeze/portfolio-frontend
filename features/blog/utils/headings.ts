export interface Heading {
  level: number;
  text: string;
  slug: string;
}

/**
 * Parses markdown string and extracts ## and ### headers into
 * a structured array with levels, raw text, and generated anchor slugs.
 */
export function extractHeadings(content: string): Heading[] {
  if (!content) return [];

  const headings: Heading[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();
    // Matches level 1 to 6 markdown headings: e.g. "# Main", "## Heading text", "### Subheading"
    const match = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      
      // Slug conversion must match client-side logic perfectly
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-");
        
      headings.push({ level, text, slug });
    }
  }

  return headings;
}
