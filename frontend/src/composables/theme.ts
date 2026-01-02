import { usePreferredColorScheme, type ColorSchemeType } from "@vueuse/core";

export default function useTheme() {
    const themes = ["dark", "light", "no-preference"] as const;
    const localStorageKey = "fidelio-theme";

    function getTheme() {
        const themeFromLocalStorage = localStorage.getItem(localStorageKey) as ColorSchemeType;

        if (themeFromLocalStorage !== null && themes.includes(themeFromLocalStorage)) return themeFromLocalStorage;

        return usePreferredColorScheme().value;
    }

    function setTheme(theme: ColorSchemeType) {
        localStorage.setItem(localStorageKey, theme);
        document.documentElement.dataset["theme"] = theme;
    }

    return { getTheme, setTheme };
}
