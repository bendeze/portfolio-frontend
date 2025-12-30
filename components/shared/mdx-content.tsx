import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

// Define your custom components (like standard HTML or your own React components)
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="text-3xl font-bold tracking-tight mt-8 mb-4" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="text-2xl font-semibold tracking-tight mt-8 mb-4" />
  ),
  p: (props: React.HTMLAttributes<HTMLHeadingElement>) => <p {...props} className="leading-7 [&:not(:first-child)]:mt-6" />,
  // Add more as needed (ul, ol, li, code, etc.)
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
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      {/* @ts-expect-error RSC types are still stabilizing */}
      <MDXRemote source={source} components={components} options={options} />
    </div>
  );
}