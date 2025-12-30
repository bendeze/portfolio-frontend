import Link from "next/link";
import { cn } from "@/lib/utils";

import { ProjectCardProps } from "../types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={project.repo_link || "#"}
      target="_blank"
      className={cn("group relative flex flex-col items-center",
        "w-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl",
        "transition-shadow duration-300")}
    >
      {/* Top Avatar Image */}
      <Avatar className="-mt-12 w-24 h-24 border-4 border-white shadow-lg">
        {project.image ? (
          <AvatarImage src={project.image} alt={project.title} />
        ) : (
          <AvatarFallback>{project.title.slice(0, 2)}</AvatarFallback>
        )}
      </Avatar>

      {/* Card Content */}
      <div className="relative w-full mt-6 p-6 text-center flex flex-col items-center">
        <h3 className="text-lg font-bold">{project.title}</h3>
        <p className="text-sm line-clamp-3 mt-2">{project.description}</p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs border-white/30"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Blurred overlay for hover */}
      <div className={cn("absolute inset-0 backdrop-blur-md opacity-0",
        "group-hover:opacity-100 transition-opacity duration-300 p-6",
        "flex flex-col justify-start items-start overflow-auto rounded-2xl")}>
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
        <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap">
            {project.content}
        </div>
      </div>
    </Link>
  );
}
