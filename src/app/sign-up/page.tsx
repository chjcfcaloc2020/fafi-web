"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SignUpPage() {
  const { signup, loading, error } = useAuth()
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    role: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signup(form.username, form.password, form.email, form.phone, form.address, form.role)
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Đăng Ký</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="username" placeholder="Tên người dùng" value={form.username} onChange={handleChange} required />
            <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <Input type="password" name="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required />
            <Input name="phone" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} required />
            <Input name="address" placeholder="Địa chỉ" value={form.address} onChange={handleChange} required />
            <Select value={form.role} onValueChange={(value) => setForm({ ...form, role: value })} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MANAGER">Quản lý đội</SelectItem>
                <SelectItem value="ORGANIZER">Quản lý giải đấu</SelectItem>
              </SelectContent>
            </Select>

            {error && <p className="text-red-500 text-sm font-semibold text-center">{error}</p>}
            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
              {loading ? "Loading..." : "Đăng ký"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
