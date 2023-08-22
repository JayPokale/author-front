import { createSignal } from "solid-js";
import { useLocation } from "solid-start";
import Navbar from "~/components/Navbar";
import OtherUserPosts from "~/components/UserProfile/OtherUser/OtherUserPosts";
import OtherUserStats from "~/components/UserProfile/OtherUser/OtherUserStats";
import { client } from "~/utils/client";

const OtherUser = () => {
  const userId = useLocation().pathname.slice(6);
  const [userData, setUserData] = createSignal<any>();
  const [userPosts, setUserPosts] = createSignal<any>();
  const [Error, setError] = createSignal(false);

  (async () => {
    const [userResponse, postsResponse]: any[] = await Promise.all([
      client.user.getTargetedUserData.query({ userId }),
      client.post.getTargetedUserPosts.query({
        userId,
        start: 0,
        end: 10,
      }),
    ]);
    if (!userResponse.success) setError(true);
    setUserData(userResponse?.user);
    setUserPosts(postsResponse?.posts);
  })();

  return Error() ? (
    <>
      <Navbar />
      <div class="w-full mx-auto bg-gray-50 min-h-[calc(100vh-48px)]">
        <div class="p-12 text-2xl text-gray-400 font-semibold italic flex justify-center gap-4">
          <p>User not found</p>
        </div>
      </div>
    </>
  ) : (
    <>
      <Navbar />
      <main class="w-full bg-gray-50 min-h-[calc(100vh-48px)] flex flex-col md:flex-row md:justify-center gap-4 px-2 py-4">
        {userData() ? <OtherUserStats user={userData()} /> : <OtherUserStats />}
        {userData() && userPosts() ? (
          <OtherUserPosts
            countPosts={userData()?.countposts}
            posts={userPosts()}
          />
        ) : (
          <OtherUserPosts />
        )}
      </main>
    </>
  );
};

export default OtherUser;
