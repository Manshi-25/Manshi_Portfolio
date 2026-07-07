import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Send, Check, Loader2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Manshi Chauhan" },
      { name: "description", content: "Get in touch with Manshi Chauhan — email, GitHub, LinkedIn." },
      { property: "og:title", content: "Contact — Manshi Chauhan" },
      { property: "og:description", content: "Reach out for collaborations, internships or a chat." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://manshi-chauhan.me/contact` },
      { property: "og:image", content: "https://manshi-chauhan.me/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — Manshi Chauhan" },
      { name: "twitter:description", content: "Reach out for collaborations, internships or a chat." },
      { name: "twitter:image", content: "https://manshi-chauhan.me/og-image.png" },
    ],
    links: [{ rel: "canonical", href: `https://manshi-chauhan.me/contact` }],
  }),
  component: Contact,
});

const channels = [
  { Icon: Mail, label: "manshi25chauhan@gmail.com", href: "mailto:manshi25chauhan@gmail.com", color: "text-clay" },
  { Icon: Github, label: "github.com/Manshi-25", href: "https://github.com/Manshi-25", color: "text-foreground" },
  { Icon: Linkedin, label: "linkedin.com/in/manshi-chauhan", href: "https://www.linkedin.com/in/manshi-chauhan-860639315", color: "text-sky" },
  { Icon: Phone, label: "+91 9560794451", href: "tel:+919560794451", color: "text-sage" },
  { Icon: MapPin, label: "New Delhi, India", href: "#", color: "text-plum" },
];

type Status = "idle" | "loading" | "success" | "error";

function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("https://formsubmit.co/ajax/manshi25chauhan@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `Portfolio message from ${data.name}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    // FIX 1: removed the two animated blob divs — CSS blur + keyframe
    // animation was causing the whole page to repaint on every focus event
    <div className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-clay mb-6">— Contact</p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
          Let's build something <span className="italic text-clay">worth shipping</span>.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Drop a note and I'll get back within a day or two.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-14">
        {/* FIX 2: removed overflow-hidden + blur-3xl decorative div from inside
            the form — blur inside overflow:hidden repaints on every focus */}
        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-border bg-card p-6 md:p-10 grid gap-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field name="name" label="Your name" placeholder="Ada Lovelace" required />
            <Field name="email" type="email" label="Email" placeholder="you@example.com" required />
          </div>
          <Field name="message" label="Message" placeholder="Tell me about the idea, role or project…" textarea required />

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.p key="ok" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm text-sage">
                  <Check className="size-4" /> Sent — talk soon!
                </motion.p>
              ) : status === "error" ? (
                <motion.p key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-sm text-destructive">
                  Couldn't send: {errorMsg}. Try email directly.
                </motion.p>
              ) : (
                <motion.span key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground">
                  I read every message personally.
                </motion.span>
              )}
            </AnimatePresence>
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm hover:bg-clay transition-colors disabled:opacity-60"
            >
              {status === "loading"
                ? <Loader2 className="size-4 animate-spin" />
                : <Send className="size-4" />}
              {status === "loading" ? "Sending" : "Send message"}
            </button>
          </div>
        </form>
      </Reveal>

      <Reveal delay={0.25} className="mt-14">
        <div className="grid sm:grid-cols-2 gap-3">
          {channels.map(({ Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              // FIX 3: transition-colors instead of transition-all
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 hover:border-clay/60 transition-colors"
            >
              <span className={`grid place-items-center size-10 rounded-full bg-secondary ${color}`}>
                <Icon className="size-4" />
              </span>
              <span className="text-sm">{label}</span>
              <ArrowUpRight className="size-4 ml-auto text-muted-foreground group-hover:text-clay transition-colors" />
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

function Field({
  name, label, type = "text", placeholder, textarea, required,
}: { name: string; label: string; type?: string; placeholder?: string; textarea?: boolean; required?: boolean }) {
  // FIX 4: removed focus:ring-2 focus:ring-clay/20 and transition-all
  // Ring shadow + transition-all triggers full repaint on focus → hang
  const cls = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-clay transition-colors";
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={5} className={cls} maxLength={2000} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} required={required} className={cls} maxLength={200} />
      )}
    </label>
  );
}