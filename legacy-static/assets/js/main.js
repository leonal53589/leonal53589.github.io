/* ============================================================
 *  个人主页渲染逻辑
 *  内容全部来自 data/content.js —— 一般不需要改这个文件。
 * ============================================================ */
(function () {
  'use strict';

  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- 工具函数 ---------- */
  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function safeUrl(u) {
    var s = String(u == null ? '' : u).trim();
    if (!s) return '#';
    // 只拦截危险协议，http/https/mailto/tel 以及相对路径都放行
    if (/^(javascript|data|vbscript|file|blob):/i.test(s)) return '#';
    return esc(s);
  }
  function has(v) {
    if (v == null) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'string') return v.trim() !== '' && v.trim().indexOf('TODO') !== 0;
    return true;
  }
  function isTodo(v) {
    return typeof v === 'string' && v.trim().indexOf('TODO') === 0;
  }

  /* ---------- 图标 ---------- */
  var ICONS = {
    github: '<path d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.2 3.3 9.6 7.9 11.2.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.6-3.9-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0C17.6 4.2 18.6 4.5 18.6 4.5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6a11.8 11.8 0 0 0 7.9-11.2A11.5 11.5 0 0 0 12 .5Z"/>',
    email: '<path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.7-.5 7.3 5.6L19.3 5H4.7ZM20 6.7l-7.4 5.7a1 1 0 0 1-1.2 0L4 6.7V19h16V6.7Z"/>',
    bilibili: '<path d="M7.1 2.2 9 5h6l1.9-2.8a1 1 0 1 1 1.7 1.2L17.3 5H19a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1.7L5.4 3.4a1 1 0 0 1 1.7-1.2ZM5 7a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H5Zm3 3a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Z"/>',
    x: '<path d="M17.5 3h3.2l-7 8 7.3 10h-5.6l-4.4-6-5 6H2.8l7.3-8.6L3.1 3h5.7l4.1 5.6L17.5 3Zm-1.1 16h1.4L7.5 4.4H6L16.4 19Z"/>',
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 23 10.6 23 14.1V21h-4v-6.1c0-1.5-.53-2.5-1.85-2.5-1.02 0-1.62.68-1.9 1.34-.1.24-.12.57-.12.9V21h-4V9Z"/>',
    zhihu: '<path d="M14.5 2h5.2c.7 0 1.3.6 1.3 1.3v17.4c0 .7-.6 1.3-1.3 1.3h-5.2V2Zm1.8 3v2h2v-2h-2Zm0 3.6v2h2v-2h-2Zm0 3.6v2h2v-2h-2ZM13 4.2 11.6 6H9.4c-.3 0-.5.2-.5.5v1h2.6l-2.2 3.1c.3.2.6.5.8.9l.9 1.6-2 1.6c-.4.3-.5.9-.2 1.3.2.3.5.4.8.4.2 0 .4-.1.5-.2l1.7-1.3c.5 1 1.2 1.8 2 2.4l-1.6 2.6a1 1 0 0 0 1.7 1l1.6-2.7V4.2Zm-5.4 5.2H3.1c-.6 0-1.1.5-1.1 1.1v1.1H4v6.6c0 .6.5 1.1 1.1 1.1h1.1v-7.7h1.4V9.4Z"/>',
    juejin: '<path d="M12 2 3 7.2l2.2 1.4L12 4.8l6.8 3.8L21 7.2 12 2Zm0 5.6L5.8 11 12 14.5 18.2 11 12 7.6Zm0 5.9-6.9-4-2 1.2L12 16.6l8.9-5.9-2-1.2-6.9 4Z"/>',
    xiaohongshu: '<path d="M22.405 9.879c.002.016.01.02.07.019h.725a.797.797 0 0 0 .78-.972.794.794 0 0 0-.884-.618.795.795 0 0 0-.692.794c0 .101-.002.666.001.777zm-11.509 4.808c-.203.001-1.353.004-1.685.003a2.528 2.528 0 0 1-.766-.126.025.025 0 0 0-.03.014L7.7 16.127a.025.025 0 0 0 .01.032c.111.06.336.124.495.124.66.01 1.32.002 1.981 0 .01 0 .02-.006.023-.015l.712-1.545a.025.025 0 0 0-.024-.036zM.477 9.91c-.071 0-.076.002-.076.01a.834.834 0 0 0-.01.08c-.027.397-.038.495-.234 3.06-.012.24-.034.389-.135.607-.026.057-.033.042.003.112.046.092.681 1.523.787 1.74.008.015.011.02.017.02.008 0 .033-.026.047-.044.147-.187.268-.391.371-.606.306-.635.44-1.325.486-1.706.014-.11.021-.22.03-.33l.204-2.616.022-.293c.003-.029 0-.033-.03-.034zm7.203 3.757a1.427 1.427 0 0 1-.135-.607c-.004-.084-.031-.39-.235-3.06a.443.443 0 0 0-.01-.082c-.004-.011-.052-.008-.076-.008h-1.48c-.03.001-.034.005-.03.034l.021.293c.076.982.153 1.964.233 2.946.05.4.186 1.085.487 1.706.103.215.223.419.37.606.015.018.037.051.048.049.02-.003.742-1.642.804-1.765.036-.07.03-.055.003-.112zm3.861-.913h-.872a.126.126 0 0 1-.116-.178l1.178-2.625a.025.025 0 0 0-.023-.035l-1.318-.003a.148.148 0 0 1-.135-.21l.876-1.954a.025.025 0 0 0-.023-.035h-1.56c-.01 0-.02.006-.024.015l-.926 2.068c-.085.169-.314.634-.399.938a.534.534 0 0 0-.02.191.46.46 0 0 0 .23.378.981.981 0 0 0 .46.119h.59c.041 0-.688 1.482-.834 1.972a.53.53 0 0 0-.023.172.465.465 0 0 0 .23.398c.15.092.342.12.475.12l1.66-.001c.01 0 .02-.006.023-.015l.575-1.28a.025.025 0 0 0-.024-.035zm-6.93-4.937H3.1a.032.032 0 0 0-.034.033c0 1.048-.01 2.795-.01 6.829 0 .288-.269.262-.28.262h-.74c-.04.001-.044.004-.04.047.001.037.465 1.064.555 1.263.01.02.03.033.051.033.157.003.767.009.938-.014.153-.02.3-.06.438-.132.3-.156.49-.419.595-.765.052-.172.075-.353.075-.533.002-2.33 0-4.66-.007-6.991a.032.032 0 0 0-.032-.032zm11.784 6.896c0-.014-.01-.021-.024-.022h-1.465c-.048-.001-.049-.002-.05-.049v-4.66c0-.072-.005-.07.07-.07h.863c.08 0 .075.004.075-.074V8.393c0-.082.006-.076-.08-.076h-3.5c-.064 0-.075-.006-.075.073v1.445c0 .083-.006.077.08.077h.854c.075 0 .07-.004.07.07v4.624c0 .095.008.084-.085.084-.37 0-1.11-.002-1.304 0-.048.001-.06.03-.06.03l-.697 1.519s-.014.025-.008.036c.006.01.013.008.058.008 1.748.003 3.495.002 5.243.002.03-.001.034-.006.035-.033v-1.539zm4.177-3.43c0 .013-.007.023-.02.024-.346.006-.692.004-1.037.004-.014-.002-.022-.01-.022-.024-.005-.434-.007-.869-.01-1.303 0-.072-.006-.071.07-.07l.733-.003c.041 0 .081.002.12.015.093.025.16.107.165.204.006.431.002 1.153.001 1.153zm2.67.244a1.953 1.953 0 0 0-.883-.222h-.18c-.04-.001-.04-.003-.042-.04V10.21c0-.132-.007-.263-.025-.394a1.823 1.823 0 0 0-.153-.53 1.533 1.533 0 0 0-.677-.71 2.167 2.167 0 0 0-1-.258c-.153-.003-.567 0-.72 0-.07 0-.068.004-.068-.065V7.76c0-.031-.01-.041-.046-.039H17.93s-.016 0-.023.007c-.006.006-.008.012-.008.023v.546c-.008.036-.057.015-.082.022h-.95c-.022.002-.028.008-.03.032v1.481c0 .09-.004.082.082.082h.913c.082 0 .072.128.072.128V11.19s.003.117-.06.117h-1.482c-.068 0-.06.082-.06.082v1.445s-.01.068.064.068h1.457c.082 0 .076-.006.076.079v3.225c0 .088-.007.081.082.081h1.43c.09 0 .082.007.082-.08v-3.27c0-.029.006-.035.033-.035l2.323-.003c.098 0 .191.02.28.061a.46.46 0 0 1 .274.407c.008.395.003.79.003 1.185 0 .259-.107.367-.33.367h-1.218c-.023.002-.029.008-.028.033.184.437.374.871.57 1.303a.045.045 0 0 0 .04.026c.17.005.34.002.51.003.15-.002.517.004.666-.01a2.03 2.03 0 0 0 .408-.075c.59-.18.975-.698.976-1.313v-1.981c0-.128-.01-.254-.034-.38 0 .078-.029-.641-.724-.998z"/>',
    orcid: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8.2 7.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Zm-1 3.6h2v7h-2v-7Zm4 0h3.1c2.6 0 3.9 1.3 3.9 3.6s-1.4 3.4-3.9 3.4h-3.1v-7Zm2 1.5v4h1c1.4 0 2-.6 2-2s-.6-2-2-2h-1Z"/>',
    website: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-2.6a13 13 0 0 0-1.3-3.3A8 8 0 0 1 18.9 8ZM12 4.2c.7.9 1.3 2.2 1.7 3.8h-3.4c.4-1.6 1-2.9 1.7-3.8ZM4.3 14a8 8 0 0 1 0-4h2.9a17 17 0 0 0 0 4H4.3Zm.8 2h2.6c.3 1.2.8 2.3 1.3 3.3A8 8 0 0 1 5.1 16Zm2.6-8H5.1a8 8 0 0 1 3.9-3.3A13 13 0 0 0 7.7 8ZM12 19.8c-.7-.9-1.3-2.2-1.7-3.8h3.4c-.4 1.6-1 2.9-1.7 3.8ZM14.1 14H9.9a15 15 0 0 1 0-4h4.2a15 15 0 0 1 0 4Zm.9 5.3c.5-1 1-2.1 1.3-3.3h2.6a8 8 0 0 1-3.9 3.3Zm1.8-5.3a17 17 0 0 0 0-4h2.9a8 8 0 0 1 0 4h-2.9Z"/>',
    sun: '<path d="M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-13a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 14a1 1 0 0 1 1 1V20a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4 11h1.5a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2Zm14.5 0H20a1 1 0 1 1 0 2h-1.5a1 1 0 1 1 0-2ZM5.6 5.6a1 1 0 0 1 1.4 0l1 1a1 1 0 1 1-1.4 1.4l-1-1a1 1 0 0 1 0-1.4Zm10.4 10.4a1 1 0 0 1 1.4 0l1 1a1 1 0 0 1-1.4 1.4l-1-1a1 1 0 0 1 0-1.4Zm2.4-10.4a1 1 0 0 1 0 1.4l-1 1a1 1 0 0 1-1.4-1.4l1-1a1 1 0 0 1 1.4 0ZM7 16a1 1 0 0 1 0 1.4l-1 1a1 1 0 0 1-1.4-1.4l1-1A1 1 0 0 1 7 16Z"/>',
    moon: '<path d="M21 14.2A9 9 0 0 1 9.8 3a1 1 0 0 0-1.2-1.2A10.5 10.5 0 1 0 22.2 15a1 1 0 0 0-1.2-.8Z"/>',
    menu: '<path d="M4 6h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2Zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2Zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2Z"/>',
    close: '<path d="M6.2 4.8 12 10.6l5.8-5.8a1 1 0 1 1 1.4 1.4L13.4 12l5.8 5.8a1 1 0 0 1-1.4 1.4L12 13.4l-5.8 5.8a1 1 0 1 1-1.4-1.4L10.6 12 4.8 6.2a1 1 0 0 1 1.4-1.4Z"/>',
    pin: '<path d="M12 2a7 7 0 0 1 7 7c0 4.6-5.6 11.3-6.4 12.2a.8.8 0 0 1-1.2 0C10.6 20.3 5 13.6 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6.5a2.5 2.5 0 0 0 0 5Z"/>',
    link: '<path d="M10.6 13.4a1 1 0 0 1 0-1.4l1.4-1.4a1 1 0 0 1 1.4 1.4l-1.4 1.4a1 1 0 0 1-1.4 0ZM8.5 15.5a4 4 0 0 1 0-5.7l2.1-2.1a4 4 0 0 1 5.7 5.7l-.7.7a1 1 0 0 1-1.4-1.4l.7-.7a2 2 0 0 0-2.9-2.9l-2.1 2.1a2 2 0 0 0 0 2.9 1 1 0 1 1-1.4 1.4Zm7-7a4 4 0 0 1 0 5.7l-2.1 2.1a4 4 0 0 1-5.7-5.7l.7-.7A1 1 0 0 1 9.8 11l-.7.7a2 2 0 0 0 2.9 2.9l2.1-2.1a2 2 0 0 0 0-2.9 1 1 0 1 1 1.4-1.4Z"/>',
    copy: '<path d="M8 2h9a3 3 0 0 1 3 3v9a1 1 0 1 1-2 0V5a1 1 0 0 0-1-1H8a1 1 0 0 1 0-2ZM4 6h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H4Z"/>'
  };
  function icon(name, size) {
    var p = ICONS[name] || ICONS.link;
    var s = size || 18;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="currentColor" aria-hidden="true">' + p + '</svg>';
  }

  /* ---------- 主题色 ---------- */
  function hexToRgb(hex) {
    var h = String(hex || '').trim().replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (!/^[0-9a-f]{6}$/i.test(h)) return null;
    return parseInt(h.slice(0, 2), 16) + ', ' + parseInt(h.slice(2, 4), 16) + ', ' + parseInt(h.slice(4, 6), 16);
  }

  function applyTheme() {
    var t = S.theme || {};
    var root = document.documentElement;
    // 只设置 -light / -dark 两组变量，由 CSS 按 data-theme 决定实际生效值
    if (t.accent) root.style.setProperty('--accent-light', t.accent);
    if (t.accent2) root.style.setProperty('--accent-2-light', t.accent2);
    if (t.accentDark) root.style.setProperty('--accent-dark', t.accentDark);
    if (t.accent2Dark) root.style.setProperty('--accent-2-dark', t.accent2Dark);

    // 壁纸必须写成「相对文档」的绝对地址。
    // 如果塞进 CSS 变量再给 background-image 用，相对路径会按样式表的位置解析
    // （变成 /assets/css/assets/img/... 然后 404），所以这里直接写内联样式。
    var bgEl = $('bg-image');
    if (bgEl) {
      if (has(t.heroImage)) {
        var u = t.heroImage;
        try { u = new URL(t.heroImage, location.href).href; } catch (e) {}
        bgEl.style.backgroundImage = 'url("' + u + '")';
      } else {
        bgEl.style.display = 'none';
      }
    }
  }

  // 带透明度的颜色要用 rgb 分量，跟着主题切换
  function applyAccentRgb(mode) {
    var t = S.theme || {};
    var root = document.documentElement;
    var a = (mode === 'dark' ? (t.accentDark || t.accent) : t.accent);
    var b = (mode === 'dark' ? (t.accent2Dark || t.accent2) : t.accent2);
    var ra = hexToRgb(a), rb = hexToRgb(b);
    if (ra) root.style.setProperty('--accent-rgb', ra);
    if (rb) root.style.setProperty('--accent-2-rgb', rb);
  }

  /* ---------- 深浅色切换 ---------- */
  var MODE_KEY = 'site-color-mode';
  function preferredMode() {
    var saved = null;
    try { saved = localStorage.getItem(MODE_KEY); } catch (e) {}
    if (saved === 'light' || saved === 'dark') return saved;
    var def = (S.theme && S.theme.defaultMode) || 'auto';
    if (def === 'light' || def === 'dark') return def;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function reduceMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function commitMode(mode, persist) {
    document.documentElement.setAttribute('data-theme', mode);
    applyAccentRgb(mode);
    var btn = $('theme-icon');
    if (btn) btn.innerHTML = icon(mode === 'dark' ? 'sun' : 'moon', 18);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var c = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
      if (c) meta.setAttribute('content', c);
    }
    if (persist) { try { localStorage.setItem(MODE_KEY, mode); } catch (e) {} }
  }

  // 用户点击切换时，用 View Transitions 做从鼠标位置扩散的圆形转场
  function setMode(mode, persist, originEvent) {
    var root = document.documentElement;
    if (originEvent && document.startViewTransition && !reduceMotion()) {
      var x = typeof originEvent.clientX === 'number' ? originEvent.clientX : window.innerWidth / 2;
      var y = typeof originEvent.clientY === 'number' ? originEvent.clientY : 0;
      var r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      root.style.setProperty('--tx', x + 'px');
      root.style.setProperty('--ty', y + 'px');
      root.style.setProperty('--tr', r + 'px');
      root.classList.add('theme-vt');
      var t = document.startViewTransition(function () { commitMode(mode, persist); });
      var done = function () { root.classList.remove('theme-vt'); };
      if (t && t.finished) { t.finished.then(done, done); } else { setTimeout(done, 1000); }
    } else {
      commitMode(mode, persist);
    }
  }

  /* ---------- 区块外壳 ---------- */
  var SECTION_NO = 0;
  function sectionHead(title, subtitle) {
    SECTION_NO += 1;
    var no = (SECTION_NO < 10 ? '0' : '') + SECTION_NO;
    return '<div class="wrap">' +
      '<header class="section-head reveal">' +
        '<p class="section-index">' + no + '</p>' +
        '<h2 class="section-title">' + esc(title) + '</h2>' +
        (has(subtitle) ? '<p class="section-sub">' + esc(subtitle) + '</p>' : '') +
      '</header>' +
      '<div class="section-body">';
  }
  function sectionFoot() { return '</div></div>'; }

  /* ---------- 首屏 ---------- */
  function renderHero() {
    var p = S.profile || {};
    var meta = S.meta || {};

    document.title = meta.title || (p.name ? p.name + ' · 个人主页' : '个人主页');
    var md = $('meta-description'); if (md) md.setAttribute('content', meta.description || '');
    var ot = $('og-title'); if (ot) ot.setAttribute('content', meta.title || '');
    var od = $('og-description'); if (od) od.setAttribute('content', meta.description || '');
    var tt2 = $('twitter-title'); if (tt2) tt2.setAttribute('content', meta.title || '');
    var td2 = $('twitter-description'); if (td2) td2.setAttribute('content', meta.description || '');

    var ogUrl = null;
    if (has(meta.ogImage)) {
      ogUrl = meta.ogImage;
      // og:image 必须是绝对地址，相对路径在运行时补全
      if (!/^https?:/i.test(ogUrl) && location.protocol !== 'file:') {
        ogUrl = location.origin + '/' + ogUrl.replace(/^\.?\//, '');
      }
    }
    ['og-image', 'twitter-image'].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      if (ogUrl) el.setAttribute('content', ogUrl);
      else el.parentNode.removeChild(el);
    });
    var bn = $('brand-name'); if (bn) bn.textContent = p.name || '个人主页';

    if (p.status && p.status.available && has(p.status.text)) {
      var chip = $('hero-status');
      if (chip) { chip.hidden = false; chip.textContent = p.status.text; }
    }

    var hello = $('hero-hello');
    if (hello) {
      if (has(p.location)) hello.textContent = p.location;
      else hello.remove();
    }

    $('hero-name').textContent = p.name || '你的名字';

    var en = $('hero-name-en');
    if (en) {
      if (has(p.latinName)) en.textContent = p.latinName;
      else en.remove();
    }

    $('hero-headline').textContent = p.headline || '';
    $('hero-tagline').textContent = has(p.tagline) ? '「' + p.tagline + '」' : '';

    var av = $('hero-avatar');
    av.src = p.avatar || 'assets/img/avatar.svg';
    av.alt = (p.name || '') + ' 的头像';

    var sc = $('hero-socials');
    (p.socials || []).forEach(function (s) {
      if (!has(s.url)) return;
      sc.insertAdjacentHTML('beforeend',
        '<li><a class="social" href="' + safeUrl(s.url) + '" target="_blank" rel="noopener noreferrer" title="' + esc(s.label || '') + '" aria-label="' + esc(s.label || '') + '">' +
        icon(s.icon || 'link', 20) + '<span class="social-label">' + esc(s.label || '') + '</span></a></li>');
    });

    var ac = $('hero-actions');
    (p.actions || []).forEach(function (a) {
      if (!has(a.href)) return;
      ac.insertAdjacentHTML('beforeend',
        '<a class="btn' + (a.primary ? ' btn-primary' : '') + '" href="' + safeUrl(a.href) + '">' + esc(a.label || '') + '</a>');
    });

    var st = $('hero-stats');
    (p.stats || []).forEach(function (s) {
      st.insertAdjacentHTML('beforeend',
        '<div class="stat"><dt>' + esc(s.value) + '</dt><dd>' + esc(s.label) + '</dd></div>');
    });
    if (!st.children.length) st.remove();

    var bios = (p.bio || []).filter(has);
    var A = S.about || {};
    var aboutParas = (A.paragraphs || []).filter(has);
    if ((bios.length || aboutParas.length) && !(S.sections && S.sections.about === false)) {
      var ab = $('about');
      ab.hidden = false;
      ab.innerHTML = sectionHead(A.title || '关于我', A.subtitle) +
        '<div class="about-grid' + (has(A.photo) ? ' has-photo' : '') + '"><div class="prose reveal">' +
        bios.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
        '</div><div class="about-side reveal">' +
        (has(A.photo) ? '<img class="about-photo" src="' + safeUrl(A.photo) + '" alt="' + esc(p.name || '') + ' 的照片" loading="lazy" />' : '') +
        aboutParas.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
        '</div></div>' +
        ((A.highlights || []).filter(function (h) { return has(h.title); }).length ?
          '<ul class="highlights">' + A.highlights.filter(function (h) { return has(h.title); }).map(function (h) {
            return '<li class="card reveal"><h3>' + esc(h.title) + '</h3><p>' + esc(h.text) + '</p></li>';
          }).join('') + '</ul>' : '') +
        sectionFoot();
    }
  }

  /* ---------- 经历 ---------- */
  function renderExperience() {
    var E = S.experience || {};
    var items = (E.items || []).filter(function (i) { return has(i.title); });
    if (!items.length || S.sections && S.sections.experience === false) return;

    var el = $('experience');
    el.hidden = false;
    var KIND = { education: '教育', work: '工作 / 实习', competition: '竞赛', award: '奖项', project: '项目' };
    var html = sectionHead(E.title || '经历', E.subtitle) + '<ol class="timeline">';
    items.forEach(function (it) {
      var kind = KIND[it.type] || '经历';
      html += '<li class="timeline-item reveal">' +
        '<div class="timeline-dot" aria-hidden="true"></div>' +
        '<div class="timeline-card card">' +
          '<div class="timeline-top">' +
            '<span class="chip chip-kind">' + esc(kind) + '</span>' +
            (has(it.period) ? '<span class="period">' + esc(it.period) + '</span>' : '') +
          '</div>' +
          '<h3 class="timeline-title">' + esc(it.title) + '</h3>' +
          '<p class="timeline-org">' + esc(it.org || '') +
            (has(it.location) ? '<span class="sep">·</span>' + esc(it.location) : '') + '</p>' +
          (has(it.description) ? '<p class="timeline-desc">' + esc(it.description) + '</p>' : '') +
          ((it.highlights || []).filter(has).length ?
            '<ul class="bullets">' + it.highlights.filter(has).map(function (h) {
              return '<li>' + esc(h) + '</li>';
            }).join('') + '</ul>' : '') +
          ((it.tags || []).filter(has).length ?
            '<ul class="tags">' + it.tags.filter(has).map(function (t) {
              return '<li>' + esc(t) + '</li>';
            }).join('') + '</ul>' : '') +
        '</div></li>';
    });
    el.innerHTML = html + '</ol>' + sectionFoot();
  }

  /* ---------- 项目 ---------- */
  function renderProjects() {
    var P = S.projects || {};
    var items = (P.items || []).filter(function (i) { return has(i.name); });
    if (!items.length || S.sections && S.sections.projects === false) return;

    items.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });

    var el = $('projects');
    el.hidden = false;
    el.innerHTML = sectionHead(P.title || '项目', P.subtitle) +
      '<ul class="projects">' + items.map(function (it) {
        return '<li class="project card reveal' + (it.featured ? ' featured' : '') + '">' +
          '<div class="project-head">' +
            '<h3>' + esc(it.name) + '</h3>' +
            (has(it.period) ? '<span class="period">' + esc(it.period) + '</span>' : '') +
          '</div>' +
          (has(it.summary) ? '<p class="project-summary">' + esc(it.summary) + '</p>' : '') +
          (has(it.description) ? '<p class="project-desc">' + esc(it.description) + '</p>' : '') +
          ((it.tags || []).filter(has).length ?
            '<ul class="tags">' + it.tags.filter(has).map(function (t) {
              return '<li>' + esc(t) + '</li>';
            }).join('') + '</ul>' : '') +
          ((it.links || []).filter(function (l) { return has(l.url) && l.url !== '#'; }).length ?
            '<div class="project-links">' + it.links.filter(function (l) { return has(l.url) && l.url !== '#'; }).map(function (l) {
              return '<a class="link" href="' + safeUrl(l.url) + '" target="_blank" rel="noopener noreferrer">' + icon('link', 15) + esc(l.label || '链接') + '</a>';
            }).join('') + '</div>' : '') +
        '</li>';
      }).join('') + '</ul>' + sectionFoot();
  }

  /* ---------- 技能 ---------- */
  function renderSkills() {
    var K = S.skills || {};
    var groups = (K.groups || []).filter(function (g) { return (g.items || []).length; });
    if (!groups.length || S.sections && S.sections.skills === false) return;

    var el = $('skills');
    el.hidden = false;
    // 所有条目都没有 level 时，改成标签云展示（不编造熟练度）
    var withLevels = groups.some(function (g) {
      return (g.items || []).some(function (i) { return typeof i.level === 'number'; });
    });
    el.innerHTML = sectionHead(K.title || '技能', K.subtitle) +
      '<ul class="skill-groups">' + groups.map(function (g) {
        return '<li class="skill-group card reveal"><h3>' + esc(g.category) + '</h3>' +
          (withLevels
            ? '<ul class="skill-list">' + g.items.map(function (it) {
                var lvl = typeof it.level === 'number' ? Math.max(0, Math.min(100, it.level)) : null;
                return '<li class="skill">' +
                  '<div class="skill-top"><span>' + esc(it.name) + '</span>' +
                  (lvl != null ? '<span class="skill-num">' + lvl + '</span>' : '') + '</div>' +
                  (lvl != null ? '<div class="skill-bar"><i style="--w:' + lvl + '%"></i></div>' : '') +
                  '</li>';
              }).join('') + '</ul>'
            : '<ul class="chip-list">' + g.items.map(function (it) {
                return '<li>' + esc(it.name) + '</li>';
              }).join('') + '</ul>') +
          '</li>';
      }).join('') + '</ul>' + sectionFoot();
  }

  /* ---------- 联系 ---------- */
  function renderContact() {
    var C = S.contact || {};
    if (S.sections && S.sections.contact === false) return;

    // 支持 contact.items：[{ label, value, href?, copy? }]
    var items = (C.items || []).filter(function (it) { return has(it.value); });
    if (!items.length && has(C.email)) {
      items = [{ label: '邮箱', value: C.email, href: 'mailto:' + C.email, copy: true }];
    }
    var links = (C.links || []).filter(function (l) { return has(l.url); });
    if (!items.length && !links.length) return;

    var el = $('contact');
    el.hidden = false;
    el.innerHTML = sectionHead(C.title || '联系我', C.subtitle) +
      '<div class="contact card reveal">' +
        (items.length ? '<ul class="contact-list">' + items.map(function (it) {
          var val = String(it.value);
          var isMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
          var href = it.href || (isMail ? 'mailto:' + val : '');
          return '<li class="contact-row">' +
            '<span class="contact-label">' + esc(it.label || '') + '</span>' +
            (href
              ? '<a class="contact-value" href="' + safeUrl(href) + '">' + esc(val) + '</a>'
              : '<span class="contact-value">' + esc(val) + '</span>') +
            (it.copy === false ? '' :
              '<button class="btn btn-ghost copy-btn" type="button" data-copy="' + esc(val) + '">' +
              icon('copy', 15) + '复制</button>') +
            '</li>';
        }).join('') + '</ul>' : '') +
        (has(C.note) ? '<p class="contact-note">' + esc(C.note) + '</p>' : '') +
        (links.length ?
          '<ul class="socials contact-socials">' + links.map(function (l) {
            return '<li><a class="social" href="' + safeUrl(l.url) + '" target="_blank" rel="noopener noreferrer">' +
              icon(l.icon || 'link', 20) + '<span class="social-label">' + esc(l.label || '') + '</span></a></li>';
          }).join('') + '</ul>' : '') +
      '</div>' + sectionFoot();
  }

  /* ---------- 导航 ---------- */
  function renderNav() {
    var map = [
      ['about', '关于'],
      ['experience', '经历'],
      ['projects', '项目'],
      ['skills', '技能'],
      ['contact', '联系'],
    ];
    var nav = $('nav');
    var links = [];
    map.forEach(function (m) {
      var sec = $(m[0]);
      if (sec && !sec.hidden) links.push('<a class="nav-link" href="#' + m[0] + '">' + m[1] + '</a>');
    });
    nav.innerHTML = links.join('');
    if (!links.length) nav.remove();

    var toggle = $('nav-toggle');
    if (toggle) {
      if (links.length < 2) { toggle.remove(); }
      else {
        $('nav-icon').innerHTML = icon('menu', 20);
        toggle.addEventListener('click', function () {
          var open = document.body.classList.toggle('nav-open');
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
          $('nav-icon').innerHTML = icon(open ? 'close' : 'menu', 20);
        });
        nav.addEventListener('click', function (e) {
          if (e.target.closest('a')) {
            document.body.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            $('nav-icon').innerHTML = icon('menu', 20);
          }
        });
      }
    }

    // 滚动高亮
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = en.target.id;
          nav.querySelectorAll('.nav-link').forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      map.forEach(function (m) { var s = $(m[0]); if (s && !s.hidden) io.observe(s); });
    }
  }

  /* ---------- 页脚 ---------- */
  function renderFooter() {
    var m = S.meta || {};
    var p = S.profile || {};
    $('footer-copy').innerHTML = esc((m.copyright || '© {year} ' + (p.name || '')).replace('{year}', new Date().getFullYear()));
    if (has(m.icp)) {
      var el = $('footer-icp');
      el.hidden = false;
      el.textContent = m.icp;
    }
  }

  /* ---------- 入场动画 ---------- */
  function revealAll() {
    document.querySelectorAll('.reveal').forEach(function (n) { n.classList.add('is-visible'); });
  }
  function reveal() {
    var nodes = document.querySelectorAll('.reveal');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { revealAll(); return; }

    // 首屏内已经可见的元素直接显示，避免因视口高度差异被动画卡住
    var vh = window.innerHeight || 0;
    nodes.forEach(function (n) {
      var r = n.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) n.classList.add('is-visible');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

    document.documentElement.classList.add('anim');
    nodes.forEach(function (n, i) {
      if (n.classList.contains('is-visible')) return; // 已在首屏内的不再重复动画
      n.style.transitionDelay = Math.min(i % 6, 5) * 55 + 'ms';
      io.observe(n);
    });

    // 兜底：万一 IntersectionObserver 在这个环境里不触发（部分内嵌浏览器 / 无头环境），
    // 用低频定时器检查元素有没有进入视口，保证内容永远不会「该显示却不显示」
    var sweep = setInterval(function () {
      var vh2 = window.innerHeight || 0;
      var pending = 0;
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.top < vh2 * 0.94 && r.bottom > 0) n.classList.add('is-visible');
        else pending++;
      });
      if (!pending) clearInterval(sweep);
    }, 1200);
    setTimeout(function () { clearInterval(sweep); }, 60000);

    window.addEventListener('beforeprint', revealAll);
  }

  /* ---------- 其余交互 ---------- */
  function interactions() {
    var banner = $('demo-banner');
    if (banner && S.demo) {
      var closed = false;
      try { closed = sessionStorage.getItem('demo-closed') === '1'; } catch (e) {}
      if (!closed) banner.hidden = false;
      var dc = $('demo-close');
      if (dc) dc.addEventListener('click', function () {
        banner.hidden = true;
        try { sessionStorage.setItem('demo-closed', '1'); } catch (e) {}
      });
    }

    var header = $('site-header');
    var bar = $('progress-bar');
    var root = document.documentElement;

    // 这里只写不读，不会引发布局抖动，所以直接同步执行
    function onScroll() {
      var y = window.scrollY || root.scrollTop || 0;
      var vh = window.innerHeight || 1;

      header.classList.toggle('scrolled', y > 12);

      var h = document.documentElement.scrollHeight - vh;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';

      // 背景联动：越往下滚，壁纸越淡、越模糊，并轻微反向位移做视差
      var p = Math.min(1, y / (vh * 0.9));
      root.style.setProperty('--bg-fade', (1 - p * 0.97).toFixed(3));
      root.style.setProperty('--bg-blur', (p * 14).toFixed(1) + 'px');
      root.style.setProperty('--bg-shift', (-y * 0.16).toFixed(1) + 'px');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    // 鼠标光晕（仅精确指针设备 + 未开启减少动效）
    var glow = $('cursor-glow');
    if (glow && !reduceMotion() && window.matchMedia &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var gx = window.innerWidth / 2, gy = window.innerHeight * 0.35;
      var cx = gx, cy = gy, running = false;
      document.body.classList.add('has-cursor');
      glow.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      var follow = function () {
        cx += (gx - cx) * 0.14;
        cy += (gy - cy) * 0.14;
        glow.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
        if (Math.abs(gx - cx) < 0.4 && Math.abs(gy - cy) < 0.4) { running = false; return; }
        requestAnimationFrame(follow);
      };
      window.addEventListener('pointermove', function (e) {
        gx = e.clientX; gy = e.clientY;
        if (!running) { running = true; requestAnimationFrame(follow); }
      }, { passive: true });
    }

    var tt = $('theme-toggle');
    if (tt) {
      tt.addEventListener('click', function (e) {
        var now = document.documentElement.getAttribute('data-theme');
        setMode(now === 'dark' ? 'light' : 'dark', true, e);
      });
    }

    document.addEventListener('click', function (e) {
      var b = e.target.closest('.copy-btn');
      if (!b) return;
      var text = b.getAttribute('data-copy') || '';
      var done = function () { toast('已复制：' + text); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
      } else { fallbackCopy(text, done); }
    });
  }
  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toast('复制失败，请手动选择'); }
    document.body.removeChild(ta);
  }
  var toastTimer;
  function toast(msg) {
    var t = $('toast');
    t.textContent = msg; t.hidden = false; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); t.hidden = true; }, 1800);
  }

  /* ---------- 启动 ---------- */
  applyTheme();
  setMode(preferredMode(), false);
  renderHero();
  renderExperience();
  renderProjects();
  renderSkills();
  renderContact();
  renderNav();
  renderFooter();
  interactions();
  reveal();

  if (window.matchMedia) {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        var saved = null;
        try { saved = localStorage.getItem(MODE_KEY); } catch (err) {}
        if (!saved) setMode(e.matches ? 'dark' : 'light', false);
      });
    } catch (e) {}
  }
})();
