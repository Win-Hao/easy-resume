import type { ResumeData } from "@/types/resume";

export function AppleTemplate({ data }: { data: ResumeData }) {
  const { profile, educationList, skillList, workExpList, projectList, workList, aboutme } = data;

  return (
    <div className="w-[794px] min-h-[1122px] bg-white font-[-apple-system,BlinkMacSystemFont,'Helvetica_Neue','PingFang_SC',sans-serif]"
      style={{ color: "#1D1D1F" }}>

      {/* Header */}
      <div className="px-12 pt-12 pb-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-[32px] font-bold tracking-tight leading-none mb-2"
              style={{ color: "#1D1D1F" }}>
              {profile.name}
            </h1>
            {profile.positionTitle && (
              <div className="text-[15px] font-medium mb-4"
                style={{ color: "#6E6E73" }}>
                {profile.positionTitle}
                {profile.workExpYear && (
                  <span className="ml-2 font-normal">/ {profile.workExpYear}经验</span>
                )}
              </div>
            )}
            <div className="flex items-center flex-wrap gap-y-1 text-[13px]"
              style={{ color: "#6E6E73" }}>
              {[
                profile.mobile,
                profile.email,
                profile.github?.replace(/^https?:\/\//, ""),
                profile.workPlace,
              ]
                .filter(Boolean)
                .map((item, i) => (
                  <span key={i} className="flex items-center">
                    {i > 0 && <span className="mx-2" style={{ color: "#D2D2D7" }}>|</span>}
                    {item}
                  </span>
                ))}
            </div>
          </div>
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt=""
              className="w-[96px] h-[96px] rounded-[20px] object-cover ml-8 flex-shrink-0"
            />
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-12 h-px" style={{ backgroundColor: "#D2D2D7" }} />

      {/* Body */}
      <div className="px-12 pt-8 pb-12">

        {/* About Me */}
        {aboutme && (
          <Section title="自我介绍">
            <p className="text-[14px] leading-[1.6] whitespace-pre-wrap"
              style={{ color: "#1D1D1F" }}>
              {aboutme}
            </p>
          </Section>
        )}

        {/* Work Experience */}
        {workExpList.length > 0 && (
          <Section title="工作经历">
            {workExpList.map((work, i) => (
              <div key={work.id}
                className={i > 0 ? "mt-5 pt-5" : ""}
                style={i > 0 ? { borderTop: "1px solid #F5F5F7" } : {}}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="text-[15px] font-semibold" style={{ color: "#1D1D1F" }}>
                      {work.company}
                    </span>
                    {work.department && (
                      <span className="text-[13px] ml-2" style={{ color: "#6E6E73" }}>
                        {work.department}
                      </span>
                    )}
                  </div>
                  <span className="text-[13px] flex-shrink-0 ml-4" style={{ color: "#6E6E73" }}>
                    {work.startDate} - {work.endDate}
                  </span>
                </div>
                {work.description && (
                  <div className="text-[14px] leading-[1.65] whitespace-pre-wrap mt-1"
                    style={{ color: "#1D1D1F" }}>
                    {work.description}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {projectList.length > 0 && (
          <Section title="项目经验">
            {projectList.map((project, i) => (
              <div key={project.id}
                className={i > 0 ? "mt-5 pt-5" : ""}
                style={i > 0 ? { borderTop: "1px solid #F5F5F7" } : {}}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[15px] font-semibold" style={{ color: "#1D1D1F" }}>
                      {project.name}
                    </span>
                    {project.role && (
                      <span className="text-[12px] px-2 py-0.5 rounded-md"
                        style={{ backgroundColor: "#F5F5F7", color: "#6E6E73" }}>
                        {project.role}
                      </span>
                    )}
                  </div>
                  <span className="text-[13px] flex-shrink-0 ml-4" style={{ color: "#6E6E73" }}>
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                {project.description && (
                  <div className="text-[14px] leading-[1.65] whitespace-pre-wrap mt-1"
                    style={{ color: "#1D1D1F" }}>
                    <span className="text-[12px]" style={{ color: "#6E6E73" }}>项目描述：</span>{project.description}
                  </div>
                )}
                {project.content && (
                  <div className="text-[14px] leading-[1.65] whitespace-pre-wrap mt-1"
                    style={{ color: "#1D1D1F" }}>
                    <span className="text-[12px]" style={{ color: "#6E6E73" }}>主要工作：</span>{project.content}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <Section title="个人技能">
            <div className="flex flex-wrap gap-2">
              {skillList.map((skill, i) => (
                <span
                  key={skill.id}
                  className="text-[13px] px-3 py-1 rounded-lg"
                  style={{
                    backgroundColor: i < 3 ? "#1D1D1F" : "#F5F5F7",
                    color: i < 3 ? "#FFFFFF" : "#1D1D1F",
                  }}
                >
                  {skill.name}{skill.description ? `: ${skill.description}` : ""}
                </span>
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
                  <span className="text-[15px] font-semibold" style={{ color: "#1D1D1F" }}>
                    {edu.school}
                  </span>
                  <span className="text-[14px] ml-3" style={{ color: "#1D1D1F" }}>
                    {edu.major}
                  </span>
                  <span className="text-[13px] ml-1" style={{ color: "#6E6E73" }}>
                    ({edu.degree})
                  </span>
                </div>
                <span className="text-[13px] flex-shrink-0 ml-4" style={{ color: "#6E6E73" }}>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </Section>
        )}

        {/* Personal Works */}
        {workList.length > 0 && (
          <Section title="个人作品">
            <div className="grid grid-cols-2 gap-3">
              {workList.map((work) => (
                <div key={work.id} className="p-4 rounded-xl" style={{ backgroundColor: "#F5F5F7" }}>
                  <div className="text-[14px] font-semibold mb-0.5" style={{ color: "#1D1D1F" }}>
                    {work.name}
                  </div>
                  {work.description && (
                    <div className="text-[12px] mb-1" style={{ color: "#6E6E73" }}>
                      {work.description}
                    </div>
                  )}
                  {work.link && (
                    <div className="text-[11px]" style={{ color: "#0066CC" }}>
                      {work.link.replace(/^https?:\/\//, "")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
        style={{ color: "#6E6E73" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
