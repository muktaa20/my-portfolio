import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/sections/HeroSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import GithubSection from "./components/sections/GithubSection";
import AboutSection from "./components/sections/AboutSection";
import CertificatesSection from "./components/sections/CertificatesSection";
import ScrollExtras from "./components/ScrollExtras";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/sections/Footer";

const App = () => {
  return (
    <ThemeProvider>
      <ScrollExtras />
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <GithubSection />
        <CertificatesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
