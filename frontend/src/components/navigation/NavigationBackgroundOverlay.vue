<script lang="ts" setup>
import { useSidebarStore } from "@/stores/sidebar-store";

const sidebarStore = useSidebarStore();
</script>

<template>
    <div
        v-if="sidebarStore.isOpen"
        class="md:hidden fixed top-0 left-0 w-full h-full bg-black/20 blur-xl"
        @click="sidebarStore.closeSidebar"
    ></div>
</template>
