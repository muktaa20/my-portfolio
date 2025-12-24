import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import signImg from "../assets/images/sign.svg";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sections = useRef(["home", "skills", "projects", "about", "contact"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.current.forEach((sec) => {
      const element = document.getElementById(sec);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const targetId = sectionId === "work" ? "projects" : sectionId;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navBg = isDarkMode ? "bg-gray-900" : "bg-gray-200";
  const navBorder = isDarkMode ? "border-gray-800" : "border-gray-200";
  const textPrimary = isDarkMode ? "text-gray-200" : "text-gray-900";

  const activeClass = "text-blue-500 font-bold";

  const navItems = ["Home", "Skills", "Work", "About", "Contact"];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 px-6 py-4 ${navBg} border-b ${navBorder}`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Code2 size={24} className="text-blue-500" />
          <img src={signImg} alt="Sign Logo" className="h-8 w-auto ml-1" />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const id = item.toLowerCase() === "work" ? "projects" : item.toLowerCase();
            return (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(id)}
                className={`text-sm uppercase tracking-wider transition
                  hover:text-blue-500
                  ${activeSection === id ? activeClass : textPrimary}`}
              >
                {item}
              </motion.button>
            );
          })}

          {/* Theme */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => toggleDarkMode(isDarkMode ? "Light" : "dark")}
            className={`${textPrimary} hover:text-blue-500`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => toggleDarkMode(isDarkMode ? "Light" : "dark")}
            className={`${textPrimary} hover:text-blue-500`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${textPrimary} hover:text-blue-500`}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden fixed left-0 right-0 top-16 z-50 p-6 rounded-b-xl 
            ${isDarkMode ? "bg-gray-900" : "bg-white"} border`}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const id = item.toLowerCase() === "work" ? "projects" : item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className={`text-lg uppercase tracking-wider transition
                      hover:text-blue-500
                      ${activeSection === id ? activeClass : textPrimary}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
