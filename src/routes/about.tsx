import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Code2, Brain, Compass, Trophy, Users, Dumbbell, Languages } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Manshi Chauhan" },
      { name: "description", content: "AI/ML undergrad, full-stack developer and researcher based in New Delhi." },
      { property: "og:title", content: "About — Manshi Chauhan" },
      { property: "og:description", content: "Story, skills and education." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://manshi-chauhan.vercel.app/about` },
      { property: "og:image", content: "https://manshi-chauhan.vercel.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About — Manshi Chauhan" },
      { name: "twitter:description", content: "Story, skills and education." },
      { name: "twitter:image", content: "https://manshi-chauhan.vercel.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: `https://manshi-chauhan.vercel.app/about` }],
  }),
  component: About,
});

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

const education = [
  { school: "Vivekananda Institute of Professional Studies", detail: "B.Tech — AI & ML · CGPA 9.1", years: "2023 — 2027" },
  { school: "SKV No.1", detail: "Class XII · 86.2%", years: "2022 — 2023" },
  { school: "GGSSS No.1", detail: "Class X · 94.4%", years: "2020 — 2021" },
];

const beyondCards = [
  {
    title: "HR Conclave — Swadhyay Event",
    role: "Volunteer · Organising team",
    body: "Helped organize and execute one of the college's flagship industry events. Sharpened my ability to communicate under pressure, work in teams, and take ownership when things don't go to plan.",
    icon: Users,
    color: "from-clay/40 to-clay/0",
    accent: "text-clay",
  },
  {
    title: "Kabaddi & Tug of War",
    role: "GGSIPU Dwarka Sports Meet",
    body: "Represented my college in both events. Sports taught me grit, team coordination, and how to keep going when it gets physically — and mentally — hard.",
    icon: Dumbbell,
    color: "from-sage/40 to-sage/0",
    accent: "text-sage",
  },
  {
    title: "Hackathons",
    role: "SIH · Cyber for Her · and more",
    body: "Hackathons are where ideas meet deadlines — and I love the pressure. Each one made me faster, sharper, and more confident in turning an idea into a product.",
    icon: Trophy,
    color: "from-plum/40 to-plum/0",
    accent: "text-plum",
  },
];

function About() {
  return (
    <div className="relative">
      <div className="blob bg-mustard/30 size-72 sm:size-96 top-10 -right-32 animate-float" />
      <div className="blob bg-plum/25 size-60 sm:size-72 top-[40rem] -left-20 animate-float" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 md:px-10 py-14 sm:py-20 md:py-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-clay mb-5 sm:mb-6">— About</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
            Builder by day, <span className="italic bg-gradient-to-r from-clay to-plum bg-clip-text text-transparent">researcher by night</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 sm:mt-12 space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
          <p>
            I'm <span className="text-foreground">Manshi Chauhan</span> — an AI &amp; ML enthusiast,
            full-stack developer, and published researcher, currently in my final year of B.Tech.
          </p>
          <p>
            I turn ideas into <span className="text-foreground">intelligent systems</span> and complex
            problems into clean solutions. I live at the intersection of curiosity and execution —
            I ask big questions, and then go build the answers.
          </p>
        </Reveal>

        {/* Tech stack — horizontal slide-in cards with icon */}
        <Reveal delay={0.3} className="mt-16 sm:mt-20">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">What I work with</h2>
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
                  <div className={`absolute inset-y-0 left-0 w-1 ${g.bar} scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500`} />
                  <div className={`grid place-items-center size-12 sm:size-14 rounded-xl ${g.chip} shrink-0`}>
                    <Icon className="size-5 sm:size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-[10px] sm:text-xs uppercase tracking-[0.2em] ${g.label} mb-1.5`}>{g.title}</div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {g.items.map((it) => (
                        <span key={it} className="text-xs sm:text-sm font-serif text-foreground/85">{it}<span className="text-muted-foreground/50 ml-2 last:hidden">·</span></span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* Education — staircase cards */}
        <Reveal delay={0.3} className="mt-16 sm:mt-20">
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
                    <div className="text-muted-foreground text-xs sm:text-sm mt-1">{e.detail}</div>
                  </div>
                  <div className="font-mono text-xs text-clay shrink-0 px-3 py-1 rounded-full bg-clay/10 border border-clay/20">
                    {e.years}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Beyond the screen — narrative cards with hover lift + accent rail */}
        <Reveal delay={0.3} className="mt-16 sm:mt-20">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">Beyond the screen</h2>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {beyondCards.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl border border-border bg-card p-6 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-30 group-hover:opacity-60 transition-opacity`} />
                  <div className="relative">
                    <div className={`inline-grid place-items-center size-10 rounded-xl bg-background/80 border border-border ${b.accent} mb-4`}>
                      <Icon className="size-4" />
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl mb-1">{b.title}</h3>
                    <div className={`text-[11px] uppercase tracking-widest mb-3 ${b.accent}`}>{b.role}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground border border-mustard/40 bg-mustard/10 rounded-full px-4 py-2">
            <Languages className="size-3.5 text-mustard" /> English · Hindi
          </div>
        </Reveal>
      </div>
    </div>
  );
}
