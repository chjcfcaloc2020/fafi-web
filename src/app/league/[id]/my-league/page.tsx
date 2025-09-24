"use client"

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
import LeagueInfoDetail from "@/app/league/LeagueInfoDetail"
import LeagueMenu from "@/app/league/LeagueMenu"

export default function MyLeagueOwn() {
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

  const handleSubmit = async () => {
    if (!token) return alert("Bạn cần đăng nhập");

    try {
      await sendInvitation(managerUsername, leagueId, token);
      alert("Tạo giải đấu thành công!");
    } catch (err) {
      console.error(err);
      alert("Không thể tạo giải đấu");
    }
  };

  if (loading) return <p>Đang tải danh sách giải đấu...</p>;
  
  return (
    <>
      <div className="w-3/4 mx-auto bg-white shadow-md p-6 rounded-xl border flex flex-col">
        <LeagueInfoDetail />
        <LeagueMenu />
      </div>
      <div className="w-3/4 mx-auto bg-white shadow-md p-6 rounded-xl border flex flex-col mt-8 space-y-4">
        <div className="flex flex-col space-y-2">
          <Label className="text-medium font-semibold">Gửi lời mời tham dự giải đấu đến: </Label>
          <div className="w-1/3 flex space-x-2">
            <Input type="text" onChange={(e) => setManagerUsername(e.target.value)} placeholder="Nhập username người nhận..." className="w-full" />
            <Button variant={"default"} className="cursor-pointer" onClick={handleSubmit}>Gửi lời mời</Button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Danh sách các trận đấu</h2>
            <Link href={`/league/${leagueId}/my-league/create`}>
              <Button className="cursor-pointer">+ Tạo trận đấu</Button>
            </Link>
          </div>
          {matches.length === 0 ? (
            <p>Giải đấu này chưa có trận đấu nào</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-auto">STT</TableHead>
                  <TableHead>Tên đội 1</TableHead>
                  <TableHead>Tên đội 2</TableHead>
                  <TableHead>HLV đội 1</TableHead>
                  <TableHead>HLV đội 2</TableHead>
                  <TableHead>Ngày thi đấu</TableHead>
                  <TableHead>Địa điểm</TableHead>
                  <TableHead>Tỉ số</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matches.map((match, index) => (
                  <TableRow key={match.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{match.firstTeam.name}</TableCell>
                    <TableCell>{match.secondTeam.name}</TableCell>
                    <TableCell>{match.firstTeam.coach_name}</TableCell>
                    <TableCell>{match.secondTeam.coach_name}</TableCell>
                    <TableCell>{match.matchDate.split("T")[0]}</TableCell>
                    <TableCell>{match.location}</TableCell>
                    <TableCell>{match.firstTeamScore} - {match.secondTeamScore}</TableCell>
                    <TableCell>{match.status}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`profile/my-league/edit/${match.id}`}>
                        <Button
                          variant={"outline"}
                          className="cursor-pointer mr-2"
                        ><UserPen /></Button>
                      </Link>
                      <Button
                        variant={"destructive"}
                        className="cursor-pointer"
                        // onClick={() => handleDeleteLeague(String(league.id))}
                      ><Trash2 /></Button>
                    </TableCell>
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