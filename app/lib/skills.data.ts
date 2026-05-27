import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiHtml5,
  SiCss3,
  SiPython,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiApachekafka,
  SiDocker,
  SiKubernetes,
  SiAmazons3,
  SiGit,
  SiSwagger,
  SiJunit5,
  SiHibernate,
  SiPrometheus,
  SiElasticsearch,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
  SiPostman,
  SiLinux,
  SiGradle,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

export type SkillEntry = {
  name: string;
  icon: IconType;
  level?: number;
};

export type SkillCategory = {
  id: string;
  label: string;
  description: string;
  skills: SkillEntry[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    description: "Core languages I write production code in.",
    skills: [
      { name: "Java", icon: FaJava, level: 90 },
      { name: "JavaScript", icon: SiJavascript, level: 90 },
      { name: "TypeScript", icon: SiTypescript, level: 85 },
      { name: "Python", icon: SiPython, level: 85 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces, design systems, and client performance.",
    skills: [
      { name: "React", icon: SiReact, level: 88 },
      { name: "HTML5", icon: SiHtml5, level: 95 },
      { name: "CSS3", icon: SiCss3, level: 92 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "APIs, services, and distributed systems.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: 82 },
      { name: "Spring Boot", icon: FaJava, level: 88 },
      { name: "Swagger", icon: SiSwagger, level: 85 },
      { name: "JUnit", icon: SiJunit5, level: 82 },
      { name: "Hibernate", icon: SiHibernate, level: 82 },
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    description: "Models, pipelines, and intelligent features.",
    skills: [
      { name: "Python ML", icon: SiPython, level: 80 },
      { name: "TensorFlow", icon: SiTensorflow, level: 72 },
      { name: "PyTorch", icon: SiPytorch, level: 70 },
      { name: "OpenAI APIs", icon: SiOpenai, level: 75 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    description: "Storage, caching, and data modeling.",
    skills: [
      { name: "MongoDB", icon: SiMongodb, level: 80 },
      { name: "MySQL", icon: SiMysql, level: 78 },
      { name: "Redis", icon: SiRedis, level: 75 },
      { name: "Elasticsearch", icon: SiElasticsearch, level: 68 },
    ],
  },
  {
    id: "cloud-devops",
    label: "Cloud / DevOps",
    description: "Deploy, observe, and scale reliably.",
    skills: [
      { name: "AWS S3", icon: SiAmazons3, level: 76 },
      { name: "Docker", icon: SiDocker, level: 83 },
      { name: "Kubernetes", icon: SiKubernetes, level: 70 },
      { name: "Kafka", icon: SiApachekafka, level: 72 },
      { name: "Prometheus", icon: SiPrometheus, level: 72 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    description: "Workflow, testing, and collaboration.",
    skills: [
      { name: "Git", icon: SiGit, level: 90 },
      { name: "Linux", icon: SiLinux, level: 80 },
      { name: "Postman", icon: SiPostman, level: 85 },
      { name: "Maven", icon: FaJava, level: 82 },
      { name: "Gradle", icon: SiGradle, level: 75 },
    ],
  },
];
