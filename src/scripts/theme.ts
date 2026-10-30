const THEME_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";

function getPreferredTheme(): string {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK
    : LIGHT;
}

// Reuse the value already set by the inline FOUC-prevention script if available.
let themeValue: string =
  (window as unknown as { __theme?: { value: string } }).__theme?.value ??
  getPreferredTheme();

function persist(): void {
  localStorage.setItem(THEME_KEY, themeValue);
  reflect();
}

function reflect(): void {
  const root = document.firstElementChild;
  root?.setAttribute("data-theme", themeValue);
  root?.classList.toggle("dark", themeValue === DARK);
  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  // Fill <meta name="theme-color"> with the computed background colour so
  // Android's browser chrome matches the page background.
  const bg = window.getComputedStyle(document.body).backgroundColor;
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bg);
}

function setup(): void {
  reflect();
  document.querySelector("#theme-btn")?.addEventListener("click", event => {
    const next = themeValue === LIGHT ? DARK : LIGHT;
    const apply = () => {
      themeValue = next;
      persist();
    };

    // 从鼠标位置做圆形扩散的切换动画（不支持的浏览器直接切换）
    const ev = event as MouseEvent;
    const root = document.documentElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!document.startViewTransition || reduce) {
      apply();
      return;
    }

    const r = Math.hypot(
      Math.max(ev.clientX, window.innerWidth - ev.clientX),
      Math.max(ev.clientY, window.innerHeight - ev.clientY)
    );
    root.style.setProperty("--tx", `${ev.clientX}px`);
    root.style.setProperty("--ty", `${ev.clientY}px`);
    root.style.setProperty("--tr", `${r}px`);
    root.classList.add("theme-vt");
    const transition = document.startViewTransition(apply);
    transition.finished.finally(() => root.classList.remove("theme-vt"));
  });
}

setup();

// Re-run after View Transitions navigation.
document.addEventListener("astro:after-swap", setup);

// Carry the theme-color value across View Transitions to prevent the
// Android navigation bar from flashing during page transitions.
document.addEventListener("astro:before-swap", event => {
  const color = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");
  if (color) {
    (event as { newDocument: Document }).newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", color);
  }
});

// Sync with OS-level dark/light preference changes.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches }) => {
    themeValue = matches ? DARK : LIGHT;
    persist();
  });
