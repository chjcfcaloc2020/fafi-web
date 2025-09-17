"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Team } from "@/types/team";
import Link from "next/link";

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">HLV: {team.coach_name}</p>
        <div className="flex space-x-2 mt-4">
          <Link href={`/teams/${team.id}`}>
            <Button variant="outline" size="sm" className="cursor-pointer">
              Xem chi tiết
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
