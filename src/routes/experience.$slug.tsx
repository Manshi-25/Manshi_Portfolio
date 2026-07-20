import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Code2,
  X,
  Youtube,
  ExternalLink,
  Play,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "@/components/reveal";
import { PhotoOrFallback } from "@/components/photo-or-fallback";
import { experienceBySlug, experiences, type ExperienceItem } from "@/lib/experiences";

export const Route = createFileRoute("/experience/$slug")({
  loader: ({ params }): ExperienceItem => {
    const exp = experienceBySlug(params.slug);
    if (!exp) throw notFound();
    return exp;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
        { title: `${loaderData.role} at ${loaderData.company} | Manshi Chauhan` },
        { name: "description", content: loaderData.shortDesc },
        { property: "og:title", content: `${loaderData.role} at ${loaderData.company}` },
        { property: "og:description", content: loaderData.shortDesc },
        { property: "og:type", content: "article" },
        {
          property: "og:url",
          content: `https://manshi-chauhan.me/experience/${loaderData.slug}`,
        },
        { property: "og:image", content: "https://manshi-chauhan.me/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${loaderData.role} at ${loaderData.company} | Manshi Chauhan` },
        { name: "twitter:description", content: loaderData.shortDesc },
        { name: "twitter:image", content: "https://manshi-chauhan.me/og-image.png" },
      ]
      : [],
    links: loaderData
      ? [
        {
          rel: "canonical",
          href: `https://manshi-chauhan.me/experience/${loaderData.slug}`,
        },
      ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl mb-4">Experience not found</h1>
      <Link to="/experience" className="link-underline text-clay">
        Back to experience
      </Link>
    </div>
  ),
  component: ExperienceDetail,
});

function ExperienceDetail() {
  const exp = Route.useLoaderData() as ExperienceItem;
  const idx = experiences.findIndex((x) => x.slug === exp.slug);
  const nextExp = experiences[(idx + 1) % experiences.length];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
        {/* Back link */}
        <Reveal>
          <Link
            to="/experience"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Experience
          </Link>
        </Reveal>

        {/* Role header card */}
        <Reveal delay={0.1}>
          <div className="relative rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-10 overflow-hidden">
            <div
              className={`absolute -top-16 -right-16 size-64 rounded-full bg-gradient-to-br ${exp.accentColor} blur-3xl opacity-20`}
            />

            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div
                  className={`grid place-items-center size-12 sm:size-14 rounded-xl ${exp.badgeBg} ${exp.badgeText} shrink-0`}
                >
                  <Briefcase className="size-6 sm:size-7" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl">{exp.role}</h1>
                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 text-clay mt-1 text-base sm:text-lg font-medium link-underline"
                    >
                      {exp.company}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <p className="text-clay mt-1 text-base sm:text-lg font-medium">
                      {exp.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground shrink-0">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-3.5 text-clay" /> {exp.period}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-3.5 text-clay" /> {exp.location}
                </span>
              </div>
            </div>

            <p className="relative mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {exp.description}
            </p>

            {exp.link && (
              <div className="relative mt-6 pt-5 border-t border-border/60">
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-clay/15 text-clay text-xs sm:text-sm font-medium hover:bg-clay hover:text-background transition-colors"
                >
                  <ExternalLink className="size-3.5" /> Visit {exp.company}
                </a>
              </div>
            )}
          </div>
        </Reveal>

        {/* Featured YouTube Videos Section */}
        {exp.videos && exp.videos.length > 0 && (
          <Reveal delay={0.15} className="mt-14 sm:mt-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center size-9 rounded-lg bg-red-500/15 text-red-500">
                  <Youtube className="size-5" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl">Featured Lectures & Videos</h2>
              </div>
            </div>

            {/* Video Cards Grid — Clicking redirects to YouTube in new tab */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {exp.videos.map((video, i) => (
                <motion.a
                  key={video.title + i}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden hover:border-red-500/60 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Thumbnail / Visual banner */}
                  <div className="relative aspect-video w-full bg-secondary overflow-hidden">
                    {video.youtubeId ? (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={video.title}
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="grid place-items-center size-12 sm:size-14 rounded-full bg-red-600/90 text-white shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="size-5 sm:size-6 fill-current ml-0.5" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="size-full grid place-items-center bg-gradient-to-br from-plum/20 via-clay/20 to-mustard/20">
                        <ExternalLink className="size-8 text-clay" />
                      </div>
                    )}

                    <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-sm">
                      YouTube
                    </span>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-medium group-hover:text-red-500 transition-colors flex items-start justify-between gap-2">
                        <span>{video.title}</span>
                        <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-red-500 group-hover:rotate-45 transition-all shrink-0 mt-1" />
                      </h3>
                      {video.description && (
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {video.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-red-500 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Youtube className="size-4" /> Watch on YouTube
                      </span>
                      <span className="text-muted-foreground font-normal text-[11px] group-hover:text-foreground">
                        Opens in new tab →
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </Reveal>
        )}

        {/* Gallery */}
        {exp.images && exp.images.length > 0 && (
          <Reveal delay={0.18} className="mt-14 sm:mt-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6">Gallery & Visuals</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {exp.images.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className={`relative rounded-xl overflow-hidden border border-border bg-card aspect-[4/3] ${i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-[4/3]" : ""
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedImage(src)}
                    className="block size-full group cursor-zoom-in"
                  >
                    <PhotoOrFallback
                      src={src}
                      alt={`${exp.company} photo ${i + 1}`}
                      label={`${exp.company} photo ${i + 1}`}
                      className="transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Responsibilities */}
        {exp.responsibilities && exp.responsibilities.length > 0 && (
          <Reveal delay={0.2} className="mt-16 sm:mt-20">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">What I did</h2>
            <div className="grid gap-3 sm:gap-4">
              {exp.responsibilities.map((r, i) => (
                <motion.div
                  key={r}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group flex items-start gap-3 sm:gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 hover:border-clay/60 transition-colors"
                >
                  <CheckCircle2 className="size-5 text-clay shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">{r}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Tech stack */}
        {exp.techStack && exp.techStack.length > 0 && (
          <Reveal delay={0.25} className="mt-16 sm:mt-20">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">Tech I used</h2>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {exp.techStack.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3.5 py-2 rounded-full bg-secondary text-foreground/80 border border-border"
                >
                  <Code2 className="size-3.5 text-clay" /> {t}
                </motion.span>
              ))}
            </div>
          </Reveal>
        )}

        {/* Takeaways */}
        <Reveal delay={0.3} className="mt-16 sm:mt-20">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
            What I took away from it
          </h2>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {exp.takeaways.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/40 p-5 sm:p-6"
              >
                <h3 className="font-serif text-lg sm:text-xl mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Next experience link */}
        <Reveal delay={0.35} className="mt-20 pt-10 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Next Experience</span>
            <Link
              to="/experience/$slug"
              params={{ slug: nextExp.slug }}
              className="group inline-flex items-center gap-2 font-serif text-xl sm:text-2xl text-foreground hover:text-clay transition-colors"
            >
              {nextExp.role} @ {nextExp.company}
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-clay" />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Lightbox modal */}
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
              alt={`${exp.company} screenshot`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[92vw] sm:max-w-[90vw] w-auto h-auto object-contain rounded-2xl border border-border bg-card shadow-2xl"
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
