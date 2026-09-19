import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

import { DiagramCodeDetector, MermaidDiagram, PlantUMLDiagram, SchemaDiagram } from "@/components/diagrams";

// Define your custom components (like standard HTML or your own React components)
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="text-3xl font-bold tracking-tight mt-8 mb-4" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="text-2xl font-semibold tracking-tight mt-8 mb-4" />
  ),
  p: (props: React.HTMLAttributes<HTMLHeadingElement>) => <p {...props} className="leading-7 [&:not(:first-child)]:mt-6" />,
  pre: (props: any) => <DiagramCodeDetector {...props} />,
  Mermaid: (props: any) => <MermaidDiagram chart={props.chart || props.children} {...props} />,
  PlantUML: (props: any) => <PlantUMLDiagram code={props.code || props.children} {...props} />,
  DatabaseSchema: (props: any) => <SchemaDiagram code={props.code || props.sql || props.children} {...props} />,
  SchemaViewer: (props: any) => <SchemaDiagram code={props.code || props.sql || props.children} {...props} />,
};

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [
      // This plugin adds syntax highlighting
      [
        rehypePrettyCode,
        {
          theme: "github-dark", // or 'dracula', 'one-dark-pro'
          keepBackground: false,
        },
      ],
    ],
  },
};

interface MdxContentProps {
  source: string;
}

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none font-mono text-[13px] sm:text-sm">
      {/* @ts-expect-error RSC types are still stabilizing */}
      <MDXRemote source={source} components={components} options={options} />
    </div>
  );
}