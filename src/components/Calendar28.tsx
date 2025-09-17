"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toYMD, parseYMD, formatDisplay } from "@/lib/utils";

interface Calendar28Props {
  value: string;
  onChange: (ymd: string) => void;
}

export function Calendar28({ value, onChange }: Calendar28Props) {
  const [open, setOpen] = React.useState(false);

  // parse the incoming "YYYY-MM-DD" into a Date using local timezone
  const dateObj = parseYMD(value);
  const [month, setMonth] = React.useState<Date | undefined>(dateObj ?? new Date());

  // keep an input display value in human-friendly format (e.g. "June 18, 2025")
  const displayValue = dateObj ? formatDisplay(dateObj) : "";

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={displayValue}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const raw = e.target.value;
            // if user types an ISO-like date "YYYY-MM-DD", parse it as local date
            const isoLike = /^\d{4}-\d{2}-\d{2}$/.test(raw);
            if (isoLike) {
              const parsed = parseYMD(raw);
              if (parsed) {
                onChange(toYMD(parsed));
                setMonth(parsed);
                return;
              }
            }
            // otherwise don't attempt invalid parsing — keep input uncommitted
            // but you may want to accept free text -> no update to onChange
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          readOnly // optional: keep input read-only so user picks via calendar; remove if you want typing
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={dateObj}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(d) => {
                if (d) {
                  onChange(toYMD(d));
                  setOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
