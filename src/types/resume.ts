export interface Profile {
  name: string;
  email: string;
  mobile: string;
  github?: string;
  workExpYear?: string;
  workPlace?: string;
  positionTitle?: string;
  avatarUrl?: string;
}

export interface Education {
  id: string;
  school: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  department: string;
  startDate: string;
  endDate: string;
  description: string;
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
}
