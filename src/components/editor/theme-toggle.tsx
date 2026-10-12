"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/** 订阅 html 上 class 的变化，主题状态以 DOM 为准 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

/** 浅色 / 深色切换，选择结果写入 localStorage，未选择时跟随系统 */
export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // 隐私模式下 localStorage 不可用，忽略
    }
  };

  const label = dark ? "切换到浅色模式" : "切换到深色模式";

  return (
    <button
      onClick={toggle}
      title={label}
      aria-label={label}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition text-xs text-zinc-600 dark:text-zinc-300"
    >
      {dark ? <Sun size={14} /> : <Moon size={14} />}
      {dark ? "浅色" : "深色"}
    </button>
  );
}
