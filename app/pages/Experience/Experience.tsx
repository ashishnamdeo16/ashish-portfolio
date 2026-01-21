const experience = [
  {
    role: "Software Engineer Intern",
    company: "Marketeq Digital",
    duration: "Aug 2025 - Nov 2025",
    description: [
      "Created a robust database schema in MarketEQ and integrated it with the application for reliable data storage and retrieval.",
      "Optimized PostgreSQL performance through query optimization, index redesign, and execution plan analysis, reducing P95 API latency by 26 ms under production traffic."
    ],
    logo: "/assets/marketEq.webp",
  },
  {
    role: "Teaching Assistant",
    company: "CSUN",
    duration: "Jan 2025 - May 2025",
    description: [
      "Provided one-on-one and group tutoring sessions to students in computer science subjects, including programming, data structures, and algorithms.",
      "Assisted students in debugging code and solving technical problems using languages like Java, Python, and JavaScript.",
      "Led study groups to help students prepare for exams and complete programming assignments effectively.",
      "Collaborated with faculty to identify common learning challenges and create supplementary learning materials."
    ],
    logo: "/assets/CSUN.svg",
  },
  {
    role: "Software Engineer",
    company: "LogiNext Solutions",
    duration: "Oct 2021 - Jul 2024",
    description: [
      "Delivered a dynamic Form and List Builder spanning React and Java microservices,enabling real-time schema updates and reducing configuration effort by 40% for 100K+ daily users.",
      "Diagnosed and resolved 500+ critical production bugs, improving system reliability and delivering a ~20% performance gain across core application flows.",
      "Developed a scalable AWS Lambda–based microservice to retrieve and process order reports for 500,000+ daily orders, reducing manual data collection efforts by 50% and improving reporting efficiency.",
      "Migrated key application modules from AngularJS to ReactJS, collaborating closely with backend services to ensure seamless integration. Achieved an ~80% performance improvement, significantly enhancing responsiveness and UX.",
      "Designed and implemented a centralized Redmine Project Dashboard using ReactJS and Java to visualize project metrics, track task progress, and monitor team performance. Reduced report generation time by 60% for 15+ team members, streamlining project workflows.",
      "CMS Platform Leadership: Led the development of a custom CMS platform with a team of 3 engineers, using ReactJS and NodeJS to manage blogs, articles, and multimedia content. Improved content management efficiency by 35% and reduced publishing time by 25%.",
      "Built an intelligent Auto Assignment engine for trip management using order locations and saved configuration rules to automatically select optimal trips. Reduced manual assignment time by 20–25% across 10,000+ daily trips, improving operational efficiency.",
    ],
    logo: "/assets/loginext.png",
  },
];

type ExperienceItem = (typeof experience)[number];

interface ExperienceProps {
  darkModeFlag: boolean;
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ExperienceCard({
  item,
  darkModeFlag,
  side,
}: {
  item: ExperienceItem;
  darkModeFlag: boolean;
  side: "left" | "right";
}) {
  const isLeft = side === "left";

  const surface = darkModeFlag
    ? "bg-white/[0.04] border-white/10 text-slate-100"
    : "bg-black/[0.03] border-black/10 text-gray-900";

  const muted = darkModeFlag ? "text-slate-400" : "text-gray-500";
  const body = darkModeFlag ? "text-slate-200" : "text-gray-800";

  // “cool” border illusion: outer gradient + inner surface
  const outerGlow = darkModeFlag
    ? "from-white/15 via-white/5 to-transparent"
    : "from-black/15 via-black/5 to-transparent";

  return (
    <li className="relative grid md:grid-cols-2 md:gap-12">
      {/* Center line */}
      <div
        className={cx(
          "absolute left-4 top-0 h-full w-px md:left-1/2 md:-translate-x-1/2",
          darkModeFlag ? "bg-white/10" : "bg-black/10"
        )}
        aria-hidden="true"
      />

      {/* Dot + soft glow */}
      <div
        className={cx(
          "absolute left-4 top-8 h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2 md:-translate-x-1/2",
          darkModeFlag ? "bg-white/70" : "bg-black/40"
        )}
        aria-hidden="true"
      />
      <div
        className={cx(
          "absolute left-4 top-8 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl md:left-1/2 md:-translate-x-1/2",
          darkModeFlag ? "bg-white/15" : "bg-black/10"
        )}
        aria-hidden="true"
      />

      {/* Card column placement */}
      <div
        className={cx(
          "md:col-span-1",
          isLeft ? "md:col-start-1 md:pr-8" : "md:col-start-2 md:pl-8"
        )}
      >
        {/* Outer gradient border */}
        <div
          className={cx(
            "rounded-3xl p-[1px] bg-gradient-to-br",
            outerGlow
          )}
        >
          {/* Inner card */}
          <article
            className={cx(
              "group relative rounded-3xl border p-5 sm:p-6 backdrop-blur",
              surface,
              "transition-all duration-300",
              "hover:-translate-y-1 hover:shadow-[0_20px_80px_-40px_rgba(0,0,0,0.7)]"
            )}
          >
            {/* subtle shine */}
            <div
              className={cx(
                "pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                darkModeFlag
                  ? "bg-gradient-to-tr from-white/0 via-white/5 to-white/0"
                  : "bg-gradient-to-tr from-black/0 via-black/5 to-black/0"
              )}
              aria-hidden="true"
            />

            <div className="flex items-start gap-4">
              {item.logo ? (
                <div
                  className={cx(
                    "h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-2xl border overflow-hidden grid place-items-center",
                    darkModeFlag ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]"
                  )}
                >
                  <img
                    src={item.logo}
                    alt={`${item.company} logo`}
                    className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate text-base sm:text-lg font-semibold">
                      {item.role}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span
                        className={cx(
                          "inline-flex items-center rounded-full border px-2.5 py-1 text-xs",
                          darkModeFlag
                            ? "border-white/10 bg-white/[0.03] text-slate-200"
                            : "border-black/10 bg-black/[0.03] text-gray-800"
                        )}
                      >
                        {item.company}
                      </span>

                      <span className={cx("text-xs uppercase tracking-wider", muted)}>
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* tiny arrow accent (desktop) */}
                  <span
                    className={cx(
                      "hidden sm:inline-flex text-xs",
                      muted,
                      "transition-transform duration-300",
                      isLeft ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5"
                    )}
                    aria-hidden="true"
                  >
                    {/* {isLeft ? "↗" : "↖"} */}
                  </span>
                </div>

                <ul className={cx("mt-4 space-y-2 text-sm leading-relaxed", body)}>
                  {item.description.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span
                        className={cx(
                          "mt-2 h-1.5 w-1.5 rounded-full",
                          darkModeFlag ? "bg-white/50" : "bg-black/30"
                        )}
                      />
                      <span className="flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Empty column spacer so it truly alternates */}
      <div className={cx("hidden md:block", isLeft ? "md:col-start-2" : "md:col-start-1")} />
    </li>
  );
}

export default function Experience({ darkModeFlag }: ExperienceProps) {
  return (
    <section id="experience" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <h2
            className={cx(
              "text-3xl sm:text-4xl font-extrabold tracking-tight",
              darkModeFlag ? "text-white" : "text-gray-900"
            )}
          >
            Experience
          </h2>

          <p className={cx("mt-3 max-w-2xl text-sm sm:text-base", darkModeFlag ? "text-slate-400" : "text-gray-600")}>
            A timeline of roles where I shipped product, scaled systems, and improved performance.
          </p>
        </div>

        {/* Timeline */}
        <ol className="relative mt-10 space-y-6">
          {experience.map((item, index) => (
            <ExperienceCard
              key={`${item.company}-${item.role}-${index}`}
              item={item}
              darkModeFlag={darkModeFlag}
              side={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
