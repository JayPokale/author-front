import { SitemapStream } from "sitemap";
import { procedure, router } from "../utils";

const sitemapRouter = router({
  sitemap: procedure.query(async () => {
    try {
      const smStream = new SitemapStream({
        hostname: import.meta.env.VITE_MAIN_URI as string,
      });

      const pages = ["disclaimer", "terms", "privacy"];
      const posts = [];
      const users = [];
      
    } catch (error) {
      console.log(error);
      return { error };
    }
  }),
});
