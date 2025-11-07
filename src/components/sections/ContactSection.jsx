import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

import { FaMapPin, FaEnvelope, FaPhone } from 'react-icons/fa';

const CONTACT_INFO = [
  {
    icon: FaMapPin,
    label: "Location",
    value: "Burhanpu",
    href: "https://maps.google.com/?q=Burhanpur" 
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "muktasuryavanshi48@gmail.com",
    href: "mailto:muktasuryavanshi48@gmail.com" 
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+91 9302945768",
    href: "tel:+919302945768" 
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactSection() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="contact"
      className={`py-16 md:py-24 transition-colors duration-500 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className={`text-sm md:text-base font-semibold tracking-widest uppercase mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            GET IN TOUCH
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Contact <span className="text-blue-500">Me</span>
          </h2>
        </motion.div>

        <motion.div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 md:p-12 rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {CONTACT_INFO.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <a 
                href={item.href}
                key={index}
                target="_blank" 
                rel="noopener noreferrer" 
                className="block" 
              >
                <motion.div
                  className={`flex flex-col items-center text-center p-6 cursor-pointer transition-transform duration-300 hover:scale-105 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  variants={itemVariants}
                >
                  <div className={`text-3xl mb-4 p-4 rounded-full ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    <IconComponent />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
                  <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.value}
                  </p>
                </motion.div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}