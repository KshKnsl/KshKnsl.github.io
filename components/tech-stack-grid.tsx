"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const techStacks = [
  {
    name: "VS Code",
    icon: "/assets/TechStacks-Logo/1.png",
    description: "My preferred code editor with powerful extensions",
  },
  {
    name: "C++",
    icon: "/assets/TechStacks-Logo/2.png",
    description: "Used for competitive programming and algorithms",
  },
  {
    name: "CSS",
    icon: "/assets/TechStacks-Logo/3.webp",
    description: "Styling web pages with modern techniques",
  },
  {
    name: "HTML",
    icon: "/assets/TechStacks-Logo/4.jpg",
    description: "Building the structure of web applications",
  },
  {
    name: "JavaScript",
    icon: "/assets/TechStacks-Logo/5.svg",
    description: "Creating interactive web experiences",
  },
  {
    name: "Figma",
    icon: "/assets/TechStacks-Logo/6.svg",
    description: "Design tool for UI/UX prototyping",
  },
  {
    name: "Git",
    icon: "/assets/TechStacks-Logo/7.svg",
    description: "Version control for collaborative development",
  },
  {
    name: "Java",
    icon: "/assets/TechStacks-Logo/8.png",
    description: "Object-oriented programming for various applications",
  },
  {
    name: "Express.js",
    icon: "/assets/TechStacks-Logo/9.svg",
    description: "Node.js framework for building APIs",
  },
  {
    name: "Bootstrap",
    icon: "/assets/TechStacks-Logo/10.svg",
    description: "CSS framework for responsive designs",
  },
  {
    name: "MongoDB",
    icon: "/assets/TechStacks-Logo/11.svg",
    description: "NoSQL database for modern applications",
  },
  {
    name: "Node.js",
    icon: "/assets/TechStacks-Logo/12.svg",
    description: "JavaScript runtime for server-side development",
  },
  {
    name: "Vue.js",
    icon: "/assets/TechStacks-Logo/13.svg",
    description: "Progressive JavaScript framework for building user interfaces",
  },
  {
    name: "React",
    icon: "/assets/TechStacks-Logo/14.svg",
    description: "JavaScript library for building user interfaces",
  },
  {
    name: "Firebase",
    icon: "/assets/TechStacks-Logo/15.svg",
    description: "Platform for building web and mobile applications",
  },
  {
    name: "Tailwind CSS",
    icon: "/assets/TechStacks-Logo/16.svg",
    description: "Utility-first CSS framework for rapid UI development",
  },
  {
    name: "TypeScript",
    icon: "/assets/TechStacks-Logo/17.svg",
    description: "JavaScript with syntax for types",
  },
  {
    name: "AWS",
    icon: "/assets/TechStacks-Logo/18.svg",
    description: "Cloud computing services for scalable applications",
  },
  {
    name: "Docker",
    icon: "/assets/TechStacks-Logo/19.svg",
    description: "Containerization for consistent development environments",
  },
  {
    name: "GraphQL",
    icon: "/assets/TechStacks-Logo/20.svg",
    description: "API query language and runtime for more efficient data fetching",
  },
  {
    name: "Next.js",
    icon: "/assets/TechStacks-Logo/21.png",
    description: "React framework for production-ready applications",
  },
  {
    name: "Vercel",
    icon: "/assets/TechStacks-Logo/22.svg",
    description: "Platform for frontend frameworks and static sites",
  },
  {
    name: "Python",
    icon: "/assets/TechStacks-Logo/23.png",
    description: "Versatile language for scripting, data science, and automation",
  },
  {
    name: "PostgreSQL",
    icon: "/assets/TechStacks-Logo/24.png",
    description: "Powerful, open source object-relational database",
  },
  {
    name: "Redis",
    icon: "/assets/TechStacks-Logo/25.svg",
    description: "In-memory data structure store for caching and messaging",
  },
]

export default function TechStackGrid() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {techStacks.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-white dark:bg-[#141415] rounded-lg p-3 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
            onMouseEnter={() => setActiveTooltip(tech.name)}
            onMouseLeave={() => setActiveTooltip(null)}
            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.05)" }}
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Image
                  src={tech.icon || "/placeholder.svg"}
                  alt={tech.name}
                  width={32}
                  height={32}
                  className="object-contain filter dark:invert-[.25]"
                  style={{ width: '32px', height: '32px' }}
                />
              </motion.div>
            </div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">{tech.name}</p>

            {/* Tooltip */}
            {activeTooltip === tech.name && (
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
    </div>
  )
}

