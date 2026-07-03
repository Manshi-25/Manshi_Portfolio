import projNextstep from "@/assets/proj-nextstep.jpg";
import projCoral from "@/assets/proj-coral.jpg";
import projVelara from "@/assets/proj-velara.jpg";

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  tagline: string;
  headline?: string;
  image: string;
  accent: string;
  stack: string[];
  live?: string;
  github: string;
  overview: string;
  purpose?: string;
  need?: string;
  myRole?: string;
  features: string[];
  challenges?: string[];
};

export const projects: Project[] = [
  {
    slug: "next-step-admission",
    title: "Next Step Admission",
    year: "2025",
    role: "Web Developer Intern · Jun-Jul 2025",
    tagline: "AI-driven admission guidance platform helping students discover and apply to colleges.",
    headline: "Because choosing the right college shouldn't feel like guessing in the dark.",
    image: projNextstep,
    accent: "bg-clay/30",
    stack: ["React", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB", "JWT"],
    live: "https://nextstepadmission.vercel.app",
    github: "https://github.com/Manshi-25/NextStepAdmission",
    overview:
      "A platform that turns the chaos of college research into one clear, personal flow which is fast, clean, and built to scale.",
    purpose:
      "Every year, thousands of students in India face one of these most stressful decisions of their lives like which college, which course, which future? They scroll endlessly, get overwhelmed with information, and often make choices based on incomplete data.",
    need:
      "There was a gap between what students needed (clear, personalized guidance) and what was available (scattered, generic information). Next Step Admission was built to bridge that.",
    myRole:
      "As a Web Developer Intern, I built and optimized core features of the platform, from frontend components to backend API connections by ensuring the experience was fast, clean, and intuitive.",
    features: [
      "AI-powered college recommendations from user preferences",
      "JWT-secured auth with protected routes",
      "Mobile-first responsive UI with modular architecture",
      "MongoDB-backed REST API",
    ],
    challenges: [
      "Designing a recommendation flow that stays fast at scale",
      "Hardening auth and session handling for real users",
    ],
  },
  {
    slug: "coral-reef",
    title: "ReefVision",
    year: "2024",
    role: "Personal · Deep Learning",
    tagline: "Classify coral reefs as healthy or bleached from underwater images using four DL models.",
    headline: "The ocean can't speak. So I built something that could.",
    image: projCoral,
    accent: "bg-sage/40",
    stack: ["Python", "TensorFlow Lite", "Flask", "React", "Vite", "MongoDB Atlas"],
    live: "https://reefvision.vercel.app",
    github: "https://github.com/Manshi-25/ReefVision",
    overview:
      "A full-stack ML web app for marine ecosystem monitoring upload, infer, log. Healthy or bleached, with confidence.",
    purpose:
      "Coral reefs cover less than 1% of the ocean floor yet they support over 25% of all marine life. But they're dying. Bleaching events, rising ocean temperatures, and pollution are wiping them out faster than scientists can track manually.",
    need:
      "Traditional reef monitoring requires trained marine biologists to physically dive and assess corals it's slow, expensive, and impossible to scale. There had to be a smarter way.",
    features: [
      "CNN, ResNet50, DenseNet and EfficientNet pick a model per request",
      "TensorFlow Lite inference for low-latency predictions",
      "Prediction history persisted in MongoDB Atlas",
      "Flask REST API on Render, React frontend on Vercel",
    ],
    challenges: [
      "Cold-start handling on Render for the inference backend",
      "Absolute path loading for TFLite models in cloud",
      "Tuning CORS between Vercel frontend and Render backend",
    ],
  },
  {
    slug: "velara",
    title: "Velara",
    year: "2026",
    role: "Personal · AI Product",
    tagline: "A conversational discovery surface chat and explore woven into one calm interface.",
    headline: "Conversation and discovery, in one calm surface.",
    image: projVelara,
    accent: "bg-plum/40",
    stack: ["TypeScript", "React", "Vite"],
    live: undefined,
    github: "https://github.com/Manshi-25/Velara",
    overview:
      "An in-progress AI experience that pairs a chat thread with an exploratory canvas. Frontend-first interface craft before backend.",
    features: [
      "Unified chat + explore layout",
      "TypeScript-strict frontend architecture",
      "Designed for fast iteration on prompt and UX patterns",
    ],
    challenges: ["Shaping conversational UI that doesn't feel like another chatbot"],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);