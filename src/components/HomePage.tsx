import { createEffect, createSignal } from "solid-js";
import { A } from "solid-start";
import { User } from "~/root";

const HomePage = () => {
  const [i, setI] = createSignal(0);
  const [windowActive, setWindowActive] = createSignal(true);
  const [curUser, setCurUser] = createSignal<any>();

  createEffect(() => setCurUser(User()));

  createEffect(() => {
    window.addEventListener("focus", () => {
      setWindowActive(true);
    });
    window.addEventListener("blur", () => {
      setWindowActive(false);
    });
    setInterval(() => {
      windowActive() && setI((i() + 1) % 3);
    }, 2000);
  });

  return (
    <main class="max-w-screen-2xl flex flex-col items-center mx-auto gap-12 py-12">
      <div
        class="flex flex-col items-center text-4xl 2xs:text-5xl xs:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        style={{ "font-family": "Signika" }}
      >
        <p class="drop-shadow-md hidden sm:block">EVERYTHING IS ABOUT</p>
        <p class="drop-shadow-md sm:hidden text-center">
          EVERYTHING
          <br />
          IS ABOUT
        </p>
        <div class="relative w-64 sm:w-80 h-max md:h-24 overflow-hidden">
          <span class="select-none">&nbsp;</span>
          <div
            class={`absolute top-0 h-max md:h-24 w-64 sm:w-80 grid place-items-center ${
              i() === 0
                ? "translate-y-32"
                : i() === 1
                ? "translate-y-0 duration-1000"
                : "-translate-y-32 duration-1000"
            }`}
          >
            <div>THINK</div>
          </div>
          <div
            class={`absolute top-0 h-max md:h-24 w-64 sm:w-80 grid place-items-center ${
              i() === 1
                ? "translate-y-32"
                : i() === 2
                ? "translate-y-0 duration-1000"
                : "-translate-y-32 duration-1000"
            }`}
          >
            <div>CREATE</div>
          </div>
          <div
            class={`absolute top-0 h-max md:h-24 w-64 sm:w-80 grid place-items-center ${
              i() === 2
                ? "translate-y-32"
                : i() === 0
                ? "translate-y-0 duration-1000"
                : "-translate-y-32 duration-1000"
            }`}
          >
            <div>EARN</div>
          </div>
        </div>
      </div>
      <h1 class="max-w-6xl text-center text-lg text-gray-600">
        Our goal is to provide an modern way of blogging where people will write
        there articles on will be published on Search Engines. We are going to
        simplify bloging journey for new blogger. We provide a faster website,
        server side rendering, automation of your content hosting. We used
        modern generation web technologies to increse your Google ranking and
        provide significantly higher earning.
      </h1>
      <div class="flex gap-8 flex-col sm:flex-row">
        <A href={`${import.meta.env.VITE_CMS_URI}/write`}>
          <button
            class="w-60 py-2 rounded-lg bg-black text-white"
            style={{ "box-shadow": "0 4px 14px rgb(0 0 0 / 30%)" }}
          >
            Create Post
          </button>
        </A>
        <A href={`/u/${curUser()?.userId}`}>
          <button
            class="w-60 py-2 rounded-lg bg-white"
            style={{ "box-shadow": "0 4px 14px rgb(0 0 0 / 10%)" }}
          >
            Profile
          </button>
        </A>
      </div>
    </main>
  );
};

export default HomePage;
