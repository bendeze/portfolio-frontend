import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectList } from "@/features/projects/components/project-hero-list";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <ProjectList />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
