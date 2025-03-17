"use client"

import { useTheme } from "@/context/theme-provider"
import { motion } from "framer-motion"
import { Moon, Sun, Monitor } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    setTheme(nextTheme)
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />
      case "dark":
        return <Moon className="h-5 w-5" />
      case "system":
        return <Monitor className="h-5 w-5" />
    }
  }

  return (
    <motion.button
      onClick={cycleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 dark:bg-black/80 dark:text-gray-200 dark:hover:bg-gray-800/80 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {getIcon()}
    </motion.button>
  )
}

