# 参考案例与技术路线

> 下面所有链接在 2026-09 都实测可访问（HTTP 200）。

## 一、和你给的例子同一类：Halo 建站

你给的 `willy3374.top` 就是这一类，详见 `docs/analysis-example-site.md`。

| 名称 | 链接 | 说明 |
| --- | --- | --- |
| Halo 官网 | https://halo.run/ | 国产开源建站系统，Java / Spring Boot，带管理后台 |
| Halo 仓库 | https://github.com/halo-dev/halo | 可 Docker 一键部署 |
| Serenity-Grace（示例站用的主题） | https://github.com/atangccc/Serenity-Grace | 个人博客主题，含关于页 / 友链 / 项目集 / 图库 |

**适合谁**：有一台服务器 / 云主机，想要文章、相册、评论、访问统计这些「后台能点着管理」的功能。

## 二、静态站点生成器（最省心、最容易长期维护）

这类不需要服务器，构建出纯 HTML 丢到任何静态托管上就行，**而且免费**。

| 生态 | 主题 / 模板 | 链接 | 特点 |
| --- | --- | --- | --- |
| Astro | Astro 主题库 | https://astro.build/themes/ | 官方聚合，几百个主题可预览 |
| Astro | Astro Nano | https://github.com/markhorn-dev/astro-nano | 极简个人站，体积小、上手快 |
| Astro | AstroPaper | https://github.com/satnaing/astro-paper | 博客 + 个人主页，SEO 完善 |
| Astro | Fuwari | https://github.com/saicaca/fuwari | 二次元风格，中文文档友好 |
| Hugo | PaperMod | https://github.com/adityatelange/hugo-PaperMod | 最流行的 Hugo 主题，耐看 |
| Hugo | Blowfish | https://github.com/nunocoracao/blowfish | 功能丰富，可做简历/作品集 |
| Hexo | Butterfly | https://butterfly.js.org/ | 中文社区最流行之一，配置项极多 |
| Hexo | Fluid | https://github.com/fluid-dev/hexo-theme-fluid | 简洁优雅，中文文档 |

## 三、带交互 / 偏作品集的模板（Next.js 等）

| 项目 | 链接 | 特点 |
| --- | --- | --- |
| Magic Portfolio | https://github.com/once-ui-system/magic-portfolio | Once UI 出品，视觉冲击力强，适合设计向作品集 |
| developer-portfolio | https://github.com/1hanzla100/developer-portfolio | React 单页，改一改就能用 |
| mo-portfolio-2025 | https://github.com/MeeksonJr/mo-portfolio-2025 | 终端风、带小游戏和 AI 对话，参考交互思路 |

## 四、值得临摹的真人个人站

| 站点 | 链接 | 可以学什么 |
| --- | --- | --- |
| Brittany Chiang | https://brittanychiang.com/ | 单页 + 侧边导航的经典范式（开源：https://github.com/bchiang7/v4） |
| Josh Comeau | https://www.joshwcomeau.com/ | 交互与动效教科书级别，暗色模式做得很讲究 |
| Dan Abramov | https://overreacted.io/ | 极简、以文字为主，靠排版取胜 |
| Lee Robinson | https://leerob.io/ | 干净的个人站 + 内容/项目分区 |
| Tania Rascia | https://www.taniarascia.com/ | 传统博客式个人站，信息密度高 |

## 五、简历 / CV 专用工具

如果你的核心诉求其实是「一份线上简历」，这几个比手写 HTML 更划算：

| 工具 | 链接 | 说明 |
| --- | --- | --- |
| JSON Resume | https://jsonresume.org/ | 用一份 JSON 描述简历，导出 PDF / 网页 / 多种主题 |
| RenderCV | https://github.com/rendercv/rendercv | 用 YAML 写简历，输出高质量 PDF，适合学术/工程求职 |
| Reactive Resume | https://rxresu.me/ | 在线可视化简历编辑器，可自建 |

## 六、找灵感 / 看别人的站

| 站点 | 链接 | 说明 |
| --- | --- | --- |
| One Page Love | https://onepagelove.com/ | 大量单页网站案例，可按行业筛选 |
| Godly | https://godly.website/ | 精选高质量网页设计，偏视觉冲击 |
| developer-portfolios | https://github.com/emmabostian/developer-portfolios | 一大份开发者作品集清单，可以慢慢翻 |

## 七、给你的建议

- **想要「有后端」的感觉**（登录后台写文章、传照片、看访问统计）→ 走 Halo 路线，成本是要一台服务器 + 域名 + 备案（国内）。
- **只想要一个好看、稳定、免费、随时能改的个人主页**（你的情况更接近这个）→ 就用现在这个静态框架，或者迁到 Astro。
- **两条路不冲突**：可以把现在的静态主页作为「门面」，以后再把博客挂到 `/blog`（Halo 或静态博客都行）。
