"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react";

const presetColors = [
  { name: "Claude 橙", value: "#D97757" },
  { name: "专业蓝", value: "#2f5785" },
  { name: "沉稳墨", value: "#374151" },
  { name: "翡翠绿", value: "#0d9488" },
  { name: "薄暮红", value: "#be3d3d" },
  { name: "靛青", value: "#4f6df5" },
  { name: "琥珀棕", value: "#a16207" },
  { name: "紫罗兰", value: "#7c3aed" },
  { name: "玫瑰粉", value: "#e11d48" },
  { name: "森林绿", value: "#15803d" },
  { name: "石板灰", value: "#475569" },
  { name: "海军蓝", value: "#1e3a5f" },
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition text-xs text-zinc-600" />
        }
      >
        <div
          className="w-4 h-4 rounded-full border border-white shadow-sm"
          style={{ backgroundColor: value }}
        />
        <Palette size={13} />
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-3" align="center">
        <div className="text-xs font-medium text-zinc-500 mb-2">选择主题色</div>
        <div className="grid grid-cols-4 gap-2">
          {presetColors.map((color) => (
            <button
              key={color.value}
              onClick={() => onChange(color.value)}
              className="group relative flex flex-col items-center gap-1"
              title={color.name}
            >
              <div
                className={`w-9 h-9 rounded-lg transition shadow-sm hover:scale-110 ${
                  value === color.value
                    ? "ring-2 ring-offset-2 ring-zinc-900"
                    : ""
                }`}
                style={{ backgroundColor: color.value }}
              />
              <span className="text-[10px] text-zinc-400 leading-none">{color.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100">
          <div className="text-[10px] text-zinc-400 mb-1">自定义颜色</div>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-8 rounded cursor-pointer border-0"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
