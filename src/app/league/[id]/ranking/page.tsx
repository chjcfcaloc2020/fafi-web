"use client";

import LeagueMenu from "@/app/league/LeagueMenu"
import LeagueInfoDetail from "@/app/league/LeagueInfoDetail"


export default function RankingPage() {
  return (
    <>
      <div className="w-3/4 mx-auto bg-gray-50 shadow-md p-6 rounded-xl border flex flex-col">
        <LeagueInfoDetail />

        {/* Menu bar */}
        <LeagueMenu />
      </div>
    </>
  )
}