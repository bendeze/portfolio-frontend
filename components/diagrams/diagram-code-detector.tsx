"use client";

import React from "react";
import { MermaidDiagram } from "./mermaid-diagram";
import { PlantUMLDiagram } from "./plantuml-diagram";
import { SchemaDiagram } from "./schema-diagram";
import { detectDiagramType, cleanDiagramSource } from "./diagram-utils";

export interface EnhancedCodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  fallbackRenderer?: (props: { children: React.ReactNode }) => React.ReactNode;
}

/**
 * Extracts raw string content from React node children, preserving line breaks
 */
export function extractTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  
  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }
  
  if (React.isValidElement<{ children?: React.ReactNode; className?: string; "data-line"?: string }>(node)) {
    const isLine =
      typeof node.props?.className === "string" &&
      node.props.className.includes("line");
    const hasDataLine = node.props && "data-line" in node.props;

    const inner = extractTextContent(node.props?.children);
    if (isLine || hasDataLine) {
      return `${inner}\n`;
    }
    return inner;
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
  ...restProps
}: EnhancedCodeBlockProps & Record<string, any>) {
  let targetClassName = className || "";
  let rawContent = "";

  // Check language from data attributes (from rehype-pretty-code or markdown)
  const dataLang = restProps["data-language"] || restProps["data-lang"] || "";
  if (dataLang) {
    targetClassName = `${targetClassName} language-${dataLang}`;
  }

  if (React.isValidElement<{ className?: string; children?: React.ReactNode; "data-language"?: string }>(children)) {
    const childProps = children.props;
    if (childProps?.className) {
      targetClassName = `${targetClassName} ${childProps.className}`.trim();
    }
    if (childProps?.["data-language"]) {
      targetClassName = `${targetClassName} language-${childProps["data-language"]}`.trim();
    }
    rawContent = extractTextContent(childProps?.children);
  } else {
    rawContent = extractTextContent(children);
  }

  // Detect type from language tag and content signatures
  const diagramType = detectDiagramType(rawContent, targetClassName);
  const cleanedContent = cleanDiagramSource(rawContent);

  // 1. Mermaid
  if (diagramType === "mermaid") {
    return <MermaidDiagram chart={cleanedContent || rawContent} />;
  }

  // 2. PlantUML
  if (diagramType === "plantuml") {
    return <PlantUMLDiagram code={cleanedContent || rawContent} />;
  }

  // 3. Database Schema / SQL DDL
  if (diagramType === "schema") {
    return <SchemaDiagram code={cleanedContent || rawContent} />;
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
