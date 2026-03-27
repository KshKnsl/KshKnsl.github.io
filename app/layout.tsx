import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/context/theme-provider"

export const metadata: Metadata = {
  title: "Kush Kansal | Full Stack Developer & Java Programmer",
  description:
    "Personal portfolio of Kush Kansal, showcasing projects and skills in web development and Java programming",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      
      <body
        className={`antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>{children}</ThemeProvider>
        </body>
    </html>
  )
}

