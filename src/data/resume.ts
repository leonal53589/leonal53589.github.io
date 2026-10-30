/**
 * ============================================================
 *  个人主页内容 —— 数据定义与配置文件
 * ============================================================
 *  首页所有板块都从这里读取。
 *  网站头像已切换为虚拟头像 public/avatar.jpg，不包含任何个人真实照片。
 */

export type SocialIcon =
  | "github"
  | "mail"
  | "bilibili"
  | "xiaohongshu"
  | "x"
  | "zhihu";

export interface SocialLink {
  label: string;
  icon: SocialIcon;
  url: string;
}

/* ------------------------------------------------------------
 * 0. 背景外观与科技风格
 * ---------------------------------------------------------- */
export const theme = {
  /** 默认不使用静态壁纸，采用极光渐变 + 交互式 LiDAR 激光雷达点云与 SLAM 特征网络 */
  heroImage: "",
};

/* ------------------------------------------------------------
 * 1. 个人资料（首屏）
 * ---------------------------------------------------------- */
export const profile = {
  name: "蓝彦扬",
  latinName: "LAN YANYANG",
  /** 使用头像.jpg 导出的虚拟头像，杜绝真实照片 */
  avatar: "/avatar.jpg",
  headline: "计算机科学与技术 · 机器人控制 / 具身智能 / 计算机视觉",
  tagline: "星落，便随风起。",
  location: "广东省深圳市 · 深圳大学",
  email: "3423046420@qq.com",
  /** 求职状态角标与机器人遥测提示 */
  status: {
    available: true,
    text: "寻找机器人 / 具身智能 / 视觉算法方向工作机会",
    telemetry: "SYS_STATUS: ONLINE · AGENT: EMBODIED_V1 · CV_LATENCY: <5MS",
  },
  bio: [
    "我是一名计算机科学与技术专业的本科生。在经历了一年的 RoboMaster 机器人比赛后，我对机器人控制和计算机视觉产生了浓厚的兴趣。",
    "我热衷于探索具身智能领域，并希望通过我的研究和实践，发现更多关于机器人与人类交互的可能性。业余时间用来学习相关的知识和技能，在相关的研究方向上到处探寻，有同兴趣的朋友可以联系我一起交流学习。",
  ],
  socials: [
    { label: "GitHub", icon: "github", url: "https://github.com/leonal53589" },
    { label: "邮箱", icon: "mail", url: "mailto:3423046420@qq.com" },
    {
      label: "哔哩哔哩",
      icon: "bilibili",
      url: "https://space.bilibili.com/525196092",
    },
    {
      label: "小红书",
      icon: "xiaohongshu",
      url: "https://www.xiaohongshu.com/user/profile/6401f452000000001001e2e4",
    },
  ] satisfies SocialLink[],
  /** 首屏核心战绩与数据徽章 */
  stats: [
    { value: "全国一等奖", label: "RoboMaster 全国16强" },
    { value: "组内前三", label: "英雄兵种贡献度" },
    { value: "省银奖", label: "中国大学生创新大赛" },
    { value: "开源框架", label: "RP-26 自瞄系统" },
  ],
  actions: [
    { label: "查看实战项目", href: "#projects", primary: true },
    { label: "关于我 & 理念", href: "#about", primary: false },
    { label: "联系我", href: "#contact", primary: false },
  ],
} as const;

/* ------------------------------------------------------------
 * 2. 关于我与具身智能探索 (Bento 架构)
 * ---------------------------------------------------------- */
export const about = {
  index: "01",
  title: "关于我与具身探索",
  subtitle: "机器人控制 · 具身智能 · 计算机视觉",
  paragraphs: [
    "我是一名计算机科学与技术专业的本科生。在经历了一年的 RoboMaster 机器人比赛后，我对机器人控制和计算机视觉产生了浓厚的兴趣。",
    "我热衷于探索具身智能领域，并希望通过我的研究和实践，发现更多关于机器人与人类交互的可能性。业余时间用来学习相关的知识和技能，在相关的研究方向上到处探寻，有同兴趣的朋友可以联系我一起交流学习。",
    "暂时没有读研的打算，本科毕业后大概直接去工作。学习不是只在学校里进行的，学校只是一个平台而已，希望能在工作中继续学习和成长。",
  ],
  quote: "少年的明天是最清澈的蓝色，值得浪花铺就春衫。",
  focusAreas: [
    {
      title: "机器人感知与自瞄",
      desc: "装甲板目标检测、特征几何解算与多目标跟踪，高帧率实时视觉处理",
      tag: "PERCEPTION",
    },
    {
      title: "状态预测与运动控制",
      desc: "卡尔曼滤波 (EKF) 状态预测、弹道延时补偿与机器人云台动力学解算",
      tag: "CONTROL",
    },
    {
      title: "具身智能与交互",
      desc: "关注具身智能体与真实物理环境的感知交互、空间理解与协同控制",
      tag: "EMBODIED AI",
    },
  ],
  highlights: [
    {
      title: "学习能力强",
      text: "从编程基础较薄弱，到能够在全国 RoboMaster 对抗赛中独立完成英雄机器人视觉算法与控制解算实战应用。",
    },
    {
      title: "持续专注",
      text: "在学习和技术研究中保持长期的专注力与深度攻坚韧性，拒绝浮躁，沉下心探索底层技术实现。",
    },
    {
      title: "高效检索与工程复现",
      text: "具备敏锐的技术文档检索能力，能快速理解官方规范、论文原理与开源框架并高效完成工程迁移调试。",
    },
  ],
};

/* ------------------------------------------------------------
 * 3. 经历与荣誉（时间轴，最新的放最前面）
 * ---------------------------------------------------------- */
export interface ExperienceItem {
  kind: string;
  title: string;
  org: string;
  period: string;
  location?: string;
  badge?: string;
  description?: string;
  highlights?: string[];
  tags?: string[];
}

export const experience: { index: string; title: string; subtitle: string; items: ExperienceItem[] } = {
  index: "02",
  title: "经历与荣誉",
  subtitle: "教育背景、竞赛实战与创新项目",
  items: [
    {
      kind: "教育",
      title: "计算机科学与技术 · 本科",
      org: "深圳大学",
      period: "本科在读",
      location: "广东省深圳市",
      description: "在校主修计算机科学与技术，研究方向聚焦机器人控制、具身智能与计算机视觉。",
      tags: ["机器人控制", "具身智能", "计算机视觉"],
    },
    {
      kind: "竞赛",
      title: "RoboMaster 机甲大师超级对抗赛",
      org: "深圳大学",
      period: "2026",
      badge: "全国一等奖",
      description:
        "担任英雄机器人的视觉算法开发，负责自瞄算法的完整实现，主导目标检测、装甲板识别与高速目标轨迹跟踪。",
      highlights: [
        "战队获得全国一等奖（全国十六强）",
        "英雄兵种获得全国一等奖，贡献值排名兵种组内第三",
        "完成自瞄系统在激烈对抗环境下的极低延时与高命中率稳定运行",
      ],
      tags: ["C++", "OpenCV", "自瞄算法", "目标识别与跟踪", "卡尔曼滤波"],
    },
    {
      kind: "竞赛",
      title: "中国大学生机械工程创新创意大赛 · 智能精密装配赛",
      org: "粤港澳赛区选拔赛",
      period: "2025.09",
      badge: "二等奖",
      description: "参与智能精密装配工艺与机器人执行机构调试，荣获粤港澳赛区选拔赛二等奖。",
      tags: ["机械工程", "精密装配", "机构协同"],
    },
    {
      kind: "竞赛",
      title: "中国国际大学生创新大赛（原「互联网+」）",
      org: "光芯量界项目组",
      period: "2025.08",
      badge: "省银奖",
      description: "作为项目组成员参与技术方案论证与落地开发，贡献值排名组内前三。",
      highlights: ["荣获广东省银奖", "贡献值排名组内第三"],
      tags: ["创新创业", "工程实现"],
    },
  ],
};

/* ------------------------------------------------------------
 * 4. 项目与工程展台
 * ---------------------------------------------------------- */
export interface ProjectItem {
  name: string;
  summary: string;
  description?: string;
  period?: string;
  tags?: string[];
  featured?: boolean;
  architecture?: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; url: string }[];
}

export const projects: { index: string; title: string; subtitle: string; items: ProjectItem[] } = {
  index: "03",
  title: "项目与工程",
  subtitle: "机器人视觉与算法实战开源",
  items: [
    {
      name: "RoboMaster 英雄机器人自瞄视觉框架",
      summary: "英雄机器人高速自瞄算法框架，涵盖工业相机采集、装甲板目标检测识别、卡尔曼滤波轨迹预测与云台姿态解算。",
      description: "在 2026 赛季 RoboMaster 备赛期间负责英雄机器人的视觉算法全链路开发。框架针对实战中的高速对抗机动、光照突变和弹道延时进行了深度优化，代码结构模块化且具备高移植性。",
      period: "2026 赛季",
      tags: ["C++", "OpenCV", "EKF 状态预测", "自瞄算法", "目标识别与跟踪", "ROS"],
      featured: true,
      architecture: [
        "工业相机驱动与高帧率采集",
        "装甲板四点几何识别与分类",
        "扩展卡尔曼滤波 (EKF) 运动轨迹预测",
        "弹道空气阻力延时补偿与云台姿态解算",
        "串口 / CAN 机器人下位机协同通信",
      ],
      metrics: [
        { label: "实战战绩", value: "全国一等奖" },
        { label: "英雄兵种", value: "组内前三" },
        { label: "计算延时", value: "< 5ms" },
      ],
      links: [
        {
          label: "GitHub 源码仓库",
          url: "https://github.com/SZURPVision/RP-26AutoAim-Frame",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------
 * 5. 技能矩阵（机器人与具身智能能力图谱）
 * ---------------------------------------------------------- */
export const skills: {
  index: "04";
  title: string;
  subtitle: string;
  groups: { category: string; icon?: string; items: { name: string; level?: number }[] }[];
} = {
  index: "04",
  title: "技术矩阵",
  subtitle: "机器人控制 · 具身智能 · 计算机视觉能力图谱",
  groups: [
    {
      category: "感知与计算机视觉",
      items: [
        { name: "OpenCV" },
        { name: "目标检测与跟踪" },
        { name: "装甲板特征识别" },
        { name: "数字图像处理" },
        { name: "卡尔曼滤波 (EKF)" },
      ],
    },
    {
      category: "机器人与具身控制",
      items: [
        { name: "ROS" },
        { name: "机器人自瞄与云台解算" },
        { name: "运动学与轨迹规划" },
        { name: "机器人感知交互" },
      ],
    },
    {
      category: "编程语言与底层",
      items: [
        { name: "C / C++" },
        { name: "Python" },
        { name: "Linux / Ubuntu" },
        { name: "Git" },
        { name: "CMake" },
      ],
    },
  ],
};

/* ------------------------------------------------------------
 * 6. 联系方式与赛博终端
 * ---------------------------------------------------------- */
export const contact: {
  index: string;
  title: string;
  subtitle: string;
  items: { label: string; value: string; href?: string; copy?: boolean }[];
  socials: SocialLink[];
} = {
  index: "05",
  title: "联系我",
  subtitle: "有同兴趣的朋友欢迎联系我一起交流机器人与具身智能技术。",
  items: [
    { label: "邮箱", value: "3423046420@qq.com", href: "mailto:3423046420@qq.com" },
    { label: "微信", value: "yzl_7932384" },
    { label: "手机", value: "18027860022", href: "tel:18027860022" },
  ],
  socials: [
    { label: "GitHub", icon: "github", url: "https://github.com/leonal53589" },
    {
      label: "Bilibili",
      icon: "bilibili",
      url: "https://space.bilibili.com/525196092",
    },
    {
      label: "小红书",
      icon: "xiaohongshu",
      url: "https://www.xiaohongshu.com/user/profile/6401f452000000001001e2e4",
    },
  ],
};
