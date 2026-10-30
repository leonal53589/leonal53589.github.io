/**
 * ============================================================
 *  个人主页内容数据 —— 这是你唯一需要修改的文件
 * ============================================================
 *  本文件内容来自工作区的「个人资料.md」。
 *  改完保存、刷新浏览器即可生效，不需要构建、不需要安装任何东西。
 *
 *  小贴士：
 *  1. 字符串用单引号或双引号都行；数组用 []，对象用 {}，项之间用英文逗号。
 *  2. 不想要的板块：把 SITE.sections 里对应的开关改成 false 即可隐藏。
 *  3. 不要的条目直接整段删掉（注意别把逗号删漏了）。
 *  4. 想改主题色：改 SITE.theme.accent（浅色）和 accentDark（深色）。
 *  5. 以 TODO 开头的字符串会被自动隐藏，方便你留空待补。
 */

window.SITE = {
  /** 是否显示「示例数据」提示条（现在是真实内容，保持 false） */
  demo: false,

  /* ---------------------------------------------------------
   * 0. 站点基础信息（浏览器标签、SEO、分享卡片、页脚）
   * ------------------------------------------------------- */
  meta: {
    title: '蓝彦扬 · 个人主页',
    description: '深圳大学计算机科学与技术本科生。RoboMaster 英雄机器人视觉算法，关注机器人控制、具身智能与计算机视觉。',
    lang: 'zh-CN',
    ogImage: 'assets/img/og.jpg', // 分享到微信/QQ/推特时的卡片图（1200×630）
    copyright: '© {year} 蓝彦扬. All rights reserved.', // {year} 会自动替换成当前年份
    icp: '', // 如果用国内服务器备案，把备案号填这里
  },

  /* ---------------------------------------------------------
   * 1. 主题外观
   * ------------------------------------------------------- */
  theme: {
    accent: '#4f7cff',       // 浅色模式主色
    accent2: '#8b5cf6',      // 浅色模式辅助色（渐变用）
    accentDark: '#7c9cff',   // 深色模式主色
    accent2Dark: '#b98cff',  // 深色模式辅助色
    defaultMode: 'auto',     // 'auto'（跟随系统） | 'light' | 'dark'
    // 首屏壁纸，三种玩法：
    //   'assets/img/backdrop.jpg'        虚化环境色场（默认，不抢文字）
    //   'assets/img/backdrop-sharp.jpg'  整屏清晰人物壁纸（更像参考站那种冲击力）
    //   ''                               不要壁纸，只用极光渐变背景
    heroImage: 'assets/img/backdrop.jpg',
  },

  /* ---------------------------------------------------------
   * 2. 个人资料（首屏）
   * ------------------------------------------------------- */
  profile: {
    name: '蓝彦扬',
    latinName: 'LAN YANYANG',            // 装饰用的拼音
    avatar: 'assets/img/avatar.jpg',     // 来源：头像.jpg（已裁成 512×512）
    headline: '计算机科学与技术 · 机器人控制 / 具身智能',
    tagline: '星落，便随风起。',
    location: '广东省深圳市',
    email: '3423046420@qq.com',
    status: { available: true, text: '寻找机器人 / 视觉算法方向的工作机会' },
    bio: [
      '我是一名计算机科学与技术专业的本科生。在经历了一年的 RoboMaster 机器人比赛后，我对机器人控制和计算机视觉产生了浓厚的兴趣。',
      '我热衷于探索具身智能领域，并希望通过我的研究和实践，发现更多关于机器人与人类交互的可能性。业余时间用来学习相关的知识和技能，在相关的研究方向上到处探寻，有同兴趣的朋友可以联系我一起交流学习。',
    ],
    // icon 可选：github / email / bilibili / xiaohongshu / zhihu / juejin / linkedin / orcid / website
    socials: [
      { label: 'GitHub', icon: 'github', url: 'https://github.com/leonal53589' },
      { label: '邮箱', icon: 'email', url: 'mailto:3423046420@qq.com' },
      { label: '哔哩哔哩', icon: 'bilibili', url: 'https://space.bilibili.com/525196092' },
      { label: '小红书', icon: 'xiaohongshu', url: 'https://www.xiaohongshu.com/user/profile/6401f452000000001001e2e4' },
    ],
    stats: [
      { value: '3', label: '竞赛获奖' },
      { value: '16', label: 'RoboMaster 全国十六强' },
      { value: '2', label: '贡献值组内前三' },
    ],
    actions: [
      { label: '查看项目', href: '#projects', primary: true },
      { label: '联系我', href: '#contact', primary: false },
    ],
  },

  /* ---------------------------------------------------------
   * 3. 板块开关：不想显示的板块改成 false
   * ------------------------------------------------------- */
  sections: {
    about: true,
    experience: true,
    projects: true,
    skills: true,
    contact: true,
  },

  /* ---------------------------------------------------------
   * 4. 关于我
   *    photo 是可选的个人照片；删掉这个字段就没有照片
   * ------------------------------------------------------- */
  about: {
    title: '关于我',
    subtitle: '机器人控制 · 具身智能 · 计算机视觉',
    photo: 'assets/img/photo.jpg',
    paragraphs: [
      '暂时没有读研的打算，本科毕业后大概直接去工作。学习不是只在学校里进行的，学校只是一个平台而已，希望能在工作中继续学习和成长。',
      '少年的明天是最清澈的蓝色，值得浪花铺就春衫。',
    ],
    highlights: [
      { title: '学习能力强', text: '从编程基础较差，到能在 RoboMaster 比赛中完成机器人控制与计算机视觉的实际应用。' },
      { title: '持续专注', text: '在学习和研究中保持持续的专注力，不会只有三分钟热度。' },
      { title: '检索能力强', text: '能快速查找和理解相关的技术文档与资料，解决问题的能力强。' },
    ],
  },

  /* ---------------------------------------------------------
   * 5. 经历与荣誉（时间轴）
   *    type 可选：'education' 教育 | 'work' 工作/实习 |
   *              'competition' 竞赛 | 'award' 奖项 | 'project' 项目
   *    按时间倒序排列（最新的放最前面）
   * ------------------------------------------------------- */
  experience: {
    title: '经历与荣誉',
    subtitle: '教育背景、竞赛与项目经历',
    items: [
      {
        type: 'education',
        title: '计算机科学与技术 · 本科',
        org: '深圳大学',
        period: '本科在读', // TODO：可换成具体起止时间，例如 2023.09 – 2027.06
        location: '广东省深圳市',
        description: '研究方向：机器人控制、具身智能、计算机视觉。',
        highlights: [],
        tags: ['机器人控制', '具身智能', '计算机视觉'],
      },
      {
        type: 'competition',
        title: 'RoboMaster 机甲大师超级对抗赛',
        org: '深圳大学',
        period: '2026',
        location: '',
        description: '担任英雄机器人的视觉算法开发，负责自瞄算法的实现，主要做目标识别与跟踪。',
        highlights: [
          '战队获得全国一等奖（全国十六强）',
          '英雄兵种获得全国一等奖，贡献值排名兵种组内第三',
        ],
        tags: ['C++', 'OpenCV', '目标识别与跟踪'],
      },
      {
        type: 'competition',
        title: '中国大学生机械工程创新创意大赛 · 智能精密装配赛',
        org: '粤港澳赛区选拔赛',
        period: '2025.09',
        location: '',
        description: '获得粤港澳赛区选拔赛二等奖。',
        highlights: [],
        tags: ['机械工程', '精密装配'],
      },
      {
        type: 'competition',
        title: '中国国际大学生创新大赛（原「互联网+」）',
        org: '光芯量界项目组',
        period: '2025.08',
        location: '',
        description: '项目组成员。',
        highlights: [
          '获得广东省银奖',
          '贡献值排名组内第三',
        ],
        tags: ['创新创业'],
      },
    ],
  },

  /* ---------------------------------------------------------
   * 6. 项目展示
   *    featured: true 的项目会排前面并加宽高亮
   * ------------------------------------------------------- */
  projects: {
    title: '项目',
    subtitle: '开源与实战项目',
    items: [
      {
        name: 'RoboMaster 自瞄框架',
        summary: '英雄机器人自瞄算法的实现框架，包含目标识别与跟踪。',
        description: '比赛期间负责英雄机器人的视觉算法开发，这份框架是自瞄部分的代码整理。',
        period: '2026',
        tags: ['C++', 'OpenCV', '目标识别与跟踪'],
        featured: true,
        links: [{ label: '源码仓库', url: 'https://github.com/SZURPVision/RP-26AutoAim-Frame' }],
      },
      // TODO：还有很多项目的话，照上面的格式往下加就行
    ],
  },

  /* ---------------------------------------------------------
   * 7. 技能
   *    items 里可以加 level: 0-100 显示熟练度进度条；
   *    全部不加 level 时会自动显示成标签（当前就是这种）
   * ------------------------------------------------------- */
  skills: {
    title: '技能',
    subtitle: '技术栈与工具',
    groups: [
      {
        category: '编程语言',
        items: [{ name: 'C / C++' }, { name: 'Python' }],
      },
      {
        category: '机器人相关',
        items: [{ name: 'ROS' }, { name: 'OpenCV' }],
      },
      {
        category: '工具与其他',
        items: [{ name: 'Git' }, { name: 'Linux' }],
      },
    ],
  },

  /* ---------------------------------------------------------
   * 8. 联系方式
   *    items 每项：{ label, value, href?, copy? }
   *    copy: false 表示不显示「复制」按钮
   * ------------------------------------------------------- */
  contact: {
    title: '联系我',
    subtitle: '有同兴趣的朋友欢迎联系我一起交流学习。',
    items: [
      { label: '邮箱', value: '3423046420@qq.com' },
      { label: '微信', value: 'yzl_7932384' },
      { label: '手机', value: '18027860022', href: 'tel:18027860022' },
    ],
    note: '',
    links: [
      { label: 'GitHub', icon: 'github', url: 'https://github.com/leonal53589' },
      { label: 'Bilibili', icon: 'bilibili', url: 'https://space.bilibili.com/525196092' },
      { label: '小红书', icon: 'xiaohongshu', url: 'https://www.xiaohongshu.com/user/profile/6401f452000000001001e2e4' },
    ],
  },
};
