import { A } from "@solidjs/router";
import { For, createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { format } from "timeago.js";
import { User } from "~/root";
import { client } from "~/utils/client";

const ListofDraftPosts = (props: any) => {
  const [drafts, setDrafts] = createSignal([]);
  const [draftsLoading, setDraftsLoading] = createSignal(false);

  const loadDrafts = async () => {
    setDraftsLoading(true);
    const data: any = await client.post.getDraftPosts.query({
      token: localStorage.getItem("token") as string,
      start: drafts().length,
      end: drafts().length + 10,
    });
    if (data.success) setDrafts((prev) => prev.concat(data?.drafts));
    setDraftsLoading(false);
  };
  if (!isServer) loadDrafts();

  return (
    <aside
      class="max-w-3xl w-full h-max rounded-md p-4 flex flex-col gap-4 bg-white"
      style={{
        "box-shadow": "0 0 0 1px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 5%)",
      }}
    >
      <div class="flex gap-4">
        <button
          class="py-2 px-12 rounded-md text-gray-500 hover:text-black"
          onclick={() => props.setIsActivePosts(true)}
        >
          Posts
        </button>
        <button class="py-2 px-12 rounded-md bg-gray-100">Drafts</button>
      </div>
      <div class="flex flex-col">
        {User()?.countDrafts === 0 ? (
          <div class="flex justify-center text-3xl italic font-semibold py-8 text-gray-400">
            No Drafts Yet
          </div>
        ) : drafts()?.length ? (
          <For each={drafts()}>
            {(draft: any) => (
              <div class="w-full py-2">
                <A
                  href={`${import.meta.env.VITE_CMS_URI}/edit/${draft.postId}`}
                  class="w-full p-4 flex justify-between items-center cursor-pointer bg-gray-100/50 hover:bg-gray-100 rounded-md"
                >
                  <h3 class="w-3/4 text-ellipsis line-clamp-1">
                    {draft.title}
                  </h3>
                  <div class="flex items-center">
                    <p class="text-sm text-gray-500">
                      {format(draft.createdAt)}
                    </p>
                  </div>
                </A>
              </div>
            )}
          </For>
        ) : (
          <div class="grid place-items-center">
            <div class="w-16 h-16 rounded-full border-2 border-t-black/50 border-black/5 animate-spin" />
          </div>
        )}
      </div>
      {User()?.countDrafts > drafts()?.length && !draftsLoading() && (
        <div class="grid place-items-center">
          <button
            class="py-1 px-4 rounded-md text-gray-500 bg-gray-100"
            onclick={loadDrafts}
          >
            Load More
          </button>
        </div>
      )}
    </aside>
  );
};

export default ListofDraftPosts;
