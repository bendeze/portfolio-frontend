/**
 * Utility functions for robust diagram rendering, caching, and code sanitization
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
  const hint = (languageHint || "").toLowerCase();

  // Explicit language matching in class names or data-language
  if (
    hint.includes("mermaid") ||
    hint.includes("flowchart") ||
    hint.includes("sequencediagram") ||
    hint.includes("classdiagram") ||
    hint.includes("statediagram") ||
    hint.includes("erdiagram") ||
    hint.includes("gantt") ||
    hint.includes("mindmap") ||
    hint.includes("gitgraph") ||
    hint.includes("quadrantchart")
  ) {
    return "mermaid";
  }

  if (
    hint.includes("plantuml") ||
    hint.includes("puml") ||
    hint.includes("uml")
  ) {
    return "plantuml";
  }

  if (
    hint.includes("sql-schema") ||
    hint.includes("schema-sql") ||
    hint.includes("db-schema") ||
    hint.includes("database-schema") ||
    hint.includes("dbml") ||
    hint.includes("erd") ||
    hint.includes("schema")
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
 * Global SVG cache: avoids re-rendering when theme or state toggles
 */
const mermaidSvgCache = new Map<string, string>();

export function getCachedMermaidSvg(code: string, isDark: boolean): string | undefined {
  const key = `${isDark ? "dark" : "light"}::${code}`;
  return mermaidSvgCache.get(key);
}

export function setCachedMermaidSvg(code: string, isDark: boolean, svg: string): void {
  const key = `${isDark ? "dark" : "light"}::${code}`;
  mermaidSvgCache.set(key, svg);
}

let diagramCounter = 0;

/**
 * Render Mermaid code to SVG safely through sequential queue with caching
 */
export async function renderMermaidSafely(
  code: string,
  isDark: boolean
): Promise<string> {
  const cached = getCachedMermaidSvg(code, isDark);
  if (cached) {
    return cached;
  }

  return mermaidQueue.enqueue(async () => {
    // Check cache again in case another job just resolved it
    const doubleCheck = getCachedMermaidSvg(code, isDark);
    if (doubleCheck) return doubleCheck;

    const mermaid = (await import("mermaid")).default;

    mermaid.initialize({
      startOnLoad: false,
      suppressErrorRendering: true,
      securityLevel: "loose",
      fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      fontSize: 12,
      theme: isDark ? "dark" : "neutral",
      flowchart: {
        htmlLabels: true,
        useMaxWidth: true,
        curve: "basis",
        padding: 6,
        nodeSpacing: 16,
        rankSpacing: 20,
      },
      sequence: {
        diagramMarginX: 20,
        diagramMarginY: 10,
        actorMargin: 30,
        width: 120,
        height: 40,
        boxMargin: 6,
        boxTextMargin: 4,
        noteMargin: 6,
        messageMargin: 20,
        mirrorActors: false,
        bottomMarginAdj: 1,
        useMaxWidth: true,
      },
      themeVariables: isDark
        ? {
            darkMode: true,
            background: "transparent",
            mainBkg: "#161b22",
            nodeBorder: "#30363d",
            nodeTextColor: "#e6edf3",
            lineColor: "#8b949e",
            textColor: "#e6edf3",
            clusterBkg: "#0d1117",
            clusterBorder: "#30363d",
            fontSize: "12px",
            fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          }
        : {
            darkMode: false,
            background: "transparent",
            mainBkg: "#ffffff",
            nodeBorder: "#d0d7de",
            nodeTextColor: "#1f2328",
            lineColor: "#656d76",
            textColor: "#1f2328",
            clusterBkg: "#f6f8fa",
            clusterBorder: "#d0d7de",
            fontSize: "12px",
            fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          },
    });

    diagramCounter += 1;
    const uniqueId = `mermaid_diag_${Date.now()}_${diagramCounter}`;

    const { svg } = await mermaid.render(uniqueId, code);

    // Strip unnecessary filter defs/shadows while preserving natural max-width
    const cleanSvg = svg
      .replace(/<filter[\s\S]*?<\/filter>/gi, "")
      .replace(/\s*filter="[^"]*"/gi, "")
      .replace(/\s*filter='[^']*'/gi, "")
      .replace(/filter:[^;"]+;?/gi, "");

    setCachedMermaidSvg(code, isDark, cleanSvg);
    return cleanSvg;
  });
}
