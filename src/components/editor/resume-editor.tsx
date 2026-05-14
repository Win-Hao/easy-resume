"use client";

import type { ResumeData } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { SortableList } from "./sortable-list";
import { DatePicker } from "./date-picker";
import { genId } from "@/lib/id";

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

function SectionHeader({ title, onAdd }: { title: string; onAdd?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3 mt-6">
      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      {onAdd && (
        <Button variant="ghost" size="sm" onClick={onAdd} className="h-7 text-xs">
          <Plus size={14} className="mr-1" />
          添加
        </Button>
      )}
    </div>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 mb-2">{children}</div>;
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-zinc-500 mb-1 block">{label}</label>
      {children}
    </div>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition"
    >
      <Trash2 size={14} />
    </button>
  );
}

export function ResumeEditor({ data, onChange }: Props) {
  const update = (patch: Partial<ResumeData>) => onChange({ ...data, ...patch });
  const updateProfile = (patch: Partial<ResumeData["profile"]>) =>
    update({ profile: { ...data.profile, ...patch } });

  const updateListItem = <T,>(list: T[], index: number, patch: Partial<T>): T[] =>
    list.map((item, i) => (i === index ? { ...item, ...patch } : item));

  const removeListItem = <T,>(list: T[], index: number): T[] =>
    list.filter((_, i) => i !== index);

  return (
    <div className="p-5 space-y-1 text-sm">
      {/* Profile */}
      <h3 className="text-sm font-semibold text-zinc-900 mb-3">基本信息</h3>
      <FieldRow>
        <FieldLabel label="姓名">
          <Input value={data.profile.name} onChange={(e) => updateProfile({ name: e.target.value })} />
        </FieldLabel>
        <FieldLabel label="手机">
          <Input value={data.profile.mobile} onChange={(e) => updateProfile({ mobile: e.target.value })} />
        </FieldLabel>
      </FieldRow>
      <div className="mb-2">
        <FieldLabel label="邮箱">
          <Input value={data.profile.email} onChange={(e) => updateProfile({ email: e.target.value })} />
        </FieldLabel>
      </div>
      <div className="mb-2">
        <FieldLabel label="GitHub">
          <Input value={data.profile.github || ""} onChange={(e) => updateProfile({ github: e.target.value })} />
        </FieldLabel>
      </div>
      <FieldRow>
        <FieldLabel label="工作年限">
          <Input value={data.profile.workExpYear || ""} onChange={(e) => updateProfile({ workExpYear: e.target.value })} />
        </FieldLabel>
        <FieldLabel label="目标职位">
          <Input value={data.profile.positionTitle || ""} onChange={(e) => updateProfile({ positionTitle: e.target.value })} />
        </FieldLabel>
      </FieldRow>
      <div className="mb-2">
        <FieldLabel label="期望工作地">
          <Input value={data.profile.workPlace || ""} onChange={(e) => updateProfile({ workPlace: e.target.value })} />
        </FieldLabel>
      </div>

      <Separator className="my-4" />

      {/* Education */}
      <SectionHeader
        title="教育背景"
        onAdd={() =>
          update({
            educationList: [...data.educationList, { id: genId("edu"), school: "", major: "", degree: "本科", startDate: "", endDate: "" }],
          })
        }
      />
      <SortableList
        items={data.educationList}
        onReorder={(items) => update({ educationList: items })}
        keyExtractor={(item) => item.id}
        renderItem={(edu, i) => (
          <div className="mb-3 p-3 bg-zinc-50 rounded-lg relative group">
            <DeleteButton onClick={() => update({ educationList: removeListItem(data.educationList, i) })} />
            <FieldRow>
              <FieldLabel label="学校">
                <Input value={edu.school} onChange={(e) => update({ educationList: updateListItem(data.educationList, i, { school: e.target.value }) })} />
              </FieldLabel>
              <FieldLabel label="专业">
                <Input value={edu.major} onChange={(e) => update({ educationList: updateListItem(data.educationList, i, { major: e.target.value }) })} />
              </FieldLabel>
            </FieldRow>
            <div className="mb-2">
              <FieldLabel label="学历">
                <Input value={edu.degree} onChange={(e) => update({ educationList: updateListItem(data.educationList, i, { degree: e.target.value }) })} />
              </FieldLabel>
            </div>
            <FieldRow>
              <FieldLabel label="开始时间">
                <DatePicker value={edu.startDate} onChange={(v) => update({ educationList: updateListItem(data.educationList, i, { startDate: v }) })} />
              </FieldLabel>
              <FieldLabel label="结束时间">
                <DatePicker value={edu.endDate} onChange={(v) => update({ educationList: updateListItem(data.educationList, i, { endDate: v }) })} allowPresent />
              </FieldLabel>
            </FieldRow>
          </div>
        )}
      />

      <Separator className="my-4" />

      {/* Skills */}
      <SectionHeader
        title="个人技能"
        onAdd={() => update({ skillList: [...data.skillList, { id: genId("skill"), name: "", description: "", level: 80 }] })}
      />
      <SortableList
        items={data.skillList}
        onReorder={(items) => update({ skillList: items })}
        keyExtractor={(item) => item.id}
        renderItem={(skill, i) => (
          <div className="mb-3 p-3 bg-zinc-50 rounded-lg relative group">
            <DeleteButton onClick={() => update({ skillList: removeListItem(data.skillList, i) })} />
            <FieldRow>
              <FieldLabel label="技能名称">
                <Input value={skill.name} onChange={(e) => update({ skillList: updateListItem(data.skillList, i, { name: e.target.value }) })} />
              </FieldLabel>
              <FieldLabel label="熟练度 (0-100)">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={skill.level}
                  onChange={(e) => update({ skillList: updateListItem(data.skillList, i, { level: Number(e.target.value) }) })}
                />
              </FieldLabel>
            </FieldRow>
            <FieldLabel label="技能描述">
              <Input value={skill.description} onChange={(e) => update({ skillList: updateListItem(data.skillList, i, { description: e.target.value }) })} />
            </FieldLabel>
          </div>
        )}
      />

      <Separator className="my-4" />

      {/* Work Experience */}
      <SectionHeader
        title="工作经历"
        onAdd={() =>
          update({
            workExpList: [...data.workExpList, { id: genId("work"), company: "", department: "", startDate: "", endDate: "", description: "" }],
          })
        }
      />
      <SortableList
        items={data.workExpList}
        onReorder={(items) => update({ workExpList: items })}
        keyExtractor={(item) => item.id}
        renderItem={(work, i) => (
          <div className="mb-3 p-3 bg-zinc-50 rounded-lg relative group">
            <DeleteButton onClick={() => update({ workExpList: removeListItem(data.workExpList, i) })} />
            <div className="mb-2">
              <FieldLabel label="公司">
                <Input value={work.company} onChange={(e) => update({ workExpList: updateListItem(data.workExpList, i, { company: e.target.value }) })} />
              </FieldLabel>
            </div>
            <div className="mb-2">
              <FieldLabel label="部门">
                <Input value={work.department} onChange={(e) => update({ workExpList: updateListItem(data.workExpList, i, { department: e.target.value }) })} />
              </FieldLabel>
            </div>
            <FieldRow>
              <FieldLabel label="开始时间">
                <DatePicker value={work.startDate} onChange={(v) => update({ workExpList: updateListItem(data.workExpList, i, { startDate: v }) })} />
              </FieldLabel>
              <FieldLabel label="结束时间">
                <DatePicker value={work.endDate} onChange={(v) => update({ workExpList: updateListItem(data.workExpList, i, { endDate: v }) })} allowPresent />
              </FieldLabel>
            </FieldRow>
            <FieldLabel label="工作描述（每条换行）">
              <Textarea
                rows={3}
                value={work.description}
                onChange={(e) => update({ workExpList: updateListItem(data.workExpList, i, { description: e.target.value }) })}
              />
            </FieldLabel>
          </div>
        )}
      />

      <Separator className="my-4" />

      {/* Projects */}
      <SectionHeader
        title="项目经验"
        onAdd={() =>
          update({
            projectList: [...data.projectList, { id: genId("proj"), name: "", role: "", startDate: "", endDate: "", description: "", content: "" }],
          })
        }
      />
      <SortableList
        items={data.projectList}
        onReorder={(items) => update({ projectList: items })}
        keyExtractor={(item) => item.id}
        renderItem={(project, i) => (
          <div className="mb-3 p-3 bg-zinc-50 rounded-lg relative group">
            <DeleteButton onClick={() => update({ projectList: removeListItem(data.projectList, i) })} />
            <div className="mb-2">
              <FieldLabel label="项目名称">
                <Input value={project.name} onChange={(e) => update({ projectList: updateListItem(data.projectList, i, { name: e.target.value }) })} />
              </FieldLabel>
            </div>
            <div className="mb-2">
              <FieldLabel label="担任角色">
                <Input value={project.role} onChange={(e) => update({ projectList: updateListItem(data.projectList, i, { role: e.target.value }) })} />
              </FieldLabel>
            </div>
            <FieldRow>
              <FieldLabel label="开始时间">
                <DatePicker value={project.startDate} onChange={(v) => update({ projectList: updateListItem(data.projectList, i, { startDate: v }) })} />
              </FieldLabel>
              <FieldLabel label="结束时间">
                <DatePicker value={project.endDate} onChange={(v) => update({ projectList: updateListItem(data.projectList, i, { endDate: v }) })} allowPresent />
              </FieldLabel>
            </FieldRow>
            <FieldLabel label="项目描述">
              <Textarea
                rows={2}
                value={project.description}
                onChange={(e) => update({ projectList: updateListItem(data.projectList, i, { description: e.target.value }) })}
              />
            </FieldLabel>
            <div className="mt-2">
              <FieldLabel label="主要工作（每条换行）">
                <Textarea
                  rows={4}
                  value={project.content}
                  onChange={(e) => update({ projectList: updateListItem(data.projectList, i, { content: e.target.value }) })}
                />
              </FieldLabel>
            </div>
          </div>
        )}
      />

      <Separator className="my-4" />

      {/* Personal Works */}
      <SectionHeader
        title="个人作品"
        onAdd={() => update({ workList: [...data.workList, { id: genId("pw"), name: "", description: "", link: "" }] })}
      />
      <SortableList
        items={data.workList}
        onReorder={(items) => update({ workList: items })}
        keyExtractor={(item) => item.id}
        renderItem={(work, i) => (
          <div className="mb-3 p-3 bg-zinc-50 rounded-lg relative group">
            <DeleteButton onClick={() => update({ workList: removeListItem(data.workList, i) })} />
            <div className="mb-2">
              <FieldLabel label="作品名称">
                <Input value={work.name} onChange={(e) => update({ workList: updateListItem(data.workList, i, { name: e.target.value }) })} />
              </FieldLabel>
            </div>
            <div className="mb-2">
              <FieldLabel label="链接">
                <Input value={work.link || ""} onChange={(e) => update({ workList: updateListItem(data.workList, i, { link: e.target.value }) })} />
              </FieldLabel>
            </div>
            <FieldLabel label="描述">
              <Input value={work.description} onChange={(e) => update({ workList: updateListItem(data.workList, i, { description: e.target.value }) })} />
            </FieldLabel>
          </div>
        )}
      />

      <Separator className="my-4" />

      {/* About Me */}
      <SectionHeader title="自我介绍" />
      <FieldLabel label="自我介绍">
        <Textarea rows={4} value={data.aboutme} onChange={(e) => update({ aboutme: e.target.value })} />
      </FieldLabel>
    </div>
  );
}
