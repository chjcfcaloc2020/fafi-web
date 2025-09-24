"use client"

import { useEffect, useState } from "react";
import { Team } from "@/types/team";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchMyTeams, getMyTeamsInLeague, addTeamToLeague } from "@/lib/services/teamServices";
import LeagueMenu from "@/app/league/LeagueMenu"
import LeagueInfoDetail from "@/app/league/LeagueInfoDetail"
import TeamCard from "@/components/TeamCard";

export default function MyTeamInLeague() {
  const { id } = useParams()
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsInLeague, setTeamsInLeague] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState("")
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchData = async <T,>(
      apiFn: (...args: any[]) => Promise<T>,
      setter: React.Dispatch<React.SetStateAction<T>>,
      args: any[] = []
    ) => {
      try {
        const res = await apiFn(...args);
        setter(res);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData(fetchMyTeams, setTeams, [token]);
      fetchData(getMyTeamsInLeague, setTeamsInLeague, [String(id), token]);
    }
  }, [token, id]);

  const handleAddTeamToLeague = async () => {
    if (!token) return
    try {
      await addTeamToLeague(String(id), teamName, token)
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  if (loading) return <p>Đang tải danh sách đội bóng...</p>;

  if (teams.length === 0)
    return <p>Bạn chưa có đội bóng nào. Hãy vào trang cá nhân để tạo một đội bóng mới!</p>;

  return (
    <>
      <div className="w-3/4 mx-auto bg-gray-50 shadow-md p-6 rounded-xl border flex flex-col">
        <LeagueInfoDetail />
        <LeagueMenu />
      </div>
      <div className="w-3/4 mx-auto bg-white shadow-md p-6 rounded-xl border flex flex-col mt-8 space-y-4">
        <div className="space-y-4">
          <h4 className="text-2xl font-semibold">Danh sách đội của bạn hiện đang có</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-2xl font-semibold">Danh sách đội có trong giải</h4>
          <div className="flex flex-col space-y-2">
            <Label className="text-medium font-semibold">Thêm đội vào giải</Label>
            <div className="flex space-x-2">
              <Select name="format" onValueChange={setTeamName}>
                <SelectTrigger className="w-1/3">
                  <SelectValue placeholder="Chọn đội" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={String(team.id)}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant={"default"} className="cursor-pointer" onClick={handleAddTeamToLeague}>Thêm</Button>
            </div>
          </div>
          {teamsInLeague.length === 0 ? (
            <p>Bạn chưa có đội bóng nào trong giải đấu này.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teamsInLeague.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}