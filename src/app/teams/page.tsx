"use client"

import { useEffect, useState } from "react";
import { Team } from "@/types/team";
import api from "@/lib/api";
import TeamCard from "@/components/TeamCard";

export default function MyTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await api.get("/teams/my-teams", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeams(res.data);
      } catch (err) {
        console.error("Error fetching teams:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchTeams();
  }, [token]);

  if (loading) return <p>Đang tải danh sách đội bóng...</p>;

  if (teams.length === 0)
    return <p>Bạn chưa có đội bóng nào. Hãy tạo một đội bóng mới!</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
          />
        ))}
      </div>
    </>
  );
}
