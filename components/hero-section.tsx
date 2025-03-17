"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"
import Link from "next/link"

const roleTitles = [
  { text: "Student @JIIT-27' 🎓", color: "#0A6AD6" },
  { text: "Back End Developer 🌱", color: "#FFAF45" },
  { text: "Front End Developer 🌱", color: "#A34343" },
  { text: "900+ LeetCode 💻", color: "#2C2C2C" },
  { text: "3⭐ CodeChef", color: "#FF204E" },
  { text: "Exploring Tech 🚀", color: "#19A95B" },
]

export default function HeroSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on mobile
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
          {/* Left column */}
          <div className="text-center md:text-left space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold dark:text-white text-[#323232]"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-[#0d47a1] via-[#2563eb] to-[#60a5fa] text-transparent bg-clip-text">
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
              CSE @JIIT&apos; 27 || Java || JavaScript || Web Developer || 900+ LeetCode || 3 ⭐ CodeChef
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
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#0d47a1] to-[#3b82f6] text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get in touch
              </Link>
              <Link
                href="#terminal"
                onClick={(e) => handleNavClick(e, "#terminal")}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg border 
               text-black border-gray-700 dark:text-white font-medium hover:bg-gray-800/50 transition-all"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Open Terminal
              </Link>
            </motion.div>
          </div>

          {/* Right column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto"
          >
            <div className="absolute inset-0 rounded-3xl border-4 border-dashed border-blue-300/20 -m-2"></div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#0d47a1]/20 to-[#3b82f6]/20 rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden border-2 border-blue-900/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10"></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MyImage.jpg-8UPBc9HASn3izHAC3JKWZcDnUPjvJ2.jpeg"
                alt="Kush Kansal"
                width={500}
                height={500}
                className="object-cover w-full h-full"
                style={{ width: '100%', height: 'auto' }}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

