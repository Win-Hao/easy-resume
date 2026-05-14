import type { ResumeData } from "@/types/resume";
import { Phone, Mail, GitBranch, MapPin, Briefcase, FolderOpen, User, GraduationCap, ExternalLink, Wrench } from "lucide-react";

export function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { profile, educationList, skillList, workExpList, projectList, workList, aboutme } = data;

  const sortedSkills = [...skillList].sort((a, b) => b.level - a.level);

  return (
    <div className="w-[794px] min-h-[1122px] bg-white font-[system-ui,-apple-system,'PingFang_SC','Noto_Sans_SC',sans-serif] text-[13px] leading-[1.7]">
      {/* Top accent bar */}
      <div className="h-2" style={{ backgroundColor: "var(--accent, #374151)" }} />

      {/* Header */}
      <div className="px-10 pt-7 pb-5 border-b border-zinc-200">
        <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight leading-tight">
          {profile.name}
        </h1>
        {profile.positionTitle && (
          <div
            className="text-sm mt-1 font-medium"
            style={{ color: "var(--accent, #374151)" }}
          >
            {profile.positionTitle}
          </div>
        )}
        <div className="flex items-center flex-wrap gap-y-1 text-xs text-zinc-500 mt-2.5">
          {([
            profile.mobile && { icon: <Phone size={11} className="text-zinc-400" />, text: profile.mobile },
            profile.email && { icon: <Mail size={11} className="text-zinc-400" />, text: profile.email },
            profile.github && { icon: <GitBranch size={11} className="text-zinc-400" />, text: profile.github },
            profile.workPlace && { icon: <MapPin size={11} className="text-zinc-400" />, text: profile.workPlace },
            profile.workExpYear && { icon: <Briefcase size={11} className="text-zinc-400" />, text: `${profile.workExpYear}经验` },
          ] as Array<{ icon: React.ReactNode; text: string } | false | undefined | null | "">)
            .filter(Boolean)
            .map((item, i) => {
              const { icon, text } = item as { icon: React.ReactNode; text: string };
              return (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="mx-1.5 text-zinc-300">&middot;</span>}
                  {icon}
                  {text}
                </span>
              );
            })}
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex px-10 py-6 gap-8">
        {/* Left column - 55% */}
        <div className="w-[55%] flex-shrink-0">
          {/* About Me */}
          {aboutme && (
            <Section title="自我介绍" icon={<User size={12} className="text-zinc-900" />}>
              <p className="text-zinc-600 whitespace-pre-wrap">{aboutme}</p>
            </Section>
          )}

          {/* Work Experience */}
          {workExpList.length > 0 && (
            <Section title="工作经历" icon={<Briefcase size={12} className="text-zinc-900" />}>
              {workExpList.map((work, i) => (
                <div
                  key={work.id}
                  className={i > 0 ? "mt-4 pt-4 border-t border-zinc-100" : ""}
                >
                  <div className="flex justify-between items-baseline mb-0.5">
                    <div>
                      <span className="font-bold text-zinc-900">{work.company}</span>
                      {work.department && (
                        <span className="text-zinc-400 text-xs ml-1.5">
                          ({work.department})
                        </span>
                      )}
                    </div>
                    <span className="text-zinc-400 text-xs flex-shrink-0 ml-3">
                      {work.startDate} - {work.endDate}
                    </span>
                  </div>
                  {work.description && (
                    <div className="whitespace-pre-wrap text-zinc-600 mt-1">
                      {work.description}
                    </div>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projectList.length > 0 && (
            <Section title="项目经验" icon={<FolderOpen size={12} className="text-zinc-900" />}>
              {projectList.map((project, i) => (
                <div
                  key={project.id}
                  className={i > 0 ? "mt-4 pt-4 border-t border-zinc-100" : ""}
                >
                  <div className="flex justify-between items-baseline mb-0.5">
                    <div>
                      <span className="font-bold text-zinc-900">{project.name}</span>
                      {project.role && (
                        <span className="text-zinc-500 text-xs ml-1.5">
                          {project.role}
                        </span>
                      )}
                    </div>
                    <span className="text-zinc-400 text-xs flex-shrink-0 ml-3">
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                  {project.description && (
                    <div className="whitespace-pre-wrap text-zinc-600 mt-1">
                      <span className="text-zinc-400 text-xs">项目描述：</span>{project.description}
                    </div>
                  )}
                  {project.content && (
                    <div className="whitespace-pre-wrap text-zinc-600 mt-1">
                      <span className="text-zinc-400 text-xs">主要工作：</span>{project.content}
                    </div>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right column - 45% */}
        <div className="flex-1 min-w-0">
          {/* Education */}
          {educationList.length > 0 && (
            <Section title="教育背景" icon={<GraduationCap size={12} className="text-zinc-900" />}>
              {educationList.map((edu) => (
                <div key={edu.id} className="mb-2.5">
                  <div className="font-bold text-zinc-900 text-[13px]">{edu.school}</div>
                  <div className="text-zinc-600 text-[12px]">
                    {edu.major} / {edu.degree}
                  </div>
                  <div className="text-zinc-400 text-[11px]">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <Section title="个人技能" icon={<Wrench size={12} className="text-zinc-900" />}>
              <div className="flex flex-wrap gap-1.5">
                {sortedSkills.map((skill, i) => (
                  <span
                    key={skill.id}
                    className={
                      i < 3
                        ? "text-xs px-2.5 py-1 rounded-md text-white font-medium"
                        : "text-xs px-2.5 py-1 rounded-md border border-zinc-200 text-zinc-700"
                    }
                    style={i < 3 ? { backgroundColor: "var(--accent, #374151)" } : undefined}
                    title={skill.description || undefined}
                  >
                    {skill.name}{skill.description ? `: ${skill.description}` : ""}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Personal Works */}
          {workList.length > 0 && (
            <Section title="个人作品" icon={<ExternalLink size={12} className="text-zinc-900" />}>
              {workList.map((work) => (
                <div key={work.id} className="mb-2.5">
                  <div className="font-bold text-zinc-900 text-[13px]">{work.name}</div>
                  {work.link && (
                    <div className="text-[11px] text-zinc-400 break-all">
                      {work.link.replace(/^https?:\/\//, "")}
                    </div>
                  )}
                  {work.description && (
                    <div className="text-zinc-600 text-[12px]">{work.description}</div>
                  )}
                </div>
              ))}
            </Section>
          )}

        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="mb-3">
        <h2 className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-zinc-900 mb-1.5">
          {icon}
          {title}
        </h2>
        <div
          className="w-8 h-0.5 rounded"
          style={{ backgroundColor: "var(--accent, #374151)" }}
        />
      </div>
      {children}
    </div>
  );
}
