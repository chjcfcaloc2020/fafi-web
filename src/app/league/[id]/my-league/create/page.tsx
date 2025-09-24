"use client"

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

export default function CreateMatchPage() {
  const { id } = useParams()
  const [teamsInLeague, setTeamsInLeague] = useState<Team[]>([])
  const [matchDate, setMatchDate] = useState("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return alert("Bạn cần đăng nhập");

    const formData = new FormData(e.currentTarget);
    const newMatch: CreateMatch = {
      firstTeamId: formData.get("firstTeamId") as string,
      secondTeamId: formData.get("secondTeamId") as string,
      matchDate: toDateTimeString(matchDate),
      location: formData.get("location") as string,
      firstTeamScore: Number(formData.get("firstTeamScore")),
      secondTeamScore: Number(formData.get("secondTeamScore")),
      leagueId: String(id),
      stageId: 1
    };

    try {
      await createMatch(newMatch, token);
      alert("Tạo giải đấu thành công!");
    } catch (err) {
      console.error(err);
      alert("Không thể tạo giải đấu");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            🏆 Tạo Trận Đấu Mới
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Chọn đội 1</Label>
              <Select name="firstTeamId">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đội 1" />
                </SelectTrigger>
                <SelectContent>
                  {teamsInLeague.map((team) => (
                    <SelectItem key={team.id} value={team.id!}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Chọn đội 2</Label>
              <Select name="secondTeamId">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đội 2" />
                </SelectTrigger>
                <SelectContent>
                  {teamsInLeague.map((team) => (
                    <SelectItem key={team.id} value={team.id!}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ngày bắt đầu</Label>
              <Calendar28 value={matchDate} onChange={setMatchDate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Chọn địa điểm</Label>
              <Input id="location" name="location" placeholder="Nhập địa chỉ..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstTeamScore">Điểm đội 1</Label>
              <Input id="firstTeamScore" name="firstTeamScore" type="number" min="0" placeholder="Nhập điểm đội 1..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondTeamScore">Điểm đội 2</Label>
              <Input id="secondTeamScore" name="secondTeamScore" type="number" min="0" placeholder="Nhập điểm đội 2..." required />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-2 mt-4">
            <Button type="reset" variant="outline" className="cursor-pointer">
              Trở về
            </Button>
            <Button type="submit" className="cursor-pointer">
              Tạo trận đấu
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}