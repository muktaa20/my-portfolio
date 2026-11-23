import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import SIGNATURE from "../assets/images/signa.svg";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "projects" },
  { label: "Activity", id: "activity" },
  { label: "Certificates", id: "certificates" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const NAV_OFFSET = 72;

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sections = useRef(NAV_ITEMS.map((item) => item.id));
  const pendingSection = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      // a section is active when it crosses the middle of the screen, however tall it is
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.current.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollNow = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: id === "home" ? 0 : top - NAV_OFFSET, behavior: "smooth" });
  };

  // Closing the mobile menu cancels a scroll started at the same time,
  // so wait for its exit animation to finish.
  const scrollToSection = (id) => {
    if (isMenuOpen) {
      pendingSection.current = id;
      setIsMenuOpen(false);
    } else {
      scrollNow(id);
    }
  };

  const handleMenuClosed = () => {
    if (pendingSection.current) scrollNow(pendingSection.current);
    pendingSection.current = null;
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#07070b]/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <button
          onClick={() => scrollToSection("home")}
          className="group flex items-center gap-2"
          aria-label="Go to top"
        >
          <img
            src={SIGNATURE}
            alt="Mukta Suryavanshi"
            className="h-10 w-auto opacity-90 transition group-hover:opacity-100 dark:invert"
          />
        </button>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                activeSection === item.id
                  ? "text-blue-500"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-blue-500/10 ring-1 ring-blue-500/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}

          <button
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full text-slate-600 ring-1 ring-slate-200 transition hover:text-blue-500 dark:text-slate-300 dark:ring-white/10 dark:hover:text-blue-400"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 ring-1 ring-slate-200 transition hover:text-blue-500 dark:text-slate-300 dark:ring-white/10"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 ring-1 ring-slate-200 transition hover:text-blue-500 dark:text-slate-200 dark:ring-white/10"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence onExitComplete={handleMenuClosed}>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-[#07070b]/95"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`rounded-lg px-4 py-3 text-left text-base font-medium tracking-wide transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-500/10 text-blue-500"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
