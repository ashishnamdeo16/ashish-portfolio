import Home from "./pages/Home/Home";
import type { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const pathname = (await headersList).get("x-pathname") || "/";

  const metaMap: Record<string, Metadata> = {
    "/": {
      title: "Ashish Namdeo | Software Engineer",
      description:
        "Portfolio of Ashish Namdeo – Software Engineer specializing in Backend, AI/ML, and Full-Stack development.",
    },
    "/about": {
      title: "About",
      description:
        "Learn more about Ashish Namdeo, his background, and journey as a software engineer.",
    },
    "/projects": {
      title: "Projects",
      description:
        "Explore real-world software engineering projects by Ashish Namdeo.",
    },
    "/skills": {
      title: "Skills",
      description:
        "Technical skills of Ashish Namdeo including Java, Spring Boot, React, and AWS.",
    },
    "/experience": {
      title: "Work Experience",
      description:
        "Professional experience of Ashish Namdeo in software engineering roles.",
    },
    "/contact": {
      title: "Contact",
      description:
        "Get in touch with Ashish Namdeo for software engineering opportunities.",
    },
  };

  const meta = metaMap[pathname] ?? metaMap["/"];

  return {
    ...meta,
    alternates: {
      canonical: `https://ashishnamdeo.com${pathname}`,
    },
  };
}

export default function Page() {
  return <Home />;
}
