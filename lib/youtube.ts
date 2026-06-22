import { XMLParser } from "fast-xml-parser";

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string;
  views: string; // From media:statistics if available
}

export async function getLatestYouTubeVideos(channelId: string, limit = 10): Promise<YouTubeVideo[]> {
  try {
    if (!channelId) {
      console.warn("No YouTube Channel ID provided.");
      return [];
    }

    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    // We add cache revalidation to fetch new videos periodically (every 1 hour)
    const response = await fetch(rssUrl, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      console.error(`Failed to fetch YouTube RSS feed: ${response.statusText}`);
      return [];
    }

    const xmlData = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });

    const parsed = parser.parse(xmlData);
    
    // Extract entries
    const entries = parsed?.feed?.entry || [];
    
    // If there's only one entry, it might not be an array
    const entriesArray = Array.isArray(entries) ? entries : [entries];

    const videos: YouTubeVideo[] = entriesArray.slice(0, limit).map((entry: any) => {
      const videoId = entry["yt:videoId"];
      
      return {
        id: videoId,
        title: entry.title,
        url: entry.link?.["@_href"] || `https://www.youtube.com/watch?v=${videoId}`,
        // Using maxresdefault for high quality thumbnail, fallback to hqdefault
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        publishedAt: entry.published,
        views: entry["media:group"]?.["media:community"]?.["media:statistics"]?.["@_views"] || "0"
      };
    });

    return videos;
  } catch (error) {
    console.error("Error parsing YouTube RSS feed:", error);
    return [];
  }
}
