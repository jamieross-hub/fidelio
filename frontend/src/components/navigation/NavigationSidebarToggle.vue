<script lang="ts" setup>
import { useSidebarStore } from "@/stores/sidebar-store";
import { MenuIcon } from "lucide-vue-next";

const sidebarStore = useSidebarStore();
</script>

<template>
    <Button
        variant="default"
        class="md:hidden fixed bottom-3 right-3 z-2"
        @click="sidebarStore.toggleSidebar"
        :class="{ 'bottom-10 right-15.5 bg-white hover:bg-gray-50 border': sidebarStore.isOpen }"
    >
        <MenuIcon :class="{ 'text-black': sidebarStore.isOpen }" />
    </Button>
</template>
