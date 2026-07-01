import { Link } from "@tanstack/react-router";
import { Download, Menu } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
const srOnly = "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0";

const nav = [
  { to: "/home", label: "Index" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/resume", label: "Resume" },
  { to: "/research", label: "Research" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 h-14 sm:h-16 flex items-center justify-between gap-3">
        <Link to="/home" className="flex items-center gap-2 group shrink-0 min-w-0">
          <span className="relative grid place-items-center size-7 rounded-full bg-gradient-to-br from-clay via-plum to-mustard shrink-0">
            <span className="font-serif text-background text-sm leading-none">m</span>
          </span>
          <span className="font-serif text-base sm:text-lg tracking-tight truncate">Manshi Chauhan</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-underline text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "link-underline text-foreground", "aria-current": "page" }}
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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="md:hidden grid place-items-center size-9 rounded-full border border-border bg-card hover:bg-secondary transition-colors"
              >
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0 border-l border-border bg-background">
              <SheetTitle className={srOnly}>Navigation</SheetTitle>
              <SheetDescription className={srOnly}>Site navigation menu</SheetDescription>
              <div className="relative h-full p-6 pt-12 flex flex-col">
                <div className="blob bg-clay/30 size-56 -top-10 -right-10" />
                <div className="blob bg-plum/20 size-48 bottom-10 -left-10" />
                <p className="relative text-xs uppercase tracking-[0.25em] text-clay mb-6">Menu</p>
                <nav className="relative flex flex-col gap-1" aria-label="Mobile">
                  {nav.map((n, i) => (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="group relative px-3 py-3 rounded-xl font-serif text-2xl text-foreground/85 hover:text-clay hover:bg-secondary/60 transition-all"
                      activeProps={{ className: "text-clay bg-secondary/60", "aria-current": "page" }}
                    >
                      <span className="text-xs font-mono text-muted-foreground mr-3 align-middle" aria-hidden="true">0{i + 1}</span>
                      {n.label}
                    </Link>
                  ))}
                </nav>
                <a
                  href="/Manshi_Chauhan_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="relative mt-8 inline-flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-full bg-clay text-background hover:bg-clay-deep transition-colors"
                >
                  <Download className="size-4" /> Open resume
                </a>
                <div className="relative mt-auto pt-8 text-xs text-muted-foreground">
                  <a href="https://github.com/Manshi-25" target="_blank" rel="noreferrer" className="block link-underline w-fit">GitHub ↗</a>
                  <a href="https://www.linkedin.com/in/manshi-chauhan" target="_blank" rel="noreferrer" className="block mt-2 link-underline w-fit">LinkedIn ↗</a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
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
          <a href="https://github.com/Manshi-25" target="_blank" rel="noreferrer" className="link-underline w-fit">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/manshi-chauhan" target="_blank" rel="noreferrer" className="link-underline w-fit">LinkedIn ↗</a>
          <a href="mailto:manshi25chauhan@gmail.com" className="link-underline w-fit">Email ↗</a>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <span className="text-xs uppercase tracking-widest text-clay mb-1">New Delhi, IN</span>
          <span className="text-muted-foreground">© {new Date().getFullYear()} — Manshi Chauhan</span>
        </div>
      </div>
    </footer>
  );
}
