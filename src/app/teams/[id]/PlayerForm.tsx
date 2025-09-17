"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar28 } from "@/components/Calendar28";
import { toDateTimeString } from "@/lib/utils";
import { getPlayerById } from "@/lib/services/playerServices";

interface PlayerFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; dob: string; position: string; shirt_number: string; team: string }) => void;
  funcType?: string;
  count: number;
}

export default function PlayerForm({ open, onClose, onSubmit, funcType, count }: PlayerFormProps) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [position, setPosition] = useState("");
  const [shirtNumber, setShirtNumber] = useState("");

  const handleSubmit = () => {
    if (!id || typeof id !== "string") {
      return;
    }
    onSubmit({ name, dob: toDateTimeString(dob), position, shirt_number: shirtNumber, team: id });
    onClose();
  };

  useEffect(() => {
    if (funcType === "create") {
      setName("");
      setDob("");
      setPosition("");
      setShirtNumber("");
    }

    if (funcType === "edit" && count !== 0) {
      const fetchPlayerDetail = async () => {
        const playerDetail = await getPlayerById(count, localStorage.getItem("token") || "");
        setName(playerDetail.name);
        setDob(playerDetail.dob.split("T")[0]);
        setPosition(playerDetail.position);
        setShirtNumber(playerDetail.shirt_number);
      };
      fetchPlayerDetail();
    }
  }, [funcType, count])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{funcType == "edit" ? "Sửa đội bóng" : "Tạo đội bóng mới"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Tên cầu thủ" value={name} onChange={(e) => setName(e.target.value)} />
          <Calendar28 value={dob} onChange={setDob} />
          <Input placeholder="Vị trí trong sân" value={position} onChange={(e) => setPosition(e.target.value)} />
          <Input placeholder="Số áo" value={shirtNumber} onChange={(e) => setShirtNumber(e.target.value)} />
          <Button onClick={handleSubmit} className="w-full cursor-pointer">
            {funcType == "edit" ? "Cập nhật" : "Tạo mới"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
