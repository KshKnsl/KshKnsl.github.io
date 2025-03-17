"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { GraduationCap, Award } from "lucide-react"

const education = [
  {
    institution: "Jaypee Institute of Information Technology",
    degree: "B.Tech in Computer Science",
    period: "2020 - 2024",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-jiit-OqNqpg3UeKFj7u0RiT4RE2V9IptgXz.png",
    description: "Currently pursuing Bachelor's degree with focus on Computer Science and Engineering",
    icon: GraduationCap,
  },
  {
    institution: "St. Joseph's Sr. Sec. School",
    degree: "High School",
    period: "2018 - 2020",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stjosephjahangirabad-NKRLnlGcKqYxLj2u3FTOUAUmp4yYKj.png",
    description: "Completed senior secondary education with focus on Mathematics and Computer Science",
    icon: Award,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

export default function EducationTimeline() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto px-4">
      {education.map((edu, index) => (
        <motion.div key={edu.institution} variants={item} className="relative pl-8 pb-8 last:pb-0">
          {index !== education.length - 1 && (
            <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-[#ec3750] to-[#ff8c37] dark:bg-gray-700" />
          )}
          <div className="relative">
            <div className="absolute -left-8 mt-2 w-6 h-6 rounded-full bg-[#ec3750] flex items-center justify-center">
              <edu.icon className="w-4 h-4 text-white" />
            </div>
            <motion.div
              className="flex flex-col md:flex-row md:items-center gap-4 bg-white/80 dark:bg-black/80 rounded-xl p-6 shadow-lg backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex-shrink-0">
                <Image
                  src={edu.logo || "/placeholder.svg"}
                  alt={edu.institution}
                  width={80}
                  height={80}
                  className="rounded-lg"
                  style={{ width: '80px', height: '80px' }}
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.institution}</h3>
                <p className="text-[#ec3750] font-medium">{edu.degree}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{edu.description}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

