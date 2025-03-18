"use client"

import BrowserNavbar from "@/components/browser-navbar"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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
}

const truncateDescription = (description: string, maxLength: number) => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
}

const projects = [
  {
    title: "Cubix",
    liveLink: "https://kshknsl.github.io/cubix/",
    codeLink: "https://github.com/KshKnsl/cubix",
    description:
      "A web-based puzzle solver that efficiently solves Rubik's Cube, 15-Puzzle, and Sudoku using advanced algorithms. The frontend, built with React, provides an interactive UI, while the backend, powered by C++, ensures fast and optimized solutions.",
    technologies: ["React", "C++"],
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
    title: "GuruGram",
    liveLink: "https://gurugramm.vercel.app",
    codeLink: "https://github.com/KshKnsl/GuruGram",
    description:
      "A mentorship platform that connects students with industry professionals to bridge the gap between academics and real-world skills. With features like skill-based matching, video communication, and progress tracking.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Maksad.ai - Chrome Extension",
    liveLink: "https://github.com/KshKnsl/Maksad.crx",
    codeLink: "https://github.com/KshKnsl/Maksad.crx",
    description:
      "This Chrome extension helps users stay focused by blocking distracting content like YouTube Shorts and enabling voice commands (e.g., 'Close tab'). It provides a simple UI with a microphone button.",
    technologies: ["JavaScript", "Chrome Extension"],
  },
  {
    title: "Portfolio Site",
    liveLink: "/",
    codeLink: "https://github.com/KshKnsl/Portfolio",
    description:
      "My personal portfolio website showcasing my projects and skills with an interactive terminal.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "AI Chat Application",
    liveLink: "nt-yx.vercel.app",
    codeLink: "https://github.com/KshKnsl/Nyx",
    description: "A real-time chat application with ai engine to chat.",
    technologies: ["Socket.io", "Flask", "LangChain", "GeminiAI", "Python"],
  },
  {
    title: "URL Shortener",
    liveLink: "https://tinyu.vercel.app/",
    codeLink: "https://github.com/KshKnsl/URL-Shorten",
    description: "A free tool to shorten URLs and generate QR codes & links making it easy to share.",
    technologies: ["NodeJS", "EJS"],
  },
  {
    title: "Chintan Trivia",
    liveLink: "http://chintan.42web.io/",
    codeLink: "https://github.com/KshKnsl/ChintanTrivia",
    description:
      "A web-based quiz app for creating and participating in AI-driven quizzes, enhancing classroom interactions.",
    technologies: ["PHP", "Tailwind CSS", "JavaScript", "MySQL"],
  },
  {
    title: "Spotify Clone",
    liveLink: "http://kushkansal.me/Spotify-Clone/",
    codeLink: "https://github.com/KshKnsl/Spotify-Clone",
    description: "A clone of the Spotify web player using HTML, CSS, and JavaScript.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "BEN10 Puzzle",
    liveLink: "https://kshknsl.github.io/BEN10-PUZZLE/",
    codeLink: "https://github.com/KshKnsl/BEN10-PUZZLE",
    description: "A web-based puzzle game inspired by the BEN10 series.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Wheel Buddy",
    liveLink: "https://github.com/KshKnsl/WheelBuddy",
    codeLink: "https://github.com/KshKnsl/WheelBuddy",
    description: "A console-based car booking and car-pooling system with user management and booking features.",
    technologies: ["C++"],
  },
  {
    title: "Task Master X",
    liveLink: "https://github.com/KshKnsl/TaskMaster-X",
    codeLink: "https://github.com/KshKnsl/TaskMaster-X",
    description:
      "A console-based To-Do List application that simplifies task management and helps you stay organized.",
    technologies: ["C"],
  },
  {
    title: "Basic Text Editor",
    liveLink: "https://github.com/KshKnsl/TextEditor",
    codeLink: "https://github.com/KshKnsl/TextEditor",
    description:
      "A console-based Text Editor made in Java to perform basic tasks like cut, copy, paste, delete and edit.",
    technologies: ["Java"],
  },
  
]

export default function ProjectsPage() {

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-24 pb-20">

      <BrowserNavbar />
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-[#ec3750] dark:hover:text-[#ff4d6a] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">All Projects</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              A comprehensive showcase of my work, including web applications, tools, and other software projects. Each
              project represents different skills and technologies I&apos;ve worked with.
            </p>
          </motion.div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/80 dark:bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ec3750]/5 to-[#ff8c37]/5 dark:from-[#ec3750]/10 dark:to-[#ff8c37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#ec3750] dark:group-hover:text-[#ff4d6a] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{truncateDescription(project.description, 100)}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project?.technologies?.map((tech, i) => {
                    let bgColor = "bg-gray-100 dark:bg-[#0A0A0A] text-gray-800 dark:text-gray-200";
                    if (tech === "React") 
                      bgColor = "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
                    else if (tech === "TypeScript") 
                      bgColor = "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300";
                    else if (tech === "MERN") 
                      bgColor = "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
                    else if (tech === "Next.js") 
                      bgColor = "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300";
                    else if (tech === "NodeJS" || tech === "Node.js") 
                      bgColor = "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300";
                    else if (tech === "EJS") 
                      bgColor = "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300";
                    else if (tech === "HTML") 
                      bgColor = "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
                    else if (tech === "Tailwind CSS") 
                      bgColor = "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300";
                    else if (tech === "JavaScript") 
                      bgColor = "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
                    else if (tech === "MySQL") 
                      bgColor = "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300";
                    else if (tech === "PHP") 
                      bgColor = "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300";
                    else if (tech === "C++") 
                      bgColor = "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300";
                    else if (tech === "C") 
                      bgColor = "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300";
                    else if (tech === "Socket.io") 
                      bgColor = "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
                    else if (tech === "LangChain") 
                      bgColor = "bg-blue-200 dark:bg-blue-800/30 text-blue-900 dark:text-blue-400";
                    else
                      bgColor = "bg-purple-200 dark:bg-purple-800/30 text-purple-900 dark:text-purple-400";
                    
                    return (
                      <span key={i} className={`${bgColor} px-2 py-1 text-xs rounded-md font-medium`}>
                        {tech}
                      </span>
                    );
                  })}
                </div>
                <div className="flex gap-4">
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#ec3750] dark:text-[#ff4d6a] hover:underline"
                  >
                    Live Demo
                  </Link>
                  <Link
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#ec3750] dark:hover:text-[#ff4d6a]"
                  >
                    View Code
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
