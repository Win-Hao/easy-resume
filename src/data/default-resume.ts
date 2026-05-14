import type { ResumeData } from "@/types/resume";

export const defaultResume: ResumeData = {
  profile: {
    name: "张三",
    email: "zhangsan@example.com",
    mobile: "138****8888",
    github: "https://github.com/zhangsan",
    workExpYear: "三年",
    workPlace: "北京",
    positionTitle: "前端开发工程师",
  },
  educationList: [
    {
      id: "edu-1",
      school: "北京大学",
      major: "计算机科学与技术",
      degree: "本科",
      startDate: "2018.09",
      endDate: "2022.06",
    },
  ],
  skillList: [
    {
      id: "skill-1",
      name: "React / Next.js / TypeScript",
      description: "熟练使用 React 全家桶进行项目开发",
      level: 90,
    },
    {
      id: "skill-2",
      name: "TailwindCSS / CSS",
      description: "熟练使用 TailwindCSS 和原生 CSS 进行页面布局",
      level: 85,
    },
    {
      id: "skill-3",
      name: "Node.js / 后端",
      description: "了解 Node.js，能进行简单的后端开发",
      level: 60,
    },
  ],
  workExpList: [
    {
      id: "work-1",
      company: "某科技有限公司",
      department: "研发部",
      startDate: "2022.07",
      endDate: "至今",
      description:
        "1. 负责公司核心产品的前端开发与维护\n2. 参与前端架构设计与技术选型\n3. 推动前端工程化建设，提升团队开发效率",
    },
  ],
  projectList: [
    {
      id: "proj-1",
      name: "示例项目",
      role: "前端负责人",
      startDate: "2023.01",
      endDate: "2023.06",
      description: "这是一个示例项目描述，请替换为你的真实项目信息。",
      content:
        "1. 负责项目前端架构设计与核心模块开发\n2. 使用 React + TypeScript 构建组件化的前端应用\n3. 实现响应式布局，适配多端设备",
    },
  ],
  workList: [
    {
      id: "pw-1",
      name: "个人项目示例",
      description: "一个开源的前端工具库",
      link: "https://github.com/zhangsan/example",
    },
  ],
  aboutme:
    "三年前端开发经验，专注 React 技术栈，具备从 0 到 1 独立交付项目的能力。技术学习能力强，能快速适应新技术栈与工作模式。",
};
