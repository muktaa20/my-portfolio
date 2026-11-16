import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const SOCIAL_LINKS = [
  { icon: FaGithub, url: "https://github.com/muktaa20", label: "GitHub" },
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/mukta-s-632760335/",
    label: "LinkedIn",
  },
  { icon: FaEnvelope, url: "mailto:muktasuryavanshi48@gmail.com", label: "Email" },
];

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "projects" },
  { label: "Certificates", id: "certificates" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-slate-200 py-12 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              <span className="text-blue-500">&lt;/&gt;</span> Mukta Suryavanshi
            </h2>
            <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
              Turning ideas into simple, useful websites.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-slate-600 transition hover:text-blue-500 dark:text-slate-400 dark:hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, url, label }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3 }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 ring-1 ring-slate-200 transition hover:text-blue-500 hover:ring-blue-500/40 dark:text-slate-400 dark:ring-white/10 dark:hover:text-white"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-500">
          © {new Date().getFullYear()} Mukta Suryavanshi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
