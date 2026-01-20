<script lang="ts" setup>
import { useUserStore } from "@/stores/user-store";
import { getFormattedDateString } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";

const userStore = useUserStore();
const sidebarStore = useSidebarStore();
</script>

<template>
    <aside
        class="max-md:hidden max-md:absolute max-md:max-h-full max-md:w-[calc(100%-var(--spacing)*10)] page-section p-3.5 flex flex-col gap-5 w-90 min-w-90 max-w-full z-1 overflow-hidden transition-all ease-out"
        :class="{ 'max-md:opacity-0 max-md:pointer-events-none max-md:-translate-x-full': !sidebarStore.isOpen }"
    >
        <header class="flex w-full items-center gap-3 p-2">
            <img class="bg-white border rounded-full p-2 shadow-lg min-w-14 w-14 h-14 drag-none z-1" src="/192w/icon.png" />
            <div class="flex flex-col justify-center items-start text-left">
                <h1 class="font-black text-xl">Fidelio Club</h1>
                <small class="font-light">Take control of your finances</small>
            </div>
        </header>
        <hr />
        <NavigationRoutes />
        <footer class="flex flex-col gap-5">
            <div class="flex flex-col gap-5 p-2">
                <ThemeSwitch />
                <CurrencySelect class="w-full" />
            </div>
            <hr />
            <div class="flex gap-3 p-2">
                <template v-if="userStore.user">
                    <img :src="userStore.user.image ?? undefined" class="w-10 h-10" />
                    <div class="flex flex-col">
                        <h1 class="font-bold">{{ userStore.user.username }}</h1>
                        <h2 class="text-md">{{ userStore.user.email }}</h2>
                        <small class="font-light">Member since {{ getFormattedDateString(userStore.user.createdAt) }}</small>
                    </div>
                </template>
            </div>
        </footer>
    </aside>
</template>
