"use client";

import { useState, useRef } from "react";
import type { ResumeData } from "@/types/resume";
import { defaultResume } from "@/data/default-resume";
import { ResumeEditor } from "@/components/editor/resume-editor";
import { ClassicTemplate } from "@/components/templates/classic";
import { ModernTemplate } from "@/components/templates/modern";
import { MinimalTemplate } from "@/components/templates/minimal";
import { ExecutiveTemplate } from "@/components/templates/executive";
import { FreshTemplate } from "@/components/templates/fresh";
import { AppleTemplate } from "@/components/templates/apple";
import { StandardTemplate } from "@/components/templates/standard";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/editor/color-picker";
import { ThemeToggle } from "@/components/editor/theme-toggle";
import { Download, FileText, RotateCcw, LayoutTemplate } from "lucide-react";

const templates = [
  { id: "classic", name: "经典", component: ClassicTemplate },
  { id: "modern", name: "双栏", component: ModernTemplate },
  { id: "minimal", name: "极简", component: MinimalTemplate },
  { id: "executive", name: "商务", component: ExecutiveTemplate },
  { id: "fresh", name: "活力", component: FreshTemplate },
  { id: "apple", name: "苹果", component: AppleTemplate },
  { id: "standard", name: "标准", component: StandardTemplate },
] as const;

type TemplateId = (typeof templates)[number]["id"];

export default function Home() {
  const [data, setData] = useState<ResumeData>(defaultResume);
  const [templateId, setTemplateId] = useState<TemplateId>("classic");
  const [accentColor, setAccentColor] = useState("#D97757");
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = templates.find((t) => t.id === templateId)!;
  const TemplateComponent = currentTemplate.component;

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.profile.name}-resume.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const imported = JSON.parse(reader.result as string);
          setData(imported);
        } catch {
          alert("JSON 文件格式有误");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("确定要重置为默认数据吗？")) {
      setData(defaultResume);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      {/* Top Bar */}
      <header className="no-print sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <FileText size={20} className="text-[var(--accent)]" />
          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Easy Resume</h1>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-1">在线简历编辑器</span>
        </div>

        {/* Template Switcher + Color Picker */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5">
            <LayoutTemplate size={14} className="text-zinc-400 dark:text-zinc-500 ml-2 mr-1" />
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplateId(t.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                  templateId === t.id
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
          <ColorPicker value={accentColor} onChange={setAccentColor} />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleImportJSON}>
            导入 JSON
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportJSON}>
            导出 JSON
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw size={14} className="mr-1" />
            重置
          </Button>
          <Button size="sm" onClick={handlePrint} className="bg-[var(--accent)] hover:bg-[#c4684b] text-white">
            <Download size={14} className="mr-1" />
            导出 PDF
          </Button>
        </div>
      </header>

      {/* Main Content: Editor + Preview */}
      <div className="no-print flex">
        {/* Left: Editor */}
        <div className="w-[440px] h-[calc(100vh-57px)] overflow-y-auto bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex-shrink-0">
          <ResumeEditor data={data} onChange={setData} />
        </div>

        {/* Right: Preview */}
        <div className="flex-1 h-[calc(100vh-57px)] overflow-y-auto flex justify-center py-8 bg-zinc-100 dark:bg-zinc-950">
          <div ref={previewRef} className="shadow-lg" style={{ "--accent": accentColor, "--accent-light": accentColor + "18" } as React.CSSProperties}>
            <TemplateComponent data={data} />
          </div>
        </div>
      </div>

      {/* Print-only: full page resume */}
      <div className="hidden print:block" style={{ "--accent": accentColor, "--accent-light": accentColor + "18" } as React.CSSProperties}>
        <TemplateComponent data={data} />
      </div>
    </div>
  );
}
