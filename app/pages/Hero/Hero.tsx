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
    I’m a Graduate Student passionate about building reliable, scalable software systems, spanning modern web frontends, backend services, and cloud infrastructure.
  </p>
          </div>
         <div className="relative w-72 md:w-80 lg:w-96 md:h-105 lg:h-120 overflow-hidden rounded-3xl shadow-2xl mx-auto">
  <motion.img
    src="/assets/ashish1.webp"
    alt="Ashish Namdeo"
    initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
    className="w-full h-full object-cover object-top"
  />
</div>
        </section>
    );
};

export default Hero;