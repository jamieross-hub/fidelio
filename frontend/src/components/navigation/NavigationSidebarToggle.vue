<script lang="ts" setup>
import { MenuIcon } from "lucide-vue-next";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
    <div
        v-if="isOpen"
        class="fixed top-0 left-0 md:hidden w-full h-full bg-black/40 backdrop-blur-xl transition-all ease-out"
        @click="isOpen = false"
    ></div>
    <div class="md:hidden fixed w-fit h-fit bottom-4 right-4">
        <div
            class="flex flex-col p-0! pb-3! absolute -translate-y-full right-0 items-end min-h-fit transition-all ease-out opacity-0"
            :class="{ 'opacity-100': isOpen }"
        >
            <NavigationRoutes v-if="isOpen" class="p-0! pb-3! items-end" />
            <ThemeSwitch class="menu-item" />
        </div>
        <Button variant="default" class="md:hidden z-2 p-5!" @click="isOpen = !isOpen">
            <MenuIcon :size="30" />
        </Button>
    </div>
</template>

<style scoped>
.menu-item {
    width: fit-content;
    text-wrap: nowrap;
    padding-inline: 1rem;
    padding-block: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    transition: 0.1s ease-out;
    cursor: pointer;
}
</style>
