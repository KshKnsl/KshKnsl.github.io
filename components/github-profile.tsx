"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, GitFork, Users, BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"
import CountUp from "./count-up"

interface GitHubProfileProps {
  username: string
}

interface GitHubProfileData {
  avatarUrl: string
  name: string
  login: string
  bio: string
  location: string
  htmlUrl: string
  public_repos: number
  followers: number
}

const GitHubProfile: React.FC<GitHubProfileProps> = ({ username }) => {
  const [profile, setProfile] = useState<{
    data: GitHubProfileData | null
    contributions: number
    loaded: boolean
  }>({
    data: null,
    contributions: 0,
    loaded: false,
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        const data: GitHubProfileData = await response.json()

        const contributionsResponse = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
              query {
                user(login: "${username}") {
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                    }
                  }
                }
              }
            `,
          }),
        })

        const contributionsData = await contributionsResponse.json()
        const totalContributions =
          contributionsData?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0

        setProfile({
          data: data,
          contributions: totalContributions,
          loaded: true,
        })
      } catch (error) {
        console.error("Error fetching GitHub profile:", error)
        setProfile((prev) => ({ ...prev, loaded: true }))
      }
    }

    fetchProfile()
  }, [username])

  if (!profile.loaded) {
    return <p>Loading GitHub profile...</p>
  }

  if (!profile.data) {
    return <p>Failed to load GitHub profile.</p>
  }

  return (
    <motion.div
      className="mt-2 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3 text-xl">
            <Github className="rounded-full"/>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{profile.data.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <Link href={profile.data.htmlUrl || `https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                {profile.data.login}
                <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full mt-4 sm:mt-0">
          <div className="p-2 bg-gray-100 dark:bg-black rounded-lg text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
              <BookOpen className="w-3 h-3" /> Repos
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              <CountUp end={profile.data.public_repos} />
            </span>
          </div>

          <div className="p-2 bg-gray-100 dark:bg-black rounded-lg text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
              <Users className="w-3 h-3" /> Followers
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              <CountUp end={profile.data.followers} />
            </span>
          </div>

          <div className="p-2 bg-gray-100 dark:bg-black rounded-lg text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
              <GitFork className="w-3 h-3" /> Contrib
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              <CountUp end={profile.contributions} suffix="+" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GitHubProfile

