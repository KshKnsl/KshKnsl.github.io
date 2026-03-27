
/* eslint-disable */
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Award, TrendingUp, BarChart, ExternalLink, X } from "lucide-react"
import Image from "next/image"
import React from "react"
import CountUp from "./count-up"
import { Card, CardContent, CardHeader } from "./ui/Card"
import { StatRow } from "./ui/StatRow"

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
  acceptanceRate?: number;
  institution_rank?: number;
  totalProblemsSolved?: number;
  podSolvedLongestStreak?: number;
  totalScore?: number;
  is_campus_ambassador?: boolean;
  campus_ambassador?: any;
  score?: any;
  institute_name?: any;
  name?: any;
  School?: number;
  Basic?: number;
  Easy?: number;
  Medium?: number;
  Hard?: number;
  // Codeforces fields
  handle?: string;
  rank?: string;
  maxRating?: number;
  friends?: number;
  // CodeChef fields
  username?: string;
  globalRank?: number;
  countryRank?: number;
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

const dummyData: {
  [key: string]: ContestData[] | PlatformData;
} = {
  cf: {
    rating: 1466,
    rank: "specialist",
    handle: "mrkushkansal",
    maxRating: 1495,
    friends: 8,
  },
  cc: {
    username: "knsl",
    rating: 1831,
    stars: 4,
    globalRank: 4597,
    countryRank: 3740,
  },
  lc: {
    totalSolved: 998,
    totalQuestions: 3554,
    easySolved: 371,
    mediumSolved: 507,
    hardSolved: 88,
    ranking: 18727,
  },
  gfg: {
    institution_rank: 194,
    totalProblemsSolved: 320,
  },
}

export default function CodingProfiles() {
  const [cfData, setCFContestDetails] = useState<ContestData[] | PlatformData | null>(null)
  const [ccData, setCCContestDetails] = useState<PlatformData | null>(null)
  const [lcData, setLCContestDetails] = useState<PlatformData | null>(null)
  const [gfgData, setGFGContestDetails] = useState<PlatformData | null>(null)
  const [loading, setLoading] = useState<LoadingState>({
    cf: true,
    cc: true,
    lc: true,
    gfg: true,
  })
  const [showFullData, setShowFullData] = useState<FullDataState | null>(null)

  const getLCRating = async () => {
    try {
      const response = await fetch("/api/leetcode-rating")
      
      if (!response.ok) {
        return 2069
      }
      const data = await response.json()
      return Math.max(data?.data?.userContestRanking?.rating || 2069, 2069)
    } catch {
      return 2069
    }
  }
  const [lcrating, setlcRating] = useState(2069)

  useEffect(() => {
    const fetchRating = async () => {
      const fetchedRating = await getLCRating()
      setlcRating(fetchedRating)
    }

    fetchRating()
  }, [])

  useEffect(() => {
    handleCFsubmit()
    handleCCsubmit()
    handleLCsubmit()
    handleGFGsubmit()
  }, [])

  const handleCFsubmit = () => {
    setLoading((prev) => ({ ...prev, cf: true }))
    const apiUrl = `/api/codeforces`
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.result)) {
          setCFContestDetails(data.result)
        } else if (data && typeof data === 'object') {
          setCFContestDetails(data as PlatformData)
        } else {
          setCFContestDetails(dummyData.cf as ContestData[])
        }
        setLoading((prev) => ({ ...prev, cf: false }))
      })
      .catch(() => {
        setCFContestDetails(dummyData.cf as ContestData[])
        setLoading((prev) => ({ ...prev, cf: false }))
      })
  }

  const handleCCsubmit = () => {
    setLoading((prev) => ({ ...prev, cc: true }))
    const apiUrl = `/api/codechef`
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCCContestDetails(data)
        setLoading((prev) => ({ ...prev, cc: false }))
      })
      .catch(() => {
        setCCContestDetails(dummyData.cc as PlatformData)
        setLoading((prev) => ({ ...prev, cc: false }))
      })
  }

  const handleLCsubmit = () => {
    setLoading((prev) => ({ ...prev, lc: true }))
    const apiUrl = `/api/leetcode`
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLCContestDetails(data)
        setLoading((prev) => ({ ...prev, lc: false }))
      })
      .catch(() => {
        setLCContestDetails(dummyData.lc as PlatformData)
        setLoading((prev) => ({ ...prev, lc: false }))
      })
  }

  const handleGFGsubmit = () => {
    setLoading((prev) => ({ ...prev, gfg: true }))
    const apiUrl = `/api/gfg`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setGFGContestDetails(data);
        setLoading((prev) => ({ ...prev, gfg: false }))
      })
      .catch(() => {
        setGFGContestDetails(dummyData.gfg as PlatformData)
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
      lightBgColor: "bg-red-300 dark:bg-red-900/30",
      logo: "https://codeforces.org/s/0/favicon-96x96.png",
      url: "https://codeforces.com/profile/mrkushkansal",
    },
    {
      id: "cc",
      name: "CodeChef",
      icon: <Award className="w-5 h-5" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-600",
      lightBgColor: "bg-amber-300 dark:bg-amber-900/30",
      logo: "https://img.icons8.com/fluent-systems-filled/200/4D4D4D/codechef.png",
      url: "https://www.codechef.com/users/knsl",
    },
    {
      id: "lc",
      name: "LeetCode",
      icon: <Code className="w-5 h-5" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500",
      lightBgColor: "bg-[#F89F1B]/70 dark:bg-orange-900/30",
      logo: "https://leetcode.com/static/images/LeetCode_logo_rvs.png",
      url: "https://leetcode.com/kshkansal/",
    },
    {
      id: "gfg",
      name: "GeeksForGeeks",
      icon: <BarChart className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-600",
      lightBgColor: "bg-green-300 dark:bg-green-900/30",
      logo: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
      url: "https://auth.geeksforgeeks.org/user/kushkansal",
    },
  ]

  const getLastContest = (data: ContestData[] | null) => {
    if (!data || !Array.isArray(data) || data.length === 0) return null
    return data[data.length - 1]
  }

  const renderProfileCard = (platform: Platform, data: PlatformData | ContestData[] | null, isLoading: boolean) => {
    const safeUrl = platform.url || '#';
    return (
      <Card className="h-full shadow-[0_10px_24px_rgba(13,71,161,0.12)]">
        <CardHeader className={`${platform.lightBgColor} border-b border-gray-200/80 dark:border-gray-700/80`}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white dark:bg-[#0A0A0A] p-1 flex items-center justify-center shadow-xs">
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
        </CardHeader>
        <CardContent>
          {isLoading ? (
            renderPlatformData(platform.id, dummyData[platform.id], safeUrl)
          ) : (
            renderPlatformData(platform.id, data, safeUrl)
          )}
        </CardContent>
      </Card>
    );
  }

  const renderPlatformData = (platformId: string, data: PlatformData | ContestData[] | null, platformUrl: string) => {
    if (!data) {
      return renderPlatformData(platformId, dummyData[platformId], platformUrl);
    }

    const safeUrl = platformUrl || '#';
    safeUrl.trim();

    function getTitle(rating: number) {
      if (rating < 1200) return "Newbie";
      if (rating < 1400) return "Pupil";
      if (rating < 1600) return "Specialist";
      if (rating < 1900) return "Expert";
      if (rating < 2100) return "Candidate Master";
    }

    switch (platformId) {
      case "cf": {
        if (Array.isArray(data)) {
          const lastContest = getLastContest(data as ContestData[] | null);
          return lastContest ? (
            <div className="space-y-1.5">
              <StatRow label="User handle" value={lastContest.handle} valueClassName="font-bold text-red-500" />
              <StatRow label="Rating" value={<CountUp end={lastContest.newRating} />} valueClassName="font-bold text-red-500" />
              <StatRow label="Title" value={getTitle(lastContest.newRating)} valueClassName="font-bold text-red-500" />
              <StatRow label="Last Contest" value={lastContest.contestName} valueClassName="truncate max-w-[140px]" />
              <StatRow label="Rank" value={<CountUp end={lastContest.rank} />} />
              <div className="flex justify-between mt-1.5">
                <button
                  onClick={() => {
                    setShowFullData({ platform: "Codeforces", data });
                  }}
                  className="text-[10px] text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                  View Full History
                </button>
              </div>
            </div>
          ) : null;
        }

        const cfSummary = data as PlatformData;
        return (
          <div className="space-y-1.5">
            <StatRow label="User handle" value={(cfSummary as any).handle || (cfSummary as any).username} valueClassName="font-bold text-red-500" />
            <StatRow label="Rating" value={<CountUp end={Number((cfSummary as any).rating) || 0} />} valueClassName="font-bold text-red-500" />
            <StatRow label="Title" value={(cfSummary as any).rank || (cfSummary as any).title || getTitle(Number((cfSummary as any).rating) || 0)} valueClassName="font-bold text-red-500" />
            <StatRow label="Max Rating" value={<CountUp end={Number((cfSummary as any).maxRating) || 0} />} />
            <StatRow label="Friends" value={(cfSummary as any).friends || "0"} />
            <div className="flex justify-between mt-1.5">
              <button
                onClick={() => setShowFullData({ platform: "Codeforces", data })}
                className="text-[10px] text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                View Full Data
              </button>
            </div>
          </div>
        );
      }

      case "cc": {
        // cp-rating-api summary object for CodeChef
        const ccSummary = data as PlatformData;
        return (
          <div className="space-y-1.5">
            <StatRow label="Username" value={(ccSummary as any).username} valueClassName="font-bold text-yellow-600" />
            <StatRow label="Rating" value={<CountUp end={Number((ccSummary as any).rating) || 0} />} valueClassName="font-bold text-yellow-600" />
            <StatRow label="Stars" value={(ccSummary as any).stars || "0★"} valueClassName="font-bold text-yellow-600" />
            <StatRow label="Global Rank" value={<CountUp end={Number((ccSummary as any).globalRank) || 0} />} />
            <StatRow label="Country Rank" value={<CountUp end={Number((ccSummary as any).countryRank) || 0} />} />
            <div className="flex justify-between mt-1.5">
              <button
                onClick={() => setShowFullData({ platform: "CodeChef", data })}
                className="text-[10px] text-yellow-600 hover:text-yellow-700 dark:text-yellow-500 dark:hover:text-yellow-400 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                View Full Data
              </button>
            </div>
          </div>
        );
      }

      case "lc":
        if (!data) return null;
        const lcData = data as PlatformData;
        return (
          <div className="space-y-1.5">
            <StatRow 
              label="Problems" 
              value={<><CountUp end={lcData.totalSolved || 0} /> / {lcData.totalQuestions || 0}</>} 
              valueClassName="font-bold text-orange-500" 
            />
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
            <StatRow label="Ranking" value={<CountUp end={lcData.ranking || 0} />} />
            <StatRow label="Rating" value={<CountUp end={Math.max(lcrating, 2069)} />} />
            <StatRow label="Acceptance" value={`${lcData.acceptanceRate}%`} />
            <div className="flex justify-between mt-1.5">
              <button
                onClick={() => {
                  setShowFullData({ platform: "LeetCode", data });
                }}
                className="text-[10px] text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                View Full Data
              </button>
            </div>
          </div>
        );

      case "gfg": {
        const gfgData = data as any; // The full JSON response
        return (
          <div className="space-y-1.5">
            <StatRow label="User handle" value={gfgData.info?.userName || gfgData.name} valueClassName="font-bold text-green-500" />
            <StatRow label="Problems Solved" value={<CountUp end={gfgData.info?.totalProblemsSolved || 0} />} />
            <StatRow label="Coding Score" value={<CountUp end={gfgData.info?.codingScore || 0} />} />
            {gfgData.info?.instituteRank && (
              <StatRow label="Institute Rank" value={<CountUp end={gfgData.info.instituteRank} />} />
            )}
            <div className="flex justify-between mt-1.5">
              <button
                onClick={() => {
                  setShowFullData({ platform: "GeeksForGeeks", data });
                }}
                className="text-[10px] text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                View Full Data
              </button>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 p-4 sm:p-5 shadow-[0_10px_24px_rgba(13,71,161,0.08)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Coding Profiles</h3>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-hackclub-blue/10 text-hackclub-blue dark:text-hackclub-cyan">
          Live Snapshot
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

      <AnimatePresence>
        {showFullData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
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

