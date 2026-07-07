import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowUpRight, Code2, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PhotoOrFallback } from "@/components/photo-or-fallback";
import next from "@/assets/next-1.png";
export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Manshi Chauhan" },
      {
        name: "description",
        content:
          "Web Developer Intern at Next Step Admission — full-stack admission platform, REST APIs and scalable UI.",
      },
      { property: "og:title", content: "Experience — Manshi Chauhan" },
      { property: "og:description", content: "Internship experience at Next Step Admission." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://manshi-chauhan.me/experience` },
      { property: "og:image", content: "https://manshi-chauhan.me/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Experience — Manshi Chauhan" },
      { name: "twitter:description", content: "Internship experience at Next Step Admission." },
      { name: "twitter:image", content: "https://manshi-chauhan.me/og-image.png" },
    ],
    links: [{ rel: "canonical", href: `https://manshi-chauhan.me/experience` }],
  }),
  component: Experience,
});

const responsibilities = [
  "Built and shipped user-facing features for a live admission-counselling platform used by real students, from wireframe to deployed code.",
  "Developed reusable React components and pages, focused on clean, scalable UI that could grow with new admission verticals.",
  "Designed and integrated REST APIs with Node.js, handling data for student enquiries, counsellor dashboards and admission workflows.",
  "Implemented JWT-based authentication and role-based access so students, counsellors and admins each saw the right view.",
  "Worked with MongoDB to model and query admission data efficiently as the platform's user base grew.",
  "Collaborated directly with the founding team debugging production issues, iterating on feedback, and shipping fixes fast.",
];

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "JWT Auth",
  "REST APIs",
  "Tailwind CSS",
];

const takeaways = [
  {
    title: "Shipping over perfecting",
    body: "Learned to balance clean architecture with the reality of deadlines — ship something solid, then iterate.",
  },
  {
    title: "Owning a feature end-to-end",
    body: "Went from a task description to a deployed feature myself — planning, building, testing and handling edge cases.",
  },
  {
    title: "Real users, real feedback",
    body: "Working on a live product meant every bug and every UX decision had real consequences, which sharpened my instincts fast.",
  },
];

/**
 * EDIT ME — drop screenshots / photos from the internship in
 * /public/projects/ using these filenames (or change the paths).
 * Paths must start with "/" (public folder), not "src/assets/..."
 * — that path only works for build-time imports, not runtime <img> src.
 */
const images = [next, "/projects/next-2.png", "/projects/next-3.png"];

function Experience() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock page scroll while the lightbox is open.
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <div className="relative overflow-x-hidden">
      <div className="blob bg-clay/25 size-72 sm:size-96 top-10 -right-32 animate-float" />
      <div className="blob bg-sage/20 size-60 sm:size-80 top-[32rem] -left-28 animate-float" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 md:px-10 py-14 sm:py-20 md:py-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-clay mb-5 sm:mb-6">— Experience</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
            Where I put{" "}
            <span className="italic bg-gradient-to-r from-clay to-plum bg-clip-text text-transparent">
              theory to work
            </span>
            .
          </h1>
        </Reveal>

        {/* Role header card */}
        <Reveal delay={0.15} className="mt-10 sm:mt-14">
          <div className="relative rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-10 overflow-hidden">
            <div className="absolute -top-16 -right-16 size-56 rounded-full bg-clay/20 blur-3xl" />
            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="grid place-items-center size-12 sm:size-14 rounded-xl bg-clay/15 text-clay shrink-0">
                  <Briefcase className="size-6 sm:size-7" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl">Web Developer Intern</h2>
                  <a
                    href="https://nextstepadmission.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-clay mt-1 text-sm sm:text-base link-underline"
                  >
                    Next Step Admission
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground shrink-0">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-3.5 text-clay" /> 2025 · Internship
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-3.5 text-clay" /> Remote
                </span>
              </div>
            </div>

            <p className="relative mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              An admission platform built to help students find and apply to the right college. I
              joined as a Web Developer Intern and worked across the stack — from building the UI
              students interact with, to the APIs and auth that power it behind the scenes.
            </p>
          </div>
        </Reveal>

        {/* Gallery */}
        <Reveal delay={0.18} className="mt-8 sm:mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {images.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`relative rounded-xl overflow-hidden border border-border bg-card aspect-[4/3] ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-[4/3]" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(src)}
                  className="block size-full group cursor-zoom-in"
                >
                  <PhotoOrFallback
                    src={src}
                    alt={`Next Step Admission internship photo ${i + 1}`}
                    label={`Add ${src.split("/").pop()}`}
                    className="transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Responsibilities */}
        <Reveal delay={0.2} className="mt-16 sm:mt-20">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">What I did</h2>
          <div className="grid gap-3 sm:gap-4">
            {responsibilities.map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start gap-3 sm:gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 hover:border-clay/60 transition-colors"
              >
                <CheckCircle2 className="size-5 text-clay shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">{r}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Tech stack */}
        <Reveal delay={0.2} className="mt-16 sm:mt-20">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">Tech I used</h2>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {techStack.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3.5 py-2 rounded-full bg-secondary text-foreground/80 border border-border"
              >
                <Code2 className="size-3.5 text-clay" /> {t}
              </motion.span>
            ))}
          </div>
        </Reveal>

        {/* Takeaways */}
        <Reveal delay={0.2} className="mt-16 sm:mt-20">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
            What I took away from it
          </h2>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {takeaways.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/40 p-5 sm:p-6"
              >
                <h3 className="font-serif text-lg sm:text-xl mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

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
              alt="Next Step Admission internship"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[92vw] sm:max-w-[90vw] w-auto h-auto object-contain rounded-2xl border border-border bg-card shadow-2xl"
            />
          </div>,
          document.body,
        )}
    </div>
  );
}