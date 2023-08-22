import { createSignal } from "solid-js";
import Navbar from "~/components/Navbar";
import CurUserStats from "~/components/UserProfile/CurUser/CurUserStats";
import ListofActivePosts from "~/components/UserProfile/CurUser/ListofActivePosts";
import ListofDraftPosts from "~/components/UserProfile/CurUser/ListofDraftPosts";

const Home = () => {
  const [isActivePosts, setIsActivePosts] = createSignal(true);

  return (
    <>
      <Navbar />
      <main class="w-full bg-gray-50 min-h-[calc(100vh-48px)] flex flex-col md:flex-row md:justify-center gap-4 px-2 py-4">
        <CurUserStats />
        {isActivePosts() ? (
          <ListofActivePosts setIsActivePosts={setIsActivePosts} />
        ) : (
          <ListofDraftPosts setIsActivePosts={setIsActivePosts} />
        )}
      </main>
    </>
  );
};

export default Home;
