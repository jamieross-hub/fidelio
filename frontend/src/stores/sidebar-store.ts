import { useWindowSize } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSidebarStore = defineStore("sidebar", () => {
    const isOpen = ref(false);

    const { width, height } = useWindowSize();

    function openSidebar() {
        isOpen.value = true;
    }

    function closeSidebar() {
        isOpen.value = false;
    }

    function toggleSidebar() {
        isOpen.value = !isOpen.value;
    }

    watch(width, (newValue) => {
        if (newValue > 768) isOpen.value = false;
    });

    return { isOpen, openSidebar, closeSidebar, toggleSidebar };
});
