"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion} from "framer-motion"
import { useTheme } from "@/context/theme-provider"
import TerminalInput from "./terminal-input"

// Responsive ASCII art banners for different screen sizes
const BANNERS = {
  large: `<span class="text-green-600 dark:text-green-400 block whitespace-pre-wrap font-mono text-base leading-tight">
  _  __           _       _  __                      _ 
 | |/ /          | |     | |/ /                     | |
 | ' / _   _  ___| |___  | ' / __ _ _ __  ___  __ _ | |
 | |< | | | |/ __| '_  \\ | |< / _\` | '_ \\/ __|/ _\` || |
 | . \\| |_| |\\__ \\ | | | | . \\ (_| | | | \\__ \\ (_| || |
 |_|\\_\\\\__,_||___/_| |_| |_|\\_\\__,_|_| |_|___/\\__,_||_|
</span>`,
  medium: `<span class="text-green-600 dark:text-green-400 block whitespace-pre-wrap font-mono text-sm leading-tight">
 _  __          _    _  __                   _ 
| |/ /         | |  | |/ /                  | |
| ' / _   _ ___| |__| ' / __ _ _ __  ___  __| |
| |< | | | / __|___ | |< / _\` | '_ \\/ __|/ _\` |
| . \\| |_| \\__ \\ |_ | . \\ (_| | | | \\__ \\ (_| |
|_|\\_\\\\__,_|___| |__|_|_|\\_\\__,_|_|_|___/\\__,_|
</span>`,
small: `<span class="text-green-600 dark:text-green-400 block whitespace-pre-wrap font-mono text-xs leading-tight">
 _  __     _     _  __          _ 
| |/ /    | |   | |/ /         | |
| . /_____| |__ | . / _ __  ___| |
| |-/ ____|  _ \\|  < |  _ \\/ __| |
| . \\____ \\ | | | . \\| | | \\__ \\ |
|_|\\_\\____/_| |_|_|\\_\\_| |_|___/_|
</span>`,
  tiny: `<span class="text-green-600 dark:text-green-400 block whitespace-pre-wrap font-mono text-xs leading-tight">
Kush Kansal
</span>`,
}

// Add a type definition for the COMMANDS object
type CommandsType = {
  [key: string]: string | string[] | (() => string) | ((args?: string) => string);
};

const COMMANDS: CommandsType = {
  help: `<span class="text-green-600 dark:text-green-400 font-bold">Available commands:</span>
  <span class="text-yellow-600 dark:text-yellow-400">about</span> - Learn about me
  <span class="text-yellow-600 dark:text-yellow-400">education</span> - My educational background
  <span class="text-yellow-600 dark:text-yellow-400">experience</span> - My work experience
  <span class="text-yellow-600 dark:text-yellow-400">skills</span> - My technical skills
  <span class="text-yellow-600 dark:text-yellow-400">projects</span> - View my projects
  <span class="text-yellow-600 dark:text-yellow-400">social</span> - My social media links
  <span class="text-yellow-600 dark:text-yellow-400">contact</span> - How to reach me
  <span class="text-yellow-600 dark:text-yellow-400">tech</span> - Technologies I use
  <span class="text-yellow-600 dark:text-yellow-400">joke</span> - Get a programming joke
  <span class="text-yellow-600 dark:text-yellow-400">time</span> - Display current time
  <span class="text-yellow-600 dark:text-yellow-400">clear</span> - Clear the terminal
  <span class="text-yellow-600 dark:text-yellow-400">banner</span> - Display welcome banner
  <span class="text-yellow-600 dark:text-yellow-400">theme</span> - Toggle dark/light mode
  
  <span class="text-green-600 dark:text-green-400 font-bold">System commands:</span>
  <span class="text-yellow-600 dark:text-yellow-400">ls</span> - List directory contents
  <span class="text-yellow-600 dark:text-yellow-400">pwd</span> - Print working directory
  <span class="text-yellow-600 dark:text-yellow-400">cd</span> - Change directory
  <span class="text-yellow-600 dark:text-yellow-400">mkdir</span> - Make directory
  <span class="text-yellow-600 dark:text-yellow-400">touch</span> - Create file
  <span class="text-yellow-600 dark:text-yellow-400">cat</span> - Display file contents
  <span class="text-yellow-600 dark:text-yellow-400">rm</span> - Remove file or directory
  <span class="text-yellow-600 dark:text-yellow-400">echo</span> - Print text
  <span class="text-yellow-600 dark:text-yellow-400">date</span> - Display current date
  <span class="text-yellow-600 dark:text-yellow-400">whoami</span> - Display current user
  <span class="text-yellow-600 dark:text-yellow-400">history</span> - Show command history
  <span class="text-yellow-600 dark:text-yellow-400">man</span> - Display manual for a command`,

  about: `<span class="text-cyan-600 dark:text-cyan-400 font-bold">Hi! I'm Kush Kansal</span>, a Computer Science student at JIIT with a passion for web development and problem solving.
  
I'm currently pursuing my B.tech from JIIT and have a keen interest in technological stuff. I get excited just by thinking about the endless possibilities of cutting-edge technologies.

<span class="text-purple-600 dark:text-purple-400">• 700+ LeetCode problems solved</span>
<span class="text-purple-600 dark:text-purple-400">• 3 ⭐ CodeChef</span>
<span class="text-purple-600 dark:text-purple-400">• Full-stack web developer</span>`,

  education: `<span class="text-pink-600 dark:text-pink-400 font-bold"><span class="text-yellow-600 dark:text-yellow-300">🎓</span> Education:</span>

<span class="text-blue-600 dark:text-blue-400 font-bold">B.Tech Computer Science</span>
<span class="text-gray-600 dark:text-gray-400">Jaypee Institute of Information Technology (2020-2024)</span>

<span class="text-blue-600 dark:text-blue-400 font-bold">High School</span>
<span class="text-gray-600 dark:text-gray-400">St. Joseph's Sr. Sec. School, Jahangirabad</span>`,

  skills: `<span class="text-green-600 dark:text-green-400 font-bold"><span class="text-yellow-600 dark:text-yellow-300">💻</span> Technical Skills:</span>

<span class="text-orange-600 dark:text-orange-400 font-bold">Languages:</span> JavaScript, TypeScript, Java, Python, C++
<span class="text-orange-600 dark:text-orange-400 font-bold">Frontend:</span> React, Next.js, HTML, CSS, Tailwind CSS
<span class="text-orange-600 dark:text-orange-400 font-bold">Backend:</span> Node.js, Express, MongoDB, PostgreSQL
<span class="text-orange-600 dark:text-orange-400 font-bold">Tools:</span> Git, Docker, VS Code, Figma
<span class="text-orange-600 dark:text-orange-400 font-bold">Other:</span> Data Structures & Algorithms, Problem Solving`,

  contact: `<span class="text-purple-600 dark:text-purple-400 font-bold"><span class="text-yellow-600 dark:text-yellow-300">📧</span> Contact Information:</span>

<span class="text-blue-600 dark:text-blue-400 font-bold">Email:</span> kushkansal0@gmail.com
<span class="text-blue-600 dark:text-blue-400 font-bold">GitHub:</span> github.com/KushKansal
<span class="text-blue-600 dark:text-blue-400 font-bold">LinkedIn:</span> linkedin.com/in/kushkansal
<span class="text-blue-600 dark:text-blue-400 font-bold">Twitter:</span> twitter.com/kansalkkush`,

  projects: `<span class="text-yellow-600 dark:text-yellow-400 font-bold"><span class="text-yellow-600 dark:text-yellow-300">🚀</span> Featured Projects:</span>

<span class="text-green-600 dark:text-green-400 font-bold">1. URL Shortener</span>
   A free tool to shorten URLs and generate QR codes
   <span class="text-blue-600 dark:text-blue-400">Technologies:</span> NodeJS, EJS
   <span class="text-blue-600 dark:text-blue-400">Link:</span> <a href="https://tinyu.vercel.app/" class="text-cyan-600 dark:text-cyan-400 underline">https://tinyu.vercel.app/</a>

<span class="text-green-600 dark:text-green-400 font-bold">2. Portfolio Site</span>
   My personal portfolio website showcasing my projects and skills
   <span class="text-blue-600 dark:text-blue-400">Technologies:</span> Next.js, TypeScript, Tailwind CSS
   <span class="text-blue-600 dark:text-blue-400">Link:</span> <a href="#" class="text-cyan-600 dark:text-cyan-400 underline">Current website</a>

<span class="text-green-600 dark:text-green-400 font-bold">3. ReadMates</span>
   A collaborative hub for tech enthusiasts, writers, and readers
   <span class="text-blue-600 dark:text-blue-400">Technologies:</span> TypeScript, React, Next.js
   <span class="text-blue-600 dark:text-blue-400">Link:</span> <a href="https://readmates.vercel.app/" class="text-cyan-600 dark:text-cyan-400 underline">https://readmates.vercel.app/</a>

<span class="text-green-600 dark:text-green-400 font-bold">4. Chintan Trivia</span>
   Web-based quiz app for creating and participating in AI-driven quizzes
   <span class="text-blue-600 dark:text-blue-400">Technologies:</span> PHP, Tailwind CSS, JavaScript, MySQL
   <span class="text-blue-600 dark:text-blue-400">Link:</span> <a href="http://chintan.42web.io/" class="text-cyan-600 dark:text-cyan-400 underline">http://chintan.42web.io/</a>

<span class="text-green-600 dark:text-green-400 font-bold">5. Wheel Buddy</span>
   A console-based car booking and car-pooling system
   <span class="text-blue-600 dark:text-blue-400">Technologies:</span> C++
   <span class="text-blue-600 dark:text-blue-400">Link:</span> <a href="https://github.com/KshKnsl/WheelBuddy" class="text-cyan-600 dark:text-cyan-400 underline">https://github.com/KshKnsl/WheelBuddy</a>

<span class="text-green-600 dark:text-green-400 font-bold">6. Task Master</span>
   A console-based To-Do List application for task management
   <span class="text-blue-600 dark:text-blue-400">Technologies:</span> C
   <span class="text-blue-600 dark:text-blue-400">Link:</span> <a href="https://github.com/KshKnsl/TaskMaster-X" class="text-cyan-600 dark:text-cyan-400 underline">https://github.com/KshKnsl/TaskMaster-X</a>

Type <span class="text-yellow-600 dark:text-yellow-400">cd projects</span> to navigate to the projects section of the website.`,

  experience: `<span class="text-red-600 dark:text-red-400 font-bold"><span class="text-yellow-600 dark:text-yellow-300">💼</span> Professional Experience:</span>

<span class="text-cyan-600 dark:text-cyan-400 font-bold">Senior Frontend Developer</span>
<span class="text-gray-600 dark:text-gray-400">Tech Innovations Inc. (2021 - Present)</span>
• Led a team of 5 developers
• Implemented CI/CD pipelines
• Reduced load times by 40%

<span class="text-cyan-600 dark:text-cyan-400 font-bold">Full Stack Developer</span>
<span class="text-gray-600 dark:text-gray-400">Digital Solutions LLC (2018 - 2021)</span>
• Built RESTful APIs
• Implemented authentication systems
• Optimized database queries

<span class="text-cyan-600 dark:text-cyan-400 font-bold">Junior Developer</span>
<span class="text-gray-600 dark:text-gray-400">StartUp Studio (2016 - 2018)</span>
• Developed responsive websites
• Fixed bugs and improved performance
• Collaborated with design team`,

  social: `<span class="text-pink-600 dark:text-pink-400 font-bold"><span class="text-yellow-600 dark:text-yellow-300">🔗</span> Social Media Links:</span>

<span class="text-blue-600 dark:text-blue-400 font-bold">GitHub:</span> <a href="https://github.com/kushkansal/" class="text-cyan-600 dark:text-cyan-400 underline">github.com/kushkansal</a>
<span class="text-blue-600 dark:text-blue-400 font-bold">LinkedIn:</span> <a href="https://www.linkedin.com/in/kushkansal/" class="text-cyan-600 dark:text-cyan-400 underline">linkedin.com/in/kushkansal</a>
<span class="text-blue-600 dark:text-blue-400 font-bold">Twitter:</span> <a href="https://twitter.com/kansalkkush" class="text-cyan-600 dark:text-cyan-400 underline">twitter.com/kansalkkush</a>
<span class="text-blue-600 dark:text-blue-400 font-bold">Instagram:</span> <a href="https://www.instagram.com/kushkansal0/" class="text-cyan-600 dark:text-cyan-400 underline">instagram.com/kushkansal0</a>`,

  tech: `<span class="text-green-600 dark:text-green-400 font-bold"><span class="text-yellow-600 dark:text-yellow-300">⚙️</span> Technologies I Use:</span>

<span class="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">React</span> <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">Next.js</span> <span class="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded">TypeScript</span> <span class="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded">JavaScript</span> <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">Tailwind CSS</span> <span class="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">Node.js</span> <span class="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">MongoDB</span> <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">PostgreSQL</span> <span class="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded">Git</span> <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">Docker</span>`,

  joke: [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
    "Why do Java developers wear glasses? Because they don't C#!",
    "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings!",
    "Why did the developer go broke? Because he used up all his cache!",
    "What's a programmer's favorite hangout place? The Foo Bar!",
    "Why don't programmers like nature? It has too many bugs!",
    "What do you call a programmer from Finland? Nerdic!",
    "Why was the function sad after a party? It didn't get called!",
  ],

  time: () => {
    // Safe for SSR
    if (typeof window === "undefined") {
      return `<span class="text-yellow-600 dark:text-yellow-300"><span class="text-yellow-600 dark:text-yellow-300">🕒</span> Current time:</span> <span class="text-cyan-600 dark:text-cyan-400 font-bold">Loading time...</span>`;
    }
    
    const now = new Date();
    return `<span class="text-yellow-600 dark:text-yellow-300"><span class="text-yellow-600 dark:text-yellow-300">🕒</span> Current time:</span> <span class="text-cyan-600 dark:text-cyan-400 font-bold">${now.toLocaleTimeString()}</span> on <span class="text-green-600 dark:text-green-400">${now.toLocaleDateString()}</span>`;
  },

  banner: () => {
    // Return appropriate banner based on screen width
    // Safe for SSR - don't access window directly
    if (typeof window === "undefined") {
      return BANNERS.medium; // Default for server rendering
    }
    
    const width = window.innerWidth;
    if (width < 350) return BANNERS.tiny;
    if (width < 500) return BANNERS.small;
    if (width < 768) return BANNERS.medium;
    return BANNERS.large;
  },

  theme: "This command would toggle the theme if implemented in the actual terminal.",

  // Unix-like commands
  ls: (args: string | undefined) => {
    const directories: Record<string, string[]> = {
      "/": ["home", "projects", "about", "skills", "contact.txt", "resume.pdf"],
      "/home": ["kush", "documents", "downloads"],
      "/home/kush": ["projects", "notes.txt", "todo.md"],
      "/projects": ["url-shortener", "portfolio-site", "chintan-trivia", "wheel-buddy", "task-master", "text-editor"],
      "/about": ["education.txt", "experience.txt", "hobbies.txt"],
      "/skills": ["languages.txt", "frameworks.txt", "tools.txt"],
    }

    // Default to root if no path specified
    const path = args ? args.trim() : "/"

    if (!directories[path]) {
      return `<span class="text-red-600 dark:text-red-500">ls: cannot access '${path}': No such file or directory</span>`
    }

    return `<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
      ${directories[path]
        .map((item) => {
          const isDirectory = !item.includes(".")
          return `<span class="${isDirectory ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}">${item}</span>`
        })
        .join("")}
    </div>`
  },

  pwd: () => {
    return `<span class="text-green-600 dark:text-green-400">/home/kush</span>`
  },

  mkdir: (args?: string) => {
    if (!args) {
      return `<span class="text-red-600 dark:text-red-500">mkdir: missing operand</span>`
    }
    return `<span class="text-green-600 dark:text-green-400">Directory '${args}' created</span>`
  },

  touch: (args?: string) => {
    if (!args) {
      return `<span class="text-red-600 dark:text-red-500">touch: missing file operand</span>`
    }
    return `<span class="text-green-600 dark:text-green-400">File '${args}' created</span>`
  },

  cat: (args?: string) => {
    if (!args) {
      return `<span class="text-red-600 dark:text-red-500">cat: missing file operand</span>`
    }

    const files: Record<string, string> = {
      "contact.txt": COMMANDS.contact as string,
      "resume.pdf": `<span class="text-yellow-600 dark:text-yellow-400">Opening resume.pdf...</span>`,
      "notes.txt": `<span class="text-gray-600 dark:text-gray-300">- Remember to update portfolio\n- Complete LeetCode challenge\n- Study for exams</span>`,
      "todo.md": `<span class="text-gray-600 dark:text-gray-300"># TODO\n- [ ] Finish portfolio website\n- [ ] Apply for internships\n- [x] Complete Java assignment</span>`,
      "education.txt": COMMANDS.education as string,
      "experience.txt": COMMANDS.experience as string,
      "hobbies.txt": `<span class="text-gray-600 dark:text-gray-300">- Coding\n- Reading\n- Gaming\n- Photography</span>`,
      "languages.txt": `<span class="text-gray-600 dark:text-gray-300">- JavaScript\n- TypeScript\n- Java\n- Python\n- C++</span>`,
      "frameworks.txt": `<span class="text-gray-600 dark:text-gray-300">- React\n- Next.js\n- Express\n- Tailwind CSS</span>`,
      "tools.txt": `<span class="text-gray-600 dark:text-gray-300">- Git\n- Docker\n- VS Code\n- Figma</span>`,
    }

    if (files[args]) {
      return files[args]
    }

    return `<span class="text-red-600 dark:text-red-500">cat: ${args}: No such file or directory</span>`
  },

  rm: (args?: string) => {
    if (!args) {
      return `<span class="text-red-600 dark:text-red-500">rm: missing operand</span>`
    }
    return `<span class="text-green-600 dark:text-green-400">Removed '${args}'</span>`
  },

  echo: (args?: string) => {
    if (!args) {
      return ""
    }
    return `<span class="text-gray-600 dark:text-gray-300">${args}</span>`
  },

  date: () => {
    // Safe for SSR
    if (typeof window === "undefined") {
      return `<span class="text-green-600 dark:text-green-400">Loading date...</span>`;
    }
    return `<span class="text-green-600 dark:text-green-400">${new Date().toString()}</span>`;
  },

  whoami: () => {
    return `<span class="text-green-600 dark:text-green-400">kush</span>`
  },

  history: () => {
    return `<span class="text-gray-600 dark:text-gray-400">Command history is not available in this terminal emulation.</span>`
  },

  man: (args?: string) => {
    if (!args) {
      return `<span class="text-red-600 dark:text-red-500">What manual page do you want?</span>`
    }

    const manPages: Record<string, string> = {
      ls: `<span class="text-yellow-600 dark:text-yellow-400">LS(1)</span>
      
<span class="text-cyan-600 dark:text-cyan-400">NAME</span>
    ls - list directory contents

<span class="text-cyan-600 dark:text-cyan-400">SYNOPSIS</span>
    ls [DIRECTORY]

<span class="text-cyan-600 dark:text-cyan-400">DESCRIPTION</span>
    List information about the files and directories in the specified DIRECTORY.
    If no DIRECTORY is specified, the current directory is used.`,

      cd: `<span class="text-yellow-600 dark:text-yellow-400">CD(1)</span>
      
<span class="text-cyan-600 dark:text-cyan-400">NAME</span>
    cd - change directory

<span class="text-cyan-600 dark:text-cyan-400">SYNOPSIS</span>
    cd [DIRECTORY]

<span class="text-cyan-600 dark:text-cyan-400">DESCRIPTION</span>
    Change the current working directory to DIRECTORY.
    If no DIRECTORY is specified, change to the home directory.`,
    }

    if (manPages[args]) {
      return manPages[args]
    }

    return `<span class="text-red-600 dark:text-red-500">No manual entry for ${args}</span>`
  },

  cd: (args?: string) => {
    if (!args || !args.trim()) {
      return "Changed to home directory."
    }

    const section = args.trim().toLowerCase()
    const validSections = ["projects", "about", "experience", "contact", "skills"]

    if (!validSections.includes(section)) {
      return `<span class="text-red-600 dark:text-red-500">cd: ${section}: No such file or directory</span>`
    }

    // This would actually navigate to the section in a real implementation
    return `<span class="text-green-600 dark:text-green-400">Navigating to #${section} section...</span>`
  },

  clear: "clear",
}

export default function TerminalEmulator() {
  const [history, setHistory] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const terminalRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const getWelcomeMessage = useCallback(() => {
    const hour = new Date().getHours()
    let greeting = "Good morning"
    if (hour >= 12 && hour < 17) greeting = "Good afternoon"
    if (hour >= 17) greeting = "Good evening"

    return `<span class="text-green-600 dark:text-green-400">${greeting}! Welcome to my portfolio terminal.</span>
Type <span class="text-yellow-600 dark:text-yellow-400">help</span> to see available commands.`
  }, [])

  useEffect(() => {
    setHistory([getWelcomeMessage()])
  }, [getWelcomeMessage])

  useEffect(() => {
    const handleResize = () => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Process command and return output
  const processCommand = (cmd: string) => {
    const parts = cmd.trim().split(" ")
    const command = parts[0].toLowerCase()
    const args = parts.slice(1).join(" ")

    if (command === "clear") {
      setHistory([])
      return ""
    } else if (command === "joke") {
      const jokes = COMMANDS.joke as string[]
      const randomIndex = Math.floor(Math.random() * jokes.length)
      return `<span class="text-yellow-600 dark:text-yellow-300">😂</span> <span class="text-pink-600 dark:text-pink-400 italic">${jokes[randomIndex]}</span>`
    } else if (COMMANDS[command]) {
      const cmdValue = COMMANDS[command]
      if (typeof cmdValue === "function") {
        if (args) {
          return (cmdValue as (args: string) => string)(args)
        } else {
          return (cmdValue as () => string)()
        }
      } else {
        return cmdValue as string
      }
    } else {
      return `<span class="text-red-600 dark:text-red-500">Command not found: ${command}</span>
<span class="text-gray-600 dark:text-gray-400">Type <span class="text-yellow-600 dark:text-yellow-400">help</span> to see available commands.</span>`
    }
  }

  // Handle command execution
  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return
    
    // Process command
    const output = processCommand(trimmedCmd)
    setHistory(prev => [...prev, `<span class="text-blue-500 dark:text-blue-400">$ </span>${trimmedCmd}`, output])
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-black">
          <div className="flex space-x-2">
            <button
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
            />
            <button
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
            />
            <button
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600"
            />
          </div>
          <div className="flex-1 text-center text-sm text-gray-600 dark:text-gray-400">terminal@kushkansal</div>
          <div className="text-xs text-gray-500 dark:text-gray-600">v2.0.0</div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className={`h-96 sm:h-96 overflow-auto p-4 font-mono text-sm ${
            theme === "light" ? "bg-gray-50 text-gray-800" : "bg-[#0A0A0A] text-green-500 cursor-text"
          } mobile-terminal-fix`}
          onClick={() => {
            const textarea = document.querySelector('.terminal-input') as HTMLTextAreaElement;
            if (textarea) {
              textarea.focus();
            }
          }}
          role="textbox"
          tabIndex={0}
          aria-label="Terminal input area"
        >
          {/* Terminal History */}
          {history.map((line, i) => (
            <motion.div
              key={i}
              className="mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              dangerouslySetInnerHTML={{ __html: line }}
            />
          ))}
          
          {/* Terminal Input */}
          <TerminalInput
            input={currentCommand}
            setInput={setCurrentCommand}
            handleCommand={handleCommand}
            isDark={theme === "dark"}
          />
        </div>
      </div>
    </div>
  )
}

