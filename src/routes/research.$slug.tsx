import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { paperBySlug, papers, type Paper } from "@/lib/research";

export const Route = createFileRoute("/research/$slug")({
  loader: ({ params }): Paper => {
    const paper = paperBySlug(params.slug);
    if (!paper) throw notFound();
    return paper;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Manshi Chauhan` },
          { name: "description", content: loaderData.abstract.slice(0, 155) },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.abstract.slice(0, 155) },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `https://manshi-chauhan.vercel.app/research/${loaderData.slug}` },
          { property: "og:image", content: "https://manshi-chauhan.vercel.app/og-image.png" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: loaderData.title },
          { name: "twitter:description", content: loaderData.abstract.slice(0, 155) },
          { name: "twitter:image", content: "https://manshi-chauhan.vercel.app/og-image.png" },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `https://manshi-chauhan.vercel.app/research/${loaderData.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl mb-4">Paper not found</h1>
      <Link to="/research" className="link-underline text-clay">Back to research</Link>
    </div>
  ),
  component: PaperDetail,
});

function PaperDetail() {
  const p = Route.useLoaderData() as Paper;
  const idx = papers.findIndex((x) => x.slug === p.slug);
  const next = papers[(idx + 1) % papers.length];

  return (
    <div className="relative">
      <div className={`blob ${p.accent} size-[28rem] -top-20 -right-32 animate-float`} />
      <div className="blob bg-sage/20 size-80 top-96 -left-32 animate-float" />

      <article className="relative mx-auto max-w-3xl px-5 sm:px-6 md:px-10 py-10 sm:py-16 md:py-24">
        <Reveal>
          <Link
            to="/research"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm px-3.5 py-2 rounded-full border border-border bg-card hover:border-clay/60 hover:text-clay transition-all mb-8 sm:mb-10"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> Back to all research
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-clay mb-4 sm:mb-6">{p.status}</div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-[1.05] tracking-tight text-balance">
            {p.title}
          </h1>
          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">{p.venue}</div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-2">
          {p.tags.map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-foreground/80">{t}</span>
          ))}
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.linkLabel ?? "View paper"} (opens in a new tab)`}
              className="group inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-clay/40 text-clay hover:bg-clay/10 transition-colors"
            >
              {p.linkLabel ?? "View paper"}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </Reveal>

        <Reveal delay={0.2} className="mt-14">
          <h2 className="text-xs uppercase tracking-[0.2em] text-clay mb-4">Abstract</h2>
          <p className="text-lg leading-relaxed text-foreground/90">{p.abstract}</p>
        </Reveal>

        <Reveal delay={0.25} className="mt-12">
          <h2 className="text-xs uppercase tracking-[0.2em] text-clay mb-6">Contributions</h2>
          <ul className="space-y-3">
            {p.contributions.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex gap-4 items-start"
              >
                <span className="mt-2 size-1.5 rounded-full bg-clay shrink-0" />
                <span className="text-foreground/85">{c}</span>
              </motion.li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <h2 className="text-xs uppercase tracking-[0.2em] text-clay mb-6">Methods</h2>
          <div className="flex flex-wrap gap-2">
            {p.methods.map((m) => (
              <span key={m} className="text-sm px-3 py-1.5 rounded-lg border border-border bg-card">{m}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.35} className="mt-14">
          <div className="rounded-2xl border-l-4 border-clay bg-card p-8">
            <div className="text-xs uppercase tracking-widest text-clay mb-3">Takeaway</div>
            <p className="font-serif text-xl md:text-2xl leading-snug">{p.takeaway}</p>
          </div>
        </Reveal>

        <Reveal delay={0.4} className="mt-12 sm:mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mb-1">Next paper</div>
            <div className="font-serif text-lg sm:text-xl">{next.title}</div>
          </div>
          <Link
            to="/research/$slug"
            params={{ slug: next.slug }}
            className="group inline-flex items-center gap-2 self-start rounded-full bg-clay text-background px-5 py-2.5 sm:py-3 text-sm hover:bg-clay-deep transition-colors shrink-0"
          >
            Read
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </article>
    </div>
  );
}
