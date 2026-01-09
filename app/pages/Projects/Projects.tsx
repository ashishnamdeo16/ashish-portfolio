import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  url?: string;
};

const projects: Project[] = [
  {
    id: 'journal-app-java',
    title: 'My Journal App',
    subtitle: 'Habit & Productivity Tracker',
    description: 'A Java-based journal app to track habits, manage tasks, and monitor personal growth with an intuitive interface.',
    tags: ['Java', 'Redis', 'Spring Security', 'Maven'],
    imageUrl: '/assets/journalApp.webp',
    url: 'https://github.com/ashishnamdeo16/journalApp'
  },
  {
    id: 'habbit-doc',
    title: 'HabbitDoc',
    subtitle: 'Habit app with AR rewards',
    description: 'A Flutter app combining Pomodoro productivity, AR rewards, and progress tracking to boost focus and motivation.',
    tags: ['Flutter','Dart', 'AR', 'UX'],
    imageUrl: '/assets/habbitDoc.webp',
    url: 'https://github.com/ashishnamdeo16/SS12-ADHD-HabitDoc'
  },
  {
    id: 'raipur-ra',
    title: 'Raipur Radiance Theme',
    subtitle: 'VS Code Theme',
    description: 'Raipur Radiance is a vibrant VS Code theme with warm orange accents for a refreshing coding experience.',
    tags: ['JSON Configuration', 'Color Palette Design'],
    imageUrl: '/assets/Raipur_radiance.webp',
    url: 'https://marketplace.visualstudio.com/items?itemName=AshishNamdeo.raipur-radiance'
  },
  {
    id: 'crazyM416',
    title: 'CrazyM416',
    subtitle: 'Gaming Blog',
    description: 'Comprehensive blog dedicated to PUBG Mobile enthusiasts and tech-savvy individuals.',
    tags: ['WordPress'],
    imageUrl: '/assets/crazym416.webp',
    url: 'https://crazym416.com/'
  },
];

export default function Projects({ darkModeFlag }: any) {
  const cardBg = darkModeFlag
    ? 'bg-gradient-to-br from-slate-900/70 to-slate-800/60 border border-slate-700 text-slate-200 backdrop-blur-md'
    : 'bg-gradient-to-br from-white/70 to-gray-100/70 border border-gray-300 text-gray-900 backdrop-blur-md';

  return (
    <section id="projects" className="space-y-12 py-12 px-4 md:px-8">
      <h2 className={`text-4xl font-bold text-center mb-12 ${darkModeFlag ? 'text-slate-100' : 'text-gray-900'}`}>
        My Projects
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, index) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.15, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.05, rotateX: 2, rotateY: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            className={`${cardBg} rounded-3xl p-6 cursor-pointer transform-gpu transition-all duration-300`}
          >
            <div className="relative overflow-hidden rounded-2xl mb-4">
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
            </div>

            <h3 className="font-semibold text-xl mb-1">{p.title}</h3>
            <p className={`text-sm mb-3 ${darkModeFlag ? 'text-slate-400' : 'text-gray-600'}`}>{p.subtitle}</p>
            <p className={`text-sm mb-4 ${darkModeFlag ? 'text-slate-300' : 'text-gray-700'}`}>{p.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags.map((t) => (
                <motion.span
                  key={t}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className={`text-xs font-medium px-3 py-1 rounded-full shadow-sm ${darkModeFlag ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-800'}`}
                >
                  {t}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-3">
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-emerald-400 text-black font-semibold hover:bg-emerald-500 transition-colors"
                >
                  Live Demo <FaExternalLinkAlt size={12} />
                </motion.button>
              </a>
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border ${darkModeFlag ? 'border-slate-600 hover:border-emerald-400' : 'border-gray-300 hover:border-emerald-400'} font-semibold transition-colors`}
                >
                  Code <FaGithub size={14} />
                </motion.button>
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
