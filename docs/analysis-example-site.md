# 示例站点分析：https://willy3374.top/

> 采集时间：2026-09-26，全部结论来自实际请求（响应头、HTML meta、接口探测），非猜测。

## 一句话结论

这是一个 **Halo 2.26.1** 搭建的个人站（站点名「叁叁柒肆 - 🐕窝」），
后端是 Java / Spring Boot，前面套了 **Cloudflare**，前台用的是开源主题 **Serenity-Grace**。
你说的「有后端响应」判断是对的。

## 二、技术栈证据

| 项目 | 值 | 来源 |
| --- | --- | --- |
| CMS | **Halo 2.26.1** | HTML 中 `<meta name="generator" content="Halo 2.26.1">` |
| 后端框架 | Spring Boot（Java） | `/actuator/health` 返回 `{"groups":["liveness","readiness"],"status":"UP"}`，且 404 响应体是 `application/problem+json` |
| 边缘/CDN | Cloudflare | 响应头 `server: cloudflare`、`cf-ray`、`cf-cache-status: DYNAMIC`、`speculation-rules` |
| 前台主题 | **theme-Serenity** | HTML 注释 `Theme: theme-Serenity / Author: Serenity / Build: 2026-09-06 / Fingerprint: ...`，静态资源路径含 `/themes/theme-Serenity/` |
| 主题来源 | 开源项目 `atangccc/Serenity-Grace` | https://github.com/atangccc/Serenity-Grace（README 自述「面向 Halo 2.x 的个人博客主题」） |
| 插件 | `online-user`（在线人数统计） | 页面引用了 `/apis/online-user.zyx2012.cn/v1alpha1/stats/summary` |
| 渲染方式 | 服务端渲染 + PJAX 局部刷新 | 首屏 HTML 就带完整内容；主题 README 明确写了基于 PJAX |
| SEO | 有 `/sitemap.xml`；`/rss.xml` 不存在（404） | 实测 |

## 三、"有后端"到底体现在哪

1. **管理后台**：`/console` 是登录入口，Halo 自带后台，可以在线写文章、传附件、改主题配置。
2. **内容 API**：`/apis/...` 一组 REST 接口（Halo 的 CRD 风格 API）。实测匿名访问时：
   - `/apis/api.console.halo.run/...` → 302 跳转（需要登录）
   - `/apis/api.halo.run/v1alpha1/posts` → 404 `No static resource ...`
   
   也就是说**接口存在但未对匿名开放**，前台页面是服务端渲染好再吐出来的。
3. **动态能力**：搜索、文章阅读量、站点总访问量、评论区、相册、在线人数，这些都要后端配合。
4. **附件与媒体**：`/upload/IMG_3565.PNG` 这类路径是 Halo 的附件存储。

## 四、站点结构（可以当作你未来的信息架构参考）

导航：文章 / Wiki / 相册 / 项目 / 小工具 / 关于 / 记得 / 友链 / 联系方式

首页板块：

1. **Hero**：Logo、站点名、一句 slogan、身份三行、Bilibili + 邮箱图标
2. **风向标**：快捷导航宫格
3. **近期笔记**：编号 + 封面 + 标题 + 日期 + 摘要 + 阅读量
4. **站点动态**：类似时间线的活动流（发布文章、上传图片、添加标签）
5. **随想碎片**：图片瀑布流
6. 页脚：版权 + 本站运行时长 + 十年之约倒计时

## 五、优缺点评估

**优点**

- 功能完整：文章、相册、项目、友链、评论、统计一应俱全，不用自己写。
- 后台可视化，长期维护成本低。
- 主题成熟，暗色模式、PJAX、响应式都做好了。

**代价 / 风险**

- 需要一台服务器（或云主机）+ 域名；国内服务器还要备案。
- 要自己维护 Java 运行时、数据库、备份、升级、HTTPS、防攻击。
- 访问量不大的话，机器成本 > 收益；用 Cloudflare 挡在前面说明运维是有负担的。
- 主题是别人写的，深度定制要读源码。

## 六、如果你想复刻这条路

```bash
# 1. 一台服务器 + Docker
docker run -it -d --name halo -p 8090:8090 \
  -v ~/.halo2:/root/.halo2 \
  -e HALO_EXTERNAL_URL=https://your-domain.com \
  halohub/halo:2.20

# 2. 反代（Nginx / Caddy）绑定域名 + HTTPS
# 3. 进 /console 初始化，装主题 Serenity-Grace，开始写内容
```

## 七、和我们当前方案的关系

当前工作区搭的是**纯静态**版本：零依赖、零服务器、丢到任何静态托管就能用，
上线成本约等于 0，改内容只需要编辑一个 JS 文件。

两者的能力差主要在「后台管理」和「评论/统计」。
建议路径：**先用静态版把门面和简历跑起来** → 如果后面真的需要写博客、管相册，再上 Halo，
把静态首页作为入口，博客挂 `/blog` 子路径。
