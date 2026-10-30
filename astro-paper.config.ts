import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    // 默认设置为你的 GitHub Pages 地址；若绑定自定义域名可随时修改
    url: "https://leonal53589.github.io/",
    title: "蓝彦扬",
    description:
      "深圳大学计算机科学与技术本科生。RoboMaster 英雄机器人视觉算法，关注机器人控制、具身智能与计算机视觉。",
    author: "蓝彦扬",
    profile: "https://github.com/leonal53589",
    ogImage: "og.jpg",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 6,
    perIndex: 3,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    // 动态 OG 图依赖构建时下载 Google 字体，国内网络不稳且中文要额外配字体文件，
    // 所以关掉，统一用 public/og.jpg 这张静态分享图。
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    // "编辑此页" 链接；等你的仓库建好、把地址填上再改成 enabled: true
    editPost: { enabled: false },
    search: "pagefind",
  },
  // name 对应 src/components/Socials.astro 里的图标键
  socials: [
    { name: "github", url: "https://github.com/leonal53589" },
    { name: "mail", url: "mailto:3423046420@qq.com" },
    { name: "bilibili", url: "https://space.bilibili.com/525196092" },
    {
      name: "xiaohongshu",
      url: "https://www.xiaohongshu.com/user/profile/6401f452000000001001e2e4",
    },
  ],
  shareLinks: [{ name: "mail", url: "mailto:?subject=分享一篇文章&body=" }],
});
