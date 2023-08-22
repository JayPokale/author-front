import { createSignal } from "solid-js";
import Footer from "~/components/Footer";
import HomePage from "~/components/HomePage";
import Navbar from "~/components/Navbar";

export const [isActivePosts, setIsActivePosts] = createSignal(true);

const Home = () => {
  return (
    <>
      <Navbar />
      <main class="w-full flex flex-col md:flex-row md:justify-center gap-4 px-2 py-4">
        <HomePage />
      </main>
      <Footer />
    </>
  );
};

export default Home;
