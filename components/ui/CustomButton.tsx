"use client";

import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  needBgGradient?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function CustomButton({
  children,
  onClick,
  needBgGradient = false,
  className = '',
  disabled = false,
  type = 'button',
}: CustomButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative isolate min-w-[140px] w-auto h-[50px] bg-none outline-none border-none p-0 m-0 ${className}`}
      style={{
        height: '50px',
        position: 'relative',
        background: 'none',
        outline: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
      }}
    >
      <div
        className={`top h-full px-6 font-poppins text-base flex items-center justify-center rounded-[7mm] outline-2 transition-all duration-200 relative overflow-hidden ${
          needBgGradient
            ? 'bg-linear-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white dark:text-white outline-blue-800 dark:outline-blue-300'
            : 'bg-white dark:bg-[#0F0F10] text-blue-600 dark:text-blue-400 outline-blue-600 dark:outline-blue-400'
        }`}
      >
        {children}
        <div className="absolute inset-0 bg-black/10 skew-x-30 -left-5 transition-all duration-250" />
      </div>
      <div
        className={`bottom absolute w-[calc(100%-4px)] h-full top-2.5 left-[2px] rounded-[7mm] outline-2 z-[-1] ${

            'bg-gray-200 dark:bg-gray-900 outline-blue-600 dark:outline-blue-400'
        }`}
      >
      </div>
      <div
        className={`absolute w-[calc(100%-2px)] h-full top-3.5 left-[1px] rounded-[7mm] outline-2 z-[-1] ${
           'bg-gray-400 dark:bg-gray-800 outline-blue-600 dark:outline-blue-400'
        }`}
      />
      {/* Connecting lines between top and bottom layers */}
      <div className={`absolute w-0.5 h-5 top-[45px] left-[25px] z-[-1] ${
        'bg-blue-600 dark:bg-blue-400'
      }`} />
      <div className={`absolute w-0.5 h-5 top-[45px] right-[25px] z-[-1] ${
        'bg-blue-600 dark:bg-blue-400'
      }`} />
      <style jsx>{`
        button:active .top {
          transform: translateY(10px);
        }
        button:active .top::before {
          left: calc(100% + 20px);
        }
      `}</style>
    </button>
  );
}