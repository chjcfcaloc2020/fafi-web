"use client"

import Link from "next/link"
import UserAvt from "@/assets/images/avt.jpg"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Navbar() {
  const { logout } = useAuth()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("userName")
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          ⚽ Football League
        </Link>
        <div className="space-x-2">
          {user ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="w-9 h-9 cursor-pointer">
                    <AvatarImage src={UserAvt.src} alt="User Avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="grid">
                    <div className="grid">
                      <Link href="/profile" className="px-3.5 py-1.5 hover:bg-gray-200">Trang cá nhân</Link>
                    </div>
                    <hr />
                    <div className="grid">
                      <Link href="12" className="px-3.5 py-1.5 hover:bg-gray-200">Đăng xuất</Link>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="outline">Đăng nhập</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Đăng ký</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
