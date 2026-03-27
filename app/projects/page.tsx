"use client"

import BrowserNavbar from "@/components/browser-navbar"
import { LinkPreview } from "@/components/ui/link-preview"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Code,
  Globe,
  Play,
  Search,
  Sparkles,
  Star,
  CalendarClock,
  GitFork,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

interface Project {
  title: string
  codeLink: string
  liveLink?: string
  youtubeLink?: string
  description: string
  technologies: string[]
  stars: number
  forks: number
  updatedAt: string
  featured?: boolean
}

type SortMode = "featured" | "latest" | "stars" | "az"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 24,
      stiffness: 120,
    },
  },
}

const techStyles = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
] as const

const getTechStyle = (tech: string) => {
  const index = tech.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % techStyles.length
  return techStyles[index]
}

const formatMonthYear = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })

const projects: Project[] = [
  {
    title: "ZeroCrush",
    codeLink: "https://github.com/KshKnsl/ZeroCrush",
    liveLink: "https://zero-crush-beryl.vercel.app",
    description: "A modern TypeScript web app focused on fast, polished interactive experiences.",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-03-13T13:41:26Z",
    featured: true,
  },
  {
    title: "QuickCom",
    codeLink: "https://github.com/KshKnsl/QuickCom",
    description:
      "A full-stack quick-commerce scraper and comparator for Blinkit, Zepto, and Swiggy Instamart with real-time product search.",
    technologies: ["JavaScript", "Node.js", "WebSocket", "Puppeteer"],
    stars: 5,
    forks: 3,
    updatedAt: "2026-03-12T16:27:07Z",
    featured: true,
  },
  {
    title: "secure-transaction-spring",
    codeLink: "https://github.com/KshKnsl/secure-transaction-spring",
    liveLink: "https://secure-spring.vercel.app/",
    description:
      "A full-stack money transfer platform using Spring Boot with double-entry ledgering, idempotent transfers, and JWT cookie auth.",
    technologies: ["Java", "Spring Boot", "React", "JWT"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-03-07T19:21:12Z",
    featured: true,
  },
  {
    title: "LocalDocu",
    codeLink: "https://github.com/KshKnsl/LocalDocu",
    liveLink: "https://localdocu.vercel.app/",
    description:
      "A fully local AI document Q&A and summarization app where files stay on-device, powered by Ollama and open-source models.",
    technologies: ["TypeScript", "Next.js", "FastAPI", "Ollama", "RAG"],
    stars: 1,
    forks: 0,
    updatedAt: "2026-02-19T21:01:35Z",
    featured: true,
  },
  {
    title: "CircuitAI",
    codeLink: "https://github.com/KshKnsl/CircuitAI",
    liveLink: "https://circuitai.vercel.app",
    description:
      "An AI-powered circuit creator using DigitalJS for simulation and natural-language guided circuit design.",
    technologies: ["JavaScript", "Next.js", "DigitalJS", "AI"],
    stars: 1,
    forks: 2,
    updatedAt: "2026-01-25T12:46:45Z",
    featured: true,
  },
  {
    title: "GuruGram",
    codeLink: "https://github.com/KshKnsl/GuruGram",
    liveLink: "https://gurugramm.vercel.app",
    description:
      "A mentorship platform connecting students and professionals through skill-based matching and collaborative learning workflows.",
    technologies: ["TypeScript", "MERN", "WebRTC"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-03-12T19:58:00Z",
    featured: true,
  },
  {
    title: "MindEase",
    codeLink: "https://github.com/KshKnsl/MindEase",
    liveLink: "https://mind-ease-eosin.vercel.app",
    description:
      "An AI-assisted mental wellness platform for emotional support, reflective check-ins, and productivity structure.",
    technologies: ["TypeScript", "React", "Generative AI", "MongoDB"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-01-25T12:21:33Z",
  },
  {
    title: "SocioPilot",
    codeLink: "https://github.com/KshKnsl/SocioPilot",
    liveLink: "https://socio-pilot.vercel.app",
    description:
      "A BYOK social media automation platform that generates, schedules, and replies to comments across channels.",
    technologies: ["TypeScript", "AI", "Automation"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-01-25T12:14:38Z",
  },
  {
    title: "CodeStreamYard",
    codeLink: "https://github.com/KshKnsl/CodeStreamYard",
    liveLink: "https://code-stream-yard.vercel.app",
    description: "A TypeScript project focused on clean, collaborative coding and streaming-friendly workflows.",
    technologies: ["TypeScript", "Next.js"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-01-25T13:47:09Z",
  },
  {
    title: "secure-transaction-system",
    codeLink: "https://github.com/KshKnsl/secure-transaction-system",
    description: "A secure transaction system with emphasis on reliable state transitions and safe monetary operations.",
    technologies: ["JavaScript", "Node.js", "Auth"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-03-12T20:01:04Z",
  },
  {
    title: "UniLLM",
    codeLink: "https://github.com/KshKnsl/UniLLM",
    description: "A Java-based project exploring unified large language model patterns and orchestration ideas.",
    technologies: ["Java", "LLM"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-03-12T14:51:39Z",
  },
  {
    title: "Terminax",
    codeLink: "https://github.com/KshKnsl/Terminax",
    liveLink: "https://terminax.vercel.app",
    description:
      "A browser-hosted terminal app platform that makes CLI tools shareable and embeddable with minimal setup.",
    technologies: ["TypeScript", "Next.js", "Docker", "WebSocket"],
    stars: 1,
    forks: 0,
    updatedAt: "2025-11-25T05:32:47Z",
  },
  {
    title: "Maksad.crx",
    codeLink: "https://github.com/KshKnsl/Maksad.crx",
    description:
      "A focus-oriented Chrome extension that blocks distracting content and supports voice commands for tab control.",
    technologies: ["TypeScript", "Chrome Extension"],
    stars: 0,
    forks: 0,
    updatedAt: "2025-12-30T04:09:13Z",
  },
  {
    title: "FRA-GIS-DSS",
    codeLink: "https://github.com/KshKnsl/FRA-GIS-DSS",
    liveLink: "https://fra-gis-dss.vercel.app",
    description:
      "A WebGIS-based Forest Rights Act atlas and decision support system with geospatial dashboards and scheme recommendations.",
    technologies: ["JavaScript", "Leaflet", "PostGIS", "ML"],
    stars: 0,
    forks: 1,
    updatedAt: "2025-12-30T04:08:21Z",
  },
  {
    title: "cubix",
    codeLink: "https://github.com/KshKnsl/cubix",
    liveLink: "http://kushkansal.tech/cubix/",
    description:
      "A web puzzle solver using high-performance C++ logic in the browser for Rubik's Cube, 15-Puzzle, and Sudoku.",
    technologies: ["JavaScript", "React", "C++", "WebAssembly"],
    stars: 0,
    forks: 0,
    updatedAt: "2025-12-30T04:06:44Z",
  },
  {
    title: "Nyx",
    codeLink: "https://github.com/KshKnsl/Nyx",
    liveLink: "https://nt-yx.vercel.app",
    description: "A real-time conversational app integrating AI-assisted chat and responsive messaging flows.",
    technologies: ["JavaScript", "Socket.io", "Flask", "LangChain"],
    stars: 0,
    forks: 0,
    updatedAt: "2025-12-30T03:58:32Z",
  },
  {
    title: "URL-Shorten",
    codeLink: "https://github.com/KshKnsl/URL-Shorten",
    liveLink: "https://tinyu.vercel.app/",
    description: "A URL shortener with simple sharing flows and QR support for quick distribution.",
    technologies: ["JavaScript", "Node.js", "EJS"],
    stars: 0,
    forks: 0,
    updatedAt: "2025-09-15T06:11:17Z",
  },
  {
    title: "Leetcode-AutoTicker",
    codeLink: "https://github.com/KshKnsl/Leetcode-AutoTicker",
    description:
      "A browser extension that auto-marks solved LeetCode problems on third-party sheets and injects quick resource actions.",
    technologies: ["JavaScript", "Chrome Extension"],
    stars: 0,
    forks: 0,
    updatedAt: "2025-07-16T12:41:13Z",
  },
  {
    title: "ReadMates",
    codeLink: "https://github.com/KshKnsl/ReadMates",
    liveLink: "https://readmates.vercel.app/",
    description: "A collaborative reading and writing workspace built for shared editing and community interaction.",
    technologies: ["TypeScript", "React", "MERN"],
    stars: 0,
    forks: 0,
    updatedAt: "2025-03-13T13:46:29Z",
  },
]

const sortModes: { label: string; value: SortMode }[] = [
  { label: "Featured", value: "featured" },
  { label: "Latest", value: "latest" },
  { label: "Most Starred", value: "stars" },
  { label: "A-Z", value: "az" },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortMode, setSortMode] = useState<SortMode>("featured")

  const visibleProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    const filtered = projects.filter((project) => {
      if (!query) return true

      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query))
      )
    })

    const sorted = [...filtered]

    if (sortMode === "featured") {
      sorted.sort((a, b) => {
        const featuredScore = Number(Boolean(b.featured)) - Number(Boolean(a.featured))
        if (featuredScore !== 0) return featuredScore
        if (b.stars !== a.stars) return b.stars - a.stars
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
      return sorted
    }

    if (sortMode === "latest") {
      sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      return sorted
    }

    if (sortMode === "stars") {
      sorted.sort((a, b) => b.stars - a.stars || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      return sorted
    }

    sorted.sort((a, b) => a.title.localeCompare(b.title))
    return sorted
  }, [searchTerm, sortMode])

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-24 pb-20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-40">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-hackclub-blue/15 blur-3xl" />
        <div className="absolute top-24 right-0 h-72 w-72 rounded-full bg-hackclub-cyan/15 blur-3xl" />
      </div>

      <BrowserNavbar />
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-12 border border-gray-200/70 dark:border-gray-800/90 rounded-2xl p-6 md:p-8 backdrop-blur-xl bg-white/80 dark:bg-black/50"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-hackclub-blue dark:hover:text-hackclub-cyan transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Projects</h1>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                Updated portfolio list extracted from your GitHub repositories, with improved ordering and cleaner cards.
                Use search and sorting to explore by recency, stars, or featured work.
              </p>
          </div>

          <div className="mt-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title, stack, or description"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-hackclub-blue"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {sortModes.map((mode) => {
                const active = sortMode === mode.value
                return (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => setSortMode(mode.value)}
                    className={`px-3 py-2 text-sm rounded-xl border transition-colors ${
                      active
                        ? "border-hackclub-blue bg-hackclub-blue/10 text-hackclub-blue dark:text-hackclub-cyan"
                        : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-hackclub-cyan"
                    }`}
                  >
                    {mode.label}
                  </button>
                )
              })}
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="group h-full rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white/80 dark:bg-black/70 backdrop-blur-xl p-5 shadow-[0_6px_20px_rgba(13,71,161,0.1)] hover:shadow-[0_10px_30px_rgba(13,71,161,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-hackclub-blue/10 text-hackclub-blue dark:text-hackclub-cyan">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-hackclub-blue dark:group-hover:text-hackclub-cyan transition-colors">
                    {project.title}
                  </h2>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className={`text-xs rounded-full px-2.5 py-1 font-medium ${getTechStyle(tech)}`}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> {project.stars}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" /> {project.forks}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarClock className="w-3.5 h-3.5" /> {formatMonthYear(project.updatedAt)}
                </span>
              </div>

              <div className="mt-auto pt-5 flex flex-wrap gap-2">
                {project.liveLink && (
                  <LinkPreview url={project.liveLink} width={300} height={180}>
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-hackclub-cyan/10 text-hackclub-blue dark:text-hackclub-cyan px-3 py-1.5 text-sm hover:bg-hackclub-cyan/20 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" /> Live
                    </Link>
                  </LinkPreview>
                )}

                <LinkPreview url={project.codeLink} width={300} height={180}>
                  <Link
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1.5 text-sm hover:text-hackclub-blue dark:hover:text-hackclub-cyan transition-colors"
                  >
                    <Code className="w-3.5 h-3.5" /> Code
                  </Link>
                </LinkPreview>

                {project.youtubeLink && (
                  <LinkPreview url={project.youtubeLink} width={300} height={180}>
                    <Link
                      href={project.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-hackclub-blue/10 dark:bg-hackclub-blue/20 text-hackclub-blue dark:text-hackclub-cyan px-3 py-1.5 text-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Demo
                    </Link>
                  </LinkPreview>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <div className="mt-16 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-10">
            <p className="text-gray-700 dark:text-gray-300">No projects matched your search.</p>
          </div>
        )}
      </div>
    </main>
  )
}
