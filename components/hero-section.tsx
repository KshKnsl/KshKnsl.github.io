"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"
import Link from "next/link"

const roleTitles = [
  { text: "Student @JIIT-27 🎓", color: "#0A6AD6" },
  { text: "Back End Developer 🔧", color: "#FFAF45" },
  { text: "Front End Developer 🎨", color: "#A34343" },
  { text: "DSA Lover 📊", color: "#2C2C2C" },
  { text: "Half a Decade of Coding ⏳", color: "#FF204E" },
  { text: "Exploring Tech 🚀", color: "#19A95B" },
  { text: "Open Source Contributor 🌐", color: "#FFAF45" },
  { text: "Competitive Programmer 🏆", color: "#FF204E" },
  { text: "React & TypeScript Dev ⚛️", color: "#2C2C2C" },
]

export default function HeroSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const heroSection = document.querySelector(".hero-section")

    if (!heroSection) return

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent
      
      setCursorPosition({
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
      })

      setCursorVisible(true)
    }

    const handleMouseLeave = () => {
      setCursorVisible(false)
    }

    if (!isMobile) {
      heroSection.addEventListener("mousemove", handleMouseMove)
      heroSection.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener("mousemove", handleMouseMove)
        heroSection.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isMobile])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roleTitles.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    }

    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative min-h-screen bg-[#0A0118] overflow-hidden hero-section">
      <div className="absolute inset-0 bg-white dark:bg-black dark:opacity-90" />

      {!isMobile && (
        <motion.div
          className="fixed flex h-[32px] text-[16px] w-fit z-50 text-white items-center justify-center font-bold rounded-2xl px-5 py-2 pointer-events-none"
          style={{ backgroundColor: roleTitles[currentRoleIndex].color }}
          animate={{
            x: cursorPosition.x+15,
            y: cursorPosition.y - 5,
            opacity: cursorVisible ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
        >
          {roleTitles[currentRoleIndex].text}
        </motion.div>
      )}

      <div className="container relative z-10 px-4 mx-auto max-w-7xl h-screen">
        <div className="grid h-full gap-8 md:gap-12 md:grid-cols-2 items-center pt-20">
          <div className="text-center md:text-left space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold dark:text-white text-[#323232]"
            >
              Hi, I&apos;m{" "}
              <span className="bg-linear-to-r from-[#0d47a1] via-[#2563eb] to-[#60a5fa] text-transparent bg-clip-text">
                Kush Kansal
              </span>
            </motion.h1>

            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium"
                style={{ backgroundColor: roleTitles[currentRoleIndex].color }}
              >
                {roleTitles[currentRoleIndex].text}
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl dark:text-gray-400"
            >
             Full-Stack Developer | CSE @ JIIT&apos; 27  MERN | Knight @ LeetCode (solved 1000+) | 4⭐ @ CodeChef | Specialist @ Codeforces
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              <Link
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-linear-to-r from-[#0d47a1] to-[#3b82f6] text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get in touch
              </Link>
              <Link
                href="#terminal"
                onClick={(e) => handleNavClick(e, "#terminal")}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg border 
               text-black border-gray-700 dark:text-white font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Open Terminal
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto"
          >
            <div className="absolute inset-0 rounded-3xl border-4 border-dashed border-blue-300/20 -m-2"></div>

            <div className="absolute inset-0 bg-linear-to-r from-[#0d47a1]/20 to-[#3b82f6]/20 rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden border-2 border-blue-900/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10"></div>
              <Image
                src="https://res.cloudinary.com/dvvoebyu3/image/upload/c_auto,g_auto,h_500,w_500/686e2b2b1924280ff00d4c8f_1753282156198?_a=BAMCkGTG0"
                alt="Kush Kansal"
                width={500}
                height={500}
                className="object-cover w-full h-full"
                style={{ width: '100%', height: 'auto' }}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
