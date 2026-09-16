"use client";

import React from "react";
import { MermaidDiagram } from "./mermaid-diagram";
import { PlantUMLDiagram } from "./plantuml-diagram";
import { SchemaDiagram } from "./schema-diagram";

export interface EnhancedCodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  fallbackRenderer?: (props: { children: React.ReactNode }) => React.ReactNode;
}

/**
 * Extracts raw string content from React node children
 */
export function extractTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractTextContent).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractTextContent(node.props?.children);
  }
  return "";
}

/**
 * Detects diagram code blocks (Mermaid, PlantUML, SQL Schema) and renders the appropriate interactive diagram.
 * For regular code snippets, falls back cleanly to the standard CodeBlock.
 */
export function DiagramCodeDetector({
  children,
  className,
  fallbackRenderer,
}: EnhancedCodeBlockProps) {
  let targetClassName = className || "";
  let rawContent = "";

  if (React.isValidElement<{ className?: string; children?: React.ReactNode }>(children)) {
    const childProps = children.props;
    if (childProps?.className) {
      targetClassName = `${targetClassName} ${childProps.className}`.trim();
    }
    rawContent = extractTextContent(childProps?.children);
  } else {
    rawContent = extractTextContent(children);
  }

  const normalizedLang = (targetClassName || "")
    .replace(/^language-/, "")
    .toLowerCase()
    .trim();

  // 1. Mermaid
  if (normalizedLang === "mermaid") {
    return <MermaidDiagram chart={rawContent} />;
  }

  // 2. PlantUML
  if (
    normalizedLang === "plantuml" ||
    normalizedLang === "puml" ||
    normalizedLang === "uml"
  ) {
    return <PlantUMLDiagram code={rawContent} />;
  }

  // 3. Database Schema / SQL DDL
  if (
    normalizedLang === "sql-schema" ||
    normalizedLang === "schema-sql" ||
    normalizedLang === "schema" ||
    normalizedLang === "db-schema" ||
    normalizedLang === "erd" ||
    normalizedLang === "dbml"
  ) {
    return <SchemaDiagram code={rawContent} />;
  }

  // 4. Fallback to standard CodeBlock
  if (fallbackRenderer) {
    return fallbackRenderer({ children });
  }

  return (
    <pre className={className}>
      <code>{children}</code>
    </pre>
  );
}
