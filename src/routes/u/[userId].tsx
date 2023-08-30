import { createEffect, createSignal } from "solid-js";
import { useParams } from "solid-start";
import Navbar from "~/components/Navbar";
import UserPosts from "~/components/UserProfile/UserPosts";
import UserStats from "~/components/UserProfile/UserStats";
import { client } from "~/utils/client";

const GetUserFromId = () => {
  const userId = useParams().userId;
  const [userData, setUserData] = createSignal<any>();
  const [userPosts, setUserPosts] = createSignal<any>();
  const [Error, setError] = createSignal(false);

  createEffect(async () => {
    const [userResponse, postsResponse]: any[] = await Promise.all([
      client.user.getTargetedUserDataFromId.query({ userId }),
      client.post.getTargetedUserPostsFromId.query({
        userId,
        start: 0,
        end: 10,
      }),
    ]);
    if (!userResponse.success) setError(true);
    setUserData(userResponse?.user);
    setUserPosts(postsResponse?.posts);
  });

  return (
    <>
      <Navbar />
      {Error() ? (
        <div class="w-full mx-auto bg-gray-50 min-h-[calc(100vh-48px)]">
          <div class="p-12 text-2xl text-gray-400 font-semibold italic flex justify-center gap-4">
            <p>User not found</p>
          </div>
        </div>
      ) : (
        <main class="w-full bg-gray-50 min-h-[calc(100vh-48px)] flex flex-col md:flex-row md:justify-center gap-4 px-2 py-4">
          {userData() ? <UserStats user={userData()} /> : <UserStats />}
          {userData() && userPosts() ? (
            <UserPosts
              countPosts={userData()?.countposts}
              posts={userPosts()}
            />
          ) : (
            <UserPosts />
          )}
        </main>
      )}
    </>
  );
};

export default GetUserFromId;
