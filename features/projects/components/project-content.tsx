"use client"

import { cn } from "@/lib/utils";
import { ProjectCard } from "@/features/projects/components/project-card";
import { useProjects } from "@/features/projects/hooks/use-projects";
import { ProjectSkeleton } from "@/features/projects/components/project-skeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/features/projects/utils";
import { Separator } from "@/components/ui/separator";


export default function ProjectPageContent() {
  const { data: projects, isLoading: isLoadingAll, isError } = useProjects();

  if (isLoadingAll) {
    return (
      <section className={cn("container px-12 sm:max-w-7xl sm:mx-auto py-24 space-y-20",
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8")}>
        {[...Array(3)].map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container py-24 text-center">
        <h2 className="text-xl font-semibold text-destructive">
          Failed to load projects
        </h2>
        <p className="text-muted-foreground mb-4">
          There was an issue fetching the projects. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </section>
    );
  }

  const featuredProjects = projects?.filter((p) => p.featured) || [];
  const otherProjects = projects?.filter((p) => !p.featured) || [];

  return (
    <section className="container max-w-6xl mx-auto py-24 px-4 space-y-20">
      {/* Featured Projects */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold">FEATURED PROJECTS</h1>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {featuredProjects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      <Separator />

      {/* Other Projects */}
      <div className="text-center mb-12 mt-20">
        <h1 className="text-2xl font-bold">OTHER PROJECTS</h1>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {otherProjects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
