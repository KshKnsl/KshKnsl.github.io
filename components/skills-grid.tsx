"use client"

import { motion } from "framer-motion"
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiDocker,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si"

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const skillsData = [
  { icon: SiJavascript, name: "JavaScript", color: "bg-[#ff8c37]" },
  { icon: SiTypescript, name: "TypeScript", color: "bg-[#338eda]" },
  { icon: SiReact, name: "React", color: "bg-[#33d6a6]" },
  { icon: SiNextdotjs, name: "Next.js", color: "bg-[#ec3750]" },
  { icon: SiTailwindcss, name: "Tailwind", color: "bg-[#a633d6]" },
  { icon: SiNodedotjs, name: "Node.js", color: "bg-[#5bc0de]" },
  { icon: SiPython, name: "Python", color: "bg-[#ff8c37]" },
  { icon: SiGit, name: "Git", color: "bg-[#338eda]" },
  { icon: SiDocker, name: "Docker", color: "bg-[#33d6a6]" },
  { icon: SiMongodb, name: "MongoDB", color: "bg-[#a633d6]" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "bg-[#5bc0de]" },
]

export default function SkillsGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {skillsData.map((skill, index) => (
        <motion.div
          key={skill.name}
          variants={item}
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          className={`${skill.color} p-6 rounded-xl glass-card text-white flex flex-col items-center justify-center gap-2 transform transition-all duration-300 hover:shadow-lg relative overflow-hidden group`}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <skill.icon className="w-12 h-12" />
          </motion.div>
          <span className="font-medium text-sm relative z-10">{skill.name}</span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className="h-1 bg-white/30 rounded-full mt-2 relative overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, delay: index * 0.1 }}
              className="absolute inset-0 bg-white rounded-full"
            />
          </motion.div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </motion.div>
  )
}

