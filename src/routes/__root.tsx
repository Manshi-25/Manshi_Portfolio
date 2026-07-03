
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
const SITE_URL = "https://manshichauhan.dev";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
import { SiteHeader, SiteFooter } from "../components/site-chrome";
import { ScrollProgress } from "../components/scroll-progress";
import { SmoothScroll } from "../components/smooth-scroll";
import { BackButton } from "../components/back-button";
import { CustomCursor } from "../components/cursor";
import { PageTransition } from "../components/page-transition";
import { SkipLink } from "../components/skip-link";

// SPA mode — no shellComponent, no HeadContent, no Scripts.
// Those are TanStack Start SSR-only APIs that crash in client.tsx mode.
// Meta tags are handled statically in index.html instead.

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
          <Link
            to="/home"
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-clay transition-colors"
          >
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
        <p className="mt-2 text-sm text-muted-foreground">
          Try refreshing — or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-clay transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-border bg-background px-5 py-2 text-sm hover:bg-secondary transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // No head(), no shellComponent — SPA handles this via index.html
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

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