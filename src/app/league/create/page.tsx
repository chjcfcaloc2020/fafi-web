"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar28 } from "@/components/Calendar28";
import { createLeague } from "@/lib/services/leagueServices";
import { League } from "@/types/league";
import { toDateTimeString } from "@/lib/utils";

export default function CreateLeaguePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return alert("Bạn cần đăng nhập");

    const formData = new FormData(e.currentTarget);
    const league: League = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      team_number: Number(formData.get("teamNumber")),
      team_size: Number(formData.get("teamSize")),
      format: formData.get("format") as string,
      start_date: toDateTimeString(startDate),
      end_date: toDateTimeString(endDate),
    };

    try {
      const newLeague = await createLeague(league, token);
      console.log("Created league:", newLeague);
      alert("Tạo giải đấu thành công!");
    } catch (err) {
      console.error(err);
      alert("Không thể tạo giải đấu");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            🏆 Tạo Giải Đấu Mới
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên giải đấu</Label>
              <Input id="name" name="name" placeholder="Nhập tên giải đấu..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea id="description" name="description" placeholder="Mô tả ngắn về giải đấu..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamNumber">Số lượng đội tham gia</Label>
              <Input id="teamNumber" name="teamNumber" type="number" min="2" placeholder="Nhập số lượng đội tham gia..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamSize">Số cầu thủ mỗi đội (ra sân)</Label>
              <Input id="teamSize" name="teamSize" type="number" min="5" placeholder="Nhập số cầu thủ mỗi đội ra sân..." required />
            </div>
            <div className="space-y-2">
              <Label>Thể thức</Label>
              <Select name="format">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thể thức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MIXED">Hỗn hợp</SelectItem>
                  <SelectItem value="KNOCKOUT">Loại trực tiếp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ngày bắt đầu</Label>
              <Calendar28 value={startDate} onChange={setStartDate} />
            </div>
            <div className="space-y-2">
              <Label>Ngày kết thúc</Label>
              <Calendar28 value={endDate} onChange={setEndDate} />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-2 mt-4">
            <Button type="reset" variant="outline" className="cursor-pointer">
              Trở về
            </Button>
            <Button type="submit" disabled={loading} className="cursor-pointer">
              {loading ? "Đang tạo..." : "Tạo giải đấu"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
