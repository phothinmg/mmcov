export const copyBtn = `(() => {
    const codeBlocks = document.querySelectorAll("[data-shiki-highlighter]");
    if (!codeBlocks.length) return;

    function fallbackCopy(text) {
        const textarea = $.document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();

        let success = false;
        try {
            success = document.execCommand("copy");
        } catch (e) {
            success = false;
        }

        $.document.body.removeChild(textarea);
        return success;
    }

    async function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (e) {
                return fallbackCopy(text);
            }
        }
        return fallbackCopy(text);
    }

    codeBlocks.forEach((block) => {
        const copyBtn = block.querySelector("[data-copy-btn]");
        const code = block.querySelector("pre code");
        if (!copyBtn || !code) return;

        copyBtn.addEventListener("click", async () => {
            const text = code.textContent;
            const success = await copyText(text);
            if (success) {
                copyBtn.classList.add("copied");

                setTimeout(() => {
                    copyBtn.classList.remove("copied");
                }, 1000);
            }
        });
    });
})();
`;
