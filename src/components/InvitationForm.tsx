"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { LeagueInvitation } from "@/types/league";
import { acceptByManager } from "@/lib/services/leagueServices";

interface InvitationFormProps {
  open: boolean;
  onClose: () => void;
  invitation?: LeagueInvitation
}

export default function InvitationForm({ open, onClose, invitation }: InvitationFormProps) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const handleSubmit = () => {
    if (invitation) {
      const res = acceptByManager(String(invitation.league_id), String(invitation.manager_username), "ACCEPT", token!)
      console.log(res)
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4">Bạn đã nhận được lời mời tham gia giải đấu</DialogTitle>
            {invitation ? (
              <div className="flex flex-col space-y-2">
                <DialogDescription className="text-gray-700 font-medium">Giải đấu: {invitation.league_name}</DialogDescription>
                <DialogDescription className="text-gray-700">Người mời: {invitation.organizer_username}</DialogDescription>
                <DialogDescription className="text-gray-700">Trạng thái: {invitation.status}</DialogDescription>
                <DialogDescription className="text-gray-700">Thời gian: {invitation.created_date.split("T")[0]}</DialogDescription>
              </div>
            ) : (
              <div></div>
            )}
          <DialogFooter>
            <Button type="submit" variant="outline" onClick={handleSubmit}>Từ chối</Button>
            <Button type="submit" onClick={handleSubmit}>Đồng ý</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}