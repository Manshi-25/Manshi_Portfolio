import { createFileRoute } from "@tanstack/react-router";
import { Download, Briefcase, GraduationCap, FileText, BookOpen, Rocket } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { motion } from "motion/react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Manshi Chauhan" },
      { name: "description", content: "Interactive resume of Manshi Chauhan — education, experience, projects and recognitions." },
      { property: "og:title", content: "Resume — Manshi Chauhan" },
      { property: "og:description", content: "Interactive timeline resume." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://manshichauhan.dev/resume` },
      { property: "og:image", content: "https://manshichauhan.dev/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Resume — Manshi Chauhan" },
      { name: "twitter:description", content: "Interactive timeline resume." },
      { name: "twitter:image", content: "https://manshichauhan.dev/og-image.png" },
    ],
    links: [{ rel: "canonical", href: `https://manshichauhan.dev/resume` }],
  }),
  component: Resume,
});

type Kind = "edu" | "job" | "research" | "project";

type Item = {
  year: string;
  title: string;
  org: string;
  detail: string;
  kind: Kind;
  accent: "clay" | "plum" | "sage" | "mustard" | "sky";
};

const timeline: Item[] = [
  {
    year: "2026",
    title: "Research Paper - Metaheuristics Frameworkk for Oral Lesions",
    org: "Research Presentation",
    detail: "Presented a research paper on a metaheuristics framework for oral lesions detection at the International Conference on Computational Intelligence and Data Science.",
    kind: "research",
    accent: "clay",
  },
  {
    year: "2026",
    title: "Book Chapter — Adversarial ML",
    org: "Intelligent Computing in Cybersecurity",
    detail: "Co-authored a chapter on aligning adversarial defenses with cybersecurity frameworks.",
    kind: "research",
    accent: "mustard",
  },
  {
    year: "2024",
    title: "Cognitive Contours · MAIMS",
    org: "Research Presentation",
    detail: "Surveyed LLM architectures and the ethical landscape around them.",
    kind: "research",
    accent: "plum",
  },
  {
    year: "2025",
    title: "Research Paper - Analytics Framework for UHI Mitigation",
    org: "Research Publication",
    detail: "Published a research paper on an analytics framework for urban heat island mitigation in the International Journal of Environmental Science and Technology.",
    kind: "research",
    accent: "sage",
  },
  {
    year: "2025",
    title: "Web Developer Intern",
    org: "Next Step Admission",
    detail: "Built a full-stack AI-driven admission platform with Next.js, owned API integration and scalable UI.",
    kind: "job",
    accent: "clay",
  },
  {
    year: "2024",
    title: "ReefVision",
    org: "Personal · Deep Learning",
    detail: "Classifier deployed as a public web tool for marine reef monitoring.",
    kind: "project",
    accent: "sage",
  },
  {
    year: "2023 — 2027",
    title: "B.Tech, AI & ML",
    org: "Vivekananda Institute of Professional Studies",
    detail: "CGPA 9.1 · Core: ML, DL, Optimization, Systems.",
    kind: "edu",
    accent: "sky",
  },
];

const iconMap: Record<Kind, typeof Briefcase> = {
  edu: GraduationCap,
  job: Briefcase,
  research: FileText,
  project: Rocket,
};

const colorMap: Record<Item["accent"], string> = {
  sky: "bg-sky/20 text-sky border-sky/40",
  clay: "bg-clay/20 text-clay border-clay/40",
  sage: "bg-sage/20 text-sage border-sage/40",
  mustard: "bg-mustard/25 text-mustard border-mustard/50",
  plum: "bg-plum/20 text-plum border-plum/40",
};

const kindLabel: Record<Kind, string> = {
  edu: "Education",
  job: "Experience",
  research: "Research",
  project: "Project",
};

const tabs: { value: string; label: string; kind: Kind | "all" }[] = [
  { value: "all", label: "All", kind: "all" },
  { value: "research", label: "Research", kind: "research" },
  { value: "job", label: "Experience", kind: "job" },
  { value: "project", label: "Projects", kind: "project" },
  { value: "edu", label: "Education", kind: "edu" },
];

const skills = [
  { group: "Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "SQL"], accent: "clay" },
  { group: "Frameworks", items: ["Next.js", "React", "Node.js", "Express", "PyTorch"], accent: "plum" },
  { group: "AI / ML", items: ["Deep Learning", "Agents", "Optimization", "NLP"], accent: "sage" },
  { group: "Tools", items: ["MongoDB", "Git", "Vercel", "Tableau"], accent: "mustard" },
];

const accentMap: Record<string, { dot: string; text: string; ring: string }> = {
  clay: { dot: "bg-clay", text: "text-clay", ring: "ring-clay/30" },
  plum: { dot: "bg-plum", text: "text-plum", ring: "ring-plum/30" },
  sage: { dot: "bg-sage", text: "text-sage", ring: "ring-sage/30" },
  mustard: { dot: "bg-mustard", text: "text-mustard", ring: "ring-mustard/30" },
};

function Resume() {
  return (
    <div className="relative">
      <div className="blob bg-clay/25 size-72 sm:size-96 top-10 -right-32 animate-float" />
      <div className="blob bg-plum/20 size-60 sm:size-80 top-96 -left-32 animate-float" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 md:px-10 py-14 sm:py-20 md:py-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-clay mb-5 sm:mb-6">— Resume</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-tight">
              The <span className="italic text-clay">short</span> story
              <br /> of my work.
            </h1>
            <a
              href="/Manshi_Chauhan_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 self-start rounded-full bg-foreground text-background px-5 py-3 sm:px-6 sm:py-3.5 text-sm hover:bg-clay transition-colors shrink-0"
            >
              <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
              Open PDF
            </a>
          </div>
        </Reveal>

        <ResumeTabs />

        {/* Toolkit — radial-grid stacked rows with animated dot indicators */}
        <Reveal className="mt-20 sm:mt-24">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">Toolkit</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {skills.map((s, i) => {
              const a = accentMap[s.accent];
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
                    <div className={`text-[10px] sm:text-xs uppercase tracking-[0.18em] font-mono ${a.text}`}>{s.group}</div>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 sm:gap-x-4 font-serif text-sm sm:text-lg text-foreground/85">
                    {s.items.map((it, idx) => (
                      <span key={it} className="inline-flex items-center">
                        {it}
                        {idx < s.items.length - 1 && <span className="ml-3 sm:ml-4 text-muted-foreground/40">·</span>}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// Resume timeline as shadcn Tabs (category filter) + Accordion (expandable
// rows), instead of a card grid/rail. Each row's HoverCard surfaces the
// organisation + category as a small floating preview on hover/focus —
// a different interaction model from the rest of the site's "always
// visible" cards. Radix drives the open/close + tab-switch animations
// (already wired up via tw-animate-css's accordion keyframes); Motion
// only handles the per-row stagger-in.
function ResumeTabs() {
  const [active, setActive] = useState("all");

  return (
    <Reveal className="mt-14 sm:mt-20">
      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="h-auto flex-wrap gap-1 rounded-full bg-secondary/60 p-1.5">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="rounded-full px-4 py-1.5 text-xs sm:text-sm data-[state=active]:bg-clay data-[state=active]:text-background data-[state=active]:shadow-none"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((t) => {
          const items = t.kind === "all" ? timeline : timeline.filter((i) => i.kind === t.kind);
          return (
            <TabsContent key={t.value} value={t.value} className="mt-6 sm:mt-8">
              <Accordion type="single" collapsible defaultValue={items[0]?.title}>
                {items.map((item, i) => {
                  const Icon = item.kind === "research" && item.title.includes("Book") ? BookOpen : iconMap[item.kind];
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <AccordionItem
                        value={item.title}
                        className={`rounded-xl border px-4 sm:px-5 mb-3 transition-colors data-[state=open]:bg-card data-[state=open]:shadow-sm ${colorMap[item.accent]} border-current/20 data-[state=open]:border-current/40`}
                      >
                        <AccordionTrigger className="hover:no-underline py-4 sm:py-5">
                          <div className="flex items-center gap-3 sm:gap-4 text-left">
                            <span className="grid place-items-center size-9 sm:size-10 rounded-full bg-background border border-current/30 shrink-0">
                              <Icon className="size-4" />
                            </span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-serif text-base sm:text-lg text-foreground">{item.title}</span>
                                <Badge variant="outline" className="text-[10px] border-current/40">
                                  {kindLabel[item.kind]}
                                </Badge>
                              </div>
                              <span className="text-[11px] sm:text-xs font-mono opacity-70">{item.year}</span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-12 sm:pl-14">
                            <HoverCard openDelay={120}>
                              <HoverCardTrigger asChild>
                                <span className="text-xs sm:text-sm font-medium underline decoration-dotted decoration-current/40 cursor-help">
                                  {item.org}
                                </span>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-56 text-xs">
                                <div className="font-medium text-foreground mb-1">{item.org}</div>
                                <div className="text-muted-foreground">{kindLabel[item.kind]} · {item.year}</div>
                              </HoverCardContent>
                            </HoverCard>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  );
                })}
              </Accordion>
            </TabsContent>
          );
        })}
      </Tabs>
    </Reveal>
  );
}
