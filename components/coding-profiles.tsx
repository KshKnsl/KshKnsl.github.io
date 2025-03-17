"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Award, TrendingUp, BarChart, ExternalLink, X, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
// Add import for CountUp component
import CountUp from "./count-up"

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  lightBgColor: string;
  logo: string;
  url?: string;
}

interface ContestData {
  rating: number;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  timestamp: number;
  handle?: string;
}

interface PlatformData {
  rating?: number;
  stars?: number;
  global_rank?: number;
  country_rank?: number;
  totalSolved?: number;
  totalQuestions?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  ranking?: number;
  institution_rank?: number;
  totalProblemsSolved?: number;
}

interface FullDataState {
  platform: string;
  data: ContestData[] | PlatformData;
}

interface LoadingState {
  cf: boolean;
  cc: boolean;
  lc: boolean;
  gfg: boolean;
  [key: string]: boolean;
}

export default function CodingProfiles() {
  const [cfData, setCFContestDetails] = useState<ContestData[] | null>(null)
  const [ccData, setCCContestDetails] = useState<ContestData[] | null>(null)
  const [lcData, setLCContestDetails] = useState<ContestData[] | null>(null)
  const [gfgData, setGFGContestDetails] = useState<ContestData[] | null>(null)
  const [loading, setLoading] = useState<LoadingState>({
    cf: true,
    cc: true,
    lc: true,
    gfg: true,
  })
  const [showFullData, setShowFullData] = useState<FullDataState | null>(null)

  const getLCRating = async () => {
    try {
      const response = await fetch("https://alfa-leetcode-api.onrender.com/userContestRankingInfo/kshkansal")
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        console.error("Error fetching rating: API returned status", response.status)
        return 0
      }
      const data = await response.json()
      return data?.data?.userContestRanking?.rating || 0
    } catch (error) {
      console.error("Error fetching rating:", error)
      return 0
    }
  }
  const [lcrating, setlcRating] = useState(0)

  useEffect(() => {
    const fetchRating = async () => {
      const fetchedRating = await getLCRating()
      setlcRating(fetchedRating)
    }

    fetchRating()
  }, [])

  useEffect(() => {
    // Fetch all data on component mount
    handleCFsubmit()
    handleCCsubmit()
    handleLCsubmit()
    handleGFGsubmit()
  }, [])

  const handleCFsubmit = () => {
    setLoading((prev) => ({ ...prev, cf: true }))
    const apiUrl = `https://codeforces.com/api/user.rating?handle=mrkushkansal`
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCFContestDetails(data.result)
        setLoading((prev) => ({ ...prev, cf: false }))
      })
      .catch((error) => {
        console.error("Error:", error)
        setLoading((prev) => ({ ...prev, cf: false }))
      })
  }

  const handleCCsubmit = () => {
    setLoading((prev) => ({ ...prev, cc: true }))
    const apiUrl = `https://codechef-api-1.onrender.com/codechef/knsl`
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCCContestDetails(data)
        setLoading((prev) => ({ ...prev, cc: false }))
      })
      .catch((error) => {
        console.error("Error:", error)
        setLoading((prev) => ({ ...prev, cc: false }))
      })
  }

  const handleLCsubmit = () => {
    setLoading((prev) => ({ ...prev, lc: true }))
    const apiUrl = `https://leetcode-stats-api.herokuapp.com/kshkansal`
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLCContestDetails(data)
        setLoading((prev) => ({ ...prev, lc: false }))
      })
      .catch((error) => {
        console.error("Error:", error)
        setLoading((prev) => ({ ...prev, lc: false }))
      })
  }

  const handleGFGsubmit = () => {
    setLoading((prev) => ({ ...prev, gfg: true }))
    const apiUrl = `https://geeks-for-geeks-stats-api.vercel.app/?raw=Y&userName=kushkansal`
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setGFGContestDetails(data)
        setLoading((prev) => ({ ...prev, gfg: false }))
      })
      .catch((error) => {
        console.error("Error:", error)
        setLoading((prev) => ({ ...prev, gfg: false }))
      })
  }

  const platforms: Platform[] = [
    {
      id: "cf",
      name: "Codeforces",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-red-500",
      bgColor: "bg-red-500",
      lightBgColor: "bg-red-100 dark:bg-red-900/30",
      logo: "https://codeforces.org/s/0/favicon-96x96.png",
      url: "https://codeforces.com/profile/mrkushkansal",
    },
    {
      id: "cc",
      name: "CodeChef",
      icon: <Award className="w-5 h-5" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-600",
      lightBgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      logo: "https://img.icons8.com/fluent-systems-filled/200/4D4D4D/codechef.png",
      url: "https://www.codechef.com/users/knsl",
    },
    {
      id: "lc",
      name: "LeetCode",
      icon: <Code className="w-5 h-5" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500",
      lightBgColor: "bg-orange-100 dark:bg-orange-900/30",
      logo: "https://leetcode.com/static/images/LeetCode_logo_rvs.png",
      url: "https://leetcode.com/kshkansal/",
    },
    {
      id: "gfg",
      name: "GeeksForGeeks",
      icon: <BarChart className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-600",
      lightBgColor: "bg-green-100 dark:bg-green-900/30",
      logo: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
      url: "https://auth.geeksforgeeks.org/user/kushkansal",
    },
  ]

  const getLastContest = (data: ContestData[] | null) => {
    if (!data || !Array.isArray(data) || data.length === 0) return null
    return data[data.length - 1]
  }

  // Update the renderProfileCard function to make it more mobile responsive
  const renderProfileCard = (platform: Platform, data: PlatformData | ContestData[] | null, isLoading: boolean) => {
    const safeUrl = platform.url || '#'
    return (
      <motion.div
        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] h-full"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`border-b border-gray-200 dark:border-gray-800 ${platform.lightBgColor} p-3`}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white dark:bg-[#0A0A0A] p-1 flex items-center justify-center shadow-sm">
              <Image
                src={platform.logo || "/placeholder.svg"}
                alt={platform.name}
                width={20}
                height={20}
                className="object-contain"
                style={{ width: '20px', height: '20px' }}
              />
            </div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">{platform.name}</h4>
          </div>
        </div>
        <div className="p-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-20">
              <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${platform.color}`}></div>
            </div>
          ) : (
            renderPlatformData(platform.id, data, safeUrl)
          )}
        </div>
      </motion.div>
    )
  }

  // Update the renderPlatformData function to include CountUp animations and proper links
  const renderPlatformData = (platformId: string, data: PlatformData | ContestData[] | null, platformUrl: string) => {
    if (!data) {
      return (
        <div className="flex justify-center items-center h-20 text-gray-500 dark:text-gray-400 text-xs">
          No data available
        </div>
      )
    }

    const safeUrl = platformUrl || '#'

    function getTitle(rating: number) {
      if (rating < 1200) return "Newbie"
      if (rating < 1400) return "Pupil"
      if (rating < 1600) return "Specialist"
      if (rating < 1900) return "Expert"
      if (rating < 2100) return "Candidate Master"
    }

    switch (platformId) {
      case "cf":
        const lastContest = getLastContest(data as ContestData[] | null)
        return lastContest ? (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">User handle</span>
              <span className="font-bold text-xs text-red-500">
                {lastContest.handle}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Rating</span>
              <span className="font-bold text-xs text-red-500">
                <CountUp end={lastContest.newRating} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Title</span>
              <span className="font-bold text-xs text-red-500">
                {getTitle(lastContest.newRating)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Last Contest</span>
              <span
                className="text-xs text-gray-800 dark:text-gray-200 truncate max-w-[140px]"
                title={lastContest.contestName}
              >
                {lastContest.contestName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Rank</span>
              <span className="text-xs text-gray-800 dark:text-gray-200">
                <CountUp end={lastContest.rank} />
              </span>
            </div>
            <div className="flex justify-between mt-1.5">
              <button
                onClick={() => {
                  if (Array.isArray(data)) {
                    setShowFullData({ platform: "Codeforces", data });
                  }
                }}
                className="text-[10px] text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                View Full History
              </button>
              <Link
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                Visit Profile
              </Link>
            </div>
          </div>
        ) : null

      case "cc":
        const ccData = data as PlatformData;
        return (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">User handle</span>
              <span className="font-bold text-xs text-red-500">
                {"knsl"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Rating</span>
              <span className="font-bold text-xs text-yellow-600">
                <CountUp end={ccData.rating || 0} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Stars</span>
              <div className="flex">
                {[...Array(Number.parseInt(ccData.stars?.toString() || "0"))].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xs">
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Global Rank</span>
              <span className="text-xs text-gray-800 dark:text-gray-200">
                <CountUp end={ccData.global_rank || 0} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Country Rank</span>
              <span className="text-xs text-gray-800 dark:text-gray-200">
                <CountUp end={ccData.country_rank || 0} />
              </span>
            </div>
            <div className="flex justify-between mt-1.5">
              <button
                onClick={() => {
                  if (Array.isArray(data)) {
                    setShowFullData({ platform: "CodeChef", data });
                  }
                }}
                className="text-[10px] text-yellow-600 hover:text-yellow-700 dark:text-yellow-500 dark:hover:text-yellow-400 flex items-center justify-center gap-1"
              >         
                <ExternalLink className="w-2.5 h-2.5" />
                View Full Data
              </button>
              <Link
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-yellow-600 hover:text-yellow-700 dark:text-yellow-500 dark:hover:text-yellow-400 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                Visit Profile
              </Link>
            </div>
          </div>
        )

      case "lc":
        const lcData = data as PlatformData;
        return (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Problems</span>
              <span className="font-bold text-xs text-orange-500">
                <CountUp end={lcData.totalSolved || 0} /> / {lcData.totalQuestions || 0}
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="flex h-full">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${((lcData.easySolved || 0) / (lcData.totalSolved || 1)) * 100}%` }}
                ></div>
                <div
                  className="bg-yellow-500 h-full"
                  style={{ width: `${((lcData.mediumSolved || 0) / (lcData.totalSolved || 1)) * 100}%` }}
                ></div>
                <div
                  className="bg-red-500 h-full"
                  style={{ width: `${((lcData.hardSolved || 0) / (lcData.totalSolved || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Ranking</span>
              <span className="text-xs text-gray-800 dark:text-gray-200">
                <CountUp end={lcData.ranking || 0} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Rating</span>
              <span className="text-xs text-gray-800 dark:text-gray-200">
                <CountUp end={lcrating} />
              </span>
            </div>
            <div className="flex justify-between mt-1.5">
              <button
                onClick={() => {
                  if (Array.isArray(data)) {
                    setShowFullData({ platform: "LeetCode", data });
                  }
                }}
                className="text-[10px] text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                View Full Data
              </button>
              <Link
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                Visit Profile
              </Link>
            </div>
          </div>
        )

      case "gfg":
        const gfgData = data as PlatformData;
        return (
          <div className="space-y-1.5">
            {/* Campus Ambassador Badge */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-1.5 mb-2 flex items-center gap-1.5">
              <Star className="w-3 h-3 text-green-600 dark:text-green-400" />
              <span className="text-[10px] font-medium text-green-700 dark:text-green-300">Campus Ambassador</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Inst. Rank</span>
              <span className="font-bold text-xs text-green-600">
                <CountUp end={gfgData.institution_rank || 300} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Problems</span>
              <span className="text-xs text-gray-800 dark:text-gray-200">
                <CountUp end={gfgData.totalProblemsSolved || 450} />
              </span>
            </div>
            <div className="flex justify-between mt-1.5">
              <button
                onClick={() => {
                  if (Array.isArray(data)) {
                    setShowFullData({ platform: "GeeksForGeeks", data });
                  }
                }}
                className="text-[10px] text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                View Full Data
              </button>
              <Link
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                Visit Profile
              </Link>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Coding Profiles</h3>
      <div className="grid grid-cols-2 gap-2">
        {platforms.map((platform) => (
          <div key={platform.id} className="h-full">
            {renderProfileCard(
              platform,
              platform.id === "cf" ? cfData : platform.id === "cc" ? ccData : platform.id === "lc" ? lcData : gfgData,
              loading[platform.id],
            )}
          </div>
        ))}
      </div>

      {/* Full Data Modal */}
      <AnimatePresence>
        {showFullData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFullData(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#0A0A0A] rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{showFullData.platform} Data</h3>
                <button
                  onClick={() => setShowFullData(null)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="p-4 overflow-auto max-h-[calc(80vh-8rem)]">
                <pre className="bg-gray-50 dark:bg-[#0F0F10] p-4 rounded-lg overflow-auto text-xs md:text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-inner">
                  <code>{JSON.stringify(showFullData.data, null, 2)}</code>
                </pre>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button
                  onClick={() => setShowFullData(null)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

