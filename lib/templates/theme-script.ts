export const themeScript = `(() => {
    const themeBtn = document.getElementById("theme-btn");
    const rootElement = document.documentElement;
    const themeStorageKey = "mmcov_local_theme";
    if (!themeBtn) return;
  
    const getThemeIcon = (theme) => {
        if (theme === "dark") {
            return \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
    </svg>\`;
        } else {
            return \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" />
</svg>\`;
        }
    };
    let themeSwitchFrame = null;
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem(themeStorageKey);

        if (savedTheme === "dark" || savedTheme === "light") {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };
    const applyTheme = (theme) => {
        rootElement.setAttribute("data-theme", theme);
        rootElement.style.colorScheme = theme;
        themeBtn.innerHTML = getThemeIcon(theme);
    };
    applyTheme(getInitialTheme());
    themeBtn.addEventListener("click", () => {
        const currentTheme = rootElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        rootElement.classList.add("theme-switching");
        applyTheme(nextTheme);
        localStorage.setItem(themeStorageKey, nextTheme);

        if (themeSwitchFrame !== null) {
            cancelAnimationFrame(themeSwitchFrame);
        }

        themeSwitchFrame = requestAnimationFrame(() => {
            rootElement.classList.remove("theme-switching");
            themeSwitchFrame = null;
        });
    });
})();
`;
