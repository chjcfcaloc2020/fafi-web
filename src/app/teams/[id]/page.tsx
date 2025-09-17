"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Team } from "@/types/team";
import { Player } from "@/types/player";
import { Button } from "@/components/ui/button";
import { createPlayer, updatePlayer, deletePlayer } from "@/lib/services/playerServices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserPen, Trash2 } from 'lucide-react';
import api from "@/lib/api";
import TeamForm from "@/app/teams/TeamForm";
import PlayerForm from "@/app/teams/[id]/PlayerForm";
import ConfirmForm from "@/components/ConfirmForm";

export default function TeamDetailPage() {
  const { id } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openPlayerForm, setOpenPlayerForm] = useState(false);
  const [openConfirmForm, setOpenConfirmForm] = useState(false);
  const [editTeam, setEditTeam] = useState<Team | null>(null);
  const [handleType, setHandleType] = useState("create");
  const [count, setCount] = useState(0);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !id) return;

        const [teamRes, playersRes] = await Promise.all([
          fetch(`${API_URL}/teams/${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }),
          fetch(`${API_URL}/players/team/${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }),
        ]);
        if (!teamRes.ok) return { message: "Failed to fetch team details" };
        if (playersRes == null) {
          setPlayers([]);
        }

        // get team detail
        const teamData = await teamRes.json();
        setTeam(teamData);
        setEditTeam(teamData);
        // get players of team
        const playersData = await playersRes.json();
        setPlayers(playersData);
      } catch (err) {
        console.error("Error fetching team detail:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && id) fetchData();
  }, [id, token]);

  const handleUpdateTeam = async (data: { name: string; logo: string; coach_name: string }) => {
    if (!editTeam) return;
    const res = await api.put(`/teams/${id}`, data, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });
    if (res.status === 200) {
      console.log("Team updated successfully");
    }
  };

  const handleCreatePlayer = async (data: Player) => {
    if (!token) return;
    try {
      await createPlayer(data, token);
      alert("Tạo cầu thủ thành công!");
    } catch (err) {
      alert("Tạo cầu thủ thất bại!");
    }
  }

  const handleUpdatePlayer = async (data: Player) => {
    if (!token) return;
    try {
      await updatePlayer(count, String(id), data, token);
      alert("Tạo cầu thủ thành công!");
    } catch (err) {
      alert("Tạo cầu thủ thất bại!");
    }
  }

  const handleDeletePlayer = async () => {
    if (!token) return;
    try {
      await deletePlayer(count, String(id), token);
      alert("Xóa cầu thủ thành công!");
      // Có thể gọi hàm reload list ở đây
    } catch (err) {
      alert("Xóa cầu thủ thất bại!");
    }
  }
  if (loading) return <p className="p-6">Đang tải thông tin đội...</p>;
  if (!team) return <p className="p-6">Không tìm thấy đội bóng</p>;

  return (
    <div className="w-1/2 mx-auto space-y-6">
      <Card className="relative group">
        <CardHeader>
          <CardTitle className="text-xl">{team.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">HLV: {team.coach_name}</p>
        </CardContent>
        <Button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => setOpenForm(true)}
        >
          Sửa
        </Button>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <h4 className="text-2xl">Danh sách cầu thủ</h4>
            <Button onClick={() => { setOpenPlayerForm(true); setHandleType("create") }} className="cursor-pointer">+ Thêm cầu thủ</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {players.length == 0 ? (
            <p className="text-gray-500">Chưa có cầu thủ nào</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-auto">STT</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead>Ngày sinh</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Số áo</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player, index) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.dob.split("T")[0]}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.shirt_number}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={"outline"}
                        className="cursor-pointer mr-2"
                        onClick={() => {
                          setOpenPlayerForm(true);
                          setCount(Number(player.id));
                          setHandleType("edit");
                        }}><UserPen /></Button>
                      <Button 
                        variant={"destructive"}
                        className="cursor-pointer"
                        onClick={() => {
                          setOpenConfirmForm(true);
                          setCount(Number(player.id));
                        }}><Trash2 /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <TeamForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleUpdateTeam}
        initialData={editTeam || undefined}
      />
      <PlayerForm
        open={openPlayerForm}
        onClose={() => setOpenPlayerForm(false)}
        onSubmit={handleType == "create" ? handleCreatePlayer : handleUpdatePlayer}
        funcType={handleType}
        count={count}
      />
      <ConfirmForm
        open={openConfirmForm}
        onClose={() => setOpenConfirmForm(false)}
        onSubmit={handleDeletePlayer}
        count={count}
      />
    </div>
  );
}
