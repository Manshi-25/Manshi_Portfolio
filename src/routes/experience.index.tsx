import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { experiences } from "@/lib/experiences";

export const Route = createFileRoute("/experience/")({
  head: () => ({
    meta: [
      { title: "Experience | Manshi Chauhan" },
      {
        name: "description",
        content:
          "Web Developer Intern at Next Step Admission and EM & PAI Faculty at BunkToBrains - full-stack development, REST APIs, and AI/Python instruction.",
      },
      { property: "og:title", content: "Experience | Manshi Chauhan" },
      { property: "og:description", content: "Experience at Next Step Admission and BunkToBrains." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://manshi-chauhan.me/experience` },
      { property: "og:image", content: "https://manshi-chauhan.me/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Experience | Manshi Chauhan" },
      { name: "twitter:description", content: "Experience at Next Step Admission and BunkToBrains." },
      { name: "twitter:image", content: "https://manshi-chauhan.me/og-image.png" },
    ],
    links: [{ rel: "canonical", href: `https://manshi-chauhan.me/experience` }],
  }),
  component: ExperienceList,
});

function ExperienceList() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Background ambient glows */}
      <div className="blob bg-clay/20 size-96 top-10 -right-32 animate-float" />
      <div className="blob bg-plum/20 size-80 top-[32rem] -left-28 animate-float" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 md:px-10 py-14 sm:py-20 md:py-28">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clay/10 text-clay text-xs uppercase tracking-[0.2em] font-medium mb-5 sm:mb-6">
            <Sparkles className="size-3.5" /> Experience & Roles
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight text-balance">
            Where I put{" "}
            <span className="italic bg-gradient-to-r from-clay via-plum to-mustard bg-clip-text text-transparent">
              theory to work
            </span>
            .
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Click on any role to view full details and case studies.
          </p>
        </Reveal>

        {/* Minimal, Large & Attractive Experience Cards */}
        <div className="mt-12 sm:mt-16 space-y-6 sm:space-y-8">
          {experiences.map((exp, i) => (
            <Reveal key={exp.slug} delay={0.1 * (i + 1)}>
              <Link
                to="/experience/$slug"
                params={{ slug: exp.slug }}
                className="group relative block rounded-3xl border border-border bg-gradient-to-br from-card via-card to-secondary/30 p-8 sm:p-10 md:p-12 overflow-hidden hover:border-clay/60 hover:shadow-2xl hover:shadow-clay/10 hover:-translate-y-1.5 transition-all duration-500"
              >
                {/* Ambient glow accent */}
                <div
                  className={`absolute -top-24 -right-24 size-72 sm:size-96 rounded-full bg-gradient-to-br ${exp.accentColor} blur-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-500`}
                />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-5 sm:gap-6">
                    <div
                      className={`grid place-items-center size-16 sm:size-20 rounded-2xl ${exp.badgeBg} ${exp.badgeText} shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Briefcase className="size-8 sm:size-9" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl sm:text-4xl font-medium tracking-tight group-hover:text-clay transition-colors duration-300">
                        {exp.role}
                      </h2>
                      <p className={`text-base sm:text-xl font-medium mt-1 ${exp.badgeText}`}>
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Pills */}
                  <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2.5 text-xs sm:text-sm text-muted-foreground shrink-0 font-medium">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-border">
                      <Calendar className="size-3.5 text-clay" /> {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-border">
                      <MapPin className="size-3.5 text-clay" /> {exp.location}
                    </span>
                  </div>
                </div>

                {/* Concise 1-sentence short summary */}
                <p className="relative mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  {exp.shortDesc}
                </p>

                {/* Bottom CTA bar */}
                <div className="relative mt-8 pt-6 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-clay font-semibold">
                    View Details
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-foreground group-hover:text-clay transition-colors">
                    Explore Case Study <ArrowRight className="size-4 transition-transform group-hover:translate-x-1.5 text-clay" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
