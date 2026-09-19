/**
 * Utility functions for robust diagram rendering and code sanitization
 */

/**
 * Decodes all HTML entities commonly introduced by Markdown / MDX parsers
 */
export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  
  let result = str;

  // Named entities
  result = result
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x60;/g, "`")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ");

  // Decimal entities: &#62; -> >
  result = result.replace(/&#(\d+);/g, (_, dec) => {
    try {
      return String.fromCharCode(parseInt(dec, 10));
    } catch {
      return _;
    }
  });

  // Hex entities: &#x3e; -> >
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
    try {
      return String.fromCharCode(parseInt(hex, 16));
    } catch {
      return _;
    }
  });

  return result;
}

/**
 * Cleans diagram code: strips fences, decodes HTML entities, and normalizes spacing
 */
export function cleanDiagramSource(raw: string): string {
  if (!raw) return "";

  let clean = decodeHtmlEntities(raw).trim();

  // Strip leading backtick code fence (e.g. ```mermaid or ```plantuml or ```)
  clean = clean.replace(/^```[a-zA-Z0-9_-]*\s*\n?/, "");
  // Strip trailing backtick fence
  clean = clean.replace(/\n?```\s*$/, "");

  // Strip leading tilde fence (e.g. ~~~mermaid or ~~~)
  clean = clean.replace(/^~~~[a-zA-Z0-9_-]*\s*\n?/, "");
  // Strip trailing tilde fence
  clean = clean.replace(/\n?~~~\s*$/, "");

  return clean.trim();
}

/**
 * Heuristic detector for diagram languages if unlabelled
 */
export function detectDiagramType(
  rawContent: string,
  languageHint?: string
): "mermaid" | "plantuml" | "schema" | null {
  const lang = (languageHint || "").toLowerCase().replace(/^language-/, "").trim();

  // Explicit language matching
  if (
    lang === "mermaid" ||
    lang === "mermaid-diagram" ||
    lang === "flowchart" ||
    lang === "sequencediagram" ||
    lang === "classdiagram" ||
    lang === "statediagram" ||
    lang === "erdiagram" ||
    lang === "gantt" ||
    lang === "mindmap" ||
    lang === "gitgraph" ||
    lang === "pie" ||
    lang === "quadrantchart"
  ) {
    return "mermaid";
  }

  if (lang === "plantuml" || lang === "puml" || lang === "uml") {
    return "plantuml";
  }

  if (
    lang === "sql-schema" ||
    lang === "schema-sql" ||
    lang === "schema" ||
    lang === "db-schema" ||
    lang === "database-schema" ||
    lang === "erd" ||
    lang === "dbml"
  ) {
    return "schema";
  }

  // Heuristic detection based on content
  const cleaned = cleanDiagramSource(rawContent);
  if (!cleaned) return null;

  // Mermaid signatures
  if (
    /^(?:flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|quadrantChart|gitGraph|mindmap|timeline|zenuml|C4Context|C4Container|C4Component|C4Dynamic|C4Deployment|sankey-beta|kanban|xychart-beta|block-beta)\b/m.test(
      cleaned
    )
  ) {
    return "mermaid";
  }

  // PlantUML signatures
  if (
    /^(?:@startuml|@startmindmap|@startgantt|@startwbs|@startjson|@startyaml)\b/m.test(
      cleaned
    )
  ) {
    return "plantuml";
  }

  // SQL DDL Schema signatures
  if (/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?\w+["`]?\s*\(/i.test(cleaned)) {
    return "schema";
  }

  return null;
}

/**
 * Sequential Queue to prevent Mermaid concurrency clashes in the DOM
 */
type QueueTask<T> = () => Promise<T>;

class MermaidQueue {
  private queue: Promise<unknown> = Promise.resolve();

  enqueue<T>(task: QueueTask<T>): Promise<T> {
    const result = this.queue.then(
      () => task(),
      () => task()
    );
    this.queue = result.catch(() => {});
    return result;
  }
}

export const mermaidQueue = new MermaidQueue();

/**
 * Cleans up any stale temporary elements created by Mermaid from document.body
 */
export function cleanupMermaidDomElements(elementId?: string) {
  if (typeof document === "undefined") return;

  try {
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) el.remove();
      const dEl = document.getElementById(`d${elementId}`);
      if (dEl) dEl.remove();
    }

    // Clean any orphaned dmermaid elements or error SVGs placed in body
    const orphans = document.querySelectorAll(
      'body > div[id^="dmermaid"], body > svg[id^="dmermaid"], body > div[id^="mermaid"]'
    );
    orphans.forEach((el) => el.remove());
  } catch {
    // Ignore DOM cleanup errors
  }
}
