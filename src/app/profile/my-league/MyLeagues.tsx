"use client";

import { useEffect, useState } from "react";
import { League } from "@/types/league";
import { getMyLeagues, deleteLeague } from "@/lib/services/leagueServices";
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

export default function MyLeagues() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchLeagues = async () => {
      if (!token) return;
      try {
        const leagueData = await getMyLeagues(token);
        setLeagues(leagueData);
      } catch (err) {
        console.error("Error fetching teams:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchLeagues();
  }, [token]);

  const handleDeleteLeague = async (id: string) => {
    if (!token) return alert("Bạn cần đăng nhập");
    try {
      await deleteLeague(id, token);
      setLeagues(leagues.filter(league => league.id !== id));
    } catch (err) {
      alert("Xoá giải đấu thất bại. Vui lòng thử lại.");
    }
  }

  if (loading) return <p>Đang tải danh sách giải đấu...</p>;

  if (leagues.length === 0)
    return <p>Bạn chưa có giải đấu nào. Hãy tạo một giải đấu mới!</p>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto">STT</TableHead>
            <TableHead>Tên giải đấu</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Số lượng đội</TableHead>
            <TableHead>Số cầu thủ ra sân</TableHead>
            <TableHead>Thể thức</TableHead>
            <TableHead>Ngày bắt đầu</TableHead>
            <TableHead>Ngày kết thúc</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leagues.map((league, index) => (
            <TableRow key={league.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{league.name}</TableCell>
              <TableCell>{league.description == "" ? "Không có" : league.description}</TableCell>
              <TableCell>{league.team_number}</TableCell>
              <TableCell>{league.team_size}</TableCell>
              <TableCell>{league.format}</TableCell>
              <TableCell>{league.start_date.split("T")[0]}</TableCell>
              <TableCell>{league.end_date.split("T")[0]}</TableCell>
              <TableCell>{league.status}</TableCell>
              <TableCell className="text-right">
                <Link href={`profile/my-league/edit/${league.id}`}>
                  <Button
                    variant={"outline"}
                    className="cursor-pointer mr-2"
                  ><UserPen /></Button>
                </Link>
                <Button
                  variant={"destructive"}
                  className="cursor-pointer"
                  onClick={() => handleDeleteLeague(String(league.id))}
                ><Trash2 /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}