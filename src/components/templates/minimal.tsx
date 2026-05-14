import type { ResumeData } from "@/types/resume";

export function MinimalTemplate({ data }: { data: ResumeData }) {
  const { profile, educationList, skillList, workExpList, projectList, workList, aboutme } = data;

  return (
    <div className="w-[794px] min-h-[1122px] bg-white px-14 py-12 font-[system-ui,-apple-system,'PingFang_SC','Noto_Sans_SC',sans-serif] text-[13px] leading-[1.7] text-zinc-600">
      {/* Header - centered */}
      <div className="text-center mb-6">
        <h1 className="text-[30px] font-light text-zinc-900 tracking-wide mb-2">
          {profile.name}
        </h1>
        <div className="flex items-center justify-center flex-wrap gap-y-1 text-xs text-zinc-500">
          {[
            profile.mobile,
            profile.email,
            profile.github,
            profile.positionTitle,
            profile.workExpYear && `${profile.workExpYear}经验`,
            profile.workPlace,
          ]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <span className="mx-2 text-zinc-300">|</span>}
                {item}
              </span>
            ))}
        </div>
      </div>

      <div className="h-px bg-zinc-300 mb-6" />

      {/* About Me */}
      {aboutme && (
        <Section title="自我介绍">
          <p className="text-zinc-500 italic whitespace-pre-wrap">{aboutme}</p>
        </Section>
      )}

      {/* Work Experience */}
      {workExpList.length > 0 && (
        <Section title="工作经历">
          {workExpList.map((work, i) => (
            <div key={work.id} className={i > 0 ? "mt-4 pt-4 border-t border-zinc-100" : ""}>
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-zinc-900">{work.company}</span>
                  {work.department && (
                    <span className="text-zinc-400 text-xs ml-1.5">({work.department})</span>
                  )}
                </div>
                <span className="text-zinc-400 text-xs flex-shrink-0 ml-4">
                  {work.startDate} - {work.endDate}
                </span>
              </div>
              {work.description && (
                <div className="whitespace-pre-wrap text-zinc-600 mt-0.5">{work.description}</div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {projectList.length > 0 && (
        <Section title="项目经验">
          {projectList.map((project, i) => (
            <div
              key={project.id}
              className={`pl-3 border-l-2 ${i > 0 ? "mt-4" : ""}`}
              style={{ borderColor: "var(--accent)" }}
            >
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-zinc-900">{project.name}</span>
                  {project.role && (
                    <span className="text-zinc-500 text-xs ml-2">{project.role}</span>
                  )}
                </div>
                <span className="text-zinc-400 text-xs flex-shrink-0 ml-4">
                  {project.startDate} - {project.endDate}
                </span>
              </div>
              {project.description && (
                <div className="whitespace-pre-wrap text-zinc-600 mt-0.5">
                  <span className="text-zinc-400 text-xs">项目描述：</span>{project.description}
                </div>
              )}
              {project.content && (
                <div className="whitespace-pre-wrap text-zinc-600 mt-0.5">
                  <span className="text-zinc-400 text-xs">主要工作：</span>{project.content}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <Section title="个人技能">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
            {skillList.map((skill) => (
              <div key={skill.id} className="flex items-baseline gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <span>
                  {skill.name && <b className="text-zinc-800">{skill.name}</b>}
                  {skill.name && skill.description && <span className="text-zinc-400 mx-1">-</span>}
                  {skill.description && <span className="text-zinc-600">{skill.description}</span>}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {educationList.length > 0 && (
        <Section title="教育背景">
          {educationList.map((edu) => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <span className="font-bold text-zinc-900">{edu.school}</span>
                <span className="text-zinc-600 ml-2">{edu.major}</span>
                <span className="text-zinc-400 text-xs ml-1">({edu.degree})</span>
              </div>
              <span className="text-zinc-400 text-xs flex-shrink-0 ml-4">
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
          ))}
        </Section>
      )}

      {/* Personal Works */}
      {workList.length > 0 && (
        <Section title="个人作品">
          {workList.map((work) => (
            <div key={work.id} className="mb-1.5">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-zinc-900">{work.name}</span>
                {work.link && (
                  <span className="text-zinc-400 text-[11px]">
                    {work.link.replace(/^https?:\/\//, "")}
                  </span>
                )}
              </div>
              {work.description && (
                <div className="text-zinc-500 whitespace-pre-wrap">{work.description}</div>
              )}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2
        className="text-sm font-semibold mb-3 pb-1.5 border-b"
        style={{
          color: "var(--accent)",
          borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
