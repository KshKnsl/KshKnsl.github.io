"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  Menu,
  X,
  User,
  Code,
  Mail,
  Terminal,
  Download,
} from "lucide-react"
import { getRandomMessage } from "@/utils/messages"
import { scrollToElement } from "@/utils/scroll-utils"
import ThemeToggle from "./theme-toggle"

export default function BrowserNavbar({ activeSection }: { activeSection: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentUrl] = useState("kushkansal.me")
  const [activeTab, setActiveTab] = useState("home")
  const [tooltipMessage, setTooltipMessage] = useState("")
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const navbarRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (activeSection) {
      setActiveTab(activeSection === "hero" ? "home" : activeSection)
    }
  }, [activeSection])

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, isButton = false) => {
    if (isButton) {
      setTooltipMessage(getRandomMessage())
      const rect = e.currentTarget.getBoundingClientRect()
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 10,
      })
      setShowTooltip(true)
    }
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  const tabs = [
    { id: "about", label: "About", icon: <User className="w-4 h-4" />, href: "#about" },
    { id: "projects", label: "Projects", icon: <Code className="w-4 h-4" />, href: "#projects" },
    { id: "terminal", label: "Terminal", icon: <Terminal className="w-4 h-4" />, href: "#terminal" },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" />, href: "#contact" },
  ]

  return (
    <header
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300
        ${scrolled ? "bg-white dark:bg-black shadow-md" : "bg-white dark:bg-black"}`}
      style={{
        borderBottom: "2px solid #e5e7eb",
      }}
    >
      <div className="container mx-auto h-full">
        <div className="flex items-center justify-between h-full px-2 sm:px-4">
          <div className="flex items-center space-x-2 flex-1">
            <div className="hidden md:flex items-center space-x-1">
              <motion.button
                className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-full border border-gray-200 dark:border-gray-700"
                whileTap={{ scale: 0.95 }}
                onMouseEnter={(e) => handleMouseEnter(e, true)}
                onMouseLeave={handleMouseLeave}
                style={{ boxShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-full border border-gray-200 dark:border-gray-700"
                whileTap={{ scale: 0.95 }}
                onMouseEnter={(e) => handleMouseEnter(e, true)}
                onMouseLeave={handleMouseLeave}
                style={{ boxShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-full border border-gray-200 dark:border-gray-700"
                whileTap={{ scale: 0.95 }}
                onMouseEnter={(e) => handleMouseEnter(e, true)}
                onMouseLeave={handleMouseLeave}
                style={{ boxShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl">
              <div
                className="flex items-center w-full h-9 px-3 rounded-full bg-gray-100/80 dark:bg-[#0F0F10]/80 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors"
                style={{ boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.05)" }}
              >
                <Search className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300 truncate">{currentUrl}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden lg:flex items-center space-x-1 overflow-x-auto scrollbar-hide px-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (tab.href === "#") {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    } else {
                      // Otherwise scroll to the section
                      const targetId = tab.href.replace("#", "");
                      scrollToElement(targetId);
                    }
                  }}
                  className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeTab === tab.id
                      ? "bg-gray-100 dark:bg-[#0F0F10] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-transparent"
                  }`}
                  style={{ boxShadow: activeTab === tab.id ? "1px 1px 0px rgba(0,0,0,0.1)" : "none" }}
                >
                  {tab.icon}
                  <span className="ml-1.5">{tab.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-1">
              <div>
                <ThemeToggle />
              </div>

              <Link
                href="#"
                className="hidden md:flex items-center space-x-1 px-3 py-1.5 text-white bg-gradient-primary rounded-full shadow-sm hover:shadow-md transition-all text-sm font-medium border border-[#3b82f6]/20 dark:border-[#60a5fa]/20"
                onClick={(e) => {
                  e.preventDefault();
                }}
                style={{ boxShadow: "1px 1px 0px rgba(0,0,0,0.2)" }}
              >
                <Download className="w-4 h-4 mr-1" />
                <span>Resume</span>
              </Link>

              <motion.button
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-full border border-gray-200 dark:border-gray-700"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{ boxShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-black/95 shadow-lg border-t border-gray-200/50 dark:border-gray-800/50"
          >
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                <div className="py-4 px-2 space-y-2">
                  {tabs.map((tab) => (
                    <motion.div key={tab.id} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={tab.href}
                        className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          if (tab.href === "#") {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          } else {
                            // Otherwise scroll to the section
                            const targetId = tab.href.replace("#", "");
                            scrollToElement(targetId);
                          }
                          setIsMenuOpen(false);
                        }}
                        style={{ boxShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
                      >
                        <span className="bg-gray-100 dark:bg-[#0F0F10] p-2 rounded-lg mr-3 border border-gray-200 dark:border-gray-700">
                          {tab.icon}
                        </span>
                        {tab.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="#"
                      className="mt-2 flex items-center justify-center px-4 py-3 text-white rounded-lg bg-gradient-primary border border-[#3b82f6]/20 dark:border-[#60a5fa]/20 shadow-md"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                      }}
                      style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </Link>
                  </motion.div>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed z-50 px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-black rounded-lg shadow-lg"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: "translateX(-50%)",
              boxShadow: "2px 2px 0px rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {tooltipMessage}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-black"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}