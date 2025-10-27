import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import React from "react";

// Combine standard div attributes with motion props, letting motion props take precedence.
type CardProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> & MotionProps;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, whileHover = { y: -5 }, transition = { duration: 0.2 }, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]",
        className
      )}
      whileHover={whileHover}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-b border-gray-200 dark:border-gray-800 p-3", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-3", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";
