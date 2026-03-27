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
        const increment = 1 + Math.ceil((100 - prev) / 20)
        const newProgress = prev + increment
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete()
          }, 180)
          return 100
        }
        return newProgress
      })
    }, 28)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#05070c]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-hackclub-blue/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-hackclub-cyan/10 blur-3xl" />
          <div className="absolute bottom-6 right-1/4 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(96,165,250,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.16) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 w-[92vw] max-w-xl rounded-2xl border border-blue-300/20 bg-white/4 backdrop-blur-xl p-7 sm:p-9 shadow-[0_20px_60px_rgba(30,64,175,0.35)]"
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="rounded-full border border-blue-300/30 bg-blue-400/10 px-3 py-1 text-xs uppercase tracking-wide text-blue-200">
              Initializing
            </span>
            <span className="text-xs text-blue-200/80">{progress}%</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6 h-24 w-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-blue-300/20 border-t-blue-300"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-cyan-300/30 border-b-cyan-300"
              />
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute inset-[30%] rounded-full bg-linear-to-r from-blue-400 to-cyan-300 shadow-[0_0_24px_rgba(56,189,248,0.8)]"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              <span className="bg-linear-to-r from-[#60a5fa] via-[#3b82f6] to-[#22d3ee] bg-clip-text text-transparent">
                Kush Kansal
              </span>
            </h1>

            <p className="text-xs text-blue-200/80 tracking-wide uppercase">
              {progress < 100 ? "Loading portfolio" : "Ready"}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}