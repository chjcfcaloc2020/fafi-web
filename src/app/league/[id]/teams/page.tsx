"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar28 } from "@/components/Calendar28";
import { Team } from "@/types/team";
import { getTeamsInLeague } from "@/lib/services/teamServices";
import { createMatch } from "@/lib/services/matchServices";
import { toDateTimeString } from "@/lib/utils";
import { CreateMatch } from "@/types/match";
import LeagueMenu from "@/app/league/LeagueMenu"
import LeagueInfoDetail from "@/app/league/LeagueInfoDetail"
import TeamCard from "@/components/TeamCard";


export default function TeamsPage() {
  const { id } = useParams()
  const [teamsInLeague, setTeamsInLeague] = useState<Team[]>([])

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return
    const fetchTeamsInLeague = async () => {
      try {
        const res = await getTeamsInLeague(String(id))
        setTeamsInLeague(res)
      } catch (error) {
        console.log(error)
      }
    }
    if (token) fetchTeamsInLeague()
  }, [id, token])

  return (
    <>
      <div className="w-3/4 mx-auto bg-gray-50 shadow-md p-6 rounded-xl border flex flex-col">
        <LeagueInfoDetail />

        {/* Menu bar */}
        <LeagueMenu />
      </div>
      <div className="w-3/4 mx-auto bg-white shadow-md p-6 rounded-xl border flex flex-col mt-8 space-y-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Danh sách các đội có trong giải</h2>
          </div>
          {teamsInLeague.length === 0 ? (
            <p>Giải đấu này chưa có đội bóng nào.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {
                teamsInLeague.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                  />
                ))
              }
            </div>
          )}
        </div>
      </div>
    </>
  )
}