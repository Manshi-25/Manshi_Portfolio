import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Code2, Brain, Compass, User, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PhotoOrFallback } from "@/components/photo-or-fallback";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Manshi Chauhan" },
      {
        name: "description",
        content: "AI/ML undergrad and full-stack developer based in New Delhi.",
      },
      { property: "og:title", content: "About Manshi Chauhan" },
      { property: "og:description", content: "Story and skills." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://manshi-chauhan.me/about` },
      { property: "og:image", content: "https://manshi-chauhan.me/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Manshi Chauhan" },
      { name: "twitter:description", content: "Story and skills." },
      { name: "twitter:image", content: "https://manshi-chauhan.me/og-image.png" },
    ],
    links: [{ rel: "canonical", href: `https://manshi-chauhan.me/about` }],
  }),
  component: About,
});

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const subNav = [
  { id: "about-me", label: "About Me", icon: User },
  { id: "skills", label: "Skills", icon: Sparkles },
] as const;

const skillGroups = [
  {
    title: "Engineer",
    icon: Code2,
    bar: "bg-clay",
    chip: "bg-clay/15 text-clay",
    label: "text-clay",
    items: ["MERN", "Next.js", "TypeScript", "REST APIs", "Java"],
  },
  {
    title: "AI · ML",
    icon: Brain,
    bar: "bg-plum",
    chip: "bg-plum/15 text-plum",
    label: "text-plum",
    items: ["PyTorch", "TensorFlow", "Deep Learning", "Agents"],
  },
  {
    title: "Curious about",
    icon: Compass,
    bar: "bg-sage",
    chip: "bg-sage/15 text-sage",
    label: "text-sage",
    items: ["Web3", "Cryptography", "Tableau", "Excel"],
  },
];

const toolkit = [
  {
    group: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
    accent: "clay",
  },
  {
    group: "Frameworks",
    items: ["Next.js", "React", "Node.js", "Express", "PyTorch"],
    accent: "plum",
  },
  { group: "AI / ML", items: ["Deep Learning", "Agents", "Optimization", "NLP"], accent: "sage" },
  { group: "Tools", items: ["MongoDB", "Git", "Vercel", "Tableau"], accent: "mustard" },
];

const toolkitAccentMap: Record<string, { dot: string; text: string; ring: string }> = {
  clay: { dot: "bg-clay", text: "text-clay", ring: "ring-clay/30" },
  plum: { dot: "bg-plum", text: "text-plum", ring: "ring-plum/30" },
  sage: { dot: "bg-sage", text: "text-sage", ring: "ring-sage/30" },
  mustard: { dot: "bg-mustard", text: "text-mustard", ring: "ring-mustard/30" },
};

const education = [
  {
    school: "Vivekananda Institute of Professional Studies",
    detail: "B.Tech AI & ML · CGPA 9.1",
    years: "2023 – 2027",
  },
  { school: "SKV No.1", detail: "Class XII · 86.2%", years: "2022 – 2023" },
  { school: "GGSSS No.1", detail: "Class X · 94.4%", years: "2020 – 2021" },
];

/* ------------------------------------------------------------------ */
/*  Sticky sub-nav with scroll-spy                                      */
/* ------------------------------------------------------------------ */

function AboutSubNav() {
  const [active, setActive] = useState<string>(subNav[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = subNav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="sticky top-14 sm:top-16 z-30 px-5 sm:px-6 md:px-10 py-3 mb-4 bg-background/90 backdrop-blur-md border-b border-border/60">
      <nav className="flex flex-wrap gap-2" aria-label="About sections">
        {subNav.map((n) => {
          const Icon = n.icon;
          const isActive = active === n.id;
          return (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(n.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm border transition-colors ${
                isActive
                  ? "bg-clay text-background border-clay"
                  : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-clay/50"
              }`}
            >
              <Icon className="size-3.5" />
              {n.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="blob bg-mustard/30 size-72 sm:size-96 top-10 -right-32 animate-float" />
      <div className="blob bg-plum/25 size-60 sm:size-72 top-[40rem] -left-20 animate-float" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 md:px-10 py-14 sm:py-20 md:py-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-clay mb-5 sm:mb-6">— About</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
            Builder by day,{" "}
            <span className="italic bg-gradient-to-r from-clay to-plum bg-clip-text text-transparent">
              researcher by night
            </span>
            .
          </h1>
        </Reveal>

        <AboutSubNav />

        {/* ---------------- About Me ---------------- */}
        <section id="about-me" className="scroll-mt-32 sm:scroll-mt-36">
          <Reveal delay={0.1} className="grid gap-8 sm:gap-10 md:grid-cols-[1fr_1.3fr] items-start">
            {/* Photo collage — drop your images at /public/profile-1.jpg, profile-2.jpg, profile-3.jpg */}
            <div className="relative mx-auto md:mx-0 w-full max-w-xs">
              <div className="relative rounded-[2rem] overflow-hidden border border-border bg-card aspect-[4/5] shadow-lg shadow-clay/10">
                <PhotoOrFallback
                  src="/profile-1.jpg"
                  alt="Manshi Chauhan"
                  label="Add profile-1.jpg"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 size-24 sm:size-28 rounded-2xl overflow-hidden border-4 border-background bg-card shadow-xl"
              >
                <PhotoOrFallback src="/profile-2.jpeg" alt="Manshi Chauhan" label="profile-2.jpg" />
              </motion.div>
              <div className="absolute -top-4 -left-4 size-14 rounded-full bg-gradient-to-br from-clay via-plum to-mustard grid place-items-center text-background font-serif text-lg shadow-md">
                m
              </div>
            </div>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm <span className="text-foreground">Manshi Chauhan</span> an AI &amp; ML
                enthusiast, full-stack developer, and published researcher, currently in my final
                year of B.Tech.
              </p>
              <p>
                I turn ideas into <span className="text-foreground">intelligent systems</span> and
                complex problems into clean solutions. I live at the intersection of curiosity and
                execution I ask big questions, and then go build the answers.
              </p>
              
            </div>
          </Reveal>

          {/* Education staircase cards */}
          <Reveal delay={0.2} className="mt-14 sm:mt-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">Education</h2>
            <div className="grid gap-3 sm:gap-4">
              {education.map((e, i) => (
                <motion.div
                  key={e.school}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ marginLeft: `${i * 12}px` }}
                  className="group relative rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/40 p-5 sm:p-6 hover:border-clay/60 hover:shadow-lg hover:shadow-clay/10 transition-all overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 size-32 rounded-full bg-clay/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <div className="font-serif text-lg sm:text-xl">{e.school}</div>
                      <div className="text-muted-foreground text-xs sm:text-sm mt-1">
                        {e.detail}
                      </div>
                    </div>
                    <div className="font-mono text-xs text-clay shrink-0 px-3 py-1 rounded-full bg-clay/10 border border-clay/20">
                      {e.years}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---------------- Skills ---------------- */}
        <section id="skills" className="scroll-mt-32 sm:scroll-mt-36 mt-20 sm:mt-24">
          <Reveal delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
              What I work with
            </h2>
            <div className="space-y-3">
              {skillGroups.map((g, i) => {
                const Icon = g.icon;
                return (
                  <motion.div
                    key={g.title}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl border border-border bg-card p-5 sm:p-6 overflow-hidden hover:border-clay/60 transition-all"
                  >
                    <div
                      className={`absolute inset-y-0 left-0 w-1 ${g.bar} scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500`}
                    />
                    <div
                      className={`grid place-items-center size-12 sm:size-14 rounded-xl ${g.chip} shrink-0`}
                    >
                      <Icon className="size-5 sm:size-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-[10px] sm:text-xs uppercase tracking-[0.2em] ${g.label} mb-1.5`}
                      >
                        {g.title}
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {g.items.map((it) => (
                          <span
                            key={it}
                            className="text-xs sm:text-sm font-serif text-foreground/85"
                          >
                            {it}
                            <span className="text-muted-foreground/50 ml-2 last:hidden">·</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>

          {/* Toolkit — radial-grid stacked rows with animated dot indicators */}
          <Reveal delay={0.2} className="mt-10 sm:mt-12">
            <h3 className="text-xs uppercase tracking-[0.2em] text-clay mb-4">Toolkit</h3>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              {toolkit.map((s, i) => {
                const a = toolkitAccentMap[s.accent];
                return (
                  <motion.div
                    key={s.group}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="group grid grid-cols-[110px_1fr] sm:grid-cols-[180px_1fr] gap-4 sm:gap-6 items-center px-4 sm:px-6 py-4 sm:py-5 border-b border-border last:border-b-0 hover:bg-secondary/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.span
                        className={`size-2 rounded-full ${a.dot} ring-4 ${a.ring}`}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
                      />
                      <div
                        className={`text-[10px] sm:text-xs uppercase tracking-[0.18em] font-mono ${a.text}`}
                      >
                        {s.group}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5 sm:gap-x-4 font-serif text-sm sm:text-lg text-foreground/85">
                      {s.items.map((it, idx) => (
                        <span key={it} className="inline-flex items-center">
                          {it}
                          {idx < s.items.length - 1 && (
                            <span className="ml-3 sm:ml-4 text-muted-foreground/40">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}