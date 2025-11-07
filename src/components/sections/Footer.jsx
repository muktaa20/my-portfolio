import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';

const SOCIAL_LINKS = [
  { icon: FaGithub, url: "https://github.com/your-username" },
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/your-profile" },
  { icon: FaTwitter, url: "https://twitter.com/your-username" },
  { icon: FaEnvelope, url: "mailto:your-email@example.com" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`py-12 md:py-16 transition-colors duration-500 text-center ${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-600"
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <motion.h2
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-blue-500">&lt;/&gt;</span> Mukta Suryavanshi
            </motion.h2>
            <motion.p
              className={`mt-2 text-sm md:text-base ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Turning ideas into delightful digital experiences ✨
            </motion.p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-6">
            {SOCIAL_LINKS.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={IconComponent.name}
                  className={`text-2xl transition-transform transform hover:scale-110 ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <IconComponent />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
