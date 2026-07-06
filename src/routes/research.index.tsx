import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText, BookOpen, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, useState, type MouseEvent } from "react";
import { Reveal } from "@/components/reveal";
import { PhotoOrFallback } from "@/components/photo-or-fallback";
import { papers } from "@/lib/research";
import { useSpotlight } from "@/hooks/use-spotlight";

export const Route = createFileRoute("/research/")({
  head: () => ({
    meta: [
      { title: "Research Manshi Chauhan" },
      {
        name: "description",
        content: "Publications on optimization, generative AI, and adversarial ML.",
      },
      { property: "og:title", content: "Research Manshi Chauhan" },
      { property: "og:description", content: "Publications and book chapters." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://manshi-chauhan.vercel.app/research` },
      { property: "og:image", content: "https://manshi-chauhan.vercel.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Research Manshi Chauhan" },
      { name: "twitter:description", content: "Publications and book chapters." },
      { name: "twitter:image", content: "https://manshi-chauhan.vercel.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: `https://manshi-chauhan.vercel.app/research` }],
  }),
  component: Research,
});

function Research() {
  const onSpotlight = useSpotlight();
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement | null>(null);

  // Scroll-linked timeline rail: the gradient line "draws itself in" as
  // you scroll past the list, giving the page a sense of progress
  // through the body of work instead of a static stack of cards.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-6 md:px-10 py-14 sm:py-20 md:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-clay mb-5 sm:mb-6 inline-flex items-center gap-2">
          <Sparkles className="size-3.5" aria-hidden="true" /> Research
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
          On machines <span className="italic text-clay">that learn</span>.
        </h1>
        <p className="mt-5 sm:mt-6 text-sm sm:text-base text-muted-foreground max-w-lg">
          {papers.length} published works spanning adversarial security, generative AI and applied
          deep learning explore the abstract, methods and core takeaway from each.
        </p>
      </Reveal>

      <div ref={listRef} className="mt-12 sm:mt-20 relative">
        {/* scroll-drawn timeline rail running behind the stacked cards */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: reduceMotion ? 1 : railScale }}
          className="hidden sm:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-clay via-plum to-mustard origin-top"
        />

        <div className="space-y-6 sm:space-y-10">
          {papers.map((p, i) => (
            <PaperCard key={p.slug} paper={p} index={i} onSpotlight={onSpotlight} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PaperCard({
  paper: p,
  index: i,
  onSpotlight,
}: {
  paper: (typeof papers)[number];
  index: number;
  onSpotlight: (e: MouseEvent<HTMLElement>) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const offset = i % 2 === 0;
  const isPublished = p.status.toLowerCase().includes("published");
  const isBookChapter = p.status.toLowerCase().includes("book");

  return (
    <motion.div
      initial={{ opacity: 0, x: offset ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative sm:max-w-[92%] ${offset ? "sm:ml-0" : "sm:ml-auto"}`}
    >
      {/* numbered node sitting on the scroll rail */}
      <div
        aria-hidden="true"
        className={`hidden sm:flex absolute -top-1 ${offset ? "-left-[2.05rem]" : "-right-[2.05rem]"} size-8 items-center justify-center rounded-full border border-border bg-background text-[10px] font-mono text-muted-foreground`}
      >
        {String(i + 1).padStart(2, "0")}
      </div>

      <Link
        to="/research/$slug"
        params={{ slug: p.slug }}
        aria-label={`Read paper: ${p.title}, ${p.status}, ${p.venue}`}
        onMouseMove={onSpotlight}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="spotlight group block relative rounded-2xl border border-border bg-card p-6 sm:p-9 hover:border-clay/60 hover:shadow-2xl hover:shadow-plum/10 transition-all overflow-hidden"
      >
        <div
          className={`absolute -top-24 ${offset ? "-right-24" : "-left-24"} size-60 rounded-full ${p.accent} blur-3xl opacity-50 group-hover:opacity-90 transition-opacity`}
        />
        <div
          className={`absolute top-0 ${offset ? "left-0" : "right-0"} h-full w-1 bg-gradient-to-b from-plum via-clay to-mustard scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500`}
        />

        <div className="relative">
          <div className="relative rounded-xl overflow-hidden aspect-[21/9] sm:aspect-[3/1] mb-4 sm:mb-6 border border-border">
            <PhotoOrFallback
              src={p.images?.[0] ?? `/research/${p.slug}-1.jpg`}
              alt={p.title}
              label="Add a photo"
              fit="contain"
            />
          </div>

          <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-clay">
              <motion.span
                animate={{ rotate: hovered ? 360 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex"
              >
                {isBookChapter ? (
                  <BookOpen className="size-3.5" aria-hidden="true" />
                ) : (
                  <FileText className="size-3.5" aria-hidden="true" />
                )}
              </motion.span>
              <span className="inline-flex items-center gap-1.5">
                {isPublished && (
                  <span className="relative flex size-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-clay" />
                  </span>
                )}
                {p.status}
              </span>
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-clay group-hover:rotate-45 transition-all shrink-0" />
          </div>

          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl leading-snug mb-2 sm:mb-3 text-balance">
            {p.title}
          </h2>
          <div className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{p.venue}</div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-1">
            {p.tags.map((t, ti) => (
              <motion.span
                key={t}
                initial={false}
                animate={{ y: hovered ? -1 : 0 }}
                transition={{ duration: 0.3, delay: ti * 0.04 }}
                className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground/70"
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* abstract preview slides open on hover/focus instead of
              cluttering the default card view, so the stack stays scannable
              but a taste of the writing is one interaction away */}
          <motion.div
            initial={false}
            animate={{
              height: hovered ? "auto" : 0,
              opacity: hovered ? 1 : 0,
              marginTop: hovered ? 14 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-foreground/70 leading-relaxed border-t border-border pt-3 sm:pt-4">
              {p.abstract.slice(0, 160)}
              {p.abstract.length > 160 ? "…" : ""}
            </p>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}