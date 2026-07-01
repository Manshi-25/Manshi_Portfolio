import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Floating Lines background (inspired by reactbits.dev/backgrounds/floating-lines,
 * reimplemented from scratch): a handful of soft, wavy lines drift slowly
 * across the canvas in your theme colors. Pure canvas + requestAnimationFrame,
 * paused when the tab isn't visible and skipped entirely for
 * prefers-reduced-motion. Line count is reduced on narrow viewports to stay
 * light on mobile.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const el = canvas;
    const c2d = ctx;

    const themeColors = getThemeColors();

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;

    const isMobile = window.innerWidth < 640;
    const lineCount = isMobile ? 6 : 11;

    const lines = Array.from({ length: lineCount }, (_, i) => ({
      baseY: Math.random(),
      amplitude: 30 + Math.random() * 60,
      frequency: 0.6 + Math.random() * 1.1,
      speed: 0.06 + Math.random() * 0.1,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.00015,
      width: 1 + Math.random() * 1.4,
      color: themeColors[i % themeColors.length],
      opacity: 0.1 + Math.random() * 0.16,
    }));

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      el.width = width * dpr;
      el.height = height * dpr;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    function draw() {
      if (!running) return;
      c2d.clearRect(0, 0, width, height);
      for (const line of lines) {
        c2d.beginPath();
        const centerY = line.baseY * height;
        for (let x = 0; x <= width; x += 8) {
          const y =
            centerY +
            Math.sin(x * 0.003 * line.frequency + t * line.speed + line.phase) * line.amplitude +
            Math.sin(x * 0.0011 + t * line.speed * 0.5) * line.amplitude * 0.3;
          if (x === 0) c2d.moveTo(x, y);
          else c2d.lineTo(x, y);
        }
        c2d.strokeStyle = line.color;
        c2d.globalAlpha = line.opacity;
        c2d.lineWidth = line.width;
        c2d.stroke();
        line.baseY += line.drift;
        if (line.baseY < -0.1) line.baseY = 1.1;
        if (line.baseY > 1.1) line.baseY = -0.1;
      }
      c2d.globalAlpha = 1;
      t += 1;
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    function onVisibility() {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
}

// Resolves the theme's CSS custom properties to actual color strings the
// canvas API can use (canvas can't read var(--clay) directly).
function getThemeColors(): string[] {
  if (typeof window === "undefined") return ["#c76c42", "#945173", "#d4a84f", "#8a9a7e"];
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => {
    const v = styles.getPropertyValue(name).trim();
    return v || fallback;
  };
  return [
    read("--clay", "#c76c42"),
    read("--plum", "#945173"),
    read("--mustard", "#d4a84f"),
    read("--sage", "#8a9a7e"),
  ];
}
