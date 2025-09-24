"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Team } from "@/types/team"
import MyTeams from "@/app/teams/page"
import MyLeagues from "@/app/profile/my-league/MyLeagues"
import TeamForm from "@/app/teams/TeamForm"
import api from "@/lib/api"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<string | null>(null)
  const [openForm, setOpenForm] = useState(false);
  const [editTeam, setEditTeam] = useState<Team | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const storedUser = localStorage.getItem("userName")
    const storedRole = localStorage.getItem("role")
    if (storedUser) {
      setUser(storedUser)
      setRole(storedRole)
    }
  }, [])

  const handleCreateTeam = async (data: { name: string; logo: string; coach_name: string }) => {
    const res = await api.post("/teams", data, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    if (res.status === 201) {
      console.log("Team created successfully");
    }
  };

  return (
    <div className="container mx-auto w-3/4">
      <Card>
        <CardContent>
          <Tabs defaultValue={role === "MANAGER" ? "teams" : "leagues"} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {role === "MANAGER" ? (
                <TabsTrigger value="teams">⚽ Đội Bóng</TabsTrigger>
              ) : (
                <TabsTrigger value="leagues">🏆 Giải đấu</TabsTrigger>
              )}
              <TabsTrigger value="info">👤 Thông Tin</TabsTrigger>
              <TabsTrigger value="account">🔒 Tài Khoản</TabsTrigger>
            </TabsList>

            {role === "MANAGER" ? (
              <TabsContent value="teams" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Danh sách đội bóng</h2>
                  <Button onClick={() => setOpenForm(true)} className="cursor-pointer">+ Tạo đội bóng</Button>
                </div>
                <MyTeams />
              </TabsContent>
            ) : (
              <TabsContent value="leagues">
                <p className="text-xl font-semibold mt-4 mb-2">Danh sách giải đấu</p>
                <MyLeagues />
              </TabsContent>
            )}

            {/* Tab 2: Thông tin người dùng */}
            <TabsContent value="info" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
              {user ? (
                <div className="space-y-2">
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.roles?.join(", ")}</p>
                </div>
              ) : (
                <p>Không có thông tin người dùng.</p>
              )}
            </TabsContent>

            {/* Tab 3: Tài khoản người dùng */}
            <TabsContent value="account" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Cài đặt tài khoản</h2>
              <form className="space-y-4 max-w-sm">
                <Input type="password" placeholder="Mật khẩu hiện tại" />
                <Input type="password" placeholder="Mật khẩu mới" />
                <Input type="password" placeholder="Xác nhận mật khẩu mới" />
                <Button type="submit">Đổi mật khẩu</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <TeamForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleCreateTeam}
        initialData={editTeam || undefined}
      />
    </div>
  )
}
