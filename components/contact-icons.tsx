"use client"

import { motion } from "framer-motion"
import { Github, Mail, Linkedin, Twitter, Instagram } from "lucide-react"

const socialLinks = [
	{
		name: "GitHub",
		icon: Github,
		href: "https://github.com/kshknsl/",
		color: "hover:text-gray-900 dark:hover:text-white",
		bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
	},
	{
		name: "LinkedIn",
		icon: Linkedin,
		href: "https://www.linkedin.com/in/kushkansal/",
		color: "hover:text-[#0077b5] dark:hover:text-[#0a85c5]",
		bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
	},
	{
		name: "Twitter",
		icon: Twitter,
		href: "https://twitter.com/knslji",
		color: "hover:text-[#1da1f2] dark:hover:text-[#2db1ff]",
		bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
	},
	{
		name: "Instagram",
		icon: Instagram,
		href: "https://www.instagram.com/kushkansal.async/",
		color: "hover:text-[#e4405f] dark:hover:text-[#f4506f]",
		bgColor: "hover:bg-pink-50 dark:hover:bg-pink-900/20",
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
		<div className="space-y-6 md:space-y-8">
			{/* Main Contact Card with Social Icons */}
			<div className="space-y-4">
				<motion.div
					variants={item}
					initial="hidden"
					animate="show"
					className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A0A0A] hover:shadow-lg transition-all duration-200"
				>
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="p-3 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
								<Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
							</div>
							<div>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">Let&apos;s Connect</p>
								<a 
									href="mailto:kushkansal0@gmail.com"
									className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
								>
									kushkansal0@gmail.com
								</a>
							</div>
						</div>
						
						{/* Social Media Icons Grid */}
						<div className="border-t border-gray-200 dark:border-gray-700 pt-4">
							<p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Follow me on:</p>
							<motion.div
								variants={container}
								initial="hidden"
								animate="show"
								className="grid grid-cols-1 gap-3"
							>
								{socialLinks.map((social) => (
									<motion.a
										key={social.name}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										variants={item}
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										transition={{ type: "spring", stiffness: 400, damping: 20 }}
										className={`p-3 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-700 transition-all duration-150 ${social.color} ${social.bgColor} shadow-sm hover:shadow-md group flex items-center gap-3`}
										title={social.name}
									>
										<div className="flex items-center justify-center w-8 h-8">
											<social.icon className="w-5 h-5" />
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-current">
												{social.name}
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">
												{social.name === "GitHub" && "@kshknsl"}
												{social.name === "LinkedIn" && "in/kushkansal"}
												{social.name === "Twitter" && "@knslji"}
												{social.name === "Instagram" && "@kushkansal.async"}
											</p>
										</div>
									</motion.a>
								))}
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Quick Actions */}
			<div className="space-y-4">
				<h4 className="text-xl font-semibold text-gray-900 dark:text-white text-center md:text-left">
					Quick Actions
				</h4>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<motion.a
						href="https://drive.google.com/file/d/1PGtFhTsbfNuqJEsPgsTLSs9hKZm6uFc3/view?usp=sharing"
						target="_blank"
						rel="noopener noreferrer"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						transition={{ type: "spring", stiffness: 400, damping: 20 }}
						className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0A0A0A] hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-150 text-center group"
					>
						<div className="text-2xl mb-2">📄</div>
						<span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Download Resume</span>
					</motion.a>
					<motion.a
						href="/projects"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						transition={{ type: "spring", stiffness: 400, damping: 20 }}
						className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0A0A0A] hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-150 text-center group"
					>
						<div className="text-2xl mb-2">🚀</div>
						<span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">View My Work</span>
					</motion.a>
				</div>
			</div>
		</div>
	)
}

