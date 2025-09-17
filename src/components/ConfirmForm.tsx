"use client"

import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

interface ConfirmFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { id: number; teamId: string }) => void;
  count: number;
}

export default function ConfirmForm({ open, onClose, onSubmit, count }: ConfirmFormProps) {
  const { id } = useParams();

  const handleSubmit = () => {
    if (!id || typeof id !== "string") {
      return;
    }
    onSubmit({ id: count, teamId: id });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4">Bạn chắc chắn muốn xóa cầu thủ này?</DialogTitle>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>Confirm</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}