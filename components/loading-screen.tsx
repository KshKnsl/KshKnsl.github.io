"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = 2 + Math.floor((100 - prev) / 15)
        const newProgress = prev + increment
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete()
          }, 50)
          return 100
        }
        return newProgress
      })
    }, 20)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black dark:bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-2 text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Kush Kansal
              </span>
            </h1>
            <p className="text-gray-400 text-center text-lg">Web Developer & Problem Solver</p>
          </motion.div>

          <div className="w-[280px] h-1 bg-gray-800 rounded-full mb-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-gray-400 text-sm"
          >
            {progress < 100 ? "Loading portfolio..." : "Welcome!"}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}