import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLink } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext.jsx";

import PROJECT_IMG_1 from "../../assets/images/PROJECT_IMG_1.png";
import PROJECT_IMG_2 from "../../assets/images/PROJECT_IMG_2.png";

const PROJECTS = [
  {
    id: 1,
    title: "Health-Connect",
    description:
      "A platform that connects patients and healthcare providers. It could be a simple appointment booking system or a more comprehensive solution for online consultations and health record management.",
    image: PROJECT_IMG_1,
    tags: ["HTML","CSS","Javascript","React", "Tailwind"],
    liveUrl: "https://healthconnectapp1.netlify.app/",
    githubUrl: "https://github.com/muktaa20/Health-Connect",
  },
  {
    id: 2,
    title: "Real-Time Chat Application",
    description:
      "A modern real-time chat application that allows users to send and receive messages instantly with a clean, responsive, and user-friendly interface.",
    image: PROJECT_IMG_2,
    tags: ["HTML","CSS","Javascript","React.js", "Supabase"],
    liveUrl: "https://your-live-link.com",
    githubUrl: "https://github.com/muktaa20/react-chat-app",
  }
];

export default function ProjectsSection() {
  const { isDarkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className={`py-12 relative overflow-hidden transition-colors duration-500
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>

        {/* GRID VIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedProject(project)}
              className={`rounded-lg shadow-lg cursor-pointer h-80 
              ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* FIXED PROJECT IMAGE IN GRID */}
              <div className="w-full h-[200px] p-3 rounded-t-lg overflow-hidden flex items-center justify-center bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain rounded-md"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`text-xs px-2 py-1 rounded-full
                      ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODAL PREVIEW */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`max-w-3xl w-full mx-4 p-6 rounded-xl relative
                ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-2xl"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>

                {/* FIXED MODAL IMAGE */}
                <div className="w-full h-[420px] p-4 rounded-xl overflow-hidden border border-gray-700/20 flex items-center justify-center mb-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>

                {/* TITLE */}
                <h2 className="text-2xl font-bold mb-4">
                  {selectedProject.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="mb-6 opacity-80">
                  {selectedProject.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs px-3 py-1 rounded-full
                      ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 justify-between">
                  <a
                    href={selectedProject.liveUrl}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white"
                    target="_blank"
                  >
                    <FaLink /> Live Demo
                  </a>

                  <a
                    href={selectedProject.githubUrl}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 text-white"
                    target="_blank"
                  >
                    <FaGithub /> GitHub
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
