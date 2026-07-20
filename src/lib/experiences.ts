import next from "@/assets/next-1.png";

export type ExperienceVideo = {
  title: string;
  url: string;
  youtubeId?: string;
  description?: string;
};

export type ExperienceItem = {
  slug: string;
  role: string;
  company: string;
  period: string;
  location: string;
  link?: string;
  shortDesc: string;
  description: string;
  responsibilities?: string[];
  techStack?: string[];
  takeaways: { title: string; body: string }[];
  images?: string[];
  videos?: ExperienceVideo[];
  accentColor: string;
  badgeBg: string;
  badgeText: string;
};

export const experiences: ExperienceItem[] = [
  {
    slug: "next-step-admission",
    role: "Web Developer Intern",
    company: "Next Step Admission",
    period: "2025 · Internship",
    location: "Remote",
    link: "https://nextstepadmission.vercel.app",
    shortDesc:
      "Full-stack admission platform for student counselling, featuring scalable React UI, Node.js REST APIs, and role-based JWT auth.",
    description:
      "An admission platform built to help students find and apply to the right college. I joined as a Web Developer Intern and worked across the stack - from building the UI students interact with, to the APIs and auth that power it behind the scenes.",
    responsibilities: [
      "Built and shipped user-facing features for a live admission-counselling platform used by real students, from wireframe to deployed code.",
      "Developed reusable React components and pages, focused on clean, scalable UI that could grow with new admission verticals.",
      "Designed and integrated REST APIs with Node.js, handling data for student enquiries, counsellor dashboards and admission workflows.",
      "Implemented JWT-based authentication and role-based access so students, counsellors and admins each saw the right view.",
      "Worked with MongoDB to model and query admission data efficiently as the platform's user base grew.",
      "Collaborated directly with the founding team debugging production issues, iterating on feedback, and shipping fixes fast.",
    ],
    techStack: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT Auth",
      "REST APIs",
      "Tailwind CSS",
    ],
    takeaways: [
      {
        title: "Shipping over perfecting",
        body: "Learned to balance clean architecture with the reality of deadlines — ship something solid, then iterate.",
      },
      {
        title: "Owning a feature end-to-end",
        body: "Went from a task description to a deployed feature myself — planning, building, testing and handling edge cases.",
      },
      {
        title: "Real users, real feedback",
        body: "Working on a live product meant every bug and every UX decision had real consequences, which sharpened my instincts fast.",
      },
    ],
    images: [next, "/projects/next-2.png", "/projects/next-3.png"],
    accentColor: "from-clay to-plum",
    badgeBg: "bg-clay/15",
    badgeText: "text-clay",
  },
  {
    slug: "bunktobrains",
    role: "EM and PAI Faculty",
    company: "BunkToBrains",
    period: "2025 · Faculty",
    location: "Hybrid",
    link: "https://bunktobrains.com/",
    shortDesc:
      "EM & Python Artificial Intelligence (PAI) Faculty mentoring learners, designing practical ML curricula, and leading live hands-on workshops.",
    description:
      "As EM & Python Artificial Intelligence (PAI) Faculty at BunkToBrains, I educate and mentor students in core Python programming, Machine Learning algorithms, and practical AI applications. I design interactive course modules, lead live coding sessions, and guide learners through building real-world AI projects.",
    takeaways: [
      {
        title: "Deepening concepts through teaching",
        body: "Explaining complex AI architectures and algorithms to students forced me to master the underlying fundamentals inside out.",
      },
      {
        title: "Impactful technical mentorship",
        body: "Helping students overcome coding bottlenecks and build real confidence in AI engineering has been deeply rewarding.",
      },
      {
        title: "Curriculum & pedagogical clarity",
        body: "Learned how to break down advanced machine learning topics into intuitive, step-by-step learning paths.",
      },
    ],
    videos: [
      {
        title: "EM & PAI Session - Featured Lecture",
        url: "https://youtu.be/MkTPE8CrOIY?si=I2zeDNmKpb8SsVsY",
        youtubeId: "MkTPE8CrOIY",
        description: "Featured lecture session covering EM & Python AI core concepts.",
      },
      {
        title: "PAI Lecture Session - Part 1",
        url: "https://youtu.be/o1jFD-lu9YE?si=8gXoLlXHFeHOjP9X",
        youtubeId: "o1jFD-lu9YE",
        description: "Live interactive teaching session on Python & AI fundamentals.",
      },
      {
        title: "PAI Lecture Session - Part 2",
        url: "https://youtu.be/P2_d2IsQhL0?si=2JJFdy7dR7Eb5Wnb",
        youtubeId: "P2_d2IsQhL0",
        description: "Deep dive into data structures and core machine learning algorithms.",
      },
      {
        title: "PAI Lecture Session - Part 3",
        url: "https://youtu.be/pys6wMfRPY8?si=jK2-Dcifp6Jr_76C",
        youtubeId: "pys6wMfRPY8",
        description: "Hands-on coding walkthrough and neural network concepts.",
      },
      {
        title: "PAI Lecture Session - Part 4",
        url: "https://youtu.be/A2-pgvzPNFQ?si=D-GXFrPVJVq3Kw9q",
        youtubeId: "A2-pgvzPNFQ",
        description: "Interactive student Q&A, project guidance, and practical model evaluation.",
      },
    ],
    accentColor: "from-plum to-mustard",
    badgeBg: "bg-plum/15",
    badgeText: "text-plum",
  },
];

export const experienceBySlug = (slug: string) => experiences.find((e) => e.slug === slug);
