"use client";

import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  allowPresent?: boolean;
}

/** 日期书写格式："2024年06月" 或 "2024.06" */
export type DateFormat = "cn" | "dot";

/**
 * 整份简历的日期格式，由编辑器根据已有数据推断。
 * 空字段新选的日期跟随它，避免同一份简历里两种写法混用。
 */
export const DateFormatContext = createContext<DateFormat>("dot");

const currentYear = new Date().getFullYear();

/** 兼容 "2024年06月" / "2024.06" / "2024-06" / "2024/06" */
function parseDate(v: string): [number, number] {
  const nums = v.match(/\d+/g);
  if (!nums) return [currentYear, 0];
  return [Number(nums[0]) || currentYear, nums[1] ? Number(nums[1]) : 0];
}

function formatDate(year: number, month: number, format: DateFormat) {
  const mm = String(month).padStart(2, "0");
  return format === "cn" ? `${year}年${mm}月` : `${year}.${mm}`;
}

/** 已有值自带格式时沿用它，否则用整份简历的格式 */
function resolveFormat(value: string, fallback: DateFormat): DateFormat {
  if (value.includes("年")) return "cn";
  if (/^\s*\d{4}\s*[.\-/]\s*\d{1,2}/.test(value)) return "dot";
  return fallback;
}

export function DatePicker({ value, onChange, allowPresent }: DatePickerProps) {
  const isPresent = value === "至今";
  const [year, monthStr] = isPresent ? [currentYear, 1] : parseDate(value);
  const [viewYear, setViewYear] = useState(year || currentYear);
  const [open, setOpen] = useState(false);
  const format = resolveFormat(value, useContext(DateFormatContext));

  const months = [
    "1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月",
  ];

  function handleSelect(month: number) {
    onChange(formatDate(viewYear, month, format));
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
        <CalendarIcon size={13} className="mr-1.5 text-zinc-400 dark:text-zinc-500" />
        <span className={value ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"}>
          {displayText}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-3" align="start">
        {/* Year navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setViewYear(viewYear - 1)}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{viewYear} 年</span>
          <button
            onClick={() => setViewYear(viewYear + 1)}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
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
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
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
                : "hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
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
