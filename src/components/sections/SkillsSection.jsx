import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  FileCode,
  FileJson,
  Atom,
  Wind,
  Layers,
  Database,
  GitBranch,
  Cloud,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

// --- Skills Data ---
const KNOWN_SKILLS = [
  { name: "HTML", icon: <FileCode size={50} /> },
  { name: "CSS", icon: <Code size={50} /> },
  { name: "JavaScript", icon: <FileJson size={50} /> },
  { name: "ReactJS", icon: <Atom size={50} /> },
  { name: "Tailwind CSS", icon: <Wind size={50} /> },
  { name: "Git", icon: <GitBranch size={50} /> },
];

const LEARNING_SKILLS = [
  { name: "Next.js", icon: <Layers size={50} /> },
  { name: "Backend", icon: <Cloud size={50} /> },
  { name: "MongoDB", icon: <Database size={50} /> },
];

export default function SkillsSection() {
  const { isDarkMode } = useTheme();

  return (
    <section 
      id="skills" 
      className={`py-12 relative overflow-hidden transition-colors duration-500
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div className="container mx-auto px-6">
        
        {/* Centered Heading for all devices */}
        <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>

        {/* Proficient Skills Slider */}
        <h3 className="text-xl font-semibold mb-6 text-center">Proficient In</h3>
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-12 pb-4"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 10,
            }}
          >
            {[...KNOWN_SKILLS, ...KNOWN_SKILLS].map((skill, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 flex flex-col items-center justify-center p-6 min-w-[180px] rounded-xl shadow-md transition-all duration-300
                ${isDarkMode ? "bg-gray-800 hover:scale-105" : "bg-white hover:scale-105 shadow-lg"}`}
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className={`mb-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                >
                  {skill.icon}
                </div>
                <p className="text-lg font-medium">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Currently Learning Skills */}
        <h3 className="text-xl font-semibold mt-12 mb-6 text-center">Currently Learning</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <AnimatePresence>
            {LEARNING_SKILLS.map((skill, index) => (
              <motion.div
                key={index}
                className={`p-6 flex flex-col items-center justify-center rounded-lg shadow-md transition-colors duration-500 min-w-[180px]
                ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className={`mb-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                >
                  {skill.icon}
                </div>
                <p className="text-lg font-medium text-center">{skill.name}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
