import postRouter from "./routers/post.router";
import { sitemapRouter } from "./routers/sitemap.router";
import { userRouter } from "./routers/user.router";
import { router } from "./utils";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  sitemap: sitemapRouter,
});

export type AppRouter = typeof appRouter;
