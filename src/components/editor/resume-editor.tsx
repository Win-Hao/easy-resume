"use client";

import type { ResumeData } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { SortableList } from "./sortable-list";
import { DatePicker, DateFormatContext, type DateFormat } from "./date-picker";
import { genId } from "@/lib/id";

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

function SectionHeader({ title, onAdd }: { title: string; onAdd?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3 mt-6">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
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
      <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 block">{label}</label>
      {children}
    </div>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition"
    >
      <Trash2 size={14} />
    </button>
  );
}

/** 从已有日期推断整份简历的日期写法，新选的日期跟随它 */
function detectDateFormat(data: ResumeData): DateFormat {
  const items = [
    ...data.educationList,
    ...data.workExpList,
    ...data.projectList,
    ...(data.clubList ?? []),
  ];
  const hasChineseDate = items.some(
    (item) => item.startDate?.includes("年") || item.endDate?.includes("年"),
  );
  return hasChineseDate ? "cn" : "dot";
}

export function ResumeEditor({ data, onChange }: Props) {
  const update = (patch: Partial<ResumeData>) => onChange({ ...data, ...patch });
  const updateProfile = (patch: Partial<ResumeData["profile"]>) =>
    update({ profile: { ...data.profile, ...patch } });

  const updateListItem = <T,>(list: T[], index: number, patch: Partial<T>): T[] =>
    list.map((item, i) => (i === index ? { ...item, ...patch } : item));

  const removeListItem = <T,>(list: T[], index: number): T[] =>
    list.filter((_, i) => i !== index);

  // 读取本地图片并转为 data URL，避免依赖外部图床
  const pickAvatar = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => updateProfile({ avatarUrl: reader.result as string });
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const dateFormat = detectDateFormat(data);

  return (
    <DateFormatContext.Provider value={dateFormat}>
      <div className="p-5 space-y-1 text-sm">
        {/* Profile */}
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">基本信息</h3>
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
          <FieldLabel label="期望工作地 / 意向城市">
            <Input value={data.profile.workPlace || ""} onChange={(e) => updateProfile({ workPlace: e.target.value })} />
          </FieldLabel>
        </div>
        <FieldRow>
          <FieldLabel label="年龄">
            <Input value={data.profile.age || ""} placeholder="27岁" onChange={(e) => updateProfile({ age: e.target.value })} />
          </FieldLabel>
          <FieldLabel label="性别">
            <Input value={data.profile.gender || ""} onChange={(e) => updateProfile({ gender: e.target.value })} />
          </FieldLabel>
        </FieldRow>
        <FieldRow>
          <FieldLabel label="民族">
            <Input value={data.profile.ethnicity || ""} onChange={(e) => updateProfile({ ethnicity: e.target.value })} />
          </FieldLabel>
          <FieldLabel label="政治面貌">
            <Input value={data.profile.politicalStatus || ""} onChange={(e) => updateProfile({ politicalStatus: e.target.value })} />
          </FieldLabel>
        </FieldRow>
        <FieldRow>
          <FieldLabel label="现居城市">
            <Input value={data.profile.currentCity || ""} onChange={(e) => updateProfile({ currentCity: e.target.value })} />
          </FieldLabel>
          <FieldLabel label="期望薪资">
            <Input value={data.profile.expectedSalary || ""} placeholder="4k-6k" onChange={(e) => updateProfile({ expectedSalary: e.target.value })} />
          </FieldLabel>
        </FieldRow>
        <div className="mb-2">
          <FieldLabel label="照片（部分模板显示）">
            <div className="flex items-center gap-2">
              <Input
                value={data.profile.avatarUrl || ""}
                placeholder="图片链接，或点击右侧上传"
                onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
              />
              <Button variant="outline" size="sm" className="flex-shrink-0" onClick={pickAvatar}>
                上传
              </Button>
              {data.profile.avatarUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => updateProfile({ avatarUrl: "" })}
                >
                  清除
                </Button>
              )}
            </div>
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
            <div className="mb-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg relative group">
              <DeleteButton onClick={() => update({ educationList: removeListItem(data.educationList, i) })} />
              <FieldRow>
                <FieldLabel label="学校">
                  <Input value={edu.school} onChange={(e) => update({ educationList: updateListItem(data.educationList, i, { school: e.target.value }) })} />
                </FieldLabel>
                <FieldLabel label="专业">
                  <Input value={edu.major} onChange={(e) => update({ educationList: updateListItem(data.educationList, i, { major: e.target.value }) })} />
                </FieldLabel>
              </FieldRow>
              <FieldRow>
                <FieldLabel label="学历">
                  <Input value={edu.degree} onChange={(e) => update({ educationList: updateListItem(data.educationList, i, { degree: e.target.value }) })} />
                </FieldLabel>
                <FieldLabel label="学院">
                  <Input value={edu.college || ""} onChange={(e) => update({ educationList: updateListItem(data.educationList, i, { college: e.target.value }) })} />
                </FieldLabel>
              </FieldRow>
              <FieldRow>
                <FieldLabel label="学习形式">
                  <Input value={edu.studyMode || ""} placeholder="全日制" onChange={(e) => update({ educationList: updateListItem(data.educationList, i, { studyMode: e.target.value }) })} />
                </FieldLabel>
                <FieldLabel label="城市">
                  <Input value={edu.city || ""} onChange={(e) => update({ educationList: updateListItem(data.educationList, i, { city: e.target.value }) })} />
                </FieldLabel>
              </FieldRow>
              <FieldRow>
                <FieldLabel label="开始时间">
                  <DatePicker value={edu.startDate} onChange={(v) => update({ educationList: updateListItem(data.educationList, i, { startDate: v }) })} />
                </FieldLabel>
                <FieldLabel label="结束时间">
                  <DatePicker value={edu.endDate} onChange={(v) => update({ educationList: updateListItem(data.educationList, i, { endDate: v }) })} allowPresent />
                </FieldLabel>
              </FieldRow>
              <FieldLabel label="在校经历（部分模板显示）">
                <Textarea
                  rows={3}
                  value={edu.description || ""}
                  onChange={(e) => update({ educationList: updateListItem(data.educationList, i, { description: e.target.value }) })}
                />
              </FieldLabel>
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
            <div className="mb-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg relative group">
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
            <div className="mb-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg relative group">
              <DeleteButton onClick={() => update({ workExpList: removeListItem(data.workExpList, i) })} />
              <div className="mb-2">
                <FieldLabel label="公司">
                  <Input value={work.company} onChange={(e) => update({ workExpList: updateListItem(data.workExpList, i, { company: e.target.value }) })} />
                </FieldLabel>
              </div>
              <FieldRow>
                <FieldLabel label="职位">
                  <Input value={work.position || ""} onChange={(e) => update({ workExpList: updateListItem(data.workExpList, i, { position: e.target.value }) })} />
                </FieldLabel>
                <FieldLabel label="部门">
                  <Input value={work.department} onChange={(e) => update({ workExpList: updateListItem(data.workExpList, i, { department: e.target.value }) })} />
                </FieldLabel>
              </FieldRow>
              <div className="mb-2">
                <FieldLabel label="城市">
                  <Input value={work.city || ""} onChange={(e) => update({ workExpList: updateListItem(data.workExpList, i, { city: e.target.value }) })} />
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
            <div className="mb-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg relative group">
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

        {/* Club Experience */}
        <SectionHeader
          title="社团经历"
          onAdd={() =>
            update({
              clubList: [
                ...(data.clubList ?? []),
                { id: genId("club"), name: "", role: "", department: "", startDate: "", endDate: "", city: "", description: "" },
              ],
            })
          }
        />
        <SortableList
          items={data.clubList ?? []}
          onReorder={(items) => update({ clubList: items })}
          keyExtractor={(item) => item.id}
          renderItem={(club, i) => (
            <div className="mb-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg relative group">
              <DeleteButton onClick={() => update({ clubList: removeListItem(data.clubList ?? [], i) })} />
              <div className="mb-2">
                <FieldLabel label="社团 / 组织名称">
                  <Input value={club.name} onChange={(e) => update({ clubList: updateListItem(data.clubList ?? [], i, { name: e.target.value }) })} />
                </FieldLabel>
              </div>
              <FieldRow>
                <FieldLabel label="职务">
                  <Input value={club.role} onChange={(e) => update({ clubList: updateListItem(data.clubList ?? [], i, { role: e.target.value }) })} />
                </FieldLabel>
                <FieldLabel label="部门">
                  <Input value={club.department} onChange={(e) => update({ clubList: updateListItem(data.clubList ?? [], i, { department: e.target.value }) })} />
                </FieldLabel>
              </FieldRow>
              <div className="mb-2">
                <FieldLabel label="城市">
                  <Input value={club.city || ""} onChange={(e) => update({ clubList: updateListItem(data.clubList ?? [], i, { city: e.target.value }) })} />
                </FieldLabel>
              </div>
              <FieldRow>
                <FieldLabel label="开始时间">
                  <DatePicker value={club.startDate} onChange={(v) => update({ clubList: updateListItem(data.clubList ?? [], i, { startDate: v }) })} />
                </FieldLabel>
                <FieldLabel label="结束时间">
                  <DatePicker value={club.endDate} onChange={(v) => update({ clubList: updateListItem(data.clubList ?? [], i, { endDate: v }) })} allowPresent />
                </FieldLabel>
              </FieldRow>
              <FieldLabel label="经历描述（每条换行）">
                <Textarea
                  rows={3}
                  value={club.description}
                  onChange={(e) => update({ clubList: updateListItem(data.clubList ?? [], i, { description: e.target.value }) })}
                />
              </FieldLabel>
            </div>
          )}
        />

        <Separator className="my-4" />

        {/* Honors */}
        <SectionHeader
          title="荣誉奖项"
          onAdd={() =>
            update({ honorList: [...(data.honorList ?? []), { id: genId("honor"), title: "", date: "" }] })
          }
        />
        <SortableList
          items={data.honorList ?? []}
          onReorder={(items) => update({ honorList: items })}
          keyExtractor={(item) => item.id}
          renderItem={(honor, i) => (
            <div className="mb-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg relative group">
              <DeleteButton onClick={() => update({ honorList: removeListItem(data.honorList ?? [], i) })} />
              <div className="mb-2">
                <FieldLabel label="荣誉 / 奖项">
                  <Input value={honor.title} onChange={(e) => update({ honorList: updateListItem(data.honorList ?? [], i, { title: e.target.value }) })} />
                </FieldLabel>
              </div>
              <FieldLabel label="获得时间">
                <Input value={honor.date} placeholder="2022-2023" onChange={(e) => update({ honorList: updateListItem(data.honorList ?? [], i, { date: e.target.value }) })} />
              </FieldLabel>
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
            <div className="mb-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg relative group">
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
    </DateFormatContext.Provider>
  );
}
