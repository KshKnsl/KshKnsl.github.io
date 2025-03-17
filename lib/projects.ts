export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  image: string
  liveLink: string
  codeLink: string
  technologies: string[]
  features: string[]
  draft?: boolean
}

// Project data
export const projects: Project[] = [
  {
    slug: "url-shortener",
    title: "URL Shortener",
    description: "This is a free tool to shorten URLs and generate QR code & links making it easy to share.",
    longDescription:
      "URL Shortener is a web application that allows users to create shortened URLs for easier sharing. It also generates QR codes for quick mobile access. Built with Next.js and React, this tool provides a simple and efficient way to manage and share long URLs.",
    image: "/projects/url-shortener.jpg",
    liveLink: "https://tinyu.vercel.app/",
    codeLink: "https://github.com/KushKansal/URL-Shorten",
    technologies: ["Next.js", "React", "MongoDB"],
    features: [
      "URL shortening with custom aliases",
      "QR code generation",
      "Click analytics",
      "User-friendly interface",
    ],
  },
  {
    slug: "portfolio-site",
    title: "Portfolio Site",
    description:
      "My portfolio website! This is where you can learn more about me, my skills, projects, and experiences.",
    longDescription:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features include dark mode support, interactive components, and a terminal emulator. The site showcases my projects, skills, and professional experience in an engaging way.",
    image: "/projects/portfolio.jpg",
    liveLink: "#",
    codeLink: "https://github.com/KushKansal/Portfolio",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    features: [
      "Responsive design",
      "Dark/light mode",
      "Interactive terminal",
      "Project showcase",
      "Animated UI elements",
    ],
  },
  {
    slug: "chintan-trivia",
    title: "Chintan Trivia",
    description:
      "Chintan-Trivia is a web-based quiz app for creating and participating in AI-driven quizzes, enhancing classroom interactions.",
    longDescription:
      "Chintan Trivia is an interactive quiz platform designed to enhance classroom engagement. It leverages AI to generate relevant questions and provides real-time feedback to participants. Teachers can create custom quizzes, track student progress, and analyze performance metrics.",
    image: "/projects/chintan-trivia.jpg",
    liveLink: "http://chintan.42web.io/",
    codeLink: "https://github.com/KshKnsl/ChintanTrivia",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    features: [
      "AI-generated questions",
      "Real-time scoring",
      "Teacher dashboard",
      "Student progress tracking",
      "Custom quiz creation",
    ],
  },
  {
    slug: "upcoming-project",
    title: "Upcoming Project",
    description: "A new exciting project that's currently in development. Stay tuned for updates!",
    longDescription:
      "This is a preview of an upcoming project that's still in development. The project will feature cutting-edge technologies and innovative solutions to common problems. More details will be revealed soon!",
    image: "/placeholder.svg?height=500&width=1000",
    liveLink: "#",
    codeLink: "#",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    features: ["Feature 1 (Coming Soon)", "Feature 2 (Coming Soon)", "Feature 3 (Coming Soon)"],
    draft: true,
  },
]

// Get all projects (optionally including drafts)
export function getAllProjects(includeDrafts = false): Project[] {
  return projects.filter((project) => includeDrafts || !project.draft)
}

// Get a single project by slug
export function getProjectBySlug(slug: string, includeDrafts = false): Project | undefined {
  return getAllProjects(includeDrafts).find((project) => project.slug === slug)
}

