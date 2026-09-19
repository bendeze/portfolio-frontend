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
      fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, Menlo, Monaco, Consolas, monospace",
      theme: "base",
      themeCSS: `
        *, *::before, *::after, rect, circle, path, polygon, g, .node, .cluster, .label, .label-container {
          filter: none !important;
          box-shadow: none !important;
          text-shadow: none !important;
          drop-shadow: none !important;
          -webkit-filter: none !important;
        }
        .node rect, .node circle, .node polygon, .node path, .node ellipse {
          fill: transparent !important;
          stroke: ${isDark ? "#52525b" : "#a1a1aa"} !important;
          stroke-width: 1px !important;
          stroke-dasharray: none !important;
          rx: 4px !important;
          ry: 4px !important;
        }
        .node:hover rect, .node:hover circle, .node:hover polygon, .node:hover path {
          stroke: #ebcb00 !important;
        }
        .node .label {
          color: ${isDark ? "#f4f4f5" : "#0f172a"} !important;
          fill: ${isDark ? "#f4f4f5" : "#0f172a"} !important;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, Menlo, monospace !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          text-shadow: none !important;
        }
        .node .label text, .node text {
          fill: ${isDark ? "#f4f4f5" : "#0f172a"} !important;
        }
        .edgePath path.path, .flowchart-link, path.flowchart-link, .edge-thickness-normal {
          stroke: ${isDark ? "#71717a" : "#94a3b8"} !important;
          stroke-width: 1px !important;
          fill: none !important;
        }
        marker path, .marker, marker[id*="arrowhead"] path, marker[id*="crosshead"] path {
          fill: ${isDark ? "#71717a" : "#94a3b8"} !important;
          stroke: ${isDark ? "#71717a" : "#94a3b8"} !important;
        }
        .cluster rect {
          fill: transparent !important;
          stroke: ${isDark ? "#3f3f46" : "#cbd5e1"} !important;
          stroke-width: 1px !important;
          stroke-dasharray: 4 4 !important;
          rx: 6px !important;
        }
        .labelBkg, .edgeLabel rect {
          fill: transparent !important;
          stroke: transparent !important;
        }
        .edgeLabel {
          color: ${isDark ? "#a1a1aa" : "#64748b"} !important;
          fill: ${isDark ? "#a1a1aa" : "#64748b"} !important;
          font-size: 11px !important;
        }
      `,
      flowchart: {
        htmlLabels: true,
        useMaxWidth: true,
        curve: "basis",
      },
      themeVariables: isDark
        ? {
            darkMode: true,
            background: "transparent",
            primaryColor: "transparent",
            primaryTextColor: "#f4f4f5",
            primaryBorderColor: "#52525b",
            lineColor: "#71717a",
            secondaryColor: "transparent",
            tertiaryColor: "transparent",
            nodeBorder: "#52525b",
            clusterBkg: "transparent",
            clusterBorder: "#3f3f46",
            defaultLinkColor: "#71717a",
            titleColor: "#fafafa",
            edgeLabelBackground: "transparent",
            actorBkg: "transparent",
            actorBorder: "#52525b",
            actorTextColor: "#f4f4f5",
            actorLineColor: "#71717a",
            signalColor: "#f4f4f5",
            signalTextColor: "#f4f4f5",
            labelBoxBkgColor: "transparent",
            labelBoxBorderColor: "#52525b",
            labelTextColor: "#f4f4f5",
          }
        : {
            darkMode: false,
            background: "transparent",
            primaryColor: "transparent",
            primaryTextColor: "#0f172a",
            primaryBorderColor: "#a1a1aa",
            lineColor: "#94a3b8",
            secondaryColor: "transparent",
            tertiaryColor: "transparent",
            nodeBorder: "#a1a1aa",
            clusterBkg: "transparent",
            clusterBorder: "#cbd5e1",
            defaultLinkColor: "#94a3b8",
            titleColor: "#0f172a",
            edgeLabelBackground: "transparent",
            actorBkg: "transparent",
            actorBorder: "#a1a1aa",
            actorTextColor: "#0f172a",
            actorLineColor: "#94a3b8",
            signalColor: "#0f172a",
            signalTextColor: "#0f172a",
            labelBoxBkgColor: "transparent",
            labelBoxBorderColor: "#a1a1aa",
            labelTextColor: "#0f172a",
          },
    });

    diagramCounter += 1;
    const uniqueId = `mermaid_diag_${Date.now()}_${diagramCounter}`;

    const { svg } = await mermaid.render(uniqueId, code);

    // Clean inline max-width so diagram fits container responsively
    // and strip any filter defs, filter attributes, or drop-shadows
    const cleanSvg = svg
      .replace(/style="max-width:\s*[^"]+;?"/i, "")
      .replace(/<filter[\s\S]*?<\/filter>/gi, "")
      .replace(/\s*filter="[^"]*"/gi, "")
      .replace(/\s*filter='[^']*'/gi, "")
      .replace(/filter:[^;"]+;?/gi, "");

    setCachedMermaidSvg(code, isDark, cleanSvg);
    return cleanSvg;
  });
}
