

const experience = [
  {
    role: 'Software Engineer Intern',
    company: 'Marketeq Digital',
    duration: 'Aug 2025 - Nov 2025',
    description: ['Created a robust database schema in MarketEQ and integrated it with the application for reliable data storage and retrieval.'],
    logo: '/assets/marketEq.webp',
  },
  {
    role: 'Teaching Assistant',
    company: 'CSUN',
    duration: 'Jan 2025 - May 2025',
   description: [
      'Focused on AI/ML and backend systems, including data pipelines and model prototyping.',
      'Completed multiple hands-on projects using Python, TensorFlow, and PyTorch.',
    ],
    logo: '/assets/CSUN.svg',
  },
  {
    role: 'Software Engineer',
    company: 'LogiNext Solutions',
    duration: 'Oct 2021 - Jul 2024',
    description: [
      'Built a dynamic Form & List Builder enabling real-time customization, reducing form creation time by 40% for 100,000+ daily users.',
      'Led the migration from AngularJS to ReactJS, improving application performance and responsiveness by 80%.',
      'Developed an Auto Assignment system for trip management, reducing manual assignment time by 20–25% across 10,000+ daily trips.',
      'Built an AWS Lambda–based microservice to process 500,000+ daily orders, reducing manual reporting efforts by 50%.',
    ],
    logo: '/assets/loginext.png',
  }
  
];

  
interface ExperienceProps {
  darkModeFlag: boolean;
}

const Experience = ({ darkModeFlag }: ExperienceProps) => {
  const cardBg = darkModeFlag
    ? 'from-slate-800 to-neutral-800 border border-slate-700 text-slate-300'
    : 'from-white to-gray-100 border border-gray-300 text-gray-800';

  return (
    <section id="experience" className="space-y-10 py-16">
      <h2 className="text-3xl font-extrabold tracking-wide text-center">
        Experience
      </h2>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div
            key={index}
            className={`flex p-6 rounded-xl bg-linear-to-br ${cardBg} transition-transform duration-200 hover:scale-[1.02]`}
          >
            {/* Logo */}
            {exp.logo && (
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-16 h-16 object-contain rounded-md mr-5 md:items-center self-center"
              />
            )}

            {/* Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <span
                  className={`font-semibold text-lg ${
                    darkModeFlag ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {exp.role} @ {exp.company}
                </span>

                <span
                  className={`text-xs uppercase tracking-wider ${
                    darkModeFlag ? 'text-slate-400' : 'text-gray-500'
                  } mt-1 md:mt-0`}
                >
                  {exp.duration}
                </span>
              </div>

              {/* Bullet Points */}
              <ul className="mt-2 space-y-2 text-sm leading-relaxed">
                {exp.description.map((point, i) => (
                  <li
                    key={i}
                    className={`list-disc ml-5 ${
                      darkModeFlag ? 'text-slate-300' : 'text-gray-700'
                    }`}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;