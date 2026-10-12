export interface Profile {
  name: string;
  email: string;
  mobile: string;
  github?: string;
  workExpYear?: string;
  workPlace?: string;
  positionTitle?: string;
  avatarUrl?: string;
  /** 年龄，如 27岁 */
  age?: string;
  /** 性别 */
  gender?: string;
  /** 民族 */
  ethnicity?: string;
  /** 政治面貌 */
  politicalStatus?: string;
  /** 现居城市 */
  currentCity?: string;
  /** 期望薪资 */
  expectedSalary?: string;
}

export interface Education {
  id: string;
  school: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
  /** 学院，如 会计学院 */
  college?: string;
  /** 学习形式，如 全日制 */
  studyMode?: string;
  /** 所在城市 */
  city?: string;
  /** 在校经历描述 */
  description?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  department: string;
  startDate: string;
  endDate: string;
  description: string;
  /** 职位，如 财务实习生 */
  position?: string;
  /** 所在城市 */
  city?: string;
}

export interface ClubExperience {
  id: string;
  /** 社团 / 组织名称 */
  name: string;
  /** 担任职务 */
  role: string;
  /** 所属部门 */
  department: string;
  startDate: string;
  endDate: string;
  city?: string;
  description: string;
}

export interface Honor {
  id: string;
  /** 荣誉 / 奖项名称 */
  title: string;
  /** 获得时间 */
  date: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  content: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
}

export interface PersonalWork {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface ResumeData {
  profile: Profile;
  educationList: Education[];
  skillList: Skill[];
  workExpList: WorkExperience[];
  projectList: Project[];
  workList: PersonalWork[];
  aboutme: string;
  /** 社团经历（部分模板使用） */
  clubList?: ClubExperience[];
  /** 荣誉奖项（部分模板使用） */
  honorList?: Honor[];
}
