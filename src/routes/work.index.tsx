import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";
import { useSpotlight } from "@/hooks/use-spotlight";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Manshi Chauhan" },
      { name: "description", content: "Projects and internships — full-stack apps and ML models." },
      { property: "og:title", content: "Work — Manshi Chauhan" },
      { property: "og:description", content: "Selected projects." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://manshichauhan.dev/work` },
      { property: "og:image", content: "https://manshichauhan.dev/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Work — Manshi Chauhan" },
      { name: "twitter:description", content: "Selected projects." },
      { name: "twitter:image", content: "https://manshichauhan.dev/og-image.png" },
    ],
    links: [{ rel: "canonical", href: `https://manshichauhan.dev/work` }],
  }),
  component: Work,
});

function Work() {
  const onSpotlight = useSpotlight();
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-6 md:px-10 py-14 sm:py-20 md:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-clay mb-5 sm:mb-6">— Selected Work</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
          Things I've <span className="italic text-clay">built</span>.
        </h1>
      </Reveal>

      <div className="mt-12 sm:mt-20 space-y-5 sm:space-y-7">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              aria-label={`View case study: ${p.title}, ${p.role}, ${p.year}`}
              onMouseMove={onSpotlight}
              className="spotlight group relative block rounded-2xl border border-border bg-card overflow-hidden hover:border-clay/60 hover:shadow-2xl hover:shadow-clay/10 transition-all"
            >
              {/* visual band with project image */}
              <div className={`relative h-44 sm:h-56 overflow-hidden ${p.accent}`}>
                <motion.img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute inset-0 grain opacity-25" />
                <div className="absolute inset-0 flex items-end justify-between px-5 sm:px-8 pb-3 sm:pb-4">
                  <span className="font-serif text-5xl sm:text-7xl text-background/80 drop-shadow leading-none select-none">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-foreground/80 bg-background/70 backdrop-blur px-2.5 py-1 rounded-full">{p.year}</span>
                </div>
                <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              <div className="p-5 sm:p-8 grid sm:grid-cols-[1fr_auto] gap-4 items-start">
                <div className="min-w-0">
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-1.5">{p.title}</h2>
                  <div className="text-xs sm:text-sm text-clay mb-3">{p.role}</div>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-clay sm:self-end">
                  Read case
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-12 sm:mt-20 rounded-2xl border border-dashed border-border p-7 sm:p-10 text-center">
        <p className="text-sm sm:text-base text-muted-foreground">More experiments live on GitHub.</p>
        <a
          href="https://github.com/Manshi-25"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 sm:px-6 sm:py-3 text-sm hover:bg-clay transition-colors"
        >
          <Github className="size-4" /> @Manshi-25 <ArrowUpRight className="size-4" />
        </a>
      </Reveal>
    </div>
  );
}
