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
  Lightbulb
} from "lucide-react";
import BrowserNavbar from "@/components/browser-navbar";
import TerminalEmulator from "@/components/terminal-emulator";
import LoadingScreen from "@/components/loading-screen";
import HeroSection from "@/components/hero-section";
import CustomButton from "@/components/ui/CustomButton";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
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
    "Full-Stack Developer | CSE @ JIIT&apos; 27  MERN | Knight @ LeetCode (1865) | 4⭐ @ CodeChef (1769) | Specialist @ Codeforces",
  email: "kushkansal0@gmail.com",
  github: "https://github.com/KshKnsl/",
  linkedin: "https://www.linkedin.com/in/kushkansal/",
  instagram: "https://www.instagram.com/kushkansal.async/",
  twitter: "https://twitter.com/knslji",
  about: `Hi, I am Kush Kansal — a pre-final year B.Tech student at JIIT, passionate about building tech that solves real problems. I'm a full-stack developer specializing in the MERN stack (MongoDB, Express, React, Node.js) with strong foundations in Java, C++, and Data Structures & Algorithms. Curious by nature and driven by impact, I love exploring the potential of emerging technologies, crafting solutions to complex challenges. I enjoy turning ideas into scalable, clean, maintainable code. Currently deepening my expertise in advanced full-stack development patterns and advanced DSA concepts, with a goal to grow, build, and make a meaningful difference through technology.`,
  projects: [
    {
      title: "CircuitAI",
      liveLink: "https://circuitai.vercel.app",
      codeLink: "https://github.com/KshKnsl/CircuitAI",
      description:
        "This project is an AI-powered circuit creator for circuit simulation and visualization. Now designing using natural language prompts or guided design flows.",
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "DigitalJS"],
      // youtubeLink: "https://www.youtube.com/watch?v=example1"
    },
    {
      title: "MindEase",
      liveLink: "https://mindeases.vercel.app",
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
        className="py-12 sm:py-20 bg-gray-50/80 dark:bg-black/90 border-t border-b border-gray-200 dark:border-gray-800 relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-hackclub-blue/10 blur-3xl" />
          <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full bg-hackclub-cyan/10 blur-3xl" />
        </div>
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12 relative z-10"
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
          <div className="relative z-10">
            <TerminalEmulator />
          </div>
        </div>
      </section>

      <section
        ref={aboutRef}
        id="about"
        className="py-12 sm:py-20 bg-white dark:bg-black relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-hackclub-blue/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-hackclub-cyan/10 blur-3xl" />
        </div>
        <div className="container px-4 mx-auto max-w-8xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12 relative z-10"
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16 relative z-10">
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
                  className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-[0_14px_30px_rgba(13,71,161,0.14)]"
                  style={{ maxHeight: "350px" }}
                >
                  <Image
                    src="/assets/Second.gif"
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

              <div className="p-4 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/90 dark:bg-[#0A0A0A] backdrop-blur-sm shadow-[0_14px_30px_rgba(13,71,161,0.12)]">
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
                    <Link href="/projects">
                      <button className="px-4 sm:px-6 py-2 text-white rounded-xl bg-gradient-primary hover:opacity-95 transition-all border border-[#3b82f6]/20 dark:border-[#60a5fa]/20 shadow-[0_10px_22px_rgba(13,71,161,0.22)] text-sm sm:text-base font-semibold">
                        View Projects
                      </button>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="#contact"
                      onClick={(e) => handleHashLinkClick(e, "#contact")}
                    >
                      <button className="px-4 sm:px-6 py-2 text-hackclub-blue dark:text-hackclub-cyan border border-hackclub-blue/30 dark:border-hackclub-cyan/30 rounded-xl hover:bg-hackclub-blue/10 dark:hover:bg-hackclub-blue/20 transition-colors shadow-[0_8px_18px_rgba(13,71,161,0.12)] text-sm sm:text-base font-semibold">
                        Contact Me
                      </button>
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
                    className="p-3 sm:p-4 rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/90 dark:bg-[#0A0A0A] backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{ boxShadow: "0 8px 18px rgba(13,71,161,0.08)" }}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-700 shadow-[0_8px_16px_rgba(13,71,161,0.1)]">
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
                  <div className="min-h-50 flex items-center justify-center">
                    Loading...
                  </div>
                }
              >
                <CodingProfiles />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-h-50 flex items-center justify-center">
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
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4 sm:mb-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Tech Stack
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Tools and technologies I currently build with.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border border-hackclub-blue/30 bg-hackclub-blue/10 text-hackclub-blue dark:text-hackclub-cyan w-fit">
                Constantly Evolving
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-3 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-linear-to-br from-white via-blue-50/40 to-white dark:from-[#0A0A0A] dark:via-[#0D1320] dark:to-[#0A0A0A] shadow-[0_16px_32px_rgba(13,71,161,0.14)]"
            >
              <Suspense
                fallback={
                  <div className="min-h-50 flex items-center justify-center">
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
        className="py-12 sm:py-20 bg-gray-50/80 dark:bg-black/90 border-t border-b border-gray-200 dark:border-gray-800"
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
                <div className="min-h-50 flex items-center justify-center">
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
            <Link href="/projects">
              <CustomButton needBgGradient={false}>
                View All Projects
                <ArrowUpRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
              </CustomButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <section
        ref={educationRef}
        id="education"
        className="py-12 sm:py-20 bg-gray-50/80 dark:bg-black/90 border-t border-b border-gray-200 dark:border-gray-800"
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
              <div className="min-h-50 flex items-center justify-center">
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
        className="py-12 sm:py-20 bg-white dark:bg-black relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-hackclub-blue/10 blur-3xl" />
          <div className="absolute right-0 bottom-8 h-80 w-80 rounded-full bg-hackclub-cyan/10 blur-3xl" />
        </div>
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12 relative z-10"
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
            className="grid gap-8 md:gap-10 md:grid-cols-2 relative z-10 p-4 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white/70 dark:bg-[#0A0A0A]/70 backdrop-blur-xl shadow-[0_16px_36px_rgba(13,71,161,0.14)]"
          >
            <motion.div variants={fadeInUp} className="md:col-span-1">
              <div className="space-y-6 sm:space-y-8 mb-3 flex flex-col gap-2">
                <Suspense
                  fallback={
                    <div className="min-h-25 flex items-center justify-center">
                      Loading...
                    </div>
                  }
                >
                  <ContactIcons />
                </Suspense>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="md:col-span-1"
            >
              <Suspense
                fallback={
                  <div className="min-h-50 flex items-center justify-center">
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

      <footer className="bg-gray-50/80 dark:bg-black/90 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 -top-10 h-44 w-44 rounded-full bg-hackclub-blue/10 blur-3xl" />
          <div className="absolute right-0 -bottom-10 h-44 w-44 rounded-full bg-hackclub-cyan/10 blur-3xl" />
        </div>
        <div className="container my-6 sm:my-8 px-4 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 w-full md:w-auto">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center md:text-left whitespace-nowrap">
                © {new Date().getFullYear()} Kush Kansal. All rights reserved.
              </p>
            </div>
              <VisitorCounter />
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <Link href="#about" onClick={(e) => handleHashLinkClick(e, "#about")} className="px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 hover:border-hackclub-blue/50 text-gray-700 dark:text-gray-300 hover:text-hackclub-blue dark:hover:text-hackclub-cyan transition-colors">
                About
              </Link>
              <Link href="#projects" onClick={(e) => handleHashLinkClick(e, "#projects")} className="px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 hover:border-hackclub-blue/50 text-gray-700 dark:text-gray-300 hover:text-hackclub-blue dark:hover:text-hackclub-cyan transition-colors">
                Projects
              </Link>
              <Link href="#contact" onClick={(e) => handleHashLinkClick(e, "#contact")} className="px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 hover:border-hackclub-blue/50 text-gray-700 dark:text-gray-300 hover:text-hackclub-blue dark:hover:text-hackclub-cyan transition-colors">
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}