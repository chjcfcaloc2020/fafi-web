"use client"

import { useEffect, useState } from "react"
import { usePathname, useParams } from "next/navigation"
import { checkExistsManagerInLeague, checkIfOrganizer } from "@/lib/services/leagueServices"
import Link from "next/link"

interface Tab {
  label: string
  value: string
}

export default function LeagueMenu() {
  const pathname = usePathname()
  const params = useParams()
  const [current, setCurrent] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // Lấy segment cuối của URL để highlight tab active
  useEffect(() => {
    if (pathname) {
      setCurrent(pathname.split("/").pop() || null)
    }
  }, [pathname])

  // Lấy role từ localStorage (chỉ chạy client)
  useEffect(() => {
    const storedRole = localStorage.getItem("role")
    const checkExistsManager = async () => {
      if (storedRole == "MANAGER") {
        const res = await checkExistsManagerInLeague(leagueId, token || "")
        if (res) {
          setRole("MANAGER_ALLOW")
        }
      }
    }
    const checkOrganizerOwn = async () => {
      if (storedRole == "ORGANIZER") {
        const res = await checkIfOrganizer(leagueId, token || "")
        if (res) {
          setRole("ORGANIZER_OWN")
        }
      }
    }
    if (token) {
      checkExistsManager()
      checkOrganizerOwn()
    }
  }, [token])

  const leagueId = params?.id as string

  const baseTabs: Tab[] = [
    { label: "Tin chung", value: "dashboard" },
    { label: "Lịch thi đấu", value: "schedule" },
    { label: "Bảng xếp hạng", value: "ranking" },
    { label: "Đội thi đấu", value: "teams" },
    { label: "Thống kê", value: "statistics" },
  ]

  // Thêm tab theo role
  if (role === "MANAGER_ALLOW") {
    baseTabs.push({ label: "Đội của bạn", value: "my-team" })
  } else if (role === "ORGANIZER_OWN") {
    baseTabs.push({ label: "Giải đấu của bạn", value: "my-league" })
  }

  return (
    <div className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex space-x-6 px-4">
        {baseTabs.map((tab) => {
          const href = `/league/${leagueId}/${tab.value}`
          const isActive = current === tab.value

          return (
            <Link
              key={tab.value}
              href={href}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${isActive
                ? "border-black text-gray-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
