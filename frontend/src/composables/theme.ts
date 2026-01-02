import { usePreferredColorScheme, type ColorSchemeType } from "@vueuse/core";
import { ref } from "vue";

const themes = ["dark", "light", "no-preference"] as const;
const localStorageKey = "fidelio-theme";
const theme = ref<ColorSchemeType>();

export default function useTheme() {
    function getTheme() {
        const themeFromLocalStorage = localStorage.getItem(localStorageKey) as ColorSchemeType;

        if (themeFromLocalStorage !== null && themes.includes(themeFromLocalStorage)) return themeFromLocalStorage;

        return usePreferredColorScheme().value;
    }

    function setTheme(newTheme: ColorSchemeType) {
        localStorage.setItem(localStorageKey, newTheme);
        document.documentElement.dataset["theme"] = newTheme;
        theme.value = newTheme;
    }

    return { getTheme, setTheme, theme };
}
