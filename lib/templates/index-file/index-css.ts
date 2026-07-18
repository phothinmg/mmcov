// cspell:disable
export const indexCss = `.table-wrapper {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  background-color: var(--surface);
  position: sticky;
  top: 0;
}
th {
  text-align: left;
  padding: 15px 20px;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  border-top: 1px solid var(--border);
}
th:first-child {
  border-left: 1px solid var(--border);
}
th:last-child {
  border-right: 1px solid var(--border);
}
td {
  padding: 12px 20px;
  border-bottom: 1px solid var(--border);
  font-size: 0.9rem;
}
td:first-child {
  border-left: 1px solid var(--border);
}
td:last-child {
  border-right: 1px solid var(--border);
}
td.high,
td.medium,
td.low {
  font-weight: 500;
}
td a {
  color: var(--link);
  text-decoration: none;
}
td a:hover {
  color: var(--link-hover);
}
tbody tr:hover {
  background: var(--surface);
}
div.badge-container {
  display: grid;
  gap: 12px;
  margin-top: 18px;
  padding: 20px 7px;
}
div.badge-container h2 {
  font-size: clamp(1.18rem, calc(1.13rem + 0.24vw), 1.32rem);
  color: var(--text-muted);
  margin-bottom: 10px;
}

div.badge-code {
  position: relative;
  margin: auto;
  width: 100%;
  background-color: var(--bg);
  overflow: hidden;
  transition: background-color 0.5s;
  margin-top: 7px;
  margin-bottom: 7px;
  border-radius: 3px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--border) 10%, transparent);
}
@media (max-width: 640px) {
  div.badge-code {
    border-radius: 8px;
    margin: 16px 0;
  }
}

div.badge-code > div.code-head {
  display: flex;
  flex-direction: row;
  padding: 0.42rem 1rem;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
}

div.badge-code > div.code-head > span {
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  -webkit-user-select: none;
  user-select: none;
  color: var(--text-muted);
  transition:
    color 0.4s,
    opacity 0.4s;
}

div.badge-code > div.code-head > button {
  position: relative;
  border: none;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  cursor: pointer;
  transition:
    border-color 0.25s,
    background-color 0.25s,
    opacity 0.25s;
}
div.badge-code > div.code-head > button:hover {
  background-color: color-mix(in srgb, var(--text-muted) 10%, transparent);
}
div.badge-code > div.code-head > button::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: var(--text-muted);
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3C/svg%3E");
  -webkit-mask-position: 50%;
  mask-position: 50%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 20px;
  mask-size: 20px;
  transition: background-color 0.25s;
}

div.badge-code > div.code-head > button.copied::before,
div.badge-code > div.code-head > button:hover.copied::before {
  background-color: var(--hr-success);
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3Cpath d='m9 14 2 2 4-4'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3Cpath d='m9 14 2 2 4-4'/%3E%3C/svg%3E");
  -webkit-mask-position: 50%;
  mask-position: 50%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 20px;
  mask-size: 20px;
}
div.badge-container pre {
  margin: 0;
  padding: 7px 18px;
  overflow-x: auto;
  background: var(--surface);
  border: 0.5px solid var(--border);
  display: flex;
  align-items: center;
}
div.badge-container code {
  display: block;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

@media (width <= 760px) {
  div.badge-container {
    margin-top: 16px;
    padding: 16px;
  }

  div.badge-container pre {
    padding: 14px;
  }
}
`;
