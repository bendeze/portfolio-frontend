"use client";

import React, { useState, useMemo } from "react";
import {
  Database,
  Key,
  Link as LinkIcon,
  Search,
  Layers,
  GitGraph,
  Code as CodeIcon,
} from "lucide-react";
import { DiagramContainer } from "./diagram-container";
import { MermaidDiagram } from "./mermaid-diagram";
import { cleanDiagramSource } from "./diagram-utils";
import { cn } from "@/lib/utils";

export interface ColumnDefinition {
  name: string;
  type: string;
  isPrimary: boolean;
  isForeign: boolean;
  foreignTable?: string;
  foreignColumn?: string;
  isNullable: boolean;
  isUnique: boolean;
  defaultValue?: string;
}

export interface TableDefinition {
  name: string;
  columns: ColumnDefinition[];
}

export interface SchemaDiagramProps {
  code: string;
  title?: string;
  className?: string;
}

/**
 * Robust SQL DDL parser for CREATE TABLE statements
 */
export function parseSqlDdl(sql: string): TableDefinition[] {
  const tables: TableDefinition[] = [];
  const cleaned = cleanDiagramSource(sql);
  const cleanSql = cleaned.replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");

  // Match CREATE TABLE blocks
  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?([a-zA-Z0-9_]+)["`]?\s*\(([\s\S]*?)\);/gi;
  let tableMatch;

  while ((tableMatch = tableRegex.exec(cleanSql)) !== null) {
    const tableName = tableMatch[1];
    const body = tableMatch[2];

    const lines: string[] = [];
    let currentLine = "";
    let parenDepth = 0;

    for (let i = 0; i < body.length; i++) {
      const char = body[i];
      if (char === "(") parenDepth++;
      else if (char === ")") parenDepth--;

      if (char === "," && parenDepth === 0) {
        if (currentLine.trim()) lines.push(currentLine.trim());
        currentLine = "";
      } else {
        currentLine += char;
      }
    }
    if (currentLine.trim()) lines.push(currentLine.trim());

    const columns: ColumnDefinition[] = [];
    const tablePrimaryKeys: string[] = [];
    const tableForeignKeys: { col: string; refTable: string; refCol: string }[] = [];

    // Pass 1: find table-level constraints
    for (const rawLine of lines) {
      const line = rawLine.trim();
      const pkMatch = line.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)/i);
      if (pkMatch) {
        const pks = pkMatch[1]
          .split(",")
          .map((s) => s.trim().replace(/["`]/g, ""));
        tablePrimaryKeys.push(...pks);
        continue;
      }

      const fkMatch = line.match(
        /^FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+["`]?([a-zA-Z0-9_]+)["`]?\s*(?:\(([^)]+)\))?/i
      );
      if (fkMatch) {
        const col = fkMatch[1].trim().replace(/["`]/g, "");
        const refTable = fkMatch[2].trim().replace(/["`]/g, "");
        const refCol = fkMatch[3] ? fkMatch[3].trim().replace(/["`]/g, "") : "id";
        tableForeignKeys.push({ col, refTable, refCol });
        continue;
      }

      const constraintMatch = line.match(
        /^CONSTRAINT\s+["`]?\w+["`]?\s+FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+["`]?([a-zA-Z0-9_]+)["`]?\s*(?:\(([^)]+)\))?/i
      );
      if (constraintMatch) {
        const col = constraintMatch[1].trim().replace(/["`]/g, "");
        const refTable = constraintMatch[2].trim().replace(/["`]/g, "");
        const refCol = constraintMatch[3] ? constraintMatch[3].trim().replace(/["`]/g, "") : "id";
        tableForeignKeys.push({ col, refTable, refCol });
        continue;
      }
    }

    // Pass 2: parse columns
    for (const rawLine of lines) {
      const line = rawLine.trim();

      // Skip table-level constraints already handled
      if (
        /^PRIMARY\s+KEY/i.test(line) ||
        /^FOREIGN\s+KEY/i.test(line) ||
        /^CONSTRAINT/i.test(line) ||
        /^UNIQUE\s*\(/i.test(line) ||
        /^CHECK\s*\(/i.test(line)
      ) {
        continue;
      }

      const parts = line.split(/\s+/);
      if (parts.length < 2) continue;

      const colName = parts[0].replace(/["`]/g, "");
      const colType = parts[1].toUpperCase();

      const isInlinePk = /PRIMARY\s+KEY/i.test(line);
      const isPk = isInlinePk || tablePrimaryKeys.includes(colName);

      let isFk = false;
      let foreignTable: string | undefined;
      let foreignColumn: string | undefined;

      const inlineFkMatch = line.match(
        /REFERENCES\s+["`]?([a-zA-Z0-9_]+)["`]?\s*(?:\(([^)]+)\))?/i
      );
      if (inlineFkMatch) {
        isFk = true;
        foreignTable = inlineFkMatch[1];
        foreignColumn = inlineFkMatch[2] ? inlineFkMatch[2].replace(/["`]/g, "") : "id";
      } else {
        const tableFk = tableForeignKeys.find((fk) => fk.col === colName);
        if (tableFk) {
          isFk = true;
          foreignTable = tableFk.refTable;
          foreignColumn = tableFk.refCol;
        }
      }

      const isNullable = !/NOT\s+NULL/i.test(line) && !isPk;
      const isUnique = /UNIQUE/i.test(line);

      const defaultMatch = line.match(/DEFAULT\s+([^,\s)]+)/i);
      const defaultValue = defaultMatch ? defaultMatch[1] : undefined;

      columns.push({
        name: colName,
        type: colType,
        isPrimary: isPk,
        isForeign: isFk,
        foreignTable,
        foreignColumn,
        isNullable,
        isUnique,
        defaultValue,
      });
    }

    tables.push({
      name: tableName,
      columns,
    });
  }

  return tables;
}

/**
 * Generate Mermaid ER diagram syntax from TableDefinition array
 */
export function generateMermaidEr(tables: TableDefinition[]): string {
  if (tables.length === 0) return "erDiagram";

  let er = "erDiagram\n";

  // 1. Relationships
  const relations: string[] = [];
  tables.forEach((t) => {
    t.columns.forEach((c) => {
      if (c.isForeign && c.foreignTable) {
        relations.push(`    ${c.foreignTable} ||--o{ ${t.name} : "has"`);
      }
    });
  });

  if (relations.length > 0) {
    er += relations.join("\n") + "\n\n";
  }

  // 2. Tables & Fields
  tables.forEach((t) => {
    er += `    ${t.name} {\n`;
    t.columns.forEach((c) => {
      const cleanType = c.type.replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
      const keyFlag = c.isPrimary ? "PK" : c.isForeign ? "FK" : "";
      er += `        ${cleanType} ${c.name} ${keyFlag}\n`;
    });
    er += "    }\n";
  });

  return er.trim();
}

function getTypeBadgeColor(type: string) {
  const upper = type.toUpperCase();
  if (upper.includes("UUID") || upper.includes("ID") || upper.includes("SERIAL")) {
    return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
  }
  if (
    upper.includes("VARCHAR") ||
    upper.includes("TEXT") ||
    upper.includes("CHAR") ||
    upper.includes("STRING")
  ) {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  }
  if (
    upper.includes("INT") ||
    upper.includes("NUMERIC") ||
    upper.includes("DECIMAL") ||
    upper.includes("FLOAT")
  ) {
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  }
  if (upper.includes("TIME") || upper.includes("DATE")) {
    return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
  }
  if (upper.includes("BOOL")) {
    return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
  }
  if (upper.includes("JSON")) {
    return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
  }
  return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";
}

export function SchemaDiagram({
  code,
  title = "Database Schema",
  className,
}: SchemaDiagramProps) {
  const [activeTab, setActiveTab] = useState<"diagram" | "mermaid" | "code">("diagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedTable, setHighlightedTable] = useState<string | null>(null);

  const tables = useMemo(() => parseSqlDdl(code), [code]);
  const mermaidEr = useMemo(() => generateMermaidEr(tables), [tables]);

  const filteredTables = useMemo(() => {
    if (!searchQuery.trim()) return tables;
    const q = searchQuery.toLowerCase();
    return tables.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.columns.some(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.type.toLowerCase().includes(q) ||
            (c.foreignTable && c.foreignTable.toLowerCase().includes(q))
        )
    );
  }, [tables, searchQuery]);

  return (
    <DiagramContainer
      title={title}
      badge="SQL SCHEMA"
      code={code}
      icon={<Database className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />}
      className={className}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      allowZoom={activeTab !== "diagram"}
      availableTabs={[
        { id: "diagram", label: "Visual Tables", icon: <Layers className="h-3 w-3" /> },
        { id: "mermaid", label: "ER Diagram", icon: <GitGraph className="h-3 w-3" /> },
        { id: "code", label: "SQL DDL", icon: <CodeIcon className="h-3 w-3" /> },
      ]}
    >
      {activeTab === "mermaid" ? (
        <div className="w-full">
          <MermaidDiagram chart={mermaidEr} title={`${title} (ER Diagram)`} />
        </div>
      ) : activeTab === "diagram" ? (
        <div className="w-full space-y-5">
          {/* Schema Search & Stats Header */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-border/30">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">
                <strong className="text-foreground font-semibold">{tables.length}</strong>{" "}
                {tables.length === 1 ? "table" : "tables"} detected
              </span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-xs font-mono text-muted-foreground">
                <strong className="text-foreground font-semibold">
                  {tables.reduce((acc, t) => acc + t.columns.length, 0)}
                </strong>{" "}
                columns
              </span>
            </div>

            {tables.length > 1 && (
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter tables or columns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs rounded-lg border border-border/50 bg-black/[0.02] dark:bg-white/[0.02] placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
              </div>
            )}
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {filteredTables.map((table) => {
              const isTargeted = highlightedTable === table.name;

              return (
                <div
                  key={table.name}
                  id={`table-${table.name}`}
                  onMouseEnter={() => setHighlightedTable(table.name)}
                  onMouseLeave={() => setHighlightedTable(null)}
                  className={cn(
                    "rounded-md border bg-white dark:bg-zinc-900 shadow-none overflow-hidden transition-colors duration-150",
                    isTargeted
                      ? "border-blue-500 dark:border-blue-400 ring-1 ring-blue-500"
                      : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
                  )}
                >
                  {/* Table Header (Draw.io ERD Title Bar) */}
                  <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-300 dark:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <Database className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      <span className="font-mono text-xs font-bold text-foreground tracking-tight">
                        {table.name}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-700/60 border border-zinc-300/40 dark:border-zinc-600/40">
                      {table.columns.length} cols
                    </span>
                  </div>

                  {/* Columns Table */}
                  <div className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs font-mono">
                    {table.columns.map((col) => (
                      <div
                        key={col.name}
                        className="flex items-center justify-between px-3.5 py-2 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                      >
                        {/* Column Name & Key Badges */}
                        <div className="flex items-center gap-1.5 min-w-0 pr-2">
                          {col.isPrimary ? (
                            <span
                              title="Primary Key"
                              className="flex items-center text-amber-500 flex-shrink-0"
                            >
                              <Key className="h-3 w-3" />
                            </span>
                          ) : col.isForeign ? (
                            <span
                              title={`Foreign Key -> ${col.foreignTable}(${col.foreignColumn})`}
                              className="flex items-center text-cyan-500 flex-shrink-0 cursor-pointer"
                              onClick={() => setHighlightedTable(col.foreignTable || null)}
                            >
                              <LinkIcon className="h-3 w-3" />
                            </span>
                          ) : (
                            <span className="w-3 h-3 flex-shrink-0" />
                          )}

                          <span
                            className={cn(
                              "truncate",
                              col.isPrimary
                                ? "font-bold text-foreground"
                                : col.isForeign
                                ? "font-semibold text-foreground/90"
                                : "text-muted-foreground"
                            )}
                          >
                            {col.name}
                          </span>

                          {col.isForeign && col.foreignTable && (
                            <span
                              onClick={() => setHighlightedTable(col.foreignTable || null)}
                              className="cursor-pointer text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                            >
                              → {col.foreignTable}
                            </span>
                          )}
                        </div>

                        {/* Column Type & Constraints */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span
                            className={cn(
                              "px-1.5 py-0.5 rounded text-[10px] font-semibold border",
                              getTypeBadgeColor(col.type)
                            )}
                          >
                            {col.type}
                          </span>

                          {!col.isNullable && !col.isPrimary && (
                            <span
                              title="NOT NULL"
                              className="text-[9px] text-zinc-400 font-sans uppercase"
                            >
                              req
                            </span>
                          )}
                          {col.isUnique && !col.isPrimary && (
                            <span
                              title="UNIQUE"
                              className="text-[9px] text-purple-400 font-sans uppercase"
                            >
                              uniq
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTables.length === 0 && (
            <div className="py-12 text-center text-xs text-muted-foreground font-mono">
              No matching tables found for &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      ) : null}
    </DiagramContainer>
  );
}
