# Easy Resume

免费开源的在线简历编辑器。7 套精美模板，实时预览，一键导出 PDF。无需注册，打开即用。

**在线体验** https://win-hao.github.io/easy-resume/

## 功能

- 7 套简历模板（经典 / 双栏 / 极简 / 商务 / 活力 / 苹果风格 / 标准中文简历）
- 左编辑右预览，修改实时渲染
- 12 种预设主题色 + 自定义取色器
- 浅色 / 深色模式（首次跟随系统，切换后记住选择；简历纸面与打印始终为白底）
- 拖拽排序简历模块
- 年月日历选择器
- 导入 / 导出 JSON 配置
- 浏览器打印导出 PDF
- 纯前端，数据存储在浏览器本地，不上传服务器

## 模板预览

| 经典 | 双栏 | 极简 |
|:---:|:---:|:---:|
| 纯排版驱动，无装饰 | 深色侧边栏 + 主内容区 | 居中标题，留白大方 |

| 商务 | 活力 | 苹果 |
|:---:|:---:|:---:|
| 顶部色条，双栏正文 | 时间线 + 进度条 | Apple HIG 设计语言 |

| 标准 |
|:---:|
| 居中页头 + 一寸照，板块通栏细线，适合国内投递 |

## 技术栈

- **框架** Next.js 16 (App Router)
- **样式** Tailwind CSS v4
- **组件** shadcn/ui
- **拖拽** @dnd-kit
- **图标** Lucide React
- **语言** TypeScript

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建
pnpm build
```

打开 http://localhost:3000 即可使用。

## 使用方式

1. 打开在线地址或本地启动
2. 左侧表单编辑简历内容
3. 右侧实时预览效果
4. 顶部切换模板和主题色
5. 点击「导出 PDF」通过浏览器打印保存

### 配合 AI 使用

可以先用 ChatGPT / DeepSeek / Kimi 等 AI 工具生成简历文案，再粘贴到编辑器中排版导出。

### 数据导入导出

点击「导出 JSON」保存当前简历数据，下次点击「导入 JSON」即可恢复。方便在不同设备间迁移。

## 部署

项目已配置 GitHub Actions，push 到 `main` 分支自动部署到 GitHub Pages。

如需部署到其他平台：

```bash
pnpm build
# 产物在 out/ 目录，部署到任何静态托管即可
```

## License

MIT

## 致谢

设计灵感来源：
- [Reactive Resume](https://github.com/amruthpillai/reactive-resume)
- [BartoszJarocki/cv](https://github.com/BartoszJarocki/cv)
- [OpenResume](https://github.com/xitanggg/open-resume)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
