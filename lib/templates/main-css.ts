// cspell:disable
export const mainCss = `:root {
  --bg: #f6f8fb;
  --bg-soft: #e9eef524;
  --surface: #ffffff;
  --surface-soft: #edf3f8;
  --surface-muted: #f4f7fb;
  --border: #d9e0ea;
  --text: #253041;
  --text-muted: #66758a;
  --link: #0b6bcb;
  --link-hover: #084f97;
  --bg-banner: #edf3f8;
  --text-banner: #415268;
  --shadow: 0 18px 40px rgba(27, 42, 69, 0.08);
  --radius-shell: 28px;
  --radius-card: 18px;
  --high: #166a45;
  --medium: #9a6300;
  --low: #b33325;
  --hr-success: #18794e;
}
html[data-theme="dark"] {
  --bg: #11161d;
  --bg-soft: #7b8da61f;
  --surface: #161d26;
  --surface-soft: #1d2632;
  --surface-muted: #202b38;
  --border: #2d3948;
  --text: #dce5ef;
  --text-muted: #97a7bb;
  --link: #8fc2ff;
  --link-hover: #b6d8ff;
  --bg-banner: #1b2532;
  --text-banner: #d9e2ee;
  --shadow: 0 24px 54px rgba(0, 0, 0, 0.35);
  --high: #6ed6a0;
  --medium: #f0bc68;
  --low: #ff9384;
  --hr-success: #3dd68c;
}
:root {
  --font-san:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
  --font-mono: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  --width-max: 1440px;
  --shadow-pt: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
}
html[data-theme="dark"] .shiki {
  background-color: var(--shiki-dark-bg) !important;
}
html[data-theme="dark"] .shiki span {
  color: var(--shiki-dark) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}

html[data-pf-theme="dark"] {
  color-scheme: dark;
}
*,
:before,
:after {
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
  border-spacing: 0;
}
html {
  -webkit-text-size-adjust: 100%;
  font-size: 16px;
  line-height: 1.4;
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}
html.theme-switching *,
html.theme-switching *::before,
html.theme-switching *::after {
  transition: none !important;
}
body {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: 100dvh;
  line-height: 24px;
  font-family: var(--font-san);
  background-color: var(--bg);
  color: var(--text);
  font-synthesis: style;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-autospace: normal;
  text-spacing-trim: normal;
  margin: 0;
  padding-top: 0;
  font-size: 16px;
  font-weight: 400;
  background-image: radial-gradient(
    circle at top,
    var(--bg-soft),
    transparent 45%
  );
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}
main {
  width: 100%;
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 40px 24px 64px;
}
.banner {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 32px;
  background-color: var(--bg-banner);
  color: var(--text-banner);
  border: 1px solid var(--border);
  border-bottom: 0;
  border-radius: var(--radius-shell) var(--radius-shell) 0 0;
  row-gap: 24px;
}
.banner h1 {
  font-weight: 700;
  font-size: clamp(1.29rem, calc(1.2rem + 0.41vw), 1.51rem);
  line-height: 1.15;
  text-align: left;
  max-width: 24ch;
}
.banner .banner-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.banner .banner-controls div.banner-nav{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.banner .back-home {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background-color: var(--surface);
  color: var(--link);
  font-size: 0.94rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}
.banner .back-home.none {
  opacity: 0;
}
.banner .back-home:hover {
  color: var(--link-hover);
  background-color: var(--surface-soft);
}
.banner #theme-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  min-width: 132px;
  min-height: 40px;
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background-color: var(--surface);
  color: var(--text-muted);
  box-shadow: inset 0 1px 0
    color-mix(in srgb, var(--surface-soft), transparent 15%);
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}
.banner #theme-btn::before {
  content: "Switch to dark";
}
html[data-theme="dark"] .banner #theme-btn::before {
  content: "Switch to light";
}
.banner #theme-btn:hover {
  color: var(--link-hover);
  background-color: var(--surface-soft);
}
.banner #theme-btn:active {
  transform: translateY(1px);
}
.banner #theme-btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--link), transparent 55%);
  outline-offset: 3px;
}
.banner .report {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
}
.banner .report .item {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 18px 20px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  box-shadow: inset 0 1px 0
    color-mix(in srgb, var(--surface-soft), transparent 10%);
}
.banner .report .item .label {
  font-size: 0.81rem;
  color: var(--text-muted);
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}
.banner .report .item .result {
  display: flex;
  flex-direction: column;
}
.high {
  color: var(--high);
}
.medium {
  color: var(--medium);
}
.low {
  color: var(--low);
}
.banner .report .item .result p {
  display: inline-flex;
  gap: 10px;
  color: inherit;
  align-content: center;
}
.banner .report .item .result p span.percent {
  font-size: 1.5rem;
  font-weight: bold;
}
.banner .report .item .result p span.info {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-muted);
}
.banner + .shiki {
  border-top: 0;
  border-radius: 0 0 var(--radius-shell) var(--radius-shell);
  box-shadow: var(--shadow);
}

@media (max-width: 760px) {
  main {
    padding: 18px 10px 32px;
  }

  .banner {
    align-items: stretch;
    padding: 20px 16px 16px;
    row-gap: 16px;
    border-radius: 22px 22px 0 0;
  }

  .banner .banner-controls {
    flex-direction: column;
    align-items: stretch;
  }
  .banner .banner-controls div.left {
    flex-direction: column;
    align-items: stretch;
  }
  .banner .back-home {
    width: 100%;
    justify-content: center;
  }

  .banner #theme-btn {
    width: 100%;
  }

  .banner .report {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .banner .report .item {
    min-width: 100%;
    padding: 14px 16px;
  }

  .banner .report .item .result p {
    flex-wrap: wrap;
    gap: 6px;
  }

  .banner + .shiki {
    border-radius: 0 0 22px 22px;
  }
}

.footer {
  text-align: center;
  padding: 1rem;
}
.footer a {
  text-decoration: none;
  color: var(--link);
}
.footer small {
  font-size: 16px;
  font-weight: 500;
}
.footer a:hover {
  color: var(--link-hover);
  text-decoration: underline;
}
`;
