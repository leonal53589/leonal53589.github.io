# 蓝彦扬 · 个人主页

一个**纯静态、零依赖**的个人主页。内容来自 `个人资料.md`，视觉参考了 Halo 主题 Serenity 的做法
（整屏背景 + 玻璃拟态 + 分层入场动画 + 主题切换圆形转场），但没有任何框架和构建步骤。

## 一、现在有什么

**内容板块**

- **首屏**：头像（旋转渐变环 + 呼吸光晕）、姓名（流式渐变字）、签名、社交图标、求职状态、数据条、滚动提示
- **关于我**：自我介绍 + 个人照片 + 关键词卡片
- **经历与荣誉**：教育 + 3 项竞赛的时间轴
- **项目**：RoboMaster 自瞄框架
- **技能**：编程语言 / 机器人相关 / 工具与其他
- **联系我**：邮箱、微信、手机（都可一键复制）+ 社交链接

**视觉与动效**

| 效果 | 说明 |
| --- | --- |
| 背景层 | 虚化壁纸 + 三团缓慢漂移的极光光斑 + 网格 + 噪点 |
| 滚动联动 | 往下滚时壁纸渐隐、加模糊、反向位移做视差，内容区落到干净底色上 |
| 玻璃拟态 | 顶栏、卡片、按钮都是半透明 + 背景模糊 |
| 入场动画 | 首屏元素带交错延迟淡入上移；首屏内的元素直接显示，不闪 |
| 主题切换 | 点按钮时从鼠标位置做圆形扩散转场（View Transitions API，不支持的浏览器自动降级） |
| 鼠标光晕 | 精确指针设备上有一团跟随光标缓动的主色光晕 |
| 顶栏 | 悬浮玻璃胶囊，滚动时收窄；移动端变成下拉菜单 |
| 其他 | 顶部阅读进度条、导航滚动高亮、一键复制、打印样式 |

深浅色都用同一套版式，跟随系统 + 手动切换 + 记忆。全部动效在
`prefers-reduced-motion: reduce` 下自动关闭。

## 二、目录结构

```
self/
├── index.html              # 页面骨架（一般不用动）
├── data/
│   └── content.js          # ★ 所有文案都在这里
├── assets/
│   ├── css/style.css       # 样式：设计变量都在文件开头的 :root 里
│   ├── js/main.js          # 渲染 + 交互（一般不用动）
│   └── img/
│       ├── avatar.jpg          # 网站头像（头像.jpg 裁成 512×512）
│       ├── avatar-256.jpg      # iOS 加书签到主屏的图标
│       ├── photo.jpg           # 个人照片（用在「关于我」）
│       ├── backdrop.jpg        # 首屏背景壁纸 · 默认（虚化环境版）
│       ├── backdrop-sharp.jpg  # 首屏背景壁纸 · 清晰版（整屏人物）
│       ├── og.jpg              # 分享卡片图 1200×630
│       ├── avatar.svg          # 头像占位（JS 生效前短暂显示）
│       └── favicon.svg         # 浏览器标签图标
├── docs/
│   ├── analysis-example-site.md   # 参考站 willy3374.top 的技术分析
│   └── reference-examples.md      # 参考案例 / 主题 / 模板合集
├── 个人资料.md              # 你提供的资料原稿
├── 个人.jpg / 头像.jpg       # 图片原稿（网站用的是上面的处理版）
└── README.md
```

## 三、本地预览

```bash
cd /home/leona/WorkingSpace/self
python3 -m http.server 8099
# 浏览器打开 http://127.0.0.1:8099
```

也可以直接双击 `index.html`。

## 四、怎么改内容

编辑 `data/content.js`，每一项都有中文注释。

- **加项目**：照着 `projects.items` 的格式往下加，`featured: true` 会加宽高亮
- **加经历**：`experience.items`，`type` 可选 `education` / `work` / `competition` / `award` / `project`
- **改技能**：`skills.groups` 里加 `level: 0-100` 就会从标签变成熟练度进度条
- **隐藏板块**：`sections` 里对应的开关改成 `false`
- **换图片**：替换 `assets/img/` 下的同名文件即可

### 想加「下载简历」按钮

把 PDF 放到 `assets/resume.pdf`，然后在 `profile.actions` 里加：

```js
{ label: '下载简历', href: 'assets/resume.pdf', primary: false },
```

## 五、怎么调外观

### 配色（`content.js` → `theme`）

```js
theme: {
  accent: '#4f7cff',       // 浅色主色
  accent2: '#8b5cf6',      // 浅色辅助色（按钮和标题的渐变用它）
  accentDark: '#7c9cff',   // 深色主色
  accent2Dark: '#b98cff',  // 深色辅助色
  defaultMode: 'auto',     // 'auto' | 'light' | 'dark'
  heroImage: 'assets/img/backdrop.jpg',
}
```

### 背景壁纸（`theme.heroImage`）

| 想效果 | 怎么写 |
| --- | --- |
| 虚化环境色场（当前默认，不抢文字） | `'assets/img/backdrop.jpg'` |
| 整屏清晰人物壁纸（更像参考站那种冲击力） | `'assets/img/backdrop-sharp.jpg'` |
| 换成你自己的图 | 把图片放进 `assets/img/`，写路径 |
| 完全不要壁纸，只用极光渐变 | `''` |

### 更细的调整（`assets/css/style.css` 顶部）

| 变量 | 作用 |
| --- | --- |
| `--bg-img-opacity` | 壁纸浓度（浅色/深色各一组） |
| `--scrim` / `--scrim-radial` | 覆盖在壁纸上的遮罩，控制内容区多干净 |
| `--blob-opacity` | 极光光斑的强度 |
| `--grid-line` | 网格线的颜色 |
| `--glass` | 玻璃拟态的背景模糊半径 |
| `--radius` / `--radius-lg` | 圆角 |
| `--ease-out` | 全局缓动曲线 |

> 想让首屏更矮或更高：调 `.hero` 的 `min-height` 和 `padding`；
> 头像大小在 `.avatar-ring` 的 `width` 里，用 `vh` 参与计算，小屏会自动缩小。

## 六、部署（三选一，都免费）

| 方式 | 操作 | 适合 |
| --- | --- | --- |
| **Cloudflare Pages** | 连 GitHub 仓库，构建命令留空，输出目录填 `/` | 推荐，国内外访问都还行，自带 HTTPS |
| **GitHub Pages** | 推到仓库 → Settings → Pages → 选分支根目录 | 最省事，国内偶尔慢 |
| **Vercel / Netlify** | 拖拽文件夹上传即可 | 快速试水 |

自有服务器的话，把整个目录丢到 Nginx 站点根目录就行。

> 部署到正式域名后，建议把 `meta.ogImage` 换成完整网址（例如 `https://你的域名/assets/img/og.jpg`）。
> 留相对路径时代码会自动补全，但部分老爬虫只认写死的绝对地址。

## 七、待办 / 可以继续补的

- [ ] 教育经历的起止时间（现在写的是「本科在读」）
- [ ] 更多项目（现在只有自瞄框架一个）
- [ ] 简历 PDF
- [ ] 域名 + 部署
- [x] ~~接入真实资料~~ / ~~头像与照片~~ / ~~整体视觉改版~~
- [ ] 可选：加「文章 / 笔记」板块
- [ ] 可选：中英文切换
- [ ] 可选：迁到 Astro，方便以后写 Markdown 文章

> ⚠️ 隐私提醒：手机号 `18027860022` 写在 `content.js` 的 `contact.items` 里，
> 部署后对所有人可见，也容易被爬虫抓走。不想要就删掉那一行。
