"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { sendInvitation } from "@/lib/services/leagueServices";
import { Match } from "@/types/match";
import { getMatchesByLeague } from "@/lib/services/matchServices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { UserPen, Trash2 } from 'lucide-react';
import Link from "next/link";
import LeagueMenu from "@/app/league/LeagueMenu"
import LeagueInfoDetail from "@/app/league/LeagueInfoDetail"

export default function SchedulePage() {
  const params = useParams()
  const [managerUsername, setManagerUsername] = useState("")
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const leagueId = params?.id as string

  useEffect(() => {
    const fetchLeagues = async () => {
      if (!token) return;
      try {
        const leagueData = await getMatchesByLeague(leagueId);
        setMatches(leagueData);
      } catch (err) {
        console.error("Error fetching teams:", err);
      } finally {
        setLoading(false);
      }
    };

    if (leagueId) fetchLeagues();
  }, [leagueId]);
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
            <h2 className="text-xl font-semibold">Lịch thi đấu sắp tới</h2>
          </div>
          {matches.length === 0 ? (
            <p>Giải đấu này chưa có trận đấu nào</p>
          ) : (
            <Table>
              <TableBody>
                {matches.map((match, index) => (
                  <TableRow key={match.id} className="text-center">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{match.firstTeam.name}</TableCell>
                    <TableCell>
                      <div>
                        <p>Ngày diễn ra: {match.matchDate.split("T")[0]}</p>
                        <p>{match.firstTeamScore} - {match.secondTeamScore}</p>
                        <p>Địa điểm: {match.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>{match.secondTeam.name}</TableCell>
                    <TableCell>{match.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  )
}