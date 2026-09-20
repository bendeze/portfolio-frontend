"use client";

import React, { useState, useMemo } from "react";
import {
  Database,
  Key,
  Link as LinkIcon,
  Search,
  Layers,
  Code as CodeIcon,
} from "lucide-react";
import { DiagramContainer } from "./diagram-container";
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

  // Match all CREATE TABLE statements (with or without semicolons, with varying spacing)
  const createTableSplits = cleanSql.split(/(?=CREATE\s+TABLE\b)/i);

  for (const block of createTableSplits) {
    const headerMatch = block.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?([a-zA-Z0-9_]+)["`]?\s*\(/i);
    if (!headerMatch) continue;

    const tableName = headerMatch[1];
    const startIndex = block.indexOf("(") + 1;
    const lastParenIndex = block.lastIndexOf(")");
    if (startIndex <= 0 || lastParenIndex <= startIndex) continue;

    const body = block.substring(startIndex, lastParenIndex);

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
        /^(?:CONSTRAINT\s+["`]?\w+["`]?\s+)?FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+["`]?([a-zA-Z0-9_]+)["`]?\s*(?:\(([^)]+)\))?/i
      );
      if (fkMatch) {
        const col = fkMatch[1].trim().replace(/["`]/g, "");
        const refTable = fkMatch[2].trim().replace(/["`]/g, "");
        const refCol = fkMatch[3] ? fkMatch[3].trim().replace(/["`]/g, "") : "id";
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
  const [activeTab, setActiveTab] = useState<"diagram" | "code">("diagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedTable, setHighlightedTable] = useState<string | null>(null);

  const tables = useMemo(() => parseSqlDdl(code), [code]);

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
      onTabChange={(tab) => setActiveTab(tab as "diagram" | "code")}
      allowZoom={false}
      availableTabs={[
        { id: "diagram", label: "Visual Tables", icon: <Layers className="h-3 w-3" /> },
        { id: "code", label: "SQL DDL", icon: <CodeIcon className="h-3 w-3" /> },
      ]}
    >
      <div className="w-full space-y-5">
          {/* Schema Search & Stats Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b-[0.5px] border-zinc-200/60 dark:border-zinc-800/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-foreground">
                Tables Overview
              </span>
              <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border-[0.5px] border-zinc-200 dark:border-zinc-800">
                {tables.length} {tables.length === 1 ? "entity" : "entities"}
              </span>
            </div>

            {tables.length > 1 && (
              <div className="relative w-full sm:w-52">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter tables or columns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs rounded border-[0.5px] border-zinc-300/80 dark:border-zinc-800 bg-transparent placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-[#ebcb00]"
                />
              </div>
            )}
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
            {filteredTables.map((table) => {
              const isTargeted = highlightedTable === table.name;

              return (
                <div
                  key={table.name}
                  id={`table-${table.name}`}
                  onMouseEnter={() => setHighlightedTable(table.name)}
                  onMouseLeave={() => setHighlightedTable(null)}
                  className={cn(
                    "rounded border-[0.5px] bg-transparent shadow-none overflow-hidden transition-colors duration-150",
                    isTargeted
                      ? "border-[#ebcb00] ring-1 ring-[#ebcb00]"
                      : "border-zinc-300/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                  )}
                >
                  {/* Table Header */}
                  <div className="flex items-center justify-between px-3 py-1.5 bg-transparent border-b-[0.5px] border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-1.5">
                      <Database className="h-3 w-3 text-[#ebcb00]" />
                      <span className="font-mono text-xs font-bold text-foreground tracking-tight">
                        {table.name}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-muted-foreground px-1 py-0.2 rounded bg-zinc-100 dark:bg-zinc-900 border-[0.5px] border-zinc-200 dark:border-zinc-800">
                      {table.columns.length} cols
                    </span>
                  </div>

                  {/* Columns Table */}
                  <div className="divide-y-[0.5px] divide-zinc-200/50 dark:divide-zinc-800/50 text-xs font-mono">
                    {table.columns.map((col) => (
                      <div
                        key={col.name}
                        className="flex items-center justify-between px-3 py-1 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                      >
                        {/* Column Name & Key Badges */}
                        <div className="flex items-center gap-1 min-w-0 pr-2">
                          {col.isPrimary ? (
                            <span
                              title="Primary Key"
                              className="flex items-center text-[#ebcb00] flex-shrink-0"
                            >
                              <Key className="h-2.5 w-2.5" />
                            </span>
                          ) : col.isForeign ? (
                            <span
                              title={`Foreign Key -> ${col.foreignTable}(${col.foreignColumn})`}
                              className="flex items-center text-[#ebcb00] flex-shrink-0 cursor-pointer"
                              onClick={() => setHighlightedTable(col.foreignTable || null)}
                            >
                              <LinkIcon className="h-2.5 w-2.5" />
                            </span>
                          ) : (
                            <span className="w-2.5 h-2.5 flex-shrink-0" />
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
                              className="cursor-pointer text-[9px] px-1 py-0.2 rounded bg-[#ebcb00]/10 text-[#ebcb00] border-[0.5px] border-[#ebcb00]/20 hover:bg-[#ebcb00]/20 transition-colors"
                            >
                              → {col.foreignTable}
                            </span>
                          )}
                        </div>

                        {/* Column Type & Constraints */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span
                            className={cn(
                              "px-1 py-0.2 rounded text-[9px] font-semibold border-[0.5px] bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                            )}
                          >
                            {col.type}
                          </span>

                          {!col.isNullable && !col.isPrimary && (
                            <span
                              title="NOT NULL"
                              className="text-[9px] text-zinc-400 font-mono uppercase"
                            >
                              req
                            </span>
                          )}
                          {col.isUnique && !col.isPrimary && (
                            <span
                              title="UNIQUE"
                              className="text-[9px] text-purple-400 font-mono uppercase"
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
    </DiagramContainer>
  );
}
