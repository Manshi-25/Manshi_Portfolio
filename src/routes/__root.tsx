import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
//import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter } from "../components/site-chrome";
import { ScrollProgress } from "../components/scroll-progress";
import { SmoothScroll } from "../components/smooth-scroll";
import { BackButton } from "../components/back-button";
import { CustomCursor } from "../components/cursor";
import { AmbientBackground } from "../components/floating-lines-background";
import { PageTransition } from "../components/page-transition";
import { SkipLink } from "../components/skip-link";

const SITE_URL = "https://manshichauhan.dev";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-8xl">404</h1>
        <h2 className="mt-4 text-xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has wandered off.
        </p>
        <div className="mt-6">
          <Link to="/home" className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-clay transition-colors">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl">Something broke</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing — or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-clay transition-colors"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border bg-background px-5 py-2 text-sm hover:bg-secondary transition-colors">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Manshi Chauhan — AI/ML Engineer & Full-Stack Developer" },
      { name: "description", content: "Portfolio of Manshi Chauhan — B.Tech AI/ML undergraduate building full-stack and ML systems. Research, projects, and writing." },
      { name: "author", content: "Manshi Chauhan" },
      { property: "og:title", content: "Manshi Chauhan — AI/ML Engineer & Full-Stack Developer" },
      { property: "og:description", content: "Research, projects and writing from an AI/ML undergraduate building thoughtful software." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "Manshi Chauhan" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Manshi Chauhan — AI/ML Engineer & Full-Stack Developer" },
      { name: "twitter:description", content: "Research, projects and writing from an AI/ML undergraduate building thoughtful software." },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "theme-color", content: "#c76c42" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t = 'dark';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLanding = pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <SkipLink />
      <CustomCursor />
      
      {!isLanding && <SmoothScroll />}
      {!isLanding && <ScrollProgress />}
      {!isLanding && <SiteHeader />}
      {!isLanding && <BackButton />}
      <main id="main-content" className={isLanding ? "" : "min-h-[60vh]"}>
        {isLanding ? (
          <Outlet />
        ) : (
          <PageTransition pathname={pathname}>
            <Outlet />
          </PageTransition>
        )}
      </main>
      {!isLanding && <SiteFooter />}
    </QueryClientProvider>
  );
}
