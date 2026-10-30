#!/usr/bin/env node
/**
 * Astro CLI 包装器
 *
 * 为什么需要它：Astro 每次启动都会去读/写家目录下的遥测配置
 * (~/.config/astro/telemetry.json)。在没有家目录写权限的环境里
 * （沙箱、只读容器、CI 的部分镜像），它会直接抛 ENOENT 并让命令失败。
 *
 * 这里统一做两件事：
 *   1. 设置 ASTRO_TELEMETRY_DISABLED=1，关掉遥测；
 *   2. 把 XDG_CONFIG_HOME 指到项目内的 .cache/，保证有地方可写。
 *
 * 用法和 astro 完全一致：node scripts/astro.mjs build / dev / preview ...
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bin = path.join(
  root,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "astro.cmd" : "astro"
);

/** 给子进程准备一份「能在受限环境里跑」的环境变量 */
export function astroEnv() {
  return {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1",
    XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME || path.join(root, ".cache"),
  };
}

/** 运行 node_modules/.bin 里的某个可执行文件 */
export function run(binName, args) {
  return new Promise(resolve => {
    const child = spawn(
      path.join(
        root,
        "node_modules",
        ".bin",
        process.platform === "win32" ? `${binName}.cmd` : binName
      ),
      args,
      { stdio: "inherit", env: astroEnv() }
    );
    child.on("exit", code => resolve(code ?? 1));
  });
}

// 直接执行本文件时，把参数透传给 astro
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const code = await run("astro", process.argv.slice(2));
  process.exit(code);
}

export { root, bin };
