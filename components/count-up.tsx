"use client";

import { useState, useEffect } from "react";

interface CountUpProps {
  end: number | string; // Allow `end` to be a number or string
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function CountUp({ 
  end, 
  duration = 2000, 
  prefix = "", 
  suffix = "", 
  decimals = 0 
}: CountUpProps) {
  const [count, setCount] = useState<number | string>(0); // Handle both numbers and strings

  useEffect(() => {
    // If `end` is a string, return it as-is
    if (typeof end === "string") {
      setCount(end);
      return;
    }

    let startTime: number | null = null;
    const startCount = 0;
    const endCount = end;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Calculate current count with decimal precision if needed
      const currentCount = progress * (endCount - startCount) + startCount;

      // Set the count with appropriate decimal places
      setCount(decimals > 0 ? Number(currentCount.toFixed(decimals)) : Math.floor(currentCount));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(endCount);
      }
    };

    requestAnimationFrame(animateCount);

    return () => setCount(0);
  }, [end, duration, decimals]);

  return (
    <>
      {prefix}
      {typeof count === "string"
        ? count
        : (Number(count) || 0).toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
      {suffix}
    </>
  );
}

