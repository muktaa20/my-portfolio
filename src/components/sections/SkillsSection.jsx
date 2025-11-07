import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

import html from "../../assets/images/html.png";
import css from "../../assets/images/css.jpg";
import js from "../../assets/images/js.jpg";
import reactjs from "../../assets/images/reactjs.png";
import tailwind from "../../assets/images/tailwind.png";
import github from "../../assets/images/github.png";
import next from "../../assets/images/next.png";
import backend from "../../assets/images/backend.png";
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
  { name: "Next.js", image: next },
  { name: "Backend", image: backend },
  { name: "MongoDB", image: mongo },
];

export default function SkillsSection() {
  const { isDarkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const groupSize = 3;

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + groupSize) % KNOWN_SKILLS.length
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Get current group of skills (3 at a time)
  const currentSkills = KNOWN_SKILLS.slice(
    currentIndex,
    currentIndex + groupSize
  ).length
    ? KNOWN_SKILLS.slice(currentIndex, currentIndex + groupSize)
    : KNOWN_SKILLS.slice(currentIndex).concat(
        KNOWN_SKILLS.slice(0, (currentIndex + groupSize) % KNOWN_SKILLS.length)
      );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  return (
    <section
      id="skills"
      className={`py-16 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>

        {/* Known Skills (Grouped Auto Slider) */}
        <h3 className="text-xl font-semibold mb-8 text-center">Proficient In</h3>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-wrap justify-center gap-10"
            >
              {currentSkills.map((skill, index) => (
                <div
                  key={index}
                  className={`p-6 w-52 rounded-2xl shadow-md text-center hover:scale-105 transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-20 h-20 object-contain mx-auto mb-4"
                  />
                  <p className="text-lg font-medium">{skill.name}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Learning Skills */}
        <h3 className="text-xl font-semibold mt-16 mb-8 text-center">
          Currently Learning
        </h3>
        <div className="flex flex-wrap justify-center gap-10">
          {LEARNING_SKILLS.map((skill, index) => (
            <motion.div
              key={index}
              className={`p-6 w-52 rounded-2xl shadow-md text-center hover:scale-105 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={skill.image}
                alt={skill.name}
                className="w-20 h-20 object-contain mx-auto mb-4"
              />
              <p className="text-lg font-medium">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


