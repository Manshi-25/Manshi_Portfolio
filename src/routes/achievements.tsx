import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Trophy,
  Users,
  Dumbbell,
  Terminal,
  Rocket,
  Landmark,
  ShieldCheck,
  Cloud,
  TrafficCone,
  Brain,
  Cpu,
  BarChart3,
  Flag,
  Database,
  Hexagon,
  Coins,
  Sparkles,
  Mic,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PhotoOrFallback } from "@/components/photo-or-fallback";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Manshi Chauhan" },
      {
        name: "description",
        content:
          "Certifications earned and events participated in — AWS, Google Cloud, Red Hat, hackathons and more.",
      },
      { property: "og:title", content: "Achievements — Manshi Chauhan" },
      { property: "og:description", content: "Certifications and participations." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://manshi-chauhan.me/achievements` },
      { property: "og:image", content: "https://manshi-chauhan.me/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Achievements — Manshi Chauhan" },
      { name: "twitter:description", content: "Certifications and participations." },
      { name: "twitter:image", content: "https://manshi-chauhan.me/og-image.png" },
    ],
    links: [{ rel: "canonical", href: `https://manshi-chauhan.me/achievements` }],
  }),
  component: Achievements,
});

/**
 * EDIT ME — drop your certificate photos in /public/achievements/ using
 * these exact filenames (or update the `image` paths below to match
 * whatever you name them).
 */
const certifications = [
  {
    title: "AWS-Forage",
    subtitle: "Cloud Practitioner Certification",
    image: "/achievements/aws1.png",
    icon: Cloud,
    accent: "text-mustard",
    chip: "bg-mustard/15",
  },
  {
    title: "AWS AI-ML Scholars",
    subtitle: "Badge",
    image: "/achievements/aws-2.webp",
    icon: Brain,
    accent: "text-mustard",
    chip: "bg-mustard/15",
  },
  {
    title: "AWS Machine Learning",
    subtitle: "Badge",
    image: "/achievements/aws-ml.png",
    icon: Cpu,
    accent: "text-mustard",
    chip: "bg-mustard/15",
  },
  {
    title: "Cyber for Her",
    subtitle: "Hackathon",
    image: "/achievements/cert-cyber-for-her.jpg",
    icon: ShieldCheck,
    accent: "text-plum",
    chip: "bg-plum/15",
  },
  {
    title: "Data Analytics",
    subtitle: "Certification",
    image: "/achievements/deloitte.png",
    icon: BarChart3,
    accent: "text-plum",
    chip: "bg-plum/15",
  },
  {
    title: "Capture the flag",
    subtitle: "Cyber Security Hackathon",
    image: "/achievements/EY_DSCI.jpg",
    icon: Flag,
    accent: "text-plum",
    chip: "bg-plum/15",
  },
  {
    title: "GFG Mongo DB Course",
    subtitle: "Certification",
    image: "/achievements/mongodb.png",
    icon: Database,
    accent: "text-plum",
    chip: "bg-plum/15",
  },
  {
    title: "Red Hat Course",
    subtitle: "Certification",
    image: "/achievements/RH1.png",
    icon: Hexagon,
    accent: "text-plum",
    chip: "bg-plum/15",
  },
  {
    title: "Red Hat Course",
    subtitle: "Certification",
    image: "/achievements/RH2.png",
    icon: Hexagon,
    accent: "text-mustard",
    chip: "bg-mustard/15",
  },
  {
    title: "Road Hackathon",
    subtitle: "Hackathon",
    image: "/achievements/road_hackathon.jpg",
    icon: TrafficCone,
    accent: "text-plum",
    chip: "bg-plum/15",
  },
  {
    title: "SheFi",
    subtitle: "Program",
    image: "/achievements/SheFi.png",
    icon: Coins,
    accent: "text-plum",
    chip: "bg-plum/15",
  },
  {
    title: "Google Cloud",
    subtitle: "Prompt Design in Vertex AI",
    image: "/achievements/google_vertex.png",
    icon: Sparkles,
    accent: "text-sky",
    chip: "bg-sky/15",
  },
  {
    title: "AI Voice Agents",
    subtitle: "Udemy Certification",
    image: "/achievements/udemyAI.png",
    icon: Mic,
    accent: "text-sage",
    chip: "bg-sage/15",
  },
];

/**
 * EDIT ME — event photos and certificates go here. `photo` is a picture
 * from the event itself, `certificate` is the certificate you received.
 * Leave either one out (or remove it) if you don't have it. If a card
 * only has one of the two, it automatically takes the full card width.
 */
const participations = [
  {
    title: "HR Conclave : Swadhyay Event",
    role: "Volunteer · Organising team",
    body: "Helped organize and execute one of the college's flagship industry events. Sharpened my ability to communicate under pressure, work in teams, and take ownership when things don't go to plan.",
    icon: Users,
    color: "from-clay/40 to-clay/0",
    accent: "text-clay",
    photo: "/achievements/swad-4.jpeg",
    certificate: "/achievements/swad-2.png",
  },
  {
    title: "Technical Member : CDC",
    role: "Coding & Development Cell",
    body: "Contributed as a technical member of the CDC, supporting technical events and peer learning within the department while sharpening my own engineering practices.",
    icon: Terminal,
    color: "from-mustard/40 to-mustard/0",
    accent: "text-mustard",
    photo: "/achievements/swad-1.png",
    //certificate: "/achievements/participation-cdc.jpg",
  },
  {
    title: "E-Cell",
    role: "Entrepreneurship Cell",
    body: "Participated in E-Cell activities and events, engaging with startup culture, ideation sessions, and founder talks alongside my technical work.",
    icon: Rocket,
    color: "from-sky/40 to-sky/0",
    accent: "text-sky",
    certificate: "/achievements/ecell.jpg",
  },
  {
    title: "Riccon",
    role: "Organised by NASSCOM",
    body: "Took part in Riccon, an industry event organised by NASSCOM. It is a great chance to see how the tech industry thinks about risk, compliance and emerging tech at scale.",
    icon: Landmark,
    color: "from-clay-deep/40 to-clay-deep/0",
    accent: "text-clay-deep",
    photo: "/achievements/ric-1.png",
    certificate: "/achievements/ric-3.png",
  },
  {
    title: "Kabaddi & Tug of War",
    role: "GGSIPU Dwarka Sports Meet",
    body: "Represented my college in both events. Sports taught me grit, team coordination, and how to keep going when it gets physically and mentally hard.",
    icon: Dumbbell,
    color: "from-sage/40 to-sage/0",
    accent: "text-sage",
    //photo: "/achievements/kabaddi.jpg",
    certificate: "/achievements/kabaddi.jpeg",
  },
  {
    title: "Hackathons",
    role: "SIH · Cyber for Her · and more",
    body: "Hackathons are where ideas meet deadlines and I love the pressure. Each one made me faster, sharper, and more confident in turning an idea into a product.",
    icon: Trophy,
    color: "from-plum/40 to-plum/0",
    accent: "text-plum",
    photo: "/achievements/EY_DSCI.jpg",
    certificate: "/achievements/cert-cyber-for-her.jpg",
  },
];

/* ------------------------------------------------------------------ */
/*  Certifications — auto-scrolling strip, images shown in full         */
/* ------------------------------------------------------------------ */

function CertificationsMarquee() {
  const [paused, setPaused] = useState(false);
  const track = [
    ...certifications,
    
  ];
  const loop = [...track, ...track];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <div
        className="flex w-max animate-marquee gap-4 sm:gap-5 px-5 sm:px-6 md:px-10 py-2"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {loop.map((c, i) => {
          const Icon = c.icon;
          const isMore = c.title === "& many more";
          return (
            <div
              key={`${c.title}-${i}`}
              className="shrink-0 w-40 sm:w-48 rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
            >
              {isMore ? (
                <div className="h-36 sm:h-40 grid place-items-center text-center p-4">
                  <div>
                    <Trophy className="size-6 text-clay mx-auto mb-2" />
                    <div className="font-serif text-sm text-foreground/80">& many more</div>
                  </div>
                </div>
              ) : (
                <div className="h-36 sm:h-40">
                  <PhotoOrFallback
                    src={c.image}
                    alt={`${c.title} — ${c.subtitle}`}
                    label={`Add ${c.image.split("/").pop()}`}
                    fit="contain"
                  />
                </div>
              )}
              {!isMore && (
                <div className="flex items-center gap-2 px-3 py-2.5 border-t border-border">
                  <div
                    className={`grid place-items-center size-7 rounded-lg ${c.chip} ${c.accent} shrink-0`}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif text-xs sm:text-sm leading-tight truncate">
                      {c.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">{c.subtitle}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Achievements() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="blob bg-mustard/30 size-72 sm:size-96 top-10 -right-32 animate-float" />
      <div className="blob bg-plum/25 size-60 sm:size-72 top-[50rem] -left-20 animate-float" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 md:px-10 py-14 sm:py-20 md:py-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-clay mb-5 sm:mb-6">
            — Achievements
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
            Certifications earned,{" "}
            <span className="italic bg-gradient-to-r from-clay to-plum bg-clip-text text-transparent">
              events shown up for
            </span>
            .
          </h1>
        </Reveal>

        {/* ---------------- Certifications — auto-scrolling strip ---------------- */}
        <section className="mt-16 sm:mt-20">
          <Reveal>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-2">Certifications</h2>
            
          </Reveal>

          <Reveal delay={0.1}>
            <CertificationsMarquee />
          </Reveal>
        </section>

        {/* ---------------- Participations ---------------- */}
        <section className="mt-20 sm:mt-24">
          <Reveal>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-2">Participations</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10">
              Where I've shown up, on and off the field.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {participations.map((b, i) => {
              const Icon = b.icon;
              const media = [
                b.photo ? { src: b.photo, label: "event photo", fit: "cover" as const } : null,
                b.certificate
                  ? { src: b.certificate, label: "certificate", fit: "contain" as const }
                  : null,
              ].filter(Boolean) as { src: string; label: string; fit: "cover" | "contain" }[];

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
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-30 group-hover:opacity-60 transition-opacity`}
                  />
                  <div className="relative">
                    <div
                      className={`inline-grid place-items-center size-10 rounded-xl bg-background/80 border border-border ${b.accent} mb-4`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl mb-1">{b.title}</h3>
                    <div className={`text-[11px] uppercase tracking-widest mb-3 ${b.accent}`}>
                      {b.role}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>

                    {media.length > 0 && (
                      <div
                        className={`mt-4 grid gap-2 ${media.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
                      >
                        {media.map((m) => (
                          <div
                            key={m.src}
                            className={`rounded-xl overflow-hidden border border-border ${
                              media.length === 1 ? "h-44 sm:h-52" : "h-28 sm:h-32"
                            }`}
                          >
                            <PhotoOrFallback
                              src={m.src}
                              alt={`${b.title} ${m.label}`}
                              label={`Add ${m.src.split("/").pop()}`}
                              fit={m.fit}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}