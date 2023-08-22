import { A } from "@solidjs/router";
import { For } from "solid-js";

const OtherUserStats = (props: any) => {
  return (
    <aside
      class="w-full md:max-w-xs h-max rounded-md p-4 flex flex-col gap-4 bg-white"
      style={{
        "box-shadow": "0 0 0 1px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 5%)",
      }}
    >
      {props.user ? (
        <>
          <div class="flex flex-wrap gap-4">
            <img
              src={
                props.user?.profilePhoto ||
                `${import.meta.env.VITE_MAIN_URI}/userNone.webp`
              }
              alt="name here"
              class="w-24 h-24 rounded-xl object-cover"
            />
            <div class="flex flex-col justify-evenly font-medium text-sm">
              <p class="text-lg">{props.user?.name}</p>
              <p class="text-gray-600">{props.user?.username}</p>
              <div class="max-w-[176px] flex items-baseline gap-1">
                <p class="font-semibold">{props.user?.countPosts}</p>
                <p class="text-gray-600 font-medium">Posts</p>
              </div>
              <div class="max-w-[176px] flex items-baseline gap-1">
                <p class="text-black font-semibold">
                  {props.user?.countDrafts}
                </p>
                <p class="text-gray-600 font-medium">Drafts</p>
              </div>
            </div>
          </div>
          {props.user?.bio && (
            <div class="text-gray-600">{props.user?.bio}</div>
          )}
          {props.user?.socialLinks?.length && (
            <div class="relative flex flex-col items-center">
              <div>
                <p class="text-center text-gray-400">Other social links</p>
              </div>
              <div class="w-full grid grid-cols-2 gap-2 py-2">
                <For each={props.user?.socialLinks}>
                  {({ platform, link }) => (
                    <A
                      href={link}
                      class="p-1 rounded-md grid place-items-center bg-gray-100 text-gray-500"
                    >
                      {platform}
                    </A>
                  )}
                </For>
              </div>
            </div>
          )}
        </>
      ) : (
        <div class="grid place-items-center">
          <div class="w-16 h-16 rounded-full border-2 border-t-black/50 border-black/5 animate-spin" />
        </div>
      )}
    </aside>
  );
};

export default OtherUserStats;
