import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/context/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kush Kansal | Web Developer & Java Programmer",
  description:
    "Personal portfolio of Kush Kansal, showcasing projects and skills in web development and Java programming",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

