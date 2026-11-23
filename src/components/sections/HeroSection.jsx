import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, FileText, Mail, X } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { containerVariants, itemVariants } from "../../utils/helper";
import PROFILE_PIC from "../../assets/images/mukta.jpg";

const SOCIALS = [
  { icon: FiGithub, href: "https://github.com/muktaa20", label: "GitHub" },
  {
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/mukta-s-632760335/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "https://mail.google.com/mail/u/0/#inbox?compose=new",
    label: "Email",
  },
];

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const SocialLinks = () => (
  <div className="flex gap-3">
    {SOCIALS.map(({ icon: Icon, href, label }) => (
      <motion.a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        whileHover={{ y: -3 }}
        className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 ring-1 ring-slate-200 transition hover:text-blue-500 hover:ring-blue-500/40 dark:text-slate-400 dark:ring-white/10 dark:hover:text-white"
      >
        <Icon size={20} />
      </motion.a>
    ))}
  </div>
);

const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (!showResume) return;
    const onKey = (e) => e.key === "Escape" && setShowResume(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [showResume]);

  // Many phone browsers can't display a PDF in a tab, so show an image preview there.
  const openResume = (e) => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      e.preventDefault();
      setShowResume(true);
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-grid-glow pt-24 pb-16"
    >
      {/* Ambient animated glow */}
      <motion.div style={{ y: heroY }} className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute right-[10%] top-24 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-24 left-[8%] h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Text content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center lg:text-left"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 ring-1 ring-blue-500/20"
          >
            <TypingText />
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl xl:text-6xl dark:text-white"
          >
            I build{" "}
            <span className="text-gradient">websites</span>
            <br className="hidden sm:block" /> that are easy to use.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0 dark:text-slate-400"
          >
            I make fast, clean and responsive websites using HTML, CSS,
            JavaScript, React and Tailwind CSS.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start"
          >
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={openResume}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-600"
            >
              <FileText size={16} /> Resume
            </motion.a>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-wider text-slate-700 ring-1 ring-slate-300 transition hover:ring-slate-400 dark:text-slate-200 dark:ring-white/15 dark:hover:ring-white/30"
            >
              Contact Me
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex justify-center lg:justify-start"
          >
            <SocialLinks />
          </motion.div>
        </motion.div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-72 w-60 overflow-hidden rounded-[2rem] ring-1 ring-slate-200 shadow-2xl sm:h-96 sm:w-80 dark:ring-white/10"
            >
              <img
                src={PROFILE_PIC}
                alt="Portrait of Mukta Suryavanshi"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-[2.5rem] border border-blue-500/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-[3rem] border border-indigo-500/10"
            />
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection("skills")}
        aria-label="Scroll to skills"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 transition hover:text-blue-500 dark:text-slate-600"
      >
        <ArrowDown size={22} />
      </motion.button>

      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            className="fixed inset-0 z-[70] flex flex-col bg-black/90"
          >
            <div className="flex items-center justify-between gap-3 p-3">
              <a
                href="/resume.pdf"
                download="Mukta_Suryavanshi_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white"
              >
                <Download size={16} /> Download PDF
              </a>
              <button
                onClick={() => setShowResume(false)}
                aria-label="Close resume"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto px-3 pb-3">
              <img
                src="/resume-preview.png"
                alt="Resume of Mukta Suryavanshi"
                className="mx-auto w-full max-w-2xl rounded bg-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ROLES = ["Front-End Developer", "React Developer", "MERN Stack Learner"];

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIndex];
    let delay = deleting ? 45 : 90;
    if (!deleting && text === full) delay = 1600;
    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, roleIndex]);

  return (
    <span aria-label={ROLES[roleIndex]}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-blue-500">&nbsp;</span>
    </span>
  );
}

export default HeroSection;
