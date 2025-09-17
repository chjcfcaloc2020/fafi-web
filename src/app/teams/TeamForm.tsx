"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Team } from "@/types/team";

interface TeamFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; logo: string; coach_name: string }) => void;
  initialData?: Team;
}

export default function TeamForm({ open, onClose, onSubmit, initialData }: TeamFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [logo, setLogo] = useState(initialData?.logo || "");
  const [coach, setCoach] = useState(initialData?.coach_name || "");
  
  const handleSubmit = () => {
    onSubmit({ name, logo, coach_name: coach });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Sửa đội bóng" : "Tạo đội bóng mới"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Tên đội bóng" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Tên huấn luyện viên" value={coach} onChange={(e) => setCoach(e.target.value)} />
          <Input placeholder="Logo đội bóng" value={logo} onChange={(e) => setLogo(e.target.value)} />
          <Button onClick={handleSubmit} className="w-full cursor-pointer">
            {initialData ? "Cập nhật" : "Tạo mới"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
