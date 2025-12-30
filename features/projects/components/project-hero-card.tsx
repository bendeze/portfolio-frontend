"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

import { Project } from "../schemas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PinContainer } from "@/components/ui/3d-pin";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const Wrapper = project.featured ? PinContainer : "div";

  return (
    <div className="relative w-full">
      <Wrapper
        {...(project.featured && project.demo_link
          ? { title: "View Project", href: project.demo_link, containerClassName: "h-[24rem] w-[20rem]" }
          : {})}
      >
        <div className="flex flex-col overflow-hidden rounded-2xl bg-background shadow-sm hover:shadow-lg transition-shadow duration-200 h-full">
          
          {/* Image */}
          <div className="relative aspect-video bg-muted">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold">{project.title}</h3>
              {project.featured && (
                <Badge variant="secondary" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mt-1">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-[10px]">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-2 pt-2">
              {project.demo_link && (
                <Button
                  size="sm"
                  asChild
                  className="transition-transform hover:scale-105"
                >
                  <Link href={project.demo_link} target="_blank">
                    <ExternalLink className="mr-1 h-4 w-4" />
                    Demo
                  </Link>
                </Button>
              )}
              {project.repo_link && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="transition-transform hover:scale-105"
                >
                  <Link href={project.repo_link} target="_blank">
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
