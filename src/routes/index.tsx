import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect } from "react";
import { ArrowDown } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manshi Chauhan — Portfolio" },
      { name: "description", content: "AI/ML Engineer & Full-Stack Developer." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  const enter = () => navigate({ to: "/home" });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={enter}
      role="button"
      tabIndex={0}
      aria-label="Enter portfolio"
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden bg-background select-none"
    >
      {/* gradient blobs */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="blob bg-clay/40 size-[40rem] -top-40 -left-40 animate-float"
      />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.1 }}
        className="blob bg-plum/40 size-[34rem] -bottom-40 -right-32 animate-float"
        style={{ animationDelay: "1.2s" }}
      />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
        className="blob bg-mustard/30 size-[26rem] top-1/3 left-1/2 animate-float"
        style={{ animationDelay: "0.6s" }}
      />

      {/* grain texture */}
      <div className="absolute inset-0 grain opacity-[0.15] pointer-events-none" />

      <div className="relative h-full w-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-xs md:text-sm uppercase tracking-[0.4em] text-clay mb-8"
        >
          — Portfolio · 2026
        </motion.p>

        <h1 className="font-serif leading-[0.95] tracking-tight text-balance">
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Manshi
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block italic text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-clay via-plum to-mustard bg-clip-text text-transparent pb-2"
          >
            Chauhan
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-8 max-w-md text-base md:text-lg text-muted-foreground"
        >
          AI/ML engineer & full-stack developer.<br className="hidden sm:block" />
          Building thoughtful software at the edges of research and craft.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="grid place-items-center size-10 rounded-full border border-border bg-background/60 backdrop-blur"
          >
            <ArrowDown className="size-4 text-clay" />
          </motion.div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Tap anywhere to enter
          </span>
        </motion.div>
      </div>
    </div>
  );
}
