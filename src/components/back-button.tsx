import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function BackButton() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Hide on landing and home
  if (pathname === "/" || pathname === "/home") return null;
  // Detail pages already have their own back link
  if (/^\/(work|research)\/[^/]+$/.test(pathname)) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10 pt-6"
    >
      <Link
        to="/home"
        className="group inline-flex items-center gap-2 text-xs sm:text-sm px-3.5 py-2 rounded-full border border-border bg-card hover:border-clay/60 hover:text-clay transition-all"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back
      </Link>
    </motion.div>
  );
}
