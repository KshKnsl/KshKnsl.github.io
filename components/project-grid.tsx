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
            className="group relative bg-white/80 dark:bg-black/80 rounded-xl overflow-hidden shadow-[0px_4px_15px_rgba(13,71,161,0.3)] hover:shadow-[0px_6px_20px_rgba(13,71,161,0.5)] transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md sketch-border"

          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <div className="flex gap-2 z-50">
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
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#60A5FA80] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}