"use client"

import { useState, useEffect } from "react"
import { League } from "@/types/league"
import { useParams } from "next/navigation";
import { getLeagueByIdNotAuth } from "@/lib/services/leagueServices";

export default function LeagueInfoDetail() {
  const { id } = useParams();
  const [league, setLeague] = useState<League | null>(null);

  useEffect(() => {
    const fetchLeagueById = async () => {
      try {
        const res = await getLeagueByIdNotAuth(String(id));
        setLeague(res);
      } catch (error) {
        console.error("Error fetching league data:", error);
      }
    }
    fetchLeagueById();
  }, [id])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mb-4">
      <h1 className="text-2xl font-bold">{league?.name}</h1>
      <p className="mt-2 text-md text-gray-700">{league?.description == "" ? "Không có" : league?.description}</p>
      <div className="mt-2 flex space-x-4">
        <span>Số đội: {league?.team_number}</span>
        <span>Số cầu thủ ra sân: {league?.team_size}</span>
        <span>Thể thức: {league?.format}</span>
      </div>
      <div className="mt-2 flex space-x-4">
        <span>Ngày bắt đầu: {league?.start_date.split("T")[0]}</span>
        <span>Ngày kết thúc: {league?.end_date.split("T")[0]}</span>
      </div>
      <span className="mt-2">Trạng thái: {league?.status}</span>
    </div>
  )
}