"use client"

import { useEffect, useState, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Memoize the Stars component to prevent unnecessary re-renders
const StarsCanvas = memo(() => (
  <Canvas 
    camera={{ position: [0, 0, 3] }} 
    dpr={[1, 1.5]} 
    performance={{ min: 0.5 }}
    frameloop="demand"
    gl={{ powerPreference: "high-performance", antialias: false }}
  >
    <color attach="background" args={["#000000"]} />
    <ambientLight intensity={0.5} />
    <Stars 
      radius={100} 
      depth={50} 
      count={1500} 
      factor={4} 
      saturation={0} 
      fade 
      speed={0.5} 
    />
  </Canvas>
));

StarsCanvas.displayName = 'StarsCanvas';

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Use a single interval for smoother progress
    const interval = setInterval(() => {
      setProgress(prev => {
        // Accelerate progress as it gets closer to 100
        const increment = 2 + Math.floor((100 - prev) / 15)
        const newProgress = prev + increment
        
        if (newProgress >= 100) {
          clearInterval(interval)
          // Complete loading after a short delay
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
        <div className="h-screen w-full absolute inset-0">
          <StarsCanvas />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-2 text-white">
              <span className="text-gradient">Kush Kansal</span>
            </h1>
            <p className="text-gray-400 text-center text-lg">Web Developer & Problem Solver</p>
          </motion.div>

          <div className="w-[280px] h-1 bg-secondary rounded-full mb-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-primary rounded-full"
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

