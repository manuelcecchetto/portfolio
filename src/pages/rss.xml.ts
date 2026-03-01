import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getBlogPosts } from "../lib/content";

const SITE_URL = "https://manuelcecchetto.it";

export const GET: APIRoute = async (context) => {
  const posts = await getBlogPosts({ includeDrafts: false });

  return rss({
    title: "Manuel Cecchetto Blog",
    description: "Writing about content systems, frontend craft, and delivery choices.",
    site: context.site ?? SITE_URL,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.data.slug}/`,
    })),
    customData: "<language>en-us</language>",
  });
};
