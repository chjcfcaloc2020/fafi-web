"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllLeagues } from "@/lib/services/leagueServices";
import { League } from "@/types/league";
import { LeagueCard } from "@/components/LeagueCard";

export default function LeagueListPage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

  // search + filter states
  const [search, setSearch] = useState("");
  const [format, setFormat] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getAllLeagues();
        setLeagues(data);
        setFilteredLeagues(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  // Lọc dữ liệu khi search hoặc filter thay đổi
  useEffect(() => {
    let result = leagues;

    // search theo tên
    if (search.trim() !== "") {
      result = result.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // filter theo format
    if (format !== "") {
      result = result.filter((l) => l.format === format);
    }

    // filter theo ngày
    if (startDate) {
      result = result.filter((l) => new Date(l.start_date) >= new Date(startDate));
    }
    if (endDate) {
      result = result.filter((l) => new Date(l.end_date) <= new Date(endDate));
    }

    setFilteredLeagues(result);
  }, [search, format, startDate, endDate, leagues]);

  if (loading) return <p className="text-center mt-8">Đang tải...</p>;

  return (
    <div className="w-3/4 mx-auto my-8">

      {/* Search + Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Tìm kiếm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select onValueChange={setFormat}>
          <SelectTrigger>
            <SelectValue placeholder="Lọc theo thể thức" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LEAGUE">Vòng tròn</SelectItem>
            <SelectItem value="KNOCKOUT">Loại trực tiếp</SelectItem>
            <SelectItem value="GROUP">Vòng bảng</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* List */}
      {filteredLeagues.length === 0 ? (
        <p className="text-gray-600">Không tìm thấy giải đấu nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredLeagues.map((league) => (
            <LeagueCard key={league.id} league={league} />
          ))}
        </div>
      )}
    </div>
  );
}
