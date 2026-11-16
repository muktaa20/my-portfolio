import CERT_REACT from "../assets/images/cert_1.jpeg";
import CERT_FRONTEND from "../assets/images/cert_2.jpeg";
import {
  Code2,
  GraduationCap,
  Briefcase,
  Heart,
  Coffee,
  BookOpen,
  Mail,
  MapPin,
} from "lucide-react";

import { FiGithub, FiLinkedin } from "react-icons/fi";

export const JOURNEY_STEPS = [
  {
    year: "2021",
    title: "Started Coding Journey",
    company: "Self-taught",
    description:
      "Began learning web development with HTML, CSS, and JavaScript. Built my first website and fell in love with creating interactive user experiences.",
    icon: Code2,
    color: "bg-blue-500",
  },
  {
    year: "2022",
    title: "First Internship",
    company: "TechStart Inc.",
    description:
      "Joined as a frontend intern, working with React and learning modern development practices. Contributed to multiple team projects and improved coding skills.",
    icon: Briefcase,
    color: "bg-green-500",
  },
  {
    year: "2022",
    title: "Computer Science Degree",
    company: "University of Technology",
    description:
      "Pursued a Bachelor's degree in Computer Science, focusing on software development, algorithms, and project-based learning.",
    icon: GraduationCap,
    color: "bg-purple-500",
  },
];

export const PASSIONS = [
  {
    icon: Heart,
    title: "User Experience",
    description: "Crafting intuitive interfaces that users love",
  },
  {
    icon: Coffee,
    title: "Problem Solving",
    description: "Turning complex challenges into elegant solutions",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Always exploring new technologies and best practices",
  },
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    icon: FiGithub,
    url: "https://github.com/muktaa20",
    color: "hover:text-gray-400",
    bgColor: "hover:bg-gray-800",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    url: "https://www.linkedin.com/in/mukta-s-632760335/",
    color: "hover:text-blue-400",
    bgColor: "hover:bg-blue-500/10",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:muktasuryavanshi48@gmail.com",
    color: "hover:text-green-400",
    bgColor: "hover:bg-green-500/10",
  },
];

export const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Location",
    value: "Burhanpur, India",
  },
  {
    icon: Mail,
    label: "Email",
    value: "muktasuryavanshi48@gmail.com",
  },
];

export const CERTIFICATES = [
  {
    id: "RFM-0042-25",
    title: "React Crash Course",
    issuer: "Progression School",
    date: "Apr 2025",
    image: CERT_REACT,
  },
  {
    id: "FWD-0057-25",
    title: "Frontend Web Development Crash Course",
    issuer: "Progression School",
    date: "Apr 2025",
    image: CERT_FRONTEND,
  },
];
