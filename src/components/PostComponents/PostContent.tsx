import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { format } from "timeago.js";

const PostContent = (props: any) => {
  const { post } = props;
  const delta = JSON.parse(post.content);
  const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
  const html = converter.convert();

  return (
    <main class="w-full px-4">
      <div class="w-full py-4 border-b flex gap-3">
        <img
          src={
            post?.user_id?.profilePhoto ||
            `${import.meta.env.VITE_MAIN_URI}/userNone.webp`
          }
          alt="name here"
          class="w-12 h-12 rounded-full"
        />
        <div class="flex flex-col justify-evenly">
          <p class="text-sm">{post?.user_id?.name}</p>
          <p class="text-xs text-gray-600">{post?.user_id?.bio || <br />}</p>
        </div>
      </div>
      <article class="py-4">
        <h1
          class="text-2xl font-bold pb-2"
          style={{ "font-family": "Raleway, sans-serif" }}
        >
          {post?.title}
        </h1>
        <p class="text-right text-xs text-gray-500">
          {format(post?.createdAt)}
        </p>
        <div
          class="text-justify space-y-4 py-4 text-lg"
          style={{ "font-family": "Inter" }}
          innerHTML={html}
        />
      </article>
    </main>
  );
};

export default PostContent;
