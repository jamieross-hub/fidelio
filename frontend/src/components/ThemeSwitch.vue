<script lang="ts" setup>
import useTheme from "@/composables/theme";
import { ref, capitalize } from "vue";

const { setTheme, theme } = useTheme();
const darkModeEnabled = ref(theme.value === "dark");
</script>

<template>
    <div class="flex items-center space-x-2">
        <Switch
            class="border-border"
            id="theme-switch"
            v-model="darkModeEnabled"
            @update:model-value="(value) => (value ? setTheme('dark') : setTheme('light'))"
        />
        <Label for="theme-switch">
            <small>{{ capitalize(theme || "") }} mode</small>
        </Label>
    </div>
</template>
