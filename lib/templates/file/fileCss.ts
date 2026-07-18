// cspell:disable
export const fileCss = `:root {
  --shiki-border: #c2c2c4;
  --shiki-code-block-lang: #67676c;
  --shiki-text-lines-number: #67676c;
  --shiki-code-bg: #ffffff;
  --shiki-miss-line: #fbeaea;
  --shiki-found-line: #eef8ee;
}
html[data-theme="dark"] {
  --shiki-border: #3c3f44;
  --shiki-code-block-lang: #98989f;
  --shiki-text-lines-number: #98989f;
  --shiki-code-bg: #1e1e1e;
  --shiki-miss-line: #4a1f24;
  --shiki-found-line: #173a2c;
}
/* Shiki */
.shiki {
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 0 0 20px;
  background: var(--shiki-code-bg);
  overflow-x: auto;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  border: 0.5px solid var(--shiki-border);
  border-radius: var(--radius-shell);
}
.shiki code {
  display: block;
  padding: 0 24px 6px;
  width: fit-content;
  min-width: 100%;
  line-height: 1.7;
  font-size: 0.875em;
  color: var(--shiki-code-block-lang);
  transition: color 0.5s;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  counter-reset: step;
  counter-increment: step 0;
}
.shiki .line::before {
  content: counter(step);
  counter-increment: step;
  width: 1rem;
  margin-right: 1.5rem;
  display: inline-block;
  text-align: right;
  color: var(--shiki-text-lines-number);
}
.shiki code .line {
  background-color: var(--shiki-found-line);
  transition: background-color 0.5s;
  margin: 0 -24px;
  padding: 0 24px;
  width: calc(100% + 48px);
  display: inline-block;
}
.shiki code .line.highlighted {
  background-color: var(--shiki-miss-line);
}

@media (max-width: 760px) {
  .shiki {
    padding: 10px 0 14px;
  }

  .shiki code {
    padding: 0 14px 4px;
  }

  .shiki .line::before {
    margin-right: 1rem;
  }

  .shiki code .line {
    margin: 0 -14px;
    padding: 0 14px;
    width: calc(100% + 28px);
  }
}
`;
