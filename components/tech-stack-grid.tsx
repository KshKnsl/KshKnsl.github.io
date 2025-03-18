"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const techCategories = [
  {
    name: "Languages",
    techs: [
      {
        name: "JavaScript",
        icon: "/assets/TechStacks-Logo/javascript.svg",
        description: "Creating interactive web experiences",
      },
      {
        name: "TypeScript",
        icon: "/assets/TechStacks-Logo/typescript.svg",
        description: "JavaScript with syntax for types",
      },
      {
        name: "Python",
        icon: "/assets/TechStacks-Logo/python.svg", 
        description: "Versatile language for scripting, data science, and automation",
      },
      {
        name: "Java",
        icon: "/assets/TechStacks-Logo/java.png",
        description: "Object-oriented programming for various applications",
      },
      {
        name: "C++",
        icon: "/assets/TechStacks-Logo/cpp.png",
        description: "Used for competitive programming and algorithms",
      },
      {
        name: "C",
        icon: "/assets/TechStacks-Logo/c.png",
        description: "Low-level programming language for system applications",
      },
      {
        name: "Markdown",
        icon: "/assets/TechStacks-Logo/markdown.svg",
        description: "Lightweight markup language for formatting text",
      },
    ]
  },
  {
    name: "Frontend",
    techs: [
      {
        name: "React",
        icon: "/assets/TechStacks-Logo/react.svg",
        description: "JavaScript library for building user interfaces",
      },
      {
        name: "Next.js",
        icon: "/assets/TechStacks-Logo/nextjs.svg",
        description: "React framework for production-ready applications",
      },
      {
        name: "Tailwind CSS",
        icon: "/assets/TechStacks-Logo/tailwindcss.svg",
        description: "Utility-first CSS framework for rapid UI development",
      },
      {
        name: "Bootstrap",
        icon: "/assets/TechStacks-Logo/bootstrap.svg",
        description: "CSS framework for responsive designs",
      },
      {
        name: "Sass",
        icon: "/assets/TechStacks-Logo/Sass.svg",
        description: "CSS preprocessor scripting language",
      },
      {
        name: "GSAP",
        icon: "/assets/TechStacks-Logo/gsap.webp",
        description: "Library for creating high-performance animations",
      },
    ]
  },
  {
    name: "Backend & Databases",
    techs: [
      {
        name: "Node.js",
        icon: "/assets/TechStacks-Logo/nodejs.svg",
        description: "JavaScript runtime for server-side development",
      },
      {
        name: "Express.js",
        icon: "/assets/TechStacks-Logo/expressjs.svg",
        description: "Node.js framework for building APIs",
      },
      {
        name: "EJS",
        icon: "/assets/TechStacks-Logo/Ejs.png",
        description: "Embedded JavaScript templating for server-rendered views",
      },
      {
        name: "MongoDB",
        icon: "/assets/TechStacks-Logo/mongodb.svg",
        description: "NoSQL database for modern applications",
      },
      {
        name: "PostgreSQL",
        icon: "/assets/TechStacks-Logo/postgres.svg",
        description: "Powerful, open source object-relational database",
      },
      {
        name: "Redis",
        icon: "/assets/TechStacks-Logo/redis.svg",
        description: "In-memory data structure store for caching and messaging",
      },
    ]
  },
  {
    name: "AI & Testing",
    techs: [
      {
        name: "OpenAI",
        icon: "/assets/TechStacks-Logo/openai.svg",
        description: "Cutting-edge AI models and tools for developers",
      },
      {
        name: "Langchain",
        icon: "/assets/TechStacks-Logo/langchain-color.svg",
        description: "Framework for developing applications powered by language models",
      },
      {
        name: "Puppeteer",
        icon: "/assets/TechStacks-Logo/puppeteer.svg",
        description: "Headless browser automation library for web testing and scraping",
      },
    ]
  },
  {
    name: "DevOps & Tools",
    techs: [
      {
        name: "Git",
        icon: "/assets/TechStacks-Logo/git.svg",
        description: "Version control for collaborative development",
      },
      {
        name: "GitHub",
        icon: "/assets/TechStacks-Logo/github.svg",
        description: "Platform for hosting and collaborating on code",
      },
      {
        name: "GitHub Actions",
        icon: "/assets/TechStacks-Logo/github-actions.svg",
        description: "CI/CD platform integrated with GitHub repositories",
      },
      {
        name: "Docker",
        icon: "/assets/TechStacks-Logo/docker.svg",
        description: "Containerization for consistent development environments",
      },
      {
        name: "VS Code",
        icon: "/assets/TechStacks-Logo/vs-code.png",
        description: "My preferred code editor with powerful extensions",
      },
      {
        name: "NPM",
        icon: "/assets/TechStacks-Logo/npm.svg",
        description: "Package manager for JavaScript",
      },
      {
        name: "Bun",
        icon: "/assets/TechStacks-Logo/bun.svg",
        description: "Fast JavaScript runtime, bundler, and package manager",
      },
      {
        name: "Postman",
        icon: "/assets/TechStacks-Logo/postman.svg",
        description: "API testing and development platform",
      },
      {
        name: "Vercel",
        icon: "/assets/TechStacks-Logo/vercel.svg",
        description: "Platform for frontend frameworks and static sites",
      },
      {
        name: "Figma",
        icon: "/assets/TechStacks-Logo/figma.svg",
        description: "Design tool for UI/UX prototyping",
      },
    ]
  },
]

const allTechs = techCategories.flatMap(category => category.techs)
const invertInDarkMode = [
  'GitHub', 
  'NPM', 
  'Vercel', 
  'Markdown', 
  'Puppeteer', 
  'GitHub Actions',
  'Next.js',
  'Express.js',
  'Langchain',
  'OpenAI',
]

export default function TechStackGrid() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCount, setVisibleCount] = useState(16)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check on initial load
    checkIfMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const techs = activeCategory 
    ? techCategories.find(c => c.name === activeCategory)?.techs || []
    : allTechs

  const techsToDisplay = isMobile ? techs.slice(0, visibleCount) : techs

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 8)
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-center flex-wrap gap-2">
        <button 
          onClick={() => {
            setActiveCategory(null)
            setVisibleCount(15)
          }}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
            activeCategory === null 
              ? 'bg-gradient-to-r from-[#0d47a1] via-[#2563eb] to-[#60a5fa] text-white shadow-md' 
              : 'bg-gray-100 dark:bg-[#0F0F10] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        
        {techCategories.map(category => (
          <button
            key={category.name}
            onClick={() => {
              setActiveCategory(category.name)
              setVisibleCount(1)
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              activeCategory === category.name 
                ? 'bg-gradient-to-r from-[#0d47a1] via-[#2563eb] to-[#60a5fa] text-white shadow-md' 
                : 'bg-gray-100 dark:bg-[#0F0F10] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-4">
        {techsToDisplay.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-white dark:bg-[#141415] rounded-lg md:rounded-xl p-2 md:p-4 flex flex-col items-center justify-center gap-2 md:gap-3 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800"
            onMouseEnter={() => setActiveTooltip(tech.name)}
            onMouseLeave={() => setActiveTooltip(null)}
            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.05)" }}
          >
            <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-gray-50 dark:bg-black/30 rounded-md md:rounded-lg p-1.5 md:p-2.5">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src={tech.icon || "/placeholder.svg"}
                  alt={tech.name}
                  width={isMobile ? 28 : 40}
                  height={isMobile ? 28 : 40}
                  className={`object-contain ${
                    invertInDarkMode.includes(tech.name)
                      ? "!dark:invert dark:contrast-150 dark:brightness-250"
                      : ""
                  }`}
                  style={{
                    width: isMobile ? '28px' : '40px',
                    height: isMobile ? '28px' : '40px',
                    objectFit: 'contain',
                    filter: invertInDarkMode.includes(tech.name) && document.documentElement.classList.contains("dark") 
                      ? "invert(1) contrast(1.5) brightness(2.5)" 
                      : "none"
                  }}
                  quality={100}
                  priority={index < 16}
                />
              </motion.div>
            </div>
            <p className="text-[10px] md:text-xs font-medium text-gray-700 dark:text-gray-300 text-center line-clamp-1">{tech.name}</p>

            {!isMobile && activeTooltip === tech.name && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0A0A0A] dark:bg-black text-white text-xs rounded shadow-lg z-10 w-48 text-center border border-gray-700 dark:border-gray-600"
                style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}
              >
                {tech.description}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#0A0A0A] dark:bg-black border-r border-b border-gray-700 dark:border-gray-600"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {isMobile && techs.length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-gradient-to-r from-[#0d47a1] via-[#2563eb] to-[#60a5fa] text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  )
}

