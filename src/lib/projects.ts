import projNextstep from "@/assets/next-1.png";
import projCoral from "@/assets/reef-1.png";
import projVelara from "@/assets/vel-5.png";

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
  /** Extra screenshots — drop files in /public/projects/<slug>-1.jpg etc. */
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "next-step-admission",
    title: "Next Step Admission",
    year: "2025",
    role: "Product Development Project · 2025",
    tagline:
      "A student guidance platform that simplifies college discovery, admissions support, and study abroad planning.",
    headline: "Because choosing the right college shouldn't feel like guessing in the dark.",
    image: projNextstep,
    accent: "bg-clay/30",
    stack: ["React", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB", "JWT"],
    live: "https://nextstepadmission.vercel.app",
    github: "https://github.com/Manshi-25/NextStepAdmission",
    overview:
      "A full-stack web experience designed to make education decisions feel clearer, faster, and more personalized.",
    purpose:
      "Students often face too much scattered information when choosing a college, course, or study abroad path. The project aimed to turn that confusion into a guided, streamlined experience.",
    need: "There was a gap between what students needed, clear and personalized guidance, and what was commonly available, scattered and generic information. The platform was built to bridge that gap.",
    myRole:
      "I contributed to the product by building the interface, connecting the backend services, and supporting secure access so the experience felt reliable and scalable.",
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
    gallery: ["/projects/next-2.png", "/projects/next-3.png", "/projects/next-4.png"],
  },
  {
    slug: "coral-reef",
    title: "ReefVision",
    year: "2024",
    role: "Personal · Deep Learning",
    tagline:
      "Classify coral reefs as healthy or bleached from underwater images using four DL models.",
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
    need: "Traditional reef monitoring requires trained marine biologists to physically dive and assess corals it's slow, expensive, and impossible to scale. There had to be a smarter way.",
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
    gallery: ["/projects/reef-2.png", "/projects/reef-3.png", "/projects/reef-4.png"],
  },
  {
    slug: "velara",
    title: "Velara",
    year: "2026",
    role: "Full-Stack AI Product · 2026",
    tagline:
      "Where midnight visions find a voice. Explore the vast, surreal universe of human dreams.",
    headline: "An anonymous AI dream journal and interconnected subconscious universe.",
    image: projVelara,
    accent: "bg-plum/40",
    stack: [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Generative AI",
      "pgvector",
      "Recharts",
      "DiceBear",
    ],
    live: undefined,
    github: "https://github.com/Manshi-25/Velara",
    overview:
      "Velara is a full-stack digital sanctuary engineered to capture, interpret, and connect subconscious experiences. It offers an anonymous haven where users globally share their surreal midnight logs, decipher hidden psychological motifs with an intelligent AI companion, and map parallel dreamscapes through high-dimensional vector embeddings.",
    purpose:
      "Dreams represent our most vivid yet fleeting psychological experiences. Traditional morning journals fail to preserve these nuanced memories and lack deep analytical insight. Velara bridges this gap by transforming raw text memories into vivid visual art while linking shared human consciousness across global boundaries.",
    need:
      "Existing journaling platforms demand personal identifiers and lack automated symbolic interpretation. Velara addresses this with zero-compromise anonymity, combining dynamic avatar generation with AI-driven psychological analysis and vector similarity search.",
    myRole:
      "Designed and engineered Velara full-stack — architecting the anonymous Subconscious Feed, crafting Vesper (the real-time AI dream companion), integrating pgvector for semantic similarity mapping, and developing the automated AI visual art pipeline.",
    features: [
      "The Subconscious Feed: Anonymous global discovery stream (/feed, /explore, /trending) for exploring surreal midnight logs worldwide",
      "Vesper (AI Dream Companion): Intelligent conversational assistant analyzing subconscious symbols, emotional motifs, and psychological themes in real-time",
      "Vector Similarity Engine: Utilizes high-dimensional vector embeddings (pgvector) to connect users with parallel or identical dreamscapes",
      "Visual Dream Generator: Transforms raw text descriptions into high-resolution, stylized AI artwork",
      "Subconscious Analytics Dashboard: Interactive Recharts visualizing clarity indices, emotional spectrums, and temporal sleep patterns",
      "Privacy & Anonymity First: Complete identity protection via DiceBear dynamic avatars, magic link auth, and granular post controls",
    ],
    challenges: [
      "Tuning pgvector similarity search thresholds to reliably cluster abstract dream narratives across varying linguistic styles",
      "Optimizing Generative AI prompt pipelines for low-latency image generation from unstructured user text",
      "Engineering a zero-friction, privacy-preserving session architecture with granular post visibility settings",
    ],
    gallery: ["/projects/vel-1.png", "/projects/vel-2.png", "/projects/vel-3.png", "/projects/vel-4.png"],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);