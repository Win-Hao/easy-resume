"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  allowPresent?: boolean;
}

const currentYear = new Date().getFullYear();

export function DatePicker({ value, onChange, allowPresent }: DatePickerProps) {
  const isPresent = value === "至今";
  const [year, monthStr] = isPresent ? [currentYear, 1] : parseDate(value);
  const [viewYear, setViewYear] = useState(year || currentYear);
  const [open, setOpen] = useState(false);

  const months = [
    "1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月",
  ];

  function parseDate(v: string): [number, number] {
    if (!v) return [currentYear, 0];
    const parts = v.split(".");
    return [parseInt(parts[0]) || currentYear, parseInt(parts[1]) || 0];
  }

  function handleSelect(month: number) {
    const m = String(month).padStart(2, "0");
    onChange(`${viewYear}.${m}`);
    setOpen(false);
  }

  function handlePresent() {
    onChange("至今");
    setOpen(false);
  }

  const displayText = value || "选择日期";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="h-8 w-full justify-start text-xs font-normal"
          />
        }
      >
        <CalendarIcon size={13} className="mr-1.5 text-zinc-400" />
        <span className={value ? "text-zinc-900" : "text-zinc-400"}>
          {displayText}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-3" align="start">
        {/* Year navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setViewYear(viewYear - 1)}
            className="p-1 rounded hover:bg-zinc-100 text-zinc-500"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-zinc-900">{viewYear} 年</span>
          <button
            onClick={() => setViewYear(viewYear + 1)}
            className="p-1 rounded hover:bg-zinc-100 text-zinc-500"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-4 gap-1.5">
          {months.map((label, i) => {
            const m = i + 1;
            const isSelected = !isPresent && year === viewYear && monthStr === m;
            return (
              <button
                key={m}
                onClick={() => handleSelect(m)}
                className={`
                  py-1.5 rounded text-xs transition
                  ${isSelected
                    ? "bg-[var(--accent)] text-white font-medium"
                    : "hover:bg-zinc-100 text-zinc-700"
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Present option */}
        {allowPresent && (
          <button
            onClick={handlePresent}
            className={`
              w-full mt-2 py-1.5 rounded text-xs transition
              ${isPresent
                ? "bg-[var(--accent)] text-white font-medium"
                : "hover:bg-zinc-100 text-zinc-700 border border-zinc-200"
              }
            `}
          >
            至今
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}
