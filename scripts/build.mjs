#!/usr/bin/env node
/**
 * 完整构建流程：
 *   1. astro check   —— 类型检查
 *   2. astro build   —— 生成静态站点到 dist/
 *   3. pagefind      —— 为 dist/ 生成静态搜索索引
 *   4. 把搜索索引复制到 public/，这样 dev 模式下搜索也能用
 */
import fs from "node:fs/promises";
import path from "node:path";
import { root, run } from "./astro.mjs";

const step = async (label, fn) => {
  console.log(`\n▶ ${label}`);
  const code = await fn();
  if (code !== 0) {
    console.error(`\n✗ ${label} 失败（退出码 ${code}）`);
    process.exit(code);
  }
};

await step("astro check（类型检查）", () => run("astro", ["check"]));
await step("astro build（生成站点）", () => run("astro", ["build"]));
await step("pagefind（生成搜索索引）", () =>
  run("pagefind", ["--site", "dist"])
);

// pagefind 的输出默认只在 dist/ 里，复制一份到 public/ 供 dev 使用
const from = path.join(root, "dist", "pagefind");
const to = path.join(root, "public", "pagefind");
await fs.rm(to, { recursive: true, force: true });
await fs.cp(from, to, { recursive: true });

console.log("\n✓ 构建完成，产物在 dist/");
