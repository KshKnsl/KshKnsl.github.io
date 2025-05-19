"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GitFork, Users, BookOpen, ExternalLink, X } from "lucide-react";
import { GithubIcon } from "lucide-react"; // Using the renamed icon
import Link from "next/link";
import CountUp from "./count-up";

interface GitHubProfileProps {
  username: string;
}

interface GitHubProfileData {
  avatarUrl: string;
  name: string;
  login: string;
  bio: string;
  location: string;
  htmlUrl: string;
  public_repos: number;
  followers: number;
}

const GitHubProfile: React.FC<GitHubProfileProps> = ({ username }) => {
  const [profile, setProfile] = useState<{
    data: GitHubProfileData | null;
    contributions: number;
    loaded: boolean;
  }>({
    data: null,
    contributions: 0,
    loaded: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const data: GitHubProfileData = await response.json();

        const contributionsResponse = await fetch(
          "https://api.github.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
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
          }
        );

        const contributionsData = await contributionsResponse.json();
        const totalContributions =
          contributionsData?.data?.user?.contributionsCollection
            ?.contributionCalendar?.totalContributions || 0;

        setProfile({
          data: data,
          contributions: totalContributions,
          loaded: true,
        });
      } catch {
        // console.error("Error fetching GitHub profile:", error)
        setProfile((prev) => ({ ...prev, loaded: true }));
      }
    };

    fetchProfile();
  }, [username]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const handleProfileClick = () => {
    setShowPopup(true);
  };

  if (!profile.loaded) {
    return <p>Loading GitHub profile...</p>;
  }

  if (!profile.data) {
    return <p>Failed to load GitHub profile.</p>;
  }

  return (
    <>
      <motion.div
        className="mt-2 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        onClick={handleProfileClick}
      >
        <div className="flex items-center gap-3 text-xl">
          <GithubIcon className="rounded-full" />
          <div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                GitHub
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <Link
                  href="https://github.com/KshKnsl"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center hover:underline"
                >
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

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            ref={popupRef}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                GitHub Profile
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <h1 className="text-3xl font-bold text-center mb-4">
                Hi, I'm Kush Kansal👋
              </h1>
              <h3 className="text-xl font-medium text-center mb-6">
                Frontend Developer, Passionate Coder
              </h3>

              <div className="flex justify-center mb-8">
                <img
                  src="https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif"
                  alt="Header GIF"
                  className="w-full rounded-lg max-w-4xl"
                />
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                <table className="w-full border-collapse mb-6">
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 px-4">• My DNA became DSA</td>
                      <td className="py-2 px-4">• Sponsored by hard work</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 px-4">• Fueled by Knowledge</td>
                      <td className="py-2 px-4">• Crafted by Brain</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 px-4">
                        • Driven by ticking of clock
                      </td>
                      <td className="py-2 px-4">
                        • Engineered by determination
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="py-2 px-4 text-center">
                        • Powered By curiosity
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  📊 GitHub Stats:
                </h2>
                <div className="flex flex-col items-center gap-4">
                  <img
                    src="http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=kshknsl&theme=radical"
                    className="w-full max-w-2xl"
                  />
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <img
                      src="http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=kshknsl&theme=radical"
                      className="max-w-xs"
                    />
                    <img
                      src="http://github-profile-summary-cards.vercel.app/api/cards/stats?username=kshknsl&theme=radical"
                      className="max-w-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Languages and Tools
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2 flex flex-wrap gap-2">
                    <img
                      src="https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white"
                      alt="C"
                    />
                    <img
                      src="https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white"
                      alt="C++"
                    />
                    <img
                      src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"
                      alt="HTML5"
                    />
                    <img
                      src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"
                      alt="Java"
                    />
                    <img
                      src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
                      alt="JavaScript"
                    />
                    <img
                      src="https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white"
                      alt="Markdown"
                    />
                    <img
                      src="https://img.shields.io/badge/php-%73777BB4.svg?style=for-the-badge&logo=php&logoColor=white"
                      alt="PHP"
                    />
                    <img
                      src="https://img.shields.io/badge/PowerShell-%235391FE.svg?style=for-the-badge&logo=powershell&logoColor=white"
                      alt="PowerShell"
                    />
                    <img
                      src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"
                      alt="Python"
                    />
                    <img
                      src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
                      alt="TypeScript"
                    />
                    <img
                      src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"
                      alt="Vercel"
                    />
                    <img
                      src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7"
                      alt="Netlify"
                    />
                    <img
                      src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white"
                      alt="Render"
                    />
                    <img
                      src="https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white"
                      alt="Astro"
                    />
                    <img
                      src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white"
                      alt="Chakra"
                    />
                    <img
                      src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white"
                      alt="Bun"
                    />
                    <img
                      src="https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white"
                      alt="Chart.js"
                    />
                    <img
                      src="https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white"
                      alt="Bootstrap"
                    />
                    <img
                      src="https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white"
                      alt="DaisyUI"
                    />
                    <img
                      src="https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black"
                      alt="EJS"
                    />
                    <img
                      src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"
                      alt="Express.js"
                    />
                    <img
                      src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37"
                      alt="Expo"
                    />
                    <img
                      src="https://img.shields.io/badge/green%20sock-88CE02?style=for-the-badge&logo=greensock&logoColor=white"
                      alt="Green Sock"
                    />
                    <img
                      src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"
                      alt="JWT"
                    />
                    <img
                      src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"
                      alt="NPM"
                    />
                    <img
                      src="https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white"
                      alt="jQuery"
                    />
                    <img
                      src="https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white"
                      alt="MUI"
                    />
                    <img
                      src="https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD"
                      alt="Nodemon"
                    />
                    <img
                      src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"
                      alt="Next JS"
                    />
                    <img
                      src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"
                      alt="NodeJS"
                    />
                    <img
                      src="https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white"
                      alt="OpenCV"
                    />
                    <img
                      src="https://img.shields.io/badge/Pug-FFF?style=for-the-badge&logo=pug&logoColor=A86454"
                      alt="Pug"
                    />
                    <img
                      src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
                      alt="React"
                    />
                    <img
                      src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
                      alt="React Native"
                    />
                    <img
                      src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"
                      alt="Redux"
                    />
                    <img
                      src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"
                      alt="Socket.io"
                    />
                    <img
                      src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"
                      alt="Vite"
                    />
                    <img
                      src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"
                      alt="TailwindCSS"
                    />
                    <img
                      src="https://img.shields.io/badge/windicss-48B0F1.svg?style=for-the-badge&logo=windi-css&logoColor=white"
                      alt="Windicss"
                    />
                    <img
                      src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"
                      alt="MongoDB"
                    />
                    <img
                      src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white"
                      alt="MySQL"
                    />
                    <img
                      src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"
                      alt="Postgres"
                    />
                    <img
                      src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"
                      alt="Figma"
                    />
                    <img
                      src="https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white"
                      alt="NumPy"
                    />
                    <img
                      src="https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white"
                      alt="Pandas"
                    />
                    <img
                      src="https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black"
                      alt="Matplotlib"
                    />
                    <img
                      src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
                      alt="GitHub"
                    />
                    <img
                      src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white"
                      alt="Git"
                    />
                    <img
                      src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"
                      alt="Docker"
                    />
                    <img
                      src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white"
                      alt="ESLint"
                    />
                    <img
                      src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"
                      alt="Postman"
                    />
                  </div>
                  <div className="flex-1 flex justify-center items-center">
                    <img
                      src="https://i.pinimg.com/originals/4f/4e/16/4f4e1638e028090ff030ec2ae0fc6919.gif"
                      alt="Coding"
                      className="max-w-xs rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="https://github.com/KshKnsl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#24292e] text-white hover:bg-[#1b1f23] transition-colors"
                >
                  <GithubIcon className="w-5 h-5" />
                  View Full GitHub Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GitHubProfile;
