import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, X } from "lucide-react";

import PROJECT_IMG_1 from "../../assets/images/PROJECT_IMG_1.png";
import PROJECT_IMG_2 from "../../assets/images/PROJECT_IMG_2.png";

const PROJECTS = [
  {
    id: 1,
    title: "Health-Connect",
    description:
      "A website where patients can find doctors, book appointments, consult online and keep their health records in one place. It works well on mobile and desktop.",
    image: PROJECT_IMG_1,
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
    liveUrl: "https://healthconnectapp1.netlify.app/",
    githubUrl: "https://github.com/muktaa20/Health-Connect",
  },
  {
    id: 2,
    title: "Real-Time Chat Application",
    description:
      "A chat app where users can send and receive messages instantly. Built with React, with Supabase storing the messages.",
    image: PROJECT_IMG_2,
    tags: ["HTML", "CSS", "JavaScript", "React.js", "Supabase"],
    liveUrl: "https://your-live-link.com",
    githubUrl: "https://github.com/muktaa20/react-chat-app",
  },
];

const Tag = ({ children }) => (
  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
    {children}
  </span>
);

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e) => e.key === "Escape" && setSelectedProject(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="bg-grid-glow py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
            What I have built
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            My <span className="text-gradient">Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-50 p-4 dark:bg-white/[0.02]">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  className="max-h-full max-w-full rounded-lg object-contain transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-blue-600/0 opacity-0 transition group-hover:bg-blue-600/10 group-hover:opacity-100">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow">
                    View details
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} details`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0d0d14]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="mb-6 flex h-72 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/[0.02]">
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.title} preview`}
                  className="max-h-full max-w-full rounded-lg object-contain"
                />
              </div>

              <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
                {selectedProject.title}
              </h2>
              <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
                {selectedProject.description}
              </p>

              <div className="mb-8 flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:ring-slate-400 dark:text-slate-200 dark:ring-white/15 dark:hover:ring-white/30"
                >
                  <FaGithub size={16} /> View Code
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
