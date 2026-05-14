import type { ResumeData } from "@/types/resume";

export function ClassicTemplate({ data }: { data: ResumeData }) {
  const { profile, educationList, skillList, workExpList, projectList, workList, aboutme } = data;

  return (
    <div className="w-[794px] min-h-[1122px] bg-white text-[13px] leading-[1.7] text-zinc-600 font-[system-ui,-apple-system,'PingFang_SC','Noto_Sans_SC',sans-serif]">
      {/* Header */}
      <div className="px-10 pt-8 pb-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-[26px] font-bold text-zinc-900 tracking-tight mb-1.5">
              {profile.name}
            </h1>
            <div className="flex items-center flex-wrap gap-y-1 text-[12px] text-zinc-500">
              {[
                profile.mobile,
                profile.email,
                profile.github,
                profile.positionTitle,
                profile.workExpYear && `${profile.workExpYear}经验`,
                profile.workPlace,
              ]
                .filter(Boolean)
                .map((item, i, arr) => (
                  <span key={i} className="flex items-center">
                    {i > 0 && <span className="mx-1.5 text-zinc-300">&middot;</span>}
                    {item}
                  </span>
                ))}
            </div>
          </div>
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt="avatar"
              className="w-[88px] h-[88px] rounded-full object-cover ml-6 flex-shrink-0"
            />
          )}
        </div>
      </div>

      <div className="px-10 pb-10">
        {/* About Me */}
        {aboutme && (
          <Section title="ABOUT ME">
            <p className="text-zinc-600 whitespace-pre-wrap">{aboutme}</p>
          </Section>
        )}

        {/* Work Experience */}
        {workExpList.length > 0 && (
          <Section title="WORK EXPERIENCE">
            {workExpList.map((work, i) => (
              <div key={work.id} className={i > 0 ? "mt-4 pt-4 border-t border-zinc-100" : ""}>
                <div className="flex justify-between items-baseline">
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
                  <div className="whitespace-pre-wrap text-zinc-600 mt-0.5">{work.description}</div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {projectList.length > 0 && (
          <Section title="PROJECTS">
            {projectList.map((project, i) => (
              <div key={project.id} className={i > 0 ? "mt-4 pt-4 border-t border-zinc-100" : ""}>
                <div className="flex justify-between items-baseline">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-zinc-900">{project.name}</span>
                    {project.role && (
                      <span className="text-xs text-zinc-500">{project.role}</span>
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
          <Section title="SKILLS">
            <div className="flex flex-wrap gap-1.5">
              {skillList.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full px-2.5 py-0.5 text-xs bg-zinc-100 text-zinc-700"
                >
                  {skill.name}
                  {skill.description && `: ${skill.description}`}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {educationList.length > 0 && (
          <Section title="EDUCATION">
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
          <Section title="WORKS">
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
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}
