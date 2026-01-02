<script lang="ts" setup>
import type { ExtendedRouteRecordNormalized } from "@/router/types";
import { useUserStore } from "@/stores/user-store";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getFormattedDateString } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";

const route = useRoute();
const router = useRouter();
const navRoutes = ref((router.getRoutes() as ExtendedRouteRecordNormalized[]).filter((route) => route.meta.navOptions));
const userStore = useUserStore();
const sidebarStore = useSidebarStore();
</script>

<template>
    <aside
        class="max-md:absolute max-md:max-h-full max-md:w-[calc(100%-var(--spacing)*10)] page-section flex flex-col gap-5 w-90 min-w-90 max-w-full z-1 overflow-hidden transition-all ease-out"
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
        <nav class="flex flex-col gap-2 p-2 h-full max-h-full overflow-y-auto">
            <RouterLink
                v-for="navRoute in navRoutes"
                :key="navRoute.name"
                :to="navRoute"
                class="border border-transparent flex gap-2.5 items-center py-2 px-4 rounded"
                active-class="active-link"
            >
                <Component :is="navRoute.meta.navOptions.icon" :stroke-width="1" class="text-gray-400" />
                <p>{{ navRoute.meta.navOptions.label }}</p>
            </RouterLink>
        </nav>
        <footer class="flex flex-col gap-5">
            <div class="p-2">
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

<style scoped>
.active-link * {
    color: var(--color-secondary-foreground);
}
.active-link {
    background-color: var(--color-secondary);
    border-color: var(--color-border);
}
</style>
