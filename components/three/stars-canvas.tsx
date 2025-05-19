"use client"

import { memo } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"

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

export default StarsCanvas;
