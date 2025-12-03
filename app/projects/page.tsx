"use client"

import BrowserNavbar from "@/components/browser-navbar"
import { motion } from "framer-motion"
import { ArrowLeft, Play, Globe, Code, Search } from "lucide-react"
import Link from "next/link"
import { LinkPreview } from "@/components/ui/link-preview"
import { useState } from "react"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 100,
    },
  },
}

const truncateDescription = (description: string, maxLength: number) => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
}

interface Project {
  title: string;
  liveLink?: string;
  codeLink: string;
  description: string;
  technologies: string[];
  youtubeLink?: string;
}

const projects: Project[] = [
  {
    title: "QuickCom Scraper",
    codeLink: "https://github.com/KshKnsl/QuickCom",
    description:
      "A full-stack application for scraping product data from Blinkit, Zepto, and Swiggy Instamart platforms. Features real-time searching, product comparison, and cart management with WebSocket communication.",
    technologies: ["React", "TypeScript", "Node.js", "WebSocket", "Puppeteer", "Tailwind CSS"],
    // youtubeLink: "https://www.youtube.com/watch?v=ABC123"
  },
  {
    title: "Terminax",
    liveLink: "https://terminax.vercel.app",
    codeLink: "https://github.com/KshKnsl/Terminax",
    description:
      "A hosting platform for terminal-based applications that enables developers to deploy, share, and run CLI apps directly in the browser and embedded them into any site easily.",
    technologies: ["Next.js", "TypeScript", "WebSockets", "Docker", "Node.js"],
  },
  {
    title: "CircuitAI",
    liveLink: "https://circuitai.vercel.app",
    codeLink: "https://github.com/KshKnsl/CircuitsAI",
    description:
      "This project is an AI-powered circuit creator for circuit simulation and visualization. Now designing using natural language prompts or guided design flows.",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "DigitalJS"],
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
    title: "MindEase",
    liveLink: "https://mindeases.vercel.app",
    codeLink: "https://github.com/KshKnsl/MindEase",
    description: "MindEase is an AI-powered mental wellness platform that helps users manage their emotional wellbeing, schedule tasks, and get personalized support.",
    technologies: ["React", "TypeScript", "Generative AI", "LangChain", "MongoDB", "Express"],
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
    title: "Maksad.crx - Chrome Extension",
    liveLink: "https://github.com/KshKnsl/Maksad.crx",
    codeLink: "https://github.com/KshKnsl/Maksad.crx",
    description:
      "This Chrome extension helps users stay focused by blocking distracting content like YouTube Shorts and enabling voice commands (e.g., 'Close tab').",
    technologies: ["JavaScript", "Chrome Extension"],
  },
  {
    title: "Leetcode-AutoTicker",
    codeLink: "https://github.com/KshKnsl/Leetcode-AutoTicker",
    description:
      "LeetCode Auto Ticker is a Chrome extension that automatically marks (✔️) the LeetCode problems you've solved, directly in the UI of any websites—including Take U Forward sheets and any site with LeetCode problem links or sheets. It enhances UI for Take U Forward sheets with quick access buttons to GFG and Coding Ninja solutions. No popup required—just install and enjoy. No login or LeetCode ID required to be set up.",
    technologies: ["JavaScript", "Chrome Extension"],
  },
  {
    title: "Spotify Organiser",
    codeLink: "https://github.com/KshKnsl/spotify-organiser",
    description:
      "A Flask web application that helps you organize your Spotify playlists by automatically categorizing tracks by genre and creating new organized playlists. Features Spotify authentication, playlist analysis, genre-based organization, and duplicate removal.",
    technologies: ["Python", "Flask", "Spotipy", "OAuth"],
  },
  {
    title: "FRA Atlas & Decision Support System",
    liveLink: "https://fra-gis-dss.vercel.app",
    codeLink: "https://github.com/KshKnsl/FRA-GIS-DSS",
    description:
      "A comprehensive Forest Rights Act (FRA) Atlas and Decision Support System that digitizes FRA records, builds interactive WebGIS maps, and provides scheme recommendations for forest-dwelling communities using satellite imagery and ML.",
    technologies: ["React", "Node.js", "Leaflet", "PostGIS", "PostgreSQL", "Tesseract"],
  },
  {
    title: "An Older Portfolio Site",
    liveLink: "https://knsl.vercel.app",
    codeLink: "https://github.com/KshKnsl/Portfolio",
    description:
      "My personal portfolio website showcasing my projects and skills with an interactive terminal.",
    technologies: ["HTML", "Tailwind CSS", "GSAP"],
  },
  {
    title: "AI Chat Application",
    liveLink: "https://nt-yx.vercel.app",
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
    title: "CogniScript",
    liveLink: "https://github.com/KshKnsl/CongiScript",
    codeLink: "https://github.com/KshKnsl/CongiScript",
    description:
      "An AI-powered document chat application that allows users to upload documents and interact with their content through a conversational interface using Google Gemini and Qdrant vector database.",
    technologies: ["VectorDB", "Generative AI", "LangChain","Qdrant"],
  },
   {
    title: "BulkMailer",
    liveLink: "https://github.com/KshKnsl/BulkMail",
    codeLink: "https://github.com/KshKnsl/BulkMail",
    description:
      "A terminal-based bulk email sender with features like customizable subjects, messages, and optional random GIFs from Giphy API. The CLI interface allows sending emails to multiple recipients with configurable parameters.",
    technologies: ["JavaScript", "Node.js", "CLI"],
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
  }
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase()
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
    )
  })

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
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
              A comprehensive showcase of my work, including web applications, tools, and other software projects. Each
              project represents different skills and technologies I&apos;ve worked with.
            </p>
            
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects by title, description, or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec3750] focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </motion.div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/80 dark:bg-black/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 backdrop-blur-md flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#ec3750]/5 to-[#ff8c37]/5 dark:from-[#ec3750]/10 dark:to-[#ff8c37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-6 relative z-10 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#ec3750] dark:group-hover:text-[#ff4d6a] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{truncateDescription(project.description, 100)}</p>

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
                      bgColor = "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300";
                    else if (tech === "C++") 
                      bgColor = "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300";
                    else if (tech === "C") 
                      bgColor = "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300";
                    else if (tech === "Socket.io") 
                      bgColor = "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
                    else if (tech === "LangChain") 
                      bgColor = "bg-blue-200 dark:bg-blue-800/30 text-blue-900 dark:text-blue-400";
                    else if (tech === "CSS") 
                      bgColor = "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300";
                    else if (tech === "Generative AI") 
                      bgColor = "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300";
                    else if (tech === "MongoDB") 
                      bgColor = "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300";
                    else if (tech === "Express") 
                      bgColor = "bg-stone-100 dark:bg-stone-900/30 text-stone-800 dark:text-stone-300";
                    else if (tech === "VectorDB") 
                      bgColor = "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300";
                    else if (tech === "Qdrant") 
                      bgColor = "bg-lime-100 dark:bg-lime-900/30 text-lime-800 dark:text-lime-300";
                    else if (tech === "PostGIS") 
                      bgColor = "bg-teal-200 dark:bg-teal-800/30 text-teal-900 dark:text-teal-400";
                    else if (tech === "PostgreSQL") 
                      bgColor = "bg-blue-200 dark:bg-blue-800/30 text-blue-900 dark:text-blue-400";
                    else if (tech === "Leaflet") 
                      bgColor = "bg-green-200 dark:bg-green-800/30 text-green-900 dark:text-green-400";
                    else if (tech === "Tesseract") 
                      bgColor = "bg-indigo-200 dark:bg-indigo-800/30 text-indigo-900 dark:text-indigo-400";
                    else if (tech === "OAuth") 
                      bgColor = "bg-pink-200 dark:bg-pink-800/30 text-pink-900 dark:text-pink-400";
                    else if (tech === "CLI") 
                      bgColor = "bg-gray-200 dark:bg-gray-800/30 text-gray-900 dark:text-gray-400";
                    else if (tech === "Puppeteer") 
                      bgColor = "bg-red-200 dark:bg-red-800/30 text-red-900 dark:text-red-400";
                    else if (tech === "WebSocket") 
                      bgColor = "bg-yellow-200 dark:bg-yellow-800/30 text-yellow-900 dark:text-yellow-400";
                    else if (tech === "Docker") 
                      bgColor = "bg-blue-300 dark:bg-blue-700/30 text-blue-900 dark:text-blue-200";
                    else if (tech === "DigitalJS") 
                      bgColor = "bg-emerald-200 dark:bg-emerald-800/30 text-emerald-900 dark:text-emerald-400";
                    else if (tech === "Spotipy") 
                      bgColor = "bg-green-300 dark:bg-green-700/30 text-green-900 dark:text-green-200";
                    else if (tech === "Java") 
                      bgColor = "bg-rose-200 dark:bg-rose-800/30 text-rose-900 dark:text-rose-400";
                    else if (tech === "GSAP") 
                      bgColor = "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300";
                    else if (tech === "Flask") 
                      bgColor = "bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300";
                    else if (tech === "GeminiAI") 
                      bgColor = "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-800 dark:text-fuchsia-300";
                    else if (tech === "Python") 
                      bgColor = "bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300";
                    else if (tech === "Java") 
                      bgColor = "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300";
                    else if (tech === "Chrome Extension") 
                      bgColor = "bg-lime-100 dark:bg-lime-900/30 text-lime-800 dark:text-lime-300";
                    else
                      bgColor = "bg-purple-200 dark:bg-purple-800/30 text-purple-900 dark:text-purple-400";
                    return (
                      <span key={i} className={`${bgColor} px-2 py-1 text-xs rounded-md font-medium`}>
                        {tech}
                      </span>
                    );
                  })}
                </div>
                
                <div className="mt-auto pt-4 flex flex-wrap gap-3">
                  {project.liveLink && project.liveLink !== project.codeLink && (
                    <LinkPreview 
                      url={project.liveLink}
                      width={300}
                      height={200}
                    >
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#ec3750] dark:hover:text-[#ff4d6a] bg-gray-100 dark:bg-gray-800/60 px-3 py-1 rounded-full transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </Link>
                    </LinkPreview>
                  )}
                  <LinkPreview 
                    url={project.codeLink}
                    width={300}
                    height={200}
                  >
                    <Link
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#ec3750] dark:hover:text-[#ff4d6a] bg-gray-100 dark:bg-gray-800/60 px-3 py-1 rounded-full transition-colors"
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </Link>
                  </LinkPreview>
                  {project.youtubeLink && (
                    <LinkPreview 
                      url={project.youtubeLink}
                      width={300}
                      height={200}
                    >
                      <Link
                        href={project.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-red-700 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Demo</span>
                      </Link>
                    </LinkPreview>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
