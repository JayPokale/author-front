import { SitemapStream, streamToPromise } from "sitemap";
import { procedure, router } from "../utils";
import userModel from "../schemas/user.model";
import postModel from "../schemas/post.model";
import { Readable } from "stream";

export const sitemapRouter = router({
  sitemap: procedure.query(async () => {
    try {
      const smStream = new SitemapStream({
        hostname: import.meta.env.VITE_MAIN_URI as string,
      });

      const pages = ["/disclaimer", "/terms", "/privacy"];
      const posts = await postModel
        .find({ draft: false })
        .select("-_id postId title");
      const users = await userModel.find().select("-_id userId");

      const links: { url: string; changefreq: string; priority?: number }[] =
        [];

      links.push({
        url: `/`,
        changefreq: "daily",
        priority: 1,
      });

      pages.forEach((page) =>
        links.push({ url: page, changefreq: "monthly", priority: 0.3 })
      );

      users.forEach((user) =>
        links.push({
          url: `/u/${user.name}`,
          changefreq: "weekly",
          priority: 0.7,
        })
      );

      posts.forEach((post) =>
        links.push({
          url: `/p/${post.postId}/${post.title
            .split(" ")
            .slice(0, 11)
            .join("-")}`,
          changefreq: "daily",
          priority: 0.9,
        })
      );

      return streamToPromise(Readable.from(links).pipe(smStream)).then((data) =>
        data.toString()
      );
    } catch (error) {
      console.log(error);
      return { error };
    }
  }),
});
