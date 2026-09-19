import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { TechMarqueeSection } from "@/components/sections/tech-marquee";
import { PlatformsSection } from "@/components/sections/platforms";
import { BlogSection } from "@/components/sections/blog";
import { ContactSection } from "@/components/sections/contact";
import { YoutubeVideosSection } from "@/components/sections/youtube-videos";
import { getLatestYouTubeVideos } from "@/lib/youtube";
import { getAllContent } from "@/lib/content";

export default async function Home() {
  // Read latest publications (Articles + Posts) statically from local Git Markdown
  const articles = getAllContent("articles");
  const posts = getAllContent("posts");
  const publications = [...articles, ...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID || "";
  const youtubeVideos = await getLatestYouTubeVideos(youtubeChannelId, 10);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <TechMarqueeSection />
      <PlatformsSection />
      <BlogSection items={publications} />
      <YoutubeVideosSection videos={youtubeVideos} />
      <ContactSection />
    </div>
  );
}
