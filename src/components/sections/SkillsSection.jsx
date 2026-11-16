import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import html from "../../assets/images/html.png";
import css from "../../assets/images/css.jpg";
import js from "../../assets/images/js.jpg";
import reactjs from "../../assets/images/reactjs.png";
import tailwind from "../../assets/images/tailwind.png";
import github from "../../assets/images/github.png";
import { SiNodedotjs, SiExpress } from "react-icons/si";
import mongo from "../../assets/images/mongodb.png";

const KNOWN_SKILLS = [
  { name: "HTML", image: html },
  { name: "CSS", image: css },
  { name: "JavaScript", image: js },
  { name: "ReactJS", image: reactjs },
  { name: "Tailwind CSS", image: tailwind },
  { name: "GitHub", image: github },
];

const LEARNING_SKILLS = [
  { name: "Node.js", Icon: SiNodedotjs, color: "#539E43" },
  { name: "Express.js", Icon: SiExpress, color: "currentColor" },
  { name: "MongoDB", image: mongo },
];

const GROUP_SIZE = 3;

const SkillCard = ({ skill }) => (
  <div className="group flex w-44 flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 sm:w-52 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-slate-50 p-3 transition group-hover:scale-105 dark:bg-white/5">
      {skill.Icon ? (
        <skill.Icon
          size={52}
          style={{ color: skill.color }}
          className="text-slate-800 dark:text-white"
          aria-label={`${skill.name} logo`}
        />
      ) : (
      <img
        src={skill.image}
        alt={`${skill.name} logo`}
        className="h-full w-full object-contain"
        loading="lazy"
      />
      )}
    </div>
    <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
      {skill.name}
    </p>
  </div>
);

export default function SkillsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + GROUP_SIZE) % KNOWN_SKILLS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentSkills = Array.from({ length: GROUP_SIZE }, (_, i) => {
    return KNOWN_SKILLS[(currentIndex + i) % KNOWN_SKILLS.length];
  });

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
            Tools I use
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            My <span className="text-gradient">Skills</span>
          </h2>
        </div>

        <h3 className="mb-8 text-center text-lg font-semibold text-slate-700 dark:text-slate-300">
          I Know Well
        </h3>
        <div className="flex min-h-[15rem] justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-8"
            >
              {currentSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <h3 className="mb-8 mt-20 text-center text-lg font-semibold text-slate-700 dark:text-slate-300">
          Currently Learning
        </h3>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {LEARNING_SKILLS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
