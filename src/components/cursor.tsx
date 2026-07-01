import { useEffect, useRef } from "react";

/**
 * Canvas Cursor — fluid trailing-line effect, ported as-is from
 * cursify.vercel.app/components/canvas-cursor's spring-chain algorithm
 * (each line is a chain of nodes; the head node chases the pointer,
 * every following node chases the one ahead of it with spring +
 * damping physics). Physics parameters (spring, friction, trails,
 * size, dampening, tension) are kept identical to the original so the
 * motion feels exactly the same — the only change is recoloring the
 * rainbow hsla() hue-cycle to the site's clay/plum/mustard/sage theme
 * colors instead.
 * Disabled on touch devices and prefers-reduced-motion; pauses when the
 * tab is hidden.
 */
type NodePoint = { x: number; y: number; vx: number; vy: number };

type Line = {
  spring: number;
  friction: number;
  nodes: NodePoint[];
};

const CONFIG = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

// Oscillator that drifts smoothly back and forth — used to pick a
// position along the theme palette over time (replaces the original's
// rainbow hue oscillator).
class Oscillator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  private current = 0;
  constructor(opts: { phase?: number; offset?: number; frequency?: number; amplitude?: number }) {
    this.phase = opts.phase ?? 0;
    this.offset = opts.offset ?? 0;
    this.frequency = opts.frequency ?? 0.001;
    this.amplitude = opts.amplitude ?? 1;
  }
  update() {
    this.phase += this.frequency;
    this.current = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.current;
  }
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const el = canvas;
    const c2d = ctx;

    const palette = getThemePalette();
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

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

    const pos = { x: width / 2, y: height / 2 };
    let hasMoved = false;

    function makeLine(): Line {
      const nodes: NodePoint[] = [];
      for (let i = 0; i < CONFIG.size; i++) {
        nodes.push({ x: pos.x, y: pos.y, vx: 0, vy: 0 });
      }
      return {
        spring: 0.4 + 0.1 * Math.random() - 0.02,
        friction: CONFIG.friction + 0.01 * Math.random() - 0.002,
        nodes,
      };
    }

    const lines: Line[] = Array.from({ length: CONFIG.trails }, () => makeLine());

    // Slow oscillator sweeps a position 0..1 across the theme palette,
    // mirroring the original's hue oscillator but constrained to the
    // site's own colors instead of the full rainbow.
    const colorWave = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 0.5,
      frequency: 0.0015,
      offset: 0.5,
    });

    function updateLine(line: Line) {
      let spring = line.spring;
      const head = line.nodes[0];
      head.vx += (pos.x - head.x) * spring;
      head.vy += (pos.y - head.y) * spring;

      for (let i = 0; i < line.nodes.length; i++) {
        const node = line.nodes[i];
        if (i > 0) {
          const prev = line.nodes[i - 1];
          node.vx += (prev.x - node.x) * spring;
          node.vy += (prev.y - node.y) * spring;
          node.vx += prev.vx * CONFIG.dampening;
          node.vy += prev.vy * CONFIG.dampening;
        }
        node.vx *= line.friction;
        node.vy *= line.friction;
        node.x += node.vx;
        node.y += node.vy;
        spring *= CONFIG.tension;
      }
    }

    function drawLine(line: Line) {
      const nodes = line.nodes;
      let x = nodes[0].x;
      let y = nodes[0].y;
      c2d.beginPath();
      c2d.moveTo(x, y);
      let i = 1;
      for (const len = nodes.length - 2; i < len; i++) {
        const a = nodes[i];
        const b = nodes[i + 1];
        x = 0.5 * (a.x + b.x);
        y = 0.5 * (a.y + b.y);
        c2d.quadraticCurveTo(a.x, a.y, x, y);
      }
      const a = nodes[i];
      const b = nodes[i + 1];
      c2d.quadraticCurveTo(a.x, a.y, b.x, b.y);
      c2d.stroke();
      c2d.closePath();
    }

    let raf = 0;
    let running = true;

    function render() {
      if (!running) return;
      c2d.globalCompositeOperation = "source-over";
      c2d.clearRect(0, 0, width, height);
      c2d.globalCompositeOperation = "lighter";
      c2d.strokeStyle = sampleThemeColor(palette, colorWave.update());
      c2d.lineWidth = 1;
      c2d.globalAlpha = 0.2;
      if (hasMoved) {
        for (const line of lines) {
          updateLine(line);
          drawLine(line);
        }
      }
      c2d.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    }

    function onMove(e: MouseEvent) {
      pos.x = e.clientX;
      pos.y = e.clientY;
      hasMoved = true;
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
        hasMoved = true;
      }
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    raf = requestAnimationFrame(render);

    function onVisibility() {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(render);
      else cancelAnimationFrame(raf);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}

function getThemePalette(): string[] {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return [
    read("--clay", "#c76c42"),
    read("--mustard", "#d4a84f"),
    read("--plum", "#945173"),
    read("--sage", "#8a9a7e"),
  ];
}

// Picks a color along the palette using t in [0,1], blending between the
// two nearest theme colors so the stroke drifts smoothly instead of
// hard-cutting between hues.
function sampleThemeColor(palette: string[], t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (palette.length - 1);
  const index = Math.floor(scaled);
  return palette[Math.min(index, palette.length - 1)];
}
