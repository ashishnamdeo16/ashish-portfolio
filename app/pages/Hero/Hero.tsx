import { motion } from "framer-motion";

const Hero = () => {
    return (
         <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              Building systems that{" "}
              <span className="text-emerald-400">think</span>,{" "}
              <span className="text-yellow-300">perform</span>, and{" "}
              <span className="text-rose-400">look</span> beautiful.
            </motion.h1>
            <p className="mt-6 max-w-xl">
              I'm a Graduate Student specializing in AI/ML and Backend systems,
              blending clean UI, robust backend, and ML workflows.
            </p>
          </div>
          <div className="relative">
            <motion.img
              src="/assets/ashish.webp"
              alt="Ashish Namdeo"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full max-w-xs md:max-w-sm h-auto aspect-3/4 rounded-3xl object-cover shadow-2xl mx-auto"
            />
          </div>
        </section>
    );
};

export default Hero;