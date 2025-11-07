import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLink } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext.jsx";
import PROJECT_IMG_1 from "../../assets/images/PROJECT_IMG_1.png";
import PROJECT_IMG_2 from "../../assets/images/PROJECT_IMG_2.png";
import PROJECT_IMG_4 from "../../assets/images/PROJECT_IMG_4.png";
import PROJECT_IMG_5 from "../../assets/images/PROJECT_IMG_5.png";

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
    featured: true,
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Blog App with AI Post Generator",
    description:
      "A full-stack blog app using the MERN stack – with full Markdown support, tag filtering, and an integrated AI post generator.",
    image: PROJECT_IMG_2,
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveUrl: "https://youtu.be/tUnGudIBBjo",
    githubUrl: "https://github.com/muktaa20/LeaderBoard",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with advanced filtering, payment integration, and real-time inventory.",
    image: PROJECT_IMG_1,
    tags: ["React", "Tailwind", "Framer motion"],
    liveUrl: "#",
    githubUrl: "https://github.com/muktaa20/Health-Connect",
    featured: false,
    category: "Full Stack",
  }
];

const flipVariants = {
  flipped: { rotateY: 180 },
  unflipped: { rotateY: 0 },
};

const frontVariants = {
  flipped: { opacity: 0, transition: { duration: 0.1 } },
  unflipped: { opacity: 1, transition: { duration: 0.1, delay: 0.3 } },
};

const backVariants = {
  flipped: { opacity: 1, transition: { duration: 0.1, delay: 0.3 } },
  unflipped: { opacity: 0, transition: { duration: 0.1 } },
};

export default function ProjectsSection() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="projects"
      className={`py-12 relative overflow-hidden transition-colors duration-500
      ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer h-96 
              ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="w-full h-full relative"
                variants={flipVariants}
                initial="unflipped"
                whileHover="flipped"
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of the Card */}
                <motion.div
                  className="absolute inset-0 p-4"
                  variants={frontVariants}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-44 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-center mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`text-xs font-medium px-2 py-1 rounded-full
                        ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Back of the Card */}
                <motion.div
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                  variants={backVariants}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300
                      ${isDarkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                    >
                      <FaLink />
                      Live Demo
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300
                        ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-800"}`}
                      >
                        <FaGithub />
                        GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}