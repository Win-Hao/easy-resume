import type { ResumeData } from "@/types/resume";
import { Phone, Mail, GitBranch, MapPin, Briefcase, FolderOpen, User, GraduationCap, ExternalLink, Wrench } from "lucide-react";

function SectionTitle({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div
        className="w-1 h-4 rounded-full flex-shrink-0"
        style={{ backgroundColor: "var(--accent, #6366f1)" }}
      />
      {icon}
      <h2 className="text-sm font-semibold text-zinc-800">{children}</h2>
    </div>
  );
}

export function FreshTemplate({ data }: { data: ResumeData }) {
  const {
    profile,
    educationList,
    skillList,
    workExpList,
    projectList,
    workList,
    aboutme,
  } = data;

  return (
    <div className="w-[794px] min-h-[1122px] bg-white relative font-[system-ui,-apple-system,'PingFang_SC','Noto_Sans_SC',sans-serif] text-[13px] leading-[1.7] text-zinc-700">
      {/* Left accent strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: "var(--accent, #6366f1)" }}
      />

      <div className="pl-10 pr-10 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-7">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-[26px] font-bold text-zinc-900 leading-tight">
                {profile.name}
              </h1>
              {profile.positionTitle && (
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full text-white flex-shrink-0"
                  style={{ backgroundColor: "var(--accent, #6366f1)" }}
                >
                  {profile.positionTitle}
                </span>
              )}
              {profile.workExpYear && (
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full text-white flex-shrink-0"
                  style={{ backgroundColor: "var(--accent, #6366f1)" }}
                >
                  {profile.workExpYear}
                </span>
              )}
            </div>
            {/* Accent underline */}
            <div
              className="w-12 h-1 rounded mb-3"
              style={{ backgroundColor: "var(--accent, #6366f1)" }}
            />
            {/* Contact info - each on its own line */}
            <div className="flex flex-col gap-1">
              {profile.mobile && (
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Phone size={12} className="flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <span>{profile.mobile}</span>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Mail size={12} className="flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <span className="break-all">{profile.email}</span>
                </div>
              )}
              {profile.github && (
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <GitBranch size={12} className="flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <span className="break-all">
                    {profile.github.replace("https://", "")}
                  </span>
                </div>
              )}
              {profile.workPlace && (
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <MapPin size={12} className="flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <span>{profile.workPlace}</span>
                </div>
              )}
            </div>
          </div>
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt=""
              className="w-[80px] h-[100px] rounded-xl object-cover flex-shrink-0 ml-6"
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
          )}
        </div>

        {/* About Me */}
        {aboutme && (
          <div className="mb-6">
            <SectionTitle icon={<User size={14} className="text-zinc-800" />}>自我介绍</SectionTitle>
            <div
              className="rounded-lg p-4 whitespace-pre-wrap text-zinc-600"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--accent, #6366f1) 5%, transparent)",
              }}
            >
              {aboutme}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {workExpList.length > 0 && (
          <div className="mb-6">
            <SectionTitle icon={<Briefcase size={14} className="text-zinc-800" />}>工作经历</SectionTitle>
            <div className="relative pl-5">
              {/* Timeline line */}
              <div
                className="absolute left-[3px] top-1 bottom-1 w-px"
                style={{
                  backgroundColor: "var(--accent, #6366f1)",
                  opacity: 0.3,
                }}
              />
              {workExpList.map((work, i) => (
                <div
                  key={work.id}
                  className={`relative ${i > 0 ? "mt-4" : ""}`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-5 top-[7px] w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: "var(--accent, #6366f1)",
                    }}
                  />
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-semibold text-zinc-900">
                        {work.company}
                      </span>
                      <span className="text-zinc-500 ml-2 text-xs">
                        {work.department}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400 flex-shrink-0 ml-4">
                      {work.startDate} - {work.endDate}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap text-zinc-600">
                    {work.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projectList.length > 0 && (
          <div className="mb-6">
            <SectionTitle icon={<FolderOpen size={14} className="text-zinc-800" />}>项目经验</SectionTitle>
            <div className="space-y-4">
              {projectList.map((project) => (
                <div
                  key={project.id}
                  className="border-l-2 pl-4"
                  style={{ borderColor: "var(--accent, #6366f1)" }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900">
                        {project.name}
                      </span>
                      {project.role && (
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor:
                              "color-mix(in srgb, var(--accent, #6366f1) 10%, transparent)",
                            color: "var(--accent, #6366f1)",
                          }}
                        >
                          {project.role}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 flex-shrink-0 ml-4">
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                  {project.description && (
                    <div className="whitespace-pre-wrap text-zinc-600 mb-1">
                      <span className="text-zinc-400 text-xs">项目描述：</span>{project.description}
                    </div>
                  )}
                  {project.content && (
                    <div className="whitespace-pre-wrap text-zinc-600">
                      <span className="text-zinc-400 text-xs">主要工作：</span>{project.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <div className="mb-6">
            <SectionTitle icon={<Wrench size={14} className="text-zinc-800" />}>个人技能</SectionTitle>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {skillList.map((skill) => (
                <div key={skill.id}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-700 w-20 flex-shrink-0 truncate">
                      {skill.name}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: "var(--accent, #6366f1)",
                        }}
                      />
                    </div>
                  </div>
                  {skill.description && (
                    <div className="text-[11px] text-zinc-400 mt-0.5 pl-[92px]">
                      {skill.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educationList.length > 0 && (
          <div className="mb-6">
            <SectionTitle icon={<GraduationCap size={14} className="text-zinc-800" />}>教育背景</SectionTitle>
            <div className="space-y-2">
              {educationList.map((edu) => (
                <div
                  key={edu.id}
                  className="flex justify-between items-baseline"
                >
                  <div>
                    <span className="font-semibold text-zinc-900">
                      {edu.school}
                    </span>
                    <span className="text-zinc-500 ml-2">{edu.major}</span>
                    <span className="text-zinc-400 ml-1.5 text-xs">
                      ({edu.degree})
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 flex-shrink-0 ml-4">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Works */}
        {workList.length > 0 && (
          <div className="mb-6">
            <SectionTitle icon={<ExternalLink size={14} className="text-zinc-800" />}>个人作品</SectionTitle>
            <div className="flex flex-wrap gap-3">
              {workList.map((work) => (
                <div
                  key={work.id}
                  className="border border-zinc-200 rounded-lg px-4 py-3 flex-1 min-w-[200px] max-w-[calc(50%-6px)]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-zinc-900 text-xs">
                      {work.name}
                    </span>
                  </div>
                  {work.link && (
                    <div className="text-[11px] text-zinc-400 break-all mb-1">
                      {work.link}
                    </div>
                  )}
                  {work.description && (
                    <div className="text-xs text-zinc-600">
                      {work.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
