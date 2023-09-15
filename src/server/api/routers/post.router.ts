import { z } from "zod";
import { procedure, router } from "../utils";
import * as jwt from "jsonwebtoken";
import userModel from "../schemas/user.model";
import postModel from "../schemas/post.model";

const postRouter = router({
  getActivePosts: procedure
    .input(z.object({ token: z.string(), start: z.number(), end: z.number() }))
    .query(async ({ input }) => {
      try {
        const { _id, jwtKey } = jwt.verify(
          input.token,
          import.meta.env.VITE_JWT_SECRET
        ) as { _id: string; jwtKey: string };
        const thisUser = await userModel.findById(_id, { _id: 0, jwtKey: 1 });
        if (jwtKey !== thisUser.jwtKey) {
          return { msg: "Not a valid user", success: false, error: false };
        }

        const user = await userModel
          .findById(_id, { _id: 0, posts: 1 })
          .slice("posts", [input.start, input.end + 1])
          .populate({
            path: "posts",
            model: postModel,
            select: "title postId createdAt -_id",
          });
        return { posts: user?.posts, success: true, error: false };
      } catch (error) {
        console.log(error);
        return { error };
      }
    }),

  getTargetedUserPostsFromId: procedure
    .input(z.object({ userId: z.string(), start: z.number(), end: z.number() }))
    .query(async ({ input }) => {
      try {
        const res = await userModel
          .findOne({ userId: input.userId }, { _id: 0, posts: 1, blocked: 1 })
          .slice("posts", [input.start, input.end + 1])
          .populate({
            path: "posts",
            model: postModel,
            select: "title postId createdAt -_id",
          });
        return res.blocked
          ? { msg: "Some error occured", success: false, error: false }
          : { posts: res.posts, success: true, error: false };
      } catch (error) {
        console.log(error);
        return { error };
      }
    }),

  fetchPost: procedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      try {
        const post: any = await postModel
          .findOne(
            { postId: input.postId },
            {
              user_id: 1,
              draft: 1,
              title: 1,
              content: 1,
              createdAt: 1,
              _id: 0,
            }
          )
          .populate({
            path: "user_id",
            model: userModel,
            select:
              "name username blocked bio profilePhoto socialLinks countPosts",
          });
        if (!post || post.draft || post.user_id.blocked) {
          return { msg: "Post not found", success: false, error: false };
        }
        return { post, success: true, error: false };
      } catch (error) {
        console.log(error);
        return { error };
      }
    }),
});

export default postRouter;
