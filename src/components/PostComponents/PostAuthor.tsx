import { For } from "solid-js";

const PostAuthor = (props: any) => {
  const { user } = props;

  return (
    <aside class="w-full md:max-w-xs h-max p-4 border-l flex flex-col gap-4 bg-white">
      <div class="flex flex-wrap gap-4">
        <img
          src={
            user?.profilePhoto ||
            `${import.meta.env.VITE_MAIN_URI}/userNone.webp`
          }
          alt="name here"
          class="w-24 h-24 rounded-xl object-cover"
        />
        <div class="flex flex-col justify-evenly font-medium text-sm">
          <p class="text-lg">{user?.name}</p>
          <p class="text-gray-600">{user?.username}</p>
          <div class="max-w-[176px] flex items-baseline gap-1">
            <p class="font-semibold">{user?.countPosts}</p>
            <p class="text-gray-600 font-medium">Posts</p>
          </div>
          <div class="max-w-[176px] flex items-baseline gap-1">
            <p class="text-black font-semibold">{user?.countDrafts}</p>
            <p class="text-gray-600 font-medium">Drafts</p>
          </div>
        </div>
      </div>
      {user?.bio && <div class="text-gray-600">{user?.bio}</div>}
      {user?.socialLinks.length !== 0 && (
        <div class="relative flex flex-col items-center">
          <div>
            <p class="text-center text-gray-400">Other social links</p>
          </div>
          <div class="w-full grid grid-cols-2 gap-2 py-2">
            <For each={user?.socialLinks}>
              {({ platform, link }) => (
                <a
                  href={link}
                  class="p-1 rounded-md grid place-items-center bg-gray-100 text-gray-500"
                >
                  {platform}
                </a>
              )}
            </For>
          </div>
        </div>
      )}
    </aside>
  );
};

export default PostAuthor;
