"use client"

import { motion } from "framer-motion"
import { Github, Mail, Linkedin, Twitter, Instagram } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/kushkansal/",
    color: "hover:text-gray-900 dark:hover:text-white",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:kushkansal0@gmail.com",
    color: "hover:text-[#ea4335] dark:hover:text-[#ff5145]",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/kushkansal/",
    color: "hover:text-[#0077b5] dark:hover:text-[#0a85c5]",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/kansalkkush",
    color: "hover:text-[#1da1f2] dark:hover:text-[#2db1ff]",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/kushkansal0/",
    color: "hover:text-[#e4405f] dark:hover:text-[#f4506f]",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
}

export default function ContactIcons() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap gap-4 justify-center md:justify-start items-center"
    >
      <p className="text-3xl sm:text-3xl font-bold text-gray-900 dark:text-white">Socials</p>
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          variants={item}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-full bg-gray-100 dark:bg-black/60 transition-colors duration-200 ${social.color}`}
        >
          <social.icon className="w-6 h-6" />
          <span className="sr-only">{social.name}</span>
        </motion.a>
      ))}
    </motion.div>
  )
}

