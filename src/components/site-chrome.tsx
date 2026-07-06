import { Link, useRouterState } from "@tanstack/react-router";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  
  { to: "/experience", label: "Experience" },
  { to: "/research", label: "Research" },
  { to: "/achievements", label: "Achievements" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * Mobile nav: a plain CSS div that slides in from the right.
 * No Radix Dialog, no focus-trap library, no backdrop-filter blur —
 * all of which were hanging low-end mobile devices.
 */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Overlay — plain opacity, no blur */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer panel — CSS transform only, GPU composited */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-background border-l border-border flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <span className="text-xs uppercase tracking-[0.25em] text-clay">Menu</span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close menu"
            className="grid place-items-center size-8 rounded-full border border-border hover:bg-secondary transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 pt-4 flex-1" aria-label="Mobile">
          {nav.map((n, i) => {
            const isActive = pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl font-serif text-2xl transition-colors ${isActive ? "text-clay bg-secondary/60" : "text-foreground/85 hover:text-clay hover:bg-secondary/60"}`}
              >
                <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-5 pb-8 pt-4 border-t border-border flex flex-col gap-3">
          <a
            href="/Manshi_Chauhan_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-full bg-clay text-background hover:bg-clay-deep transition-colors"
          >
            <Download className="size-4" /> Open resume
          </a>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a
              href="https://github.com/Manshi-25"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/manshi-chauhan-860639315/"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* No backdrop-blur on mobile — use solid background instead */}
      <header className="sticky top-0 z-40 bg-background/95 md:backdrop-blur-md md:bg-background/75 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link to="/home" className="flex items-center gap-2 group shrink-0 min-w-0">
            <span className="relative grid place-items-center size-7 rounded-full bg-gradient-to-br from-clay via-plum to-mustard shrink-0">
              <span className="font-serif text-background text-sm leading-none">m</span>
            </span>
            <span className="font-serif text-base sm:text-lg tracking-tight truncate">
              Manshi Chauhan
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm" aria-label="Primary">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="link-underline text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{
                  className: "link-underline text-foreground",
                  "aria-current": "page",
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/Manshi_Chauhan_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs px-3.5 py-2 rounded-full bg-clay text-background hover:bg-clay-deep transition-colors"
            >
              <Download className="size-3.5" /> Resume
            </a>
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="md:hidden grid place-items-center size-9 rounded-full border border-border bg-card hover:bg-secondary transition-colors"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 sm:mt-32 border-t border-border/60 relative overflow-hidden">
      <div className="blob bg-clay/30 size-72 -bottom-32 -left-20" />
      <div className="blob bg-plum/20 size-64 -bottom-24 right-10" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-12 sm:py-14 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-serif text-xl sm:text-2xl mb-2">Let's talk.</div>
          <p className="text-muted-foreground max-w-xs">
            Always open to interesting problems, internships and research chats.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-clay mb-1">Elsewhere</span>
          <a
            href="https://github.com/Manshi-25"
            target="_blank"
            rel="noreferrer"
            className="link-underline w-fit"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/manshi-chauhan-860639315/"
            target="_blank"
            rel="noreferrer"
            className="link-underline w-fit"
          >
            LinkedIn ↗
          </a>
          <a href="mailto:manshi25chauhan@gmail.com" className="link-underline w-fit">
            Email ↗
          </a>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <span className="text-xs uppercase tracking-widest text-clay mb-1">New Delhi, IN</span>
          <span className="text-muted-foreground">
            © {new Date().getFullYear()} — Manshi Chauhan
          </span>
        </div>
      </div>
    </footer>
  );
}