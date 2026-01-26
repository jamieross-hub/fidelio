<script lang="ts" setup>
import useTheme from "@/composables/theme";
import { capitalize, computed } from "vue";

const { setTheme, theme } = useTheme();
const darkModeEnabled = computed(() => theme.value === "dark");
</script>

<template>
    <div class="flex items-center space-x-2">
        <Switch
            class="border-border"
            id="theme-switch"
            :modelValue="darkModeEnabled"
            @update:model-value="(value) => (value ? setTheme('dark') : setTheme('light'))"
        />
        <Label for="theme-switch" class="text-nowrap">
            <small>{{ capitalize(theme || "") }} mode</small>
        </Label>
    </div>
</template>
