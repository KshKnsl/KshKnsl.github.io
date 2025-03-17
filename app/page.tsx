"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, Suspense, lazy } from "react";
import Link from "next/link";
import {
  Mail,
  Code,
  User,
  Terminal,
  ArrowUpRight,
  Award,
  Cpu,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import BrowserNavbar from "@/components/browser-navbar";
import TerminalEmulator from "@/components/terminal-emulator";
import LoadingScreen from "@/components/loading-screen";
import HeroSection from "@/components/hero-section";
import Image from "next/image";
import { handleHashLinkClick } from "@/utils/scroll-utils";

// Lazy load components that aren't needed immediately
const ProjectGrid = lazy(() => import("@/components/project-grid"));
const TechStackGrid = lazy(() => import("@/components/tech-stack-grid"));
const EducationTimeline = lazy(() => import("@/components/education-timeline"));
const ContactForm = lazy(() => import("@/components/contact-form"));
const ContactIcons = lazy(() => import("@/components/contact-icons"));
const CodingProfiles = lazy(() => import("@/components/coding-profiles"));
const GitHubProfile = lazy(() => import("@/components/github-profile"));
const VisitorCounter = lazy(() => import("@/components/visitor-countor"));
const AiChat = lazy(() => import("@/components/ai-chat"));

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const personalInfo = {
  name: "Kush Kansal",
  title:
    "CSE @JIIT&apos; 27 || Java || JavaScript || Web Developer || 700+ LeetCode || 3 ⭐ CodeChef",
  email: "kushkansal0@gmail.com",
  github: "https://github.com/kushkansal/",
  linkedin: "https://www.linkedin.com/in/kushkansal/",
  instagram: "https://www.instagram.com/kushkansal0/",
  twitter: "https://twitter.com/kansalkkush",
  about: `Hi everyone. My name is Kush Kansal and I am a second-year college student pursuing my B.tech from JIIT. I have a keen interest in technological stuff. I get excited just by thinking about the endless possibilities of cutting-edge technologies. Driven by a strong sense of curiosity. Currently, my skills are in HTML, CSS, Object Oriented programming, C, C++, and Java. I am currently learning full-stack web development and DSA. My unwavering determination propels me towards achieving excellence, and I aspire to contribute significantly to society by enhancing people&apos;s lives.`,
  projects: [
    {
      title: "URL Shortener",
      description:
        "A free tool to shorten URLs and generate QR codes & links making it easy to share.",
      liveLink: "https://tinyu.vercel.app/",
      codeLink: "https://github.com/KushKansal/URL-Shorten",
      technologies: ["NodeJS", "EJS"],
    },
    {
      title: "Portfolio Site",
      description:
        "My personal portfolio website showcasing my projects and skills with an interactive terminal.",
      liveLink: "#",
      codeLink: "https://github.com/KushKansal/Portfolio",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "ReadMates",
      description:
        "A collaborative hub for tech enthusiasts, writers, and readers with real-time co-editing experience.",
      liveLink: "https://readmates.vercel.app/",
      codeLink: "https://github.com/KshKnsl/ReadMates",
      technologies: ["TypeScript", "React", "Next.js"],
    },
    {
      title: "Chintan Trivia",
      description:
        "A web-based quiz app for creating and participating in AI-driven quizzes, enhancing classroom interactions.",
      liveLink: "http://chintan.42web.io/",
      codeLink: "https://github.com/KshKnsl/ChintanTrivia",
      technologies: ["PHP", "Tailwind CSS", "JavaScript", "MySQL"],
    },
    {
      title: "Wheel Buddy",
      description:
        "A console-based car booking and car-pooling system with user management and booking features.",
      liveLink: "https://github.com/KshKnsl/WheelBuddy",
      codeLink: "https://github.com/KshKnsl/WheelBuddy",
      technologies: ["C++"],
    },
    {
      title: "Task Master",
      description:
        "A console-based To-Do List application that simplifies task management and helps you stay organized.",
      liveLink: "https://github.com/KshKnsl/TaskMaster-X",
      codeLink: "https://github.com/KshKnsl/TaskMaster-X",
      technologies: ["C"],
    },
  ],
  highlights: [
    {
      title: "Problem Solver",
      description:
        "700+ problems solved on LeetCode with strong algorithmic skills",
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Competitive Coder",
      description:
        "3⭐ rating on CodeChef with consistent participation in contests",
      icon: <Award className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Continuous Learner",
      description:
        "Always exploring new technologies and expanding my skill set",
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Creative Thinker",
      description:
        "Passionate about finding innovative solutions to complex problems",
      icon: <Lightbulb className="w-6 h-6 text-purple-500" />,
    },
  ],
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Use HTMLDivElement as it's compatible with section elements
  const heroRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Section detection for navigation highlighting
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Use type assertion to handle the refs
    type SectionRef = React.RefObject<HTMLElement>;

    const createObserver = (ref: SectionRef, id: string) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 } // 30% of the section needs to be visible
      );

      observer.observe(ref.current);
      observers.push(observer);
    };

    // Use type assertions to pass the refs
    createObserver(heroRef as SectionRef, "hero");
    createObserver(terminalRef as SectionRef, "terminal");
    createObserver(aboutRef as SectionRef, "about");
    createObserver(projectsRef as SectionRef, "projects");
    createObserver(educationRef as SectionRef, "education");
    createObserver(contactRef as SectionRef, "contact");

    // Prevent auto-scrolling to terminal on page load
    // Make sure we're at the top of the page on load
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      // Force scroll to top on initial load
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
      }, 0);
    }

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, []);

  // Skip loading screen if user has already interacted with the site
  useEffect(() => {
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    // If this is a return visit, skip the loading screen
    if (hasVisited) {
      setIsLoading(false);
    } else {
      // For first-time visitors, show loading screen but with a maximum time limit
      const maxLoadingTime = setTimeout(() => {
        handleLoadingComplete();
      }, 3000); // Maximum 3 seconds for loading screen
      
      return () => clearTimeout(maxLoadingTime);
    }
    
    // Add interaction detection
    const handleInteraction = () => {
      setHasInteracted(true);
    };
    
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
  };

  // Skip loading if user has interacted
  useEffect(() => {
    if (isLoading && hasInteracted) {
      const timer = setTimeout(() => {
        handleLoadingComplete();
      }, 500); // Shorter timeout if user has interacted
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, hasInteracted]);

  // Preload critical components
  useEffect(() => {
    // Preload critical components while showing loading screen
    if (isLoading) {
      // Preload the hero section component
      const preloadHero = new window.Image();
      preloadHero.src = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MyImage.jpg-8UPBc9HASn3izHAC3JKWZcDnUPjvJ2.jpeg";
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary transform origin-left z-50"
        style={{ scaleX }}
      />

      <BrowserNavbar activeSection={activeSection} />

      {/* Hero Section */}
      <section ref={heroRef}>
        <HeroSection />
      </section>

      {/* Terminal Section */}
      <section
        ref={terminalRef}
        id="terminal"
        className="py-12 sm:py-20 bg-gray-50 dark:bg-black/90 border-t border-b border-gray-200 dark:border-gray-800"
      >
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-block"
            >
              <Terminal className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#3b82f6] dark:text-[#60a5fa]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
              Interactive Terminal
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Type &apos;help&apos; to see available commands
            </p>
          </motion.div>
          <TerminalEmulator />
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        id="about"
        className="py-12 sm:py-20 bg-white dark:bg-black"
      >
        <div className="container px-4 mx-auto max-w-8xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-block"
            >
              <User className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#3b82f6] dark:text-[#60a5fa]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
              About Me
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get to know more about my background, skills, and passion for
              technology
            </p>
          </motion.div>

          {/* About Me Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Left column - Image and bio */}
            <motion.div
              className="lg:col-span-5 xl:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] rounded-2xl opacity-30 blur-sm"></div>
                <div
                  className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]"
                  style={{ maxHeight: "350px" }}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MyImage.jpg-8UPBc9HASn3izHAC3JKWZcDnUPjvJ2.jpeg"
                    alt="Kush Kansal"
                    width={500}
                    height={350}
                    className="w-full h-auto object-cover object-center"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "350px",
                    }}
                  />
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A0A0A] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                  My Journey
                </h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  <p>{personalInfo.about}</p>
                </div>
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="#projects"
                      onClick={(e) => handleHashLinkClick(e, "#projects")}
                      className="px-4 sm:px-6 py-2 text-white rounded-lg bg-gradient-primary hover:opacity-90 transition-opacity border border-[#3b82f6]/20 dark:border-[#60a5fa]/20 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] text-sm sm:text-base"
                    >
                      View Projects
                    </a>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="#contact"
                      onClick={(e) => handleHashLinkClick(e, "#contact")}
                      className="px-4 sm:px-6 py-2 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#0A0A0A] transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] text-sm sm:text-base"
                    >
                      Contact Me
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right column - Highlights and coding profiles */}
            <motion.div
              className="lg:col-span-7 xl:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {personalInfo.highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    className="p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A0A0A]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.05)" }}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                        {highlight.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                          {highlight.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
                <CodingProfiles />
              </Suspense>
              <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
                <GitHubProfile username="kshknsl" />
              </Suspense>
            </motion.div>
          </div>

          {/* Tech Stack Section */}
          <div className="mt-12 sm:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-4 sm:mb-6"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Tech Stack
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-3 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A0A0A] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]"
            >
              <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
                <TechStackGrid />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        id="projects"
        className="py-12 sm:py-20 bg-gray-50 dark:bg-black/90 border-t border-b border-gray-200 dark:border-gray-800"
      >
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-block"
            >
              <Code className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#3b82f6] dark:text-[#60a5fa]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A showcase of my recent work and side projects
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
              <ProjectGrid projects={personalInfo.projects} />
            </Suspense>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex align-center justify-center mt-6 sm:mt-10"
          >
            <Link
              href="/projects"
              className="px-4 sm:px-6 py-2 sm:py-3 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#0A0A0A] transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] flex items-center text-sm sm:text-base"
            >
              View All Projects
              <ArrowUpRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section
        ref={educationRef}
        id="education"
        className="py-12 sm:py-20 bg-gray-50 dark:bg-black/90 border-t border-b border-gray-200 dark:border-gray-800"
      >
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-block"
            >
              <User className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#3b82f6] dark:text-[#60a5fa]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
              Education Journey
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My academic background and achievements
            </p>
          </motion.div>
          <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
            <EducationTimeline />
          </Suspense>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        className="py-12 sm:py-20 bg-white dark:bg-black"
      >
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-block"
            >
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#3b82f6] dark:text-[#60a5fa]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
              Get In Touch
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I&apos;m always open to discussing new projects, creative ideas or
              opportunities
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-2"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <div className="space-y-6 sm:space-y-8 mb-3flex gap-2">
                <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
                  <ContactIcons />
                </Suspense>
              </div>

              {/* AI Chat for large screens */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="hidden lg:block mt-8"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-2 text-[#3b82f6] dark:text-[#60a5fa]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Chat with my AI twin
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                  Have a quick question? Chat with my AI twin and get instant
                  responses
                </p>
                <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
                  <AiChat />
                </Suspense>
              </motion.div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="lg:col-span-1"
            >
              <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
                <ContactForm />
              </Suspense>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Chat for medium and smaller screens */}
      <section className="py-12 sm:py-20 bg-gray-50 dark:bg-black lg:hidden">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-block"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#3b82f6] dark:text-[#60a5fa]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
              Chat with my AI twin
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a quick question? Get instant responses from my AI assistant
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
              <AiChat />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-black/90 border-t border-gray-200 dark:border-gray-800 flex container justify-center items-center sm:flex-row flex-col">
        <div className="container my-6 sm:my-8 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} Kush Kansal. All rights reserved.
            </p>
          </motion.div>
        </div>
        <div className="viscount-container h-[70px] overflow-hidden w-full">
          <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
            <VisitorCounter />
          </Suspense>
        </div>
      </footer>
    </main>
  );
}
