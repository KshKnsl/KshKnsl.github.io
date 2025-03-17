"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Star, GitFork, GitBranch, GitCommit, GitPullRequest } from "lucide-react"
import Link from "next/link"
import CountUp from "./count-up"

interface GithubStatsProps {
  username: string
  repo?: string
}

interface Stats {
  stars: number
  forks: number
  branches: number
  commits: number
  pullRequests: number
  contributions: number
  loaded: boolean
}

const GithubStats: React.FC<GithubStatsProps> = ({ username, repo }) => {
  const [stats, setStats] = useState<Stats>({
    stars: 0,
    forks: 0,
    branches: 0,
    commits: 0,
    pullRequests: 0,
    contributions: 0,
    loaded: false,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (repo) {
          const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repo}`)
          const repoData = await repoResponse.json()

          const contributorsResponse = await fetch(`https://api.github.com/repos/${username}/${repo}/contributors`)
          const contributorsData = await contributorsResponse.json()
          const totalContributions = contributorsData.reduce(
            (acc: number, contributor: { contributions: number }) => acc + contributor.contributions,
            0,
          )

          setStats((prev) => ({
            ...prev,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            contributions: totalContributions,
            loaded: true,
          }))
        } else {
          // Fetch user stats if no repo is provided
          const userResponse = await fetch(`https://api.github.com/users/${username}`)
          const userData = await userResponse.json()

          // Fetch contribution stats (This is a placeholder, as direct contribution count is not available via GitHub API)
          // You might need to use GitHub GraphQL API for accurate contribution stats
          setStats((prev) => ({
            ...prev,
            stars: userData.public_repos, // Using public repos as a placeholder
            forks: userData.followers, // Using followers as a placeholder
            contributions: userData.public_gists, // Using public gists as a placeholder
            loaded: true,
          }))
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stats", error)
        setStats((prev) => ({ ...prev, loaded: false }))
      }
    }

    fetchStats()
  }, [username, repo])

  const statItems = [
    {
      label: "Stars",
      value: stats.stars,
      icon: <Star className="w-4 h-4 mr-1" />,
    },
    {
      label: "Forks",
      value: stats.forks,
      icon: <GitFork className="w-4 h-4 mr-1" />,
    },
    {
      label: "Branches",
      value: stats.branches,
      icon: <GitBranch className="w-4 h-4 mr-1" />,
    },
    {
      label: "Commits",
      value: stats.commits,
      icon: <GitCommit className="w-4 h-4 mr-1" />,
    },
    {
      label: "Pull Requests",
      value: stats.pullRequests,
      icon: <GitPullRequest className="w-4 h-4 mr-1" />,
    },
    {
      label: "Contributions",
      value: stats.contributions,
      icon: <Github className="w-4 h-4 mr-1" />,
    },
  ]

  return (
    <motion.div
      className="bg-white dark:bg-black shadow rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 sm:p-6 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
        GitHub Stats
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3">
        {statItems.map((item, index) => (
          <div
            key={item.label}
            className={`p-4 sm:p-6 flex flex-col items-center justify-center ${
              index < 2 ? "border-b border-gray-200 dark:border-gray-800" : ""
            } ${index % 2 === 0 ? "border-r border-gray-200 dark:border-gray-800" : ""}`}
          >
            <div className="flex items-center justify-center mb-2 text-gray-500 dark:text-gray-400">
              {item.icon}
              <span className="ml-1 text-xs sm:text-sm">{item.label}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {stats.loaded ? <CountUp end={item.value} suffix={item.label === "Contributions" ? "+" : ""} /> : "-"}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 sm:p-6 text-center">
        <Link
          href={`https://github.com/${username}${repo ? `/${repo}` : ""}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View on GitHub
        </Link>
      </div>
    </motion.div>
  )
}

export default GithubStats

