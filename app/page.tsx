"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, Suspense, lazy } from "react";
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
import Link from "next/link";

const ProjectGrid = lazy(() => import("@/components/project-grid"));
const TechStackGrid = lazy(() => import("@/components/tech-stack-grid"));
const EducationTimeline = lazy(() => import("@/components/education-timeline"));
const ContactForm = lazy(() => import("@/components/contact-form"));
const ContactIcons = lazy(() => import("@/components/contact-icons"));
const CodingProfiles = lazy(() => import("@/components/coding-profiles"));
const GitHubProfile = lazy(() => import("@/components/github-profile"));
const VisitorCounter = lazy(() => import("@/components/visitor-countor"));
const AiChat = lazy(() => import("@/components/ai-chat"));

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
    "Full-Stack Developer | CSE @ JIIT&apos; 27  MERN | Knight @ LeetCode (1865) | 3⭐ @ CodeChef (1769) | Specialist @ Codeforces",
  email: "kushkansal0@gmail.com",
  github: "https://github.com/KshKnsl/",
  linkedin: "https://www.linkedin.com/in/kushkansal/",
  instagram: "https://www.instagram.com/kushkansal.exe/",
  twitter: "https://twitter.com/knslji",
  about: `Hi, I'm Kush Kansal — a pre-final year B.Tech student at JIIT, passionate about building tech that solves real problems. I'm a full-stack developer specializing in the MERN stack (MongoDB, Express, React, Node.js) with strong foundations in Java, C++, and Data Structures & Algorithms. Curious by nature and driven by impact, I love exploring the potential of emerging technologies, crafting solutions to complex challenges. I enjoy turning ideas into scalable, clean, maintainable code. Currently deepening my expertise in advanced full-stack development patterns and advanced DSA concepts, with a goal to grow, build, and make a meaningful difference through technology.`,
  projects: [
    {
      title: "CircuitAI",
      liveLink: "https://circuitai.vercel.app",
      codeLink: "https://github.com/KshKnsl/CircuitAI",
      description:
        "This project is an AI-powered circuit creator for circuit simulation and visualization. Now designing using natural language prompts or guided design flows.",
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "DigitalJS"],
    },
    {
      title: "MindEase",
      liveLink: "mind-ease-eosin.vercel.app",
      codeLink: "https://github.com/KshKnsl/MindEase",
      description: "MindEase is an AI-powered mental wellness platform that helps users manage their emotional wellbeing, schedule tasks, and get personalized support.",
      technologies: ["React", "TypeScript", "Generative AI", "LangChain", "MongoDB", "Express"],
    },
    {
      title: "GuruGram",
      liveLink: "https://gurugramm.vercel.app",
      codeLink: "https://github.com/KshKnsl/GuruGram",
      description:
        "A mentorship platform that connects students with industry professionals to bridge the gap between academics and real-world skills. With features like skill-based matching, video communication, and progress tracking.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "ReadMates",
      liveLink: "https://readmates.vercel.app/",
      codeLink: "https://github.com/KshKnsl/ReadMates",
      description:
        "A collaborative hub for tech enthusiasts, writers, and readers with real-time co-editing experience.",
      technologies: ["TypeScript", "React", "MERN"],
    },
    {
      title: "Cubix",
      liveLink: "https://kshknsl.github.io/cubix/",
      codeLink: "https://github.com/KshKnsl/cubix",
      description:
        "A web-based puzzle solver that efficiently solves Rubik's Cube, 15-Puzzle, and Sudoku using advanced algorithms. The frontend, built with React, provides an interactive UI, while the backend, powered by C++, ensures fast and optimized solutions.",
      technologies: ["React", "C++"],
    },
    {
      title: "Maksad.crx - Chrome Extension",
      liveLink: "https://github.com/KshKnsl/Maksad.crx",
      codeLink: "https://github.com/KshKnsl/Maksad.crx",
      description:
        "This Chrome extension helps users stay focused by blocking distracting content like YouTube Shorts and enabling voice commands (e.g., 'Close tab').",
      technologies: ["JavaScript", "Chrome Extension"],
    },
  ],
  highlights: [
    {
      title: "Problem Solver",
      description:
        "1500+ problems solved on various platforms with strong algorithmic skills",
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Competitive Coder",
      description:
        "Highly rated on CodeChef and Codeforces with consistent participation in contests",
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

  const heroRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.setAttribute(
      "data-cf-beacon",
      '{"token": "f7aee356940d45e99e23b7db806fc558"}'
    );
    document.head.appendChild(script);
    const observers: IntersectionObserver[] = [];
    const API_URL = "https://ntyx.onrender.com/";

    const fetchBackendData = async () => {
      try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Backend data loaded:", data);
      } catch (_) {
      console.error("Error fetching backend data:", _);
      }
    };

    fetchBackendData();
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
        { threshold: 0.3 }
      );

      observer.observe(ref.current);
      observers.push(observer);
    };

    createObserver(heroRef as SectionRef, "hero");
    createObserver(terminalRef as SectionRef, "terminal");
    createObserver(aboutRef as SectionRef, "about");
    createObserver(projectsRef as SectionRef, "projects");
    createObserver(educationRef as SectionRef, "education");
    createObserver(contactRef as SectionRef, "contact");

    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

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

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setIsLoading(false);
    } else {
      const maxLoadingTime = setTimeout(() => {
        handleLoadingComplete();
      }, 3000);

      return () => clearTimeout(maxLoadingTime);
    }
    const handleInteraction = () => {
      setHasInteracted(true);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("scroll", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("hasVisited", "true");
  };

  useEffect(() => {
    if (isLoading && hasInteracted) {
      const timer = setTimeout(() => {
        handleLoadingComplete();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoading, hasInteracted]);

  useEffect(() => {
    if (isLoading) {
      const preloadHero = new window.Image();
      preloadHero.src =
        "/assets/MyImage.png";
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary transform origin-left z-50"
        style={{ scaleX }}
      />

      <BrowserNavbar activeSection={activeSection} />
      <section ref={heroRef}>
        <HeroSection />
      </section>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <motion.div
              className="lg:col-span-5 xl:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-linear-to-r from-[#3b82f6] to-[#60a5fa] rounded-2xl opacity-30 blur-xs"></div>
                <div
                  className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]"
                  style={{ maxHeight: "350px" }}
                >
                  <Image
                    src="/assets/MyImage.png"
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

              <Suspense
                fallback={
                  <div className="min-h-[200px] flex items-center justify-center">
                    Loading...
                  </div>
                }
              >
                <CodingProfiles />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-h-[200px] flex items-center justify-center">
                    Loading...
                  </div>
                }
              >
                <GitHubProfile username="kshknsl" />
              </Suspense>
            </motion.div>
          </div>

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
              <Suspense
                fallback={
                  <div className="min-h-[200px] flex items-center justify-center">
                    Loading...
                  </div>
                }
              >
                <TechStackGrid />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

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
            <Suspense
              fallback={
                <div className="min-h-[200px] flex items-center justify-center">
                  Loading...
                </div>
              }
            >
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
              className="px-4 sm:px-6 py-2 sm:py-3 text-gray-800 dark:text-gray-200 border border-gray-00 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-linear-to-r from-[#0d47a1] via-[#2563eb] to-[#60a5fa] transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] flex items-center text-sm sm:text-base"
            >
              View All Projects
              <ArrowUpRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

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
          <Suspense
            fallback={
              <div className="min-h-[200px] flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <EducationTimeline />
          </Suspense>
        </div>
      </section>

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
                <Suspense
                  fallback={
                    <div className="min-h-[200px] flex items-center justify-center">
                      Loading...
                    </div>
                  }
                >
                  <ContactIcons />
                </Suspense>
              </div>

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
                <Suspense
                  fallback={
                    <div className="min-h-[200px] flex items-center justify-center">
                      Loading...
                    </div>
                  }
                >
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
              <Suspense
                fallback={
                  <div className="min-h-[200px] flex items-center justify-center">
                    Loading...
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
            <Suspense
              fallback={
                <div className="min-h-[200px] flex items-center justify-center">
                  Loading...
                </div>
              }
            >
              <AiChat />
            </Suspense>
          </motion.div>
        </div>
      </section>

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
          <Suspense
            fallback={
              <div className="min-h-[200px] flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <VisitorCounter />
          </Suspense>
        </div>
      </footer>
    </main>
  );
}