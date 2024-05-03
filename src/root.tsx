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
import { pageview } from "./utils/gtag";

export const [loadingState, setLoadingState] = createSignal<number>(0);
export const [User, setUser] = createSignal<any>(null);

export default function Root() {
  const location = useLocation();
  createEffect(() => {
    pageview(location.pathname);
    if (!location.pathname.startsWith("/p/"))
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
        <Meta
          name="google-site-verification"
          content="NXkJYbvbpwPo5QDbzYHdetmKxNmQC4a8_5Sw7HwMU5g"
        />
        <Meta name="google-adsense-account" content="ca-pub-4594992880793314" />
      </Head>
      <Body>
        <Suspense>
          {loadingState() > 0 && (
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
        <script
          defer
          src="https://www.googletagmanager.com/gtag/js?id=G-C4YE76G9VN"
        />
        <script defer>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${import.meta.env.VITE_GOOGLE_ANALYTICS}');
          `}
        </script>
        <script
          defer
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4594992880793314"
        />
        <Scripts />
      </Body>
    </Html>
  );
}
