import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "A comprehensive showcase of Kush Kansal's projects, including web applications, tools, and other software projects.",
  openGraph: {
    title: "All Projects | Kush Kansal Portfolio",
    description:
      "A comprehensive showcase of Kush Kansal's projects, including web applications, tools, and other software projects.",
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

