"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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
}

const projects = [
  {
    title: "URL Shortener",
    liveLink: "https://tinyu.vercel.app/",
    codeLink: "https://github.com/KushKansal/URL-Shorten",
    description: "A free tool to shorten URLs and generate QR codes & links making it easy to share.",
    technologies: ["NodeJS", "EJS"],
  },
  {
    title: "Portfolio Site",
    liveLink: "/",
    codeLink: "https://github.com/KushKansal/Portfolio",
    description:
      "My personal portfolio website showcasing my projects and skills with an interactive terminal.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "ReadMates",
    liveLink: "https://readmates.vercel.app/",
    codeLink: "https://github.com/KshKnsl/ReadMates",
    description:
      "A collaborative hub for tech enthusiasts, writers, and readers with real-time co-editing experience.",
    technologies: ["TypeScript", "React", "Next.js"],
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
    title: "Wheel Buddy",
    liveLink: "https://github.com/KshKnsl/WheelBuddy",
    codeLink: "https://github.com/KshKnsl/WheelBuddy",
    description: "A console-based car booking and car-pooling system with user management and booking features.",
    technologies: ["C++"],
  },
  {
    title: "Task Master",
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
  {
    title: "Sorting Visualizer",
    liveLink: "https://github.com/KshKnsl/SortingVisualizer",
    codeLink: "https://github.com/KshKnsl/SortingVisualizer",
    description: "An interactive visualization tool for various sorting algorithms to help understand how they work.",
    technologies: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "Chat Application",
    liveLink: "https://github.com/KshKnsl/ChatApp",
    codeLink: "https://github.com/KshKnsl/ChatApp",
    description: "A real-time chat application with private messaging, group chats, and user authentication.",
    technologies: ["Node.js", "Socket.io", "Express"],
  },
  {
    title: "Weather Dashboard",
    liveLink: "https://github.com/KshKnsl/WeatherDashboard",
    codeLink: "https://github.com/KshKnsl/WeatherDashboard",
    description: "A weather dashboard that provides current conditions and forecasts for any location worldwide.",
    technologies: ["React", "OpenWeather API", "CSS"],
  },
  {
    title: "E-commerce Store",
    liveLink: "https://github.com/KshKnsl/EcommerceStore",
    codeLink: "https://github.com/KshKnsl/EcommerceStore",
    description: "A full-featured e-commerce platform with product listings, cart functionality, and checkout process.",
    technologies: ["Next.js", "MongoDB", "Stripe"],
  },
  {
    title: "Recipe Finder",
    liveLink: "https://github.com/KshKnsl/RecipeFinder",
    codeLink: "https://github.com/KshKnsl/RecipeFinder",
    description: "An application to discover recipes based on available ingredients, dietary restrictions, and preferences.",
    technologies: ["React", "Firebase", "Tailwind CSS"],
  },
]

export default function ProjectsPage() {

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-24 pb-20">

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
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-[#0A0A0A] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
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

