import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "@/components/reveal";
import { PhotoOrFallback } from "@/components/photo-or-fallback";
import { projectBySlug, projects, type Project } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): Project => {
    const project = projectBySlug(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Manshi Chauhan` },
          { name: "description", content: loaderData.tagline },
          { property: "og:title", content: `${loaderData.title} — Manshi Chauhan` },
          { property: "og:description", content: loaderData.tagline },
          { property: "og:type", content: "article" },
          {
            property: "og:url",
            content: `https://manshi-chauhan.vercel.app/projects/${loaderData.slug}`,
          },
          { property: "og:image", content: "https://manshi-chauhan.vercel.app/og-image.png" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: `${loaderData.title} — Manshi Chauhan` },
          { name: "twitter:description", content: loaderData.tagline },
          { name: "twitter:image", content: "https://manshi-chauhan.vercel.app/og-image.png" },
        ]
      : [],
    links: loaderData
      ? [
          {
            rel: "canonical",
            href: `https://manshi-chauhan.vercel.app/projects/${loaderData.slug}`,
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl mb-4">Project not found</h1>
      <Link to="/projects" className="link-underline text-clay">
        Back to projects
      </Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const p = Route.useLoaderData() as Project;
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock page scroll while the lightbox is open so the background
  // doesn't scroll behind it on mobile.
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <div className="relative">
      <div className={`blob ${p.accent} size-[28rem] -top-20 -right-32 animate-float`} />
      <div className="blob bg-sky/20 size-80 top-96 -left-32 animate-float" />

      <article className="relative mx-auto max-w-4xl px-5 sm:px-6 md:px-10 py-10 sm:py-16 md:py-24">
        <Reveal>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm px-3.5 py-2 rounded-full border border-border bg-card hover:border-clay/60 hover:text-clay transition-all mb-8 sm:mb-10"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> Back
            to all projects
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-widest text-clay mb-4 sm:mb-6">
            <span>{p.year}</span>
            <span className="size-1 rounded-full bg-clay/60" />
            <span>{p.role}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
            {p.title}
          </h1>
          {p.headline && (
            <p className="mt-5 sm:mt-7 font-serif italic text-xl sm:text-2xl md:text-3xl text-clay/90 text-balance max-w-3xl leading-snug">
              "{p.headline}"
            </p>
          )}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {p.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden border border-border shadow-xl shadow-clay/10"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(p.image)}
              className="block w-full group cursor-zoom-in"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                width={1280}
                height={720}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>
            <div className="absolute inset-0 grain opacity-20 pointer-events-none" />
          </motion.div>
        </Reveal>

        {p.gallery && p.gallery.length > 0 && (
          <Reveal delay={0.14} className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {p.gallery.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="relative rounded-xl overflow-hidden border border-border bg-card aspect-[4/3]"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedImage(src)}
                    className="block size-full group cursor-zoom-in"
                  >
                    <PhotoOrFallback
                      src={src}
                      alt={`${p.title} screenshot ${i + 1}`}
                      label={`Add ${src.split("/").pop()}`}
                      fit="contain"
                      className="transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm hover:bg-clay transition-colors"
            >
              <ExternalLink className="size-4" /> Live site
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm hover:bg-secondary transition-colors"
          >
            <Github className="size-4" /> Source
          </a>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <div className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary text-foreground/80"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-clay mb-4">Overview</h2>
          <p className="text-lg leading-relaxed text-foreground/90">{p.overview}</p>
        </Reveal>

        {selectedImage &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 md:p-10"
              onClick={() => setSelectedImage(null)}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 grid place-items-center size-9 sm:size-10 rounded-full bg-background/90 border border-border hover:bg-secondary transition-colors"
              >
                <X className="size-4 sm:size-5" />
              </button>
              <img
                src={selectedImage}
                alt={p.title}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] max-w-[92vw] sm:max-w-[90vw] w-auto h-auto object-contain rounded-2xl border border-border bg-card shadow-2xl"
              />
            </div>,
            document.body,
          )}

        {(p.purpose || p.need || p.myRole) && (
          <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2">
            {p.purpose && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-clay/60 transition-colors"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-clay mb-3">Purpose</div>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                  {p.purpose}
                </p>
              </motion.div>
            )}
            {p.need && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-plum/60 transition-colors"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-plum mb-3">
                  The need
                </div>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{p.need}</p>
              </motion.div>
            )}
            {p.myRole && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-2 rounded-2xl border-l-4 border-clay bg-card p-6"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-clay mb-3">My role</div>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                  {p.myRole}
                </p>
              </motion.div>
            )}
          </div>
        )}

        <Reveal delay={0.3} className="mt-14">
          <h2 className="text-xs uppercase tracking-[0.2em] text-clay mb-6">What it does</h2>
          <ul className="space-y-3">
            {p.features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex gap-4 items-start"
              >
                <span className="mt-2 size-1.5 rounded-full bg-clay shrink-0" />
                <span className="text-foreground/85">{f}</span>
              </motion.li>
            ))}
          </ul>
        </Reveal>

        {p.challenges && (
          <Reveal delay={0.35} className="mt-14">
            <h2 className="text-xs uppercase tracking-[0.2em] text-clay mb-6">Hard parts</h2>
            <ul className="space-y-3">
              {p.challenges.map((c) => (
                <li key={c} className="flex gap-4 items-start">
                  <span className="mt-2 size-1.5 rounded-full bg-plum shrink-0" />
                  <span className="text-foreground/85">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal
          delay={0.4}
          className="mt-16 sm:mt-20 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6"
        >
          <div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Next
            </div>
            <div className="font-serif text-xl sm:text-2xl">{next.title}</div>
          </div>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group inline-flex items-center gap-2 self-start rounded-full bg-clay text-background px-5 py-2.5 sm:py-3 text-sm hover:bg-clay-deep transition-colors"
          >
            Continue
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </article>
    </div>
  );
}