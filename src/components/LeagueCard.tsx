"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { League } from "@/types/league";

interface LeagueCardProps {
  league: League;
}

export function LeagueCard({ league }: LeagueCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition">
      <CardHeader>
        <CardTitle>{league.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">
          {league.description || "Không có mô tả"}
        </p>
        <p className="text-sm">Số đội: {league.team_number}</p>
        <p className="text-sm">Cầu thủ/đội: {league.team_size}</p>
        <p className="text-sm">Thể thức: {league.format}</p>
        <p className="text-sm">
          {league.start_date} → {league.end_date}
        </p>

        <div className="flex space-x-2 mt-4">
          <Link href={`/league/${league.id}/dashboard`}>
            <Button variant="outline" size="sm">
              Xem chi tiết
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
