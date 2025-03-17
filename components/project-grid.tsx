"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Project {
  title: string
  description: string
  liveLink: string
  codeLink: string
  technologies: string[]
}

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/80 dark:bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md sketch-border"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <div className="flex gap-2">
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-[#3b82f6] transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                  <Link
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-[#3b82f6] transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => {
                  // Determine color based on tech name
                  let bgColor = "bg-gray-500"
                  if (tech === "NodeJS") bgColor = "bg-green-600"
                  if (tech === "EJS") bgColor = "bg-indigo-600"
                  if (tech === "HTML") bgColor = "bg-red-600"
                  if (tech === "TailWindCSS" || tech === "Tailwind CSS") bgColor = "bg-blue-500"
                  if (tech === "JavaScript") bgColor = "bg-yellow-500"
                  if (tech === "MySQL") bgColor = "bg-orange-500"
                  if (tech === "PHP" || tech === "Php") bgColor = "bg-purple-500"
                  if (tech === "C++") bgColor = "bg-pink-600"
                  if (tech === "C") bgColor = "bg-gray-600"
                  if (tech === "JAVA" || tech === "Java") bgColor = "bg-yellow-700"

                  return (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${bgColor}`}
                    >
                      {tech}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

