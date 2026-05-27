export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  metrics?: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "authx",
    title: "AuthX",
    subtitle: "Authentication & Authorization",
    description:
      "Production-style auth service with OAuth2, JWT, Redis sessions, and Spring Security — built with SaaS-grade patterns.",
    role: "Full-stack · System design",
    metrics: "OAuth2 · Redis · MySQL",
    tags: ["Java", "Spring Security", "Redis", "MySQL", "OAuth2", "Maven"],
    imageUrl: "/assets/authx.webp",
    githubUrl: "https://github.com/ashishnamdeo16/authx",
    featured: true,
  },
  {
    id: "carpool",
    title: "Carpool",
    subtitle: "Ride-sharing Platform",
    description:
      "Connects riders and drivers for shared commutes — reducing emissions and coordinating daily travel efficiently.",
    role: "Full-stack development",
    metrics: "React + Java + MySQL",
    tags: ["React", "Java", "MySQL"],
    imageUrl: "/assets/CarPool.webp",
    githubUrl: "https://github.com/ashishnamdeo16/carpool",
    featured: true,
  },
  {
    id: "netguardian",
    title: "NetGuardian DPI",
    subtitle: "Network Security",
    description:
      "Deep packet inspection for traffic analysis, threat detection, and protocol identification across network flows.",
    role: "Backend · Security engineering",
    tags: ["Java", "Python", "Networking", "Security"],
    imageUrl: "/assets/netgd.webp",
    githubUrl: "https://github.com/ashishnamdeo16/netguardian-dpi",
  },
  {
    id: "journal-app-java",
    title: "Journal App",
    subtitle: "Habit & Productivity",
    description:
      "Java journal for habits, tasks, and growth tracking with a clean, intuitive interface and secure persistence.",
    role: "Backend · API design",
    tags: ["Java", "Redis", "Spring Security", "Maven"],
    imageUrl: "/assets/journalApp.webp",
    githubUrl: "https://github.com/ashishnamdeo16/journalApp",
  },
  {
    id: "habbit-doc",
    title: "HabbitDoc",
    subtitle: "AR Habit Tracker",
    description:
      "Flutter app blending Pomodoro focus, AR rewards, and progress tracking to boost motivation and consistency.",
    role: "Mobile · UX",
    tags: ["Flutter", "Dart", "AR", "UX"],
    imageUrl: "/assets/habbitDoc.webp",
    githubUrl: "https://github.com/ashishnamdeo16/SS12-ADHD-HabitDoc",
  },
  {
    id: "crazyM416",
    title: "CrazyM416",
    subtitle: "Gaming Blog",
    description:
      "Content platform for PUBG Mobile enthusiasts — articles, guides, and community-focused publishing.",
    role: "Content · WordPress",
    tags: ["WordPress", "SEO", "CMS"],
    imageUrl: "/assets/crazym416.webp",
    liveUrl: "https://crazym416.com/",
  },
  {
    id: "raipur-ra",
    title: "Raipur Radiance",
    subtitle: "VS Code Theme",
    description:
      "Warm orange-accented editor theme for a refreshing, high-contrast coding experience.",
    role: "Design · Extension",
    tags: ["VS Code", "Theme", "Design"],
    imageUrl: "/assets/Raipur_radiance.webp",
    liveUrl: "https://marketplace.visualstudio.com/items?itemName=AshishNamdeo.raipur-radiance",
  },
];

export const GITHUB_PROFILE = "https://github.com/ashishnamdeo16";
