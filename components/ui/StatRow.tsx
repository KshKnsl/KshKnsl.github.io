import { cn } from "@/lib/utils";
import React from "react";

interface StatRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
  labelClassName?: string;
  valueClassName?: string;
  className?: string;
}

export const StatRow: React.FC<StatRowProps> = ({
  label,
  value,
  labelClassName,
  valueClassName,
  className,
}) => {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <span className={cn("text-xs text-gray-600 dark:text-gray-400", labelClassName)}>
        {label}
      </span>
      <span className={cn("text-xs text-gray-800 dark:text-gray-200", valueClassName)}>
        {value}
      </span>
    </div>
  );
};
