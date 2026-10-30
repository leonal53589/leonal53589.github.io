# 蓝彦扬 · 个人主页

基于开源主题 [AstroPaper](https://github.com/satnaing/astro-paper)（MIT）搭建的个人主页 + 博客。
首页是个人信息页，`/posts` 是文章区，可以直接用 Markdown 写技术笔记。

- **框架**：Astro 7 + Tailwind CSS 4（默认输出零 JS，只有需要交互的地方才加载脚本）
- **内容**：首页数据集中在 `src/data/resume.ts`，文章放在 `src/content/posts/`
- **语言**：全站中文，界面文案在 `src/i18n/lang/zh-CN.ts`
- **搜索**：Pagefind 静态全文搜索（不需要后端）
- **自带**：深浅色模式、RSS、sitemap、标签、归档、404

## 快速开始

```bash
npm install        # 首次
npm run dev        # 开发服务器 http://localhost:4321
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

> `npm run build` 会依次跑类型检查、静态构建和搜索索引生成。
> 这些命令都通过 `scripts/astro.mjs` 包装了一层：Astro 启动时会去写家目录下的遥测配置，
> 在没有家目录写权限的环境（沙箱、只读容器）里会直接报错，包装器统一关掉了遥测。

## 目录结构

```
.
├── src/
│   ├── data/
│   │   ├── resume.ts        ★ 首页全部内容（资料/经历/项目/技能/联系方式/壁纸）
│   │   └── icons.ts         社交图标路径
│   ├── content/
│   │   ├── posts/           ★ 文章：写 .md 或 .mdx 放这里
│   │   └── pages/about.md   ★ “关于”页面的正文
│   ├── components/
│   │   ├── Background.astro 背景层 + 滚动联动 / 光晕 / 入场动画 / 一键复制
│   │   ├── Header.astro     悬浮玻璃导航（中文，含锚点）
│   │   ├── Footer.astro     页脚
│   │   └── ...              主题自带组件
│   ├── layouts/Layout.astro 页面骨架（SEO / OG / RSS / 主题切换）
│   ├── pages/
│   │   ├── index.astro      ★ 首页（首屏 + 关于 + 经历 + 项目 + 技能 + 联系）
│   │   ├── posts/           文章列表与详情
│   │   ├── tags/  archives/  search/  about.astro  404  rss.xml  robots.txt
│   ├── styles/
│   │   ├── theme.css        ★ 配色与设计变量
│   │   ├── site.css         ★ 首页视觉层：背景、玻璃拟态、时间轴、动画
│   │   └── global.css / typography.css
│   ├── i18n/lang/zh-CN.ts   ★ 界面文案
│   └── scripts/theme.ts     主题切换（含圆形扩散转场）
├── public/                  静态资源，按 /文件名 访问
│   ├── avatar.jpg           头像（512×512）
│   ├── photo.jpg            个人照片
│   ├── backdrop.jpg         首屏壁纸 · 虚化版（默认）
│   ├── backdrop-sharp.jpg   首屏壁纸 · 清晰版
│   ├── og.jpg               分享卡片图 1200×630
│   └── favicon.svg
├── scripts/                 构建包装脚本
├── docs/                    参考文档（示例站分析、开源项目清单、主题原版说明）
├── legacy-static/           改造前的纯静态版，确认满意后可以整个删掉
├── astro-paper.config.ts    ★ 站点信息 / 社交链接 / 功能开关
├── astro.config.ts          构建配置（i18n、Markdown、Shiki）
└── 个人资料.md               你的资料原稿
```

标 ★ 的是日常要改的文件，其余是主题自带的。

## 怎么改内容

### 首页

编辑 `src/data/resume.ts`：

| 导出 | 内容 |
| --- | --- |
| `profile` | 首屏：姓名、头衔、签名、社交链接、数据条、按钮 |
| `about` | 关于我：自我介绍、照片、关键词卡片 |
| `experience` | 经历时间轴（`kind` 可写「教育 / 工作 / 竞赛 / 奖项 / 项目」） |
| `projects` | 项目卡片（`featured: true` 会加宽高亮） |
| `skills` | 技能（条目加 `level: 0-100` 就变成进度条） |
| `contact` | 联系方式（`copy: false` 可去掉复制按钮） |
| `theme.heroImage` | 壁纸：`/backdrop.jpg` 虚化版 / `/backdrop-sharp.jpg` 清晰版 / `""` 不要壁纸 |

图片放进 `public/`，引用时写 `/文件名`。

### 站点信息与社交链接

`astro-paper.config.ts`：站点标题、描述、域名、每页文章数、社交链接、搜索开关。

### 界面文案

`src/i18n/lang/zh-CN.ts`：导航、分页、页脚、搜索等所有界面文字。

## 怎么发文章

在 `src/content/posts/` 下新建 `我的文章.md`：

```markdown
---
title: "用 ROS 调通一个视觉伺服闭环"
description: "记录一次把识别结果接到云台上的踩坑过程。"
pubDatetime: 2026-10-01T10:00:00+08:00
tags: ["ROS", "视觉"]
featured: false
draft: false
---

正文用 Markdown 写，支持代码高亮、目录、提示框、数学公式。
```

写完后 `npm run dev` 就能在 `/posts`、`/tags`、`/archives` 看到，
搜索索引会在 `npm run build` 时自动更新。

## 怎么调外观

`src/styles/theme.css` 里是全部设计变量（浅色和深色各一组）：

| 变量 | 作用 |
| --- | --- |
| `--accent` / `--accent-2` | 主色与辅助色（按钮、标题渐变） |
| `--background` / `--foreground` | 底色与文字色 |
| `--card` / `--border` | 玻璃卡片的背景与描边 |
| `--bg-img-opacity` | 壁纸浓度 |
| `--scrim` / `--scrim-radial` | 壁纸上的遮罩，控制内容区多干净 |
| `--blob-opacity` | 极光光斑强度 |
| `--glass` | 玻璃拟态的背景模糊半径 |
| `--radius-lg` / `--ease-out` | 圆角与全局缓动 |

`src/styles/site.css` 里是结构与动效（背景层、首屏、时间轴、项目卡、技能、联系、关键帧）。

所有动效在 `prefers-reduced-motion: reduce` 下会自动关闭。

## 部署

| 平台 | 配置 |
| --- | --- |
| **Cloudflare Pages** | 构建命令 `npm run build`，输出目录 `dist` |
| **Vercel / Netlify** | 同上，框架预设选 Astro |
| **GitHub Pages** | 用 Actions 跑 `npm run build` 发布 `dist`；部署在子路径时需在 `astro.config.ts` 配 `base` |
| **自有服务器** | `npm run build` 后把 `dist/` 丢到 Nginx 站点根目录 |

上线前记得把 `astro-paper.config.ts` 里的 `site.url` 换成真实域名
（影响 canonical、sitemap、RSS 的绝对地址）。

## 和上游的关系

- 主题：[satnaing/astro-paper](https://github.com/satnaing/astro-paper)，MIT 许可，可自由使用和修改。
- 本站相对上游改了这些：中文界面（新增 `zh-CN.ts`）、首页换成个人主页、整套视觉层
  （`site.css` + `theme.css`）、导航改成悬浮玻璃胶囊、去掉 Google Fonts 与动态 OG 图生成
  （避免构建时联网）、社交图标换成 GitHub / 邮箱 / B站 / 小红书、文章为空时加了空状态。

## 待办

- [ ] 换掉 `astro-paper.config.ts` 里的 `site.url`
- [ ] 教育经历的起止时间（现在写的是「本科在读」）
- [ ] 补更多项目
- [ ] 简历 PDF
- [ ] 写第一篇文章
- [ ] 确认满意后删掉 `legacy-static/`

> ⚠️ 隐私提醒：手机号写在 `src/data/resume.ts` 的 `contact.items` 里，
> 部署后对所有人可见，也容易被爬虫抓走。不想要就删掉那一行。
