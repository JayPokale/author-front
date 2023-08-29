import { Suspense, createEffect, createSignal } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  useLocation,
} from "solid-start";
import "./root.css";
import { Toaster } from "solid-toast";
import { client } from "./utils/client";

export const [loadingState, setLoadingState] = createSignal<boolean>(false);
export const [User, setUser] = createSignal<any>(null);

export default function Root() {
  const location = useLocation();
  createEffect(() => {
    if (!location.pathname.startsWith("/post/"))
      document.getElementsByTagName("article")?.[0]?.remove();
  });

  createEffect(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res: any = await client.user.getUser.query(token);
      if (res.success) {
        setUser({
          name: res.name,
          username: res.username,
          userId: res.userId,
          bio: res.bio,
          profilePhoto: res.profilePhoto,
          socialLinks: res.socialLinks,
          countPosts: res.countPosts,
          countDrafts: res.countDrafts,
        });
      }
    }
  });

  return (
    <Html lang="en">
      <Head>
        <Title>AuthorsLog</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${
            import.meta.env.VITE_GOOGLE_ANALYTICS
          }`}
        />
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${import.meta.env.VITE_GOOGLE_ANALYTICS}');
          `}
        </script>
      </Head>
      <Body>
        <Suspense>
          {loadingState() && (
            <div class="w-screen h-screen fixed grid place-items-center bg-black/25 backdrop-blur-[2px] z-50">
              <div class="w-16 h-16 rounded-full border-4 border-t-white border-white/20 animate-spin" />
            </div>
          )}
          <Toaster position="bottom-right" gutter={8} />
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
