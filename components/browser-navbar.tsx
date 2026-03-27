"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Home,
  Search,
  Menu,
  X,
  User,
  Code,
  Mail,
  Terminal,
} from "lucide-react"
import { getRandomMessage } from "@/utils/messages"
import { scrollToElement } from "@/utils/scroll-utils"
import ThemeToggle from "./theme-toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

export default function BrowserNavbar({ activeSection }: { activeSection?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentUrl] = useState("kushkansal.tech")
  const [activeTab, setActiveTab] = useState("home")
  const navbarRef = useRef(null)
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

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

  const tabs = [
    { id: "home", label: "Home", icon: <Home className="w-4 h-4" />, href: "#" },
    { id: "terminal", label: "Terminal", icon: <Terminal className="w-4 h-4" />, href: "#terminal" },
    { id: "about", label: "About", icon: <User className="w-4 h-4" />, href: "#about" },
    { id: "projects", label: "Projects", icon: <Code className="w-4 h-4" />, href: "/projects" },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" />, href: "#contact" },
  ]

  const hideTabs = pathname.endsWith("/projects");

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) {
      setIsMenuOpen(false)
      return
    }

    e.preventDefault()
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      setActiveTab("home")
      setIsMenuOpen(false)
      return
    }

    const targetId = href.replace("#", "")
    scrollToElement(targetId)
    setActiveTab(targetId)
    setIsMenuOpen(false)
  }

  return (
    <header
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/85 dark:bg-black/80 backdrop-blur-xl border-gray-200/90 dark:border-gray-800 shadow-[0_10px_24px_rgba(13,71,161,0.12)]"
          : "bg-white/95 dark:bg-black/95 border-gray-200 dark:border-gray-800"
      }`}
    >
      <div className="container mx-auto h-full">
        <div className="flex items-center justify-between h-full px-2 sm:px-4">
          <div className="flex items-center space-x-2 flex-1">
            <div className="hidden md:flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-hackclub-blue/10 dark:hover:bg-hackclub-blue/20 rounded-full border border-gray-200 dark:border-gray-700 transition-colors"
                    whileTap={{ scale: 0.95 }}
                    style={{ boxShadow: "0 6px 14px rgba(13,71,161,0.08)" }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  {getRandomMessage()}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-hackclub-blue/10 dark:hover:bg-hackclub-blue/20 rounded-full border border-gray-200 dark:border-gray-700 transition-colors"
                    whileTap={{ scale: 0.95 }}
                    style={{ boxShadow: "0 6px 14px rgba(13,71,161,0.08)" }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  {getRandomMessage()}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-hackclub-blue/10 dark:hover:bg-hackclub-blue/20 rounded-full border border-gray-200 dark:border-gray-700 transition-colors"
                    whileTap={{ scale: 0.95 }}
                    style={{ boxShadow: "0 6px 14px rgba(13,71,161,0.08)" }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  {getRandomMessage()}
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl">
              <div
                className="flex items-center w-full h-9 px-3 rounded-full bg-gray-100/80 dark:bg-[#0F0F10]/80 border border-gray-200 dark:border-gray-700 hover:border-hackclub-blue/40 dark:hover:border-hackclub-cyan/40 transition-colors"
                style={{ boxShadow: "inset 1px 1px 2px rgba(13,71,161,0.08)" }}
              >
                <Search className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300 truncate">{currentUrl}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {!hideTabs && (
              <div className="hidden lg:flex items-center space-x-1 overflow-x-auto scrollbar-hide px-1">
                {tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    onClick={(e) => handleTabClick(e, tab.href)}
                    className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      activeTab === tab.id
                        ? "bg-hackclub-blue/10 dark:bg-hackclub-blue/20 text-hackclub-blue dark:text-hackclub-cyan border-hackclub-blue/40 dark:border-hackclub-cyan/30"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-transparent"
                    }`}
                    style={{ boxShadow: activeTab === tab.id ? "0 8px 16px rgba(13,71,161,0.14)" : "none" }}
                  >
                    {tab.icon}
                    <span className="ml-1.5">{tab.label}</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-1">
              <div>
                <ThemeToggle />
              </div>

              <motion.button
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-hackclub-blue/10 dark:hover:bg-hackclub-blue/20 rounded-full border border-gray-200 dark:border-gray-700 transition-colors"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{ boxShadow: "0 6px 14px rgba(13,71,161,0.08)" }}
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
                        className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-hackclub-blue/10 dark:hover:bg-hackclub-blue/20 rounded-xl transition-colors border border-gray-200 dark:border-gray-700"
                        onClick={(e) => handleTabClick(e, tab.href)}
                        style={{ boxShadow: "0 8px 16px rgba(13,71,161,0.08)" }}
                      >
                        <span className="bg-gray-100 dark:bg-[#0F0F10] p-2 rounded-lg mr-3 border border-gray-200 dark:border-gray-700 text-hackclub-blue dark:text-hackclub-cyan">
                          {tab.icon}
                        </span>
                        {tab.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}