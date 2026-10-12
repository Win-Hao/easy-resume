import type { ResumeData } from "@/types/resume";

/**
 * 标准中文简历模板：居中页头 + 一寸照，各板块标题下带通栏细线。
 * 版式尺寸按 A4（794 × 1123 CSS px）等比复刻，正文 12px / 行高 15px。
 */
export function StandardTemplate({ data }: { data: ResumeData }) {
  const {
    profile,
    educationList,
    skillList,
    workExpList,
    projectList,
    workList,
    clubList = [],
    honorList = [],
    aboutme,
  } = data;

  // 页头三行信息，逐行拼接（空字段自动跳过）
  const line1 = [
    profile.mobile && { label: "电话", value: profile.mobile },
    profile.email && { label: "邮箱", value: profile.email },
    profile.github && { label: "GitHub", value: profile.github },
    profile.currentCity && { label: "现居城市", value: profile.currentCity },
  ].filter(Boolean) as Field[];

  const line2 = [
    profile.age && { label: "年龄", value: profile.age },
    profile.gender && { label: "性别", value: profile.gender },
    profile.ethnicity && { label: "民族", value: profile.ethnicity },
    profile.politicalStatus && { label: "政治面貌", value: profile.politicalStatus },
  ].filter(Boolean) as Field[];

  const line3 = [
    profile.workPlace && { label: "意向城市", value: profile.workPlace },
    profile.positionTitle && { label: "求职意向", value: profile.positionTitle },
    profile.expectedSalary && { label: "期望薪资", value: profile.expectedSalary },
    profile.workExpYear && { label: "工作年限", value: profile.workExpYear },
  ].filter(Boolean) as Field[];

  return (
    <div className="w-[794px] min-h-[1122px] bg-white text-black text-[12px] leading-[15px] font-[system-ui,-apple-system,'PingFang_SC','Noto_Sans_SC',sans-serif]">
      {/* 页头：文字整体居中，照片绝对定位在右侧 */}
      <div className="relative pl-[53px] pr-[48px] pt-[47px]">
        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt=""
            className="absolute right-[48px] top-[47px] w-[80px] h-[96px] object-cover"
          />
        )}
        <div className="text-center">
          <h1 className="mt-[8px] text-[20px] leading-[27px] font-bold">{profile.name}</h1>
          <div className="mt-[7px]">
            <InfoLine fields={line1} spaced />
            <InfoLine fields={line2} spaced />
            <InfoLine fields={line3} />
          </div>
        </div>
      </div>

      {/* 正文 */}
      <div className="pl-[53px] pr-[48px] pt-[32px] pb-[42px]">
        {educationList.length > 0 && (
          <Section title="教育背景">
            {educationList.map((edu) => (
              <Entry
                key={edu.id}
                title={edu.school}
                date={formatRange(edu.startDate, edu.endDate)}
                subtitle={joinSpace([edu.major, edu.degree, edu.college, edu.studyMode])}
                place={edu.city}
                description={edu.description}
              />
            ))}
          </Section>
        )}

        {workExpList.length > 0 && (
          <Section title="实习经历与工作经历">
            {workExpList.map((work) => (
              <Entry
                key={work.id}
                title={work.company}
                date={formatRange(work.startDate, work.endDate)}
                subtitle={joinSpace([work.position, work.department])}
                place={work.city}
                description={work.description}
              />
            ))}
          </Section>
        )}

        {projectList.length > 0 && (
          <Section title="项目经历">
            {projectList.map((project) => (
              <Entry
                key={project.id}
                title={project.name}
                date={formatRange(project.startDate, project.endDate)}
                subtitle={project.role}
                description={joinLine([project.description, project.content])}
              />
            ))}
          </Section>
        )}

        {clubList.length > 0 && (
          <Section title="社团经历">
            {clubList.map((club) => (
              <Entry
                key={club.id}
                title={club.name}
                date={formatRange(club.startDate, club.endDate)}
                subtitle={joinSpace([club.role, club.department])}
                place={club.city}
                description={club.description}
              />
            ))}
          </Section>
        )}

        {honorList.length > 0 && (
          <Section title="荣誉奖项">
            {honorList.map((honor) => (
              <div key={honor.id} className="flex justify-between mt-[3.5px] first:mt-0">
                <span>{honor.title}</span>
                {honor.date && <span className="flex-shrink-0 pl-[16px]">{honor.date}</span>}
              </div>
            ))}
          </Section>
        )}

        {skillList.length > 0 && (
          <Section title="技能证书">
            {skillList.map((skill) => (
              <Bullet key={skill.id}>
                <span className="font-bold">{skill.name}</span>
                {skill.description && <>：&#32;{skill.description}</>}
              </Bullet>
            ))}
          </Section>
        )}

        {workList.length > 0 && (
          <Section title="个人作品">
            {workList.map((work) => (
              <Bullet key={work.id}>
                <span className="font-bold">{work.name}</span>
                {work.description && <>：&#32;{work.description}</>}
                {work.link && <span className="ml-[6px]">{work.link}</span>}
              </Bullet>
            ))}
          </Section>
        )}

        {aboutme && (
          <Section title="自我评价">
            <div className="whitespace-pre-wrap">{aboutme}</div>
          </Section>
        )}
      </div>
    </div>
  );
}

interface Field {
  label: string;
  value: string;
}

/** 页头信息行：字段以 "|" 分隔，spaced 为真时冒号后带一个空格 */
function InfoLine({ fields, spaced }: { fields: Field[]; spaced?: boolean }) {
  if (fields.length === 0) return null;
  return (
    <div>
      {fields.map((field, i) => (
        <span key={field.label}>
          {i > 0 && <span className="mx-[6px]">|</span>}
          {field.label}：{spaced && " "}
          {field.value}
        </span>
      ))}
    </div>
  );
}

/** 板块：标题 + 通栏细线 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-[13px] first:mt-0">
      <div className="text-[14px] leading-[18px] font-bold border-b border-black pb-[1.5px]">
        {title}
      </div>
      <div className="pt-[7.4px]">{children}</div>
    </div>
  );
}

/** 经历条目：标题行（名称 + 时间）、副标题行（职位 + 城市）、描述 */
function Entry({
  title,
  date,
  subtitle,
  place,
  description,
}: {
  title: string;
  date?: string;
  subtitle?: string;
  place?: string;
  description?: string;
}) {
  return (
    <div className="mt-[3.5px] first:mt-0">
      <div className="flex justify-between">
        <span className="font-bold">{title}</span>
        {date && <span className="flex-shrink-0 pl-[16px]">{date}</span>}
      </div>
      {(subtitle || place) && (
        <div className="flex justify-between mt-[3.5px]">
          <span>{subtitle}</span>
          {place && <span className="flex-shrink-0 pl-[16px]">{place}</span>}
        </div>
      )}
      {description && (
        <div className="mt-[3.5px] whitespace-pre-wrap">{description}</div>
      )}
    </div>
  );
}

/** 圆点列表项 */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex mt-[3.5px] first:mt-0">
      <span className="w-[21px] flex-shrink-0 pl-[7px]">•</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

function formatRange(start?: string, end?: string) {
  return [start, end].filter(Boolean).join(" - ");
}

function joinSpace(parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

function joinLine(parts: (string | undefined)[]) {
  return parts.filter(Boolean).join("\n");
}
