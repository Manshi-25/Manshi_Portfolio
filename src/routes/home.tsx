import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Download, Sparkles, MapPin } from "lucide-react";
import { Reveal, WordReveal } from "@/components/reveal";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Manshi Chauhan — AI/ML Engineer & Full-Stack Developer" },
      { name: "description", content: "B.Tech AI/ML undergraduate. Full-stack apps, ML systems and published research." },
      { property: "og:title", content: "Manshi Chauhan — Portfolio" },
      { property: "og:description", content: "Selected work, research and writing." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://manshi-chauhan.vercel.app/home` },
      { property: "og:image", content: "https://manshi-chauhan.vercel.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Manshi Chauhan — Portfolio" },
      { name: "twitter:description", content: "Selected work, research and writing." },
      { name: "twitter:image", content: "https://manshi-chauhan.vercel.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: `https://manshi-chauhan.vercel.app/home` }],
  }),
  component: Index,
});

const skills = [
  "React", "Next.js", "Node.js", "Python", "PyTorch",
  "TensorFlow", "MongoDB", "TypeScript", "Tailwind", "Flask",
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative grain overflow-hidden">
        <div className="blob bg-clay/40 size-[22rem] sm:size-[28rem] -top-20 -right-20 animate-float" />
        <div className="blob bg-plum/30 size-72 sm:size-80 top-60 -left-32 animate-float" />
        <div className="blob bg-mustard/30 size-56 sm:size-64 bottom-10 right-1/3 animate-float" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 md:px-10 pt-14 sm:pt-20 md:pt-28 pb-16 sm:pb-24 md:pb-32">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-foreground/80 mb-6 sm:mb-8 px-3 py-1.5 rounded-full bg-card border border-border">
              <span className="size-1.5 rounded-full bg-sage animate-pulse" />
              Open to internships · 2026
            </div>
          </Reveal>

          <h1 className="font-serif text-[clamp(2.25rem,9vw,7rem)] leading-[0.98] tracking-tight max-w-5xl text-balance">
            <WordReveal text="Hi, I'm Manshi —" />
            <br />
            <span className="italic bg-gradient-to-r from-clay via-plum to-mustard bg-clip-text text-transparent">
              <WordReveal text="I build, train" />
            </span>
            <br />
            <WordReveal text="and publish." />
          </h1>

          <Reveal delay={0.6} className="mt-6 sm:mt-10 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              A B.Tech student diving deep into the world of <span className="text-foreground">AI</span>,
              <span className="text-foreground"> Machine Learning</span>, and
              <span className="text-foreground"> Full-Stack Development</span>.
            </p>
            <p className="mt-3">
              I'm not just learning to code — I'm learning to solve problems the world actually has.
            </p>
          </Reveal>

          <Reveal delay={0.8} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 sm:px-6 sm:py-3 text-sm hover:bg-clay transition-colors"
            >
              See my work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="/Manshi_Chauhan_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-clay text-background px-5 py-2.5 sm:px-6 sm:py-3 text-sm hover:bg-clay-deep transition-colors"
            >
              <Download className="size-4" /> Resume
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 sm:px-6 sm:py-3 text-sm hover:bg-secondary transition-colors"
            >
              Say hello
            </Link>
          </Reveal>

          <Reveal delay={1.0} className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="size-3.5 text-clay" /> New Delhi, India
          </Reveal>
        </div>
      </section>

      {/* Marquee skills */}
      <section className="border-y border-border/60 bg-gradient-to-r from-secondary/60 via-mustard/10 to-secondary/60 py-4 sm:py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-8 sm:gap-10 font-serif text-xl sm:text-2xl md:text-3xl text-foreground/70">
          {[...skills, ...skills].map((s, i) => (
            <span key={i} className="flex items-center gap-8 sm:gap-10">
              {s}
              <Sparkles className="size-3.5 sm:size-4 text-clay" />
            </span>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10 py-16 sm:py-24 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-clay mb-3">— Selected work</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">Recent builds.</h2>
            </div>
            <Link to="/work" className="hidden md:inline-flex link-underline text-sm text-muted-foreground hover:text-foreground">
              View all →
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group relative block rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-clay/60 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-clay/10 overflow-hidden"
              >
                <div className={`absolute -top-16 -right-16 size-48 rounded-full ${p.accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className="relative flex items-start justify-between mb-10 sm:mb-12">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-clay">{p.tag}</span>
                  <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-clay group-hover:rotate-45 transition-all" />
                </div>
                <h3 className="relative font-serif text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">{p.title}</h3>
                <p className="relative text-sm sm:text-base text-muted-foreground">{p.desc}</p>
                <div className="relative mt-5 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground/70">{s}</span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8 sm:hidden">
          <Link to="/work" className="link-underline text-sm text-muted-foreground hover:text-foreground">View all work →</Link>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10 pb-16 sm:pb-24">
        <Reveal>
          <div className="relative rounded-2xl sm:rounded-3xl bg-foreground text-background p-7 sm:p-10 md:p-14 grain overflow-hidden">
            <div className="absolute -top-20 -left-20 size-72 rounded-full bg-clay/40 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 size-72 rounded-full bg-plum/40 blur-3xl" />
            <blockquote className="relative font-serif text-lg sm:text-2xl md:text-3xl leading-snug max-w-3xl text-balance">
              "The small details — a button's kerning, a model's latency, a line no one reads —
              they add up to the thing."
            </blockquote>
            <div className="relative mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-sm">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className={`font-serif text-2xl sm:text-3xl md:text-4xl ${s.color}`}>{s.value}</div>
                  <div className="text-background/60 mt-1 text-xs sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

const featured = [
  {
    title: "Next Step Admission",
    tag: "Internship · 2025",
    desc: "AI-driven admission platform — scalable UI, REST APIs, JWT auth.",
    stack: ["React", "Node", "MongoDB"],
    url: "https://nextstepadmission.vercel.app",
    accent: "bg-clay/30",
  },
  {
    title: "Coral Reef Health Detection",
    tag: "Deep Learning",
    desc: "Four-model classifier for healthy vs. bleached corals, served via Flask.",
    stack: ["TF Lite", "Flask", "React"],
    url: "https://coral-health-detection.vercel.app",
    accent: "bg-sage/40",
  },
];

const stats = [
  { value: "9.1", label: "CGPA", color: "text-clay" },
  { value: "3+", label: "Publications", color: "text-mustard" },
  { value: "10+", label: "Hackathons", color: "text-plum" },
  { value: "2027", label: "Graduating", color: "text-sky" },
];
