"use client"

import Link from "next/link"
import UserAvt from "@/assets/images/avt.jpg"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LeagueInvitation } from "@/types/league"
import { getMyInvitations } from "@/lib/services/leagueServices"
import InvitationForm from "./InvitationForm"

export default function Navbar() {
  const { logout } = useAuth()
  const [user, setUser] = useState<any>(null)
  const [invitationList, setInvitationList] = useState<LeagueInvitation[]>([])
  const [invitation, setInvitation] = useState<LeagueInvitation>()
  const [invitationForm, setInvitationForm] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("userName")
    if (storedUser) {
      setUser(storedUser)
    }
    const fetchInvitations = async () => {
      const token = localStorage.getItem("token") || ""
      if (!token) return
      try {
        const res = await getMyInvitations(token)
        setInvitationList(res)
      } catch (err) {
        console.error("Error fetching invitations:", err);
      }
    }
    fetchInvitations()
  }, [])

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          ⚽ FAFI
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="cursor-pointer">Giải đấu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/league/create">Tạo giải đấu</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/league">Danh sách giải đấu</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/team">Đội bóng</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/docs">Tin tức</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          {user ? (
            <div className="flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger><Bell /></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Thông báo của bạn</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {invitationList.length === 0 ? (
                    <DropdownMenuItem>
                      Không có thông báo mới
                    </DropdownMenuItem>
                  ) : (
                    invitationList.map((invitation) => (
                      <DropdownMenuItem key={invitation.league_id} onClick={() => {
                        setInvitation(invitation)
                        setInvitationForm(true)
                      }}>
                        <div className="flex flex-col space-y-1">
                          <p className="">Bạn đã được mời tham gia giải đấu</p>
                          <p className="font-medium">Người mời: {invitation.organizer_username} </p>
                          <p className="font-medium">Thời gian: {invitation.created_date.split("T")[0]} </p>
                          <p className="font-medium">Trạng thái: {invitation.status} </p>
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
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
            </div>
          ) : (
            <div className="flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger><Bell /></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Thông báo của bạn</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span className="text-red-500 font-medium">Vui lòng đăng nhập để sử dụng</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="space-x-2">
                <Link href="/sign-in">
                  <Button variant="outline" className="cursor-pointer">Đăng nhập</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="cursor-pointer">Đăng ký</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <InvitationForm 
        open={invitationForm} 
        onClose={() => setInvitationForm(false)}
        invitation={invitation!}
      />
    </nav>
  )
}
