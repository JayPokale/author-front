import { Title, createRouteData, useParams, useRouteData } from "solid-start";
import { HttpStatusCode } from "solid-start/server";
import Navbar from "~/components/Navbar";
import PostAuthor from "~/components/PostComponents/PostAuthor";
import PostContent from "~/components/PostComponents/PostContent";
import { setLoadingState } from "~/root";
import { client } from "~/utils/client";

export function routeData() {
  return createRouteData(async () => {
    const postId = useParams().postId;
    const result: any = await client.post.fetchPost.query({ postId });
    return {
      success: result.success,
      html: result.success ? (
        <article class="max-w-screen-2xl mx-auto flex justify-center">
          <div class="w-full max-w-2xl">
            <PostContent post={result.post} />
          </div>
          <div class="w-80 top-14 sticky h-max hidden lg:block">
            <PostAuthor user={result.post.user_id} />
          </div>
        </article>
      ) : (
        <article class="w-full mx-auto bg-gray-50 min-h-[calc(100vh-48px)]">
          <div class="p-12 text-2xl text-gray-400 font-semibold italic flex justify-center gap-4">
            <p>Post not found</p>
          </div>
        </article>
      ),
    };
  });
}

const Article = () => {
  const post: any = useRouteData();
  setLoadingState(false);

  return (
    <>
      <Navbar />
      <Title>Post</Title>
      <HttpStatusCode code={post()?.success ? 200 : 404} />
      {post()?.html}
    </>
  );
};

export default Article;
