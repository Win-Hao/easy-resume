import type { ResumeData } from "@/types/resume";
import { Phone, Mail, GitBranch, MapPin, Briefcase, FolderOpen, User, GraduationCap, ExternalLink, Wrench } from "lucide-react";

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { profile, educationList, skillList, workExpList, projectList, workList, aboutme } = data;

  return (
    <div className="w-[794px] min-h-[1122px] bg-white flex font-[system-ui,-apple-system,'PingFang_SC','Noto_Sans_SC',sans-serif] text-[13px] leading-[1.7]">
      {/* Left Sidebar */}
      <div
        className="w-[240px] text-white px-6 py-8 flex-shrink-0"
        style={{ backgroundColor: "color-mix(in srgb, var(--accent, #374151) 80%, black)" }}
      >
        {/* Avatar & Name */}
        <div className="text-center mb-6">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt=""
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-white/30"
            />
          )}
          <h1 className="text-xl font-bold tracking-tight">{profile.name}</h1>
          {profile.positionTitle && (
            <div className="text-[12px] text-white/60 mt-1">{profile.positionTitle}</div>
          )}
        </div>

        {/* Contact */}
        <SidebarSection title="联系方式">
          <div className="space-y-1.5 text-[12px]">
            {profile.mobile && (
              <div className="flex items-center gap-2 text-white/90">
                <Phone size={12} className="text-white/50 flex-shrink-0" />
                {profile.mobile}
              </div>
            )}
            {profile.email && (
              <div className="flex items-center gap-2 text-white/90 break-all">
                <Mail size={12} className="text-white/50 flex-shrink-0" />
                {profile.email}
              </div>
            )}
            {profile.github && (
              <div className="flex items-center gap-2 text-white/90 break-all text-[11px]">
                <GitBranch size={12} className="text-white/50 flex-shrink-0" />
                {profile.github.replace(/^https?:\/\//, "")}
              </div>
            )}
            {profile.workPlace && (
              <div className="flex items-center gap-2 text-white/90">
                <MapPin size={12} className="text-white/50 flex-shrink-0" />
                {profile.workPlace}
              </div>
            )}
            {profile.workExpYear && (
              <div className="flex items-center gap-2 text-white/90">
                <Briefcase size={12} className="text-white/50 flex-shrink-0" />
                {profile.workExpYear}经验
              </div>
            )}
          </div>
        </SidebarSection>

        {/* Skills */}
        {skillList.length > 0 && (
          <SidebarSection title="个人技能">
            <div className="space-y-2.5">
              {skillList.map((skill) => (
                <div key={skill.id}>
                  <div className="text-[12px] font-medium mb-1">{skill.name}</div>
                  <div className="w-full h-[3px] rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-white/90"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  {skill.description && (
                    <div className="text-[11px] text-white/50 mt-0.5">{skill.description}</div>
                  )}
                </div>
              ))}
            </div>
          </SidebarSection>
        )}

        {/* Education */}
        {educationList.length > 0 && (
          <SidebarSection title="教育背景">
            {educationList.map((edu) => (
              <div key={edu.id} className="mb-2.5">
                <div className="font-medium text-[12px]">{edu.school}</div>
                <div className="text-[11px] text-white/60">
                  {edu.major} / {edu.degree}
                </div>
                <div className="text-[11px] text-white/40">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </SidebarSection>
        )}

        {/* Works */}
        {workList.length > 0 && (
          <SidebarSection title="个人作品">
            {workList.map((work) => (
              <div key={work.id} className="mb-2.5">
                <div className="font-medium text-[12px]">{work.name}</div>
                {work.link && (
                  <div className="text-[10px] text-white/40 break-all">
                    {work.link.replace(/^https?:\/\//, "")}
                  </div>
                )}
                <div className="text-[11px] text-white/60">{work.description}</div>
              </div>
            ))}
          </SidebarSection>
        )}
      </div>

      {/* Right Main Content */}
      <div className="flex-1 px-8 py-8">
        {/* About Me */}
        {aboutme && (
          <MainSection title="自我介绍" icon={<User size={15} className="text-zinc-900" />}>
            <p className="text-zinc-600 whitespace-pre-wrap">{aboutme}</p>
          </MainSection>
        )}

        {/* Work Experience */}
        {workExpList.length > 0 && (
          <MainSection title="工作经历" icon={<Briefcase size={15} className="text-zinc-900" />}>
            {workExpList.map((work, i) => (
              <div
                key={work.id}
                className={i > 0 ? "mt-4 pt-4 border-t border-zinc-100" : ""}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-zinc-900">{work.company}</span>
                    {work.department && (
                      <span className="text-zinc-400 text-xs ml-2">{work.department}</span>
                    )}
                  </div>
                  <span className="text-zinc-400 text-xs flex-shrink-0 ml-4">
                    {work.startDate} - {work.endDate}
                  </span>
                </div>
                {work.description && (
                  <div className="whitespace-pre-wrap text-zinc-600">{work.description}</div>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {projectList.length > 0 && (
          <MainSection title="项目经验" icon={<FolderOpen size={15} className="text-zinc-900" />}>
            {projectList.map((project, i) => (
              <div
                key={project.id}
                className={i > 0 ? "mt-4 pt-4 border-t border-zinc-100" : ""}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900">{project.name}</span>
                    {project.role && (
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--accent, #374151) 12%, transparent)",
                          color: "var(--accent, #374151)",
                        }}
                      >
                        {project.role}
                      </span>
                    )}
                  </div>
                  <span className="text-zinc-400 text-xs flex-shrink-0 ml-4">
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
          </MainSection>
        )}
      </div>
    </div>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function MainSection({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="flex items-center gap-1.5 text-[15px] font-bold text-zinc-900 pb-2 mb-3 border-b border-zinc-200">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
}
