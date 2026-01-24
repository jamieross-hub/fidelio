<script lang="ts" setup>
import { useUserStore } from "@/stores/user-store";
import { getFormattedDateString } from "@/lib/utils";

const userStore = useUserStore();
</script>

<template>
    <aside
        class="max-md:hidden max-md:absolute max-md:max-h-full max-md:w-[calc(100%-var(--spacing)*10)] page-section p-3.5 flex flex-col gap-5 w-90 min-w-90 max-w-full z-1 overflow-hidden transition-all ease-out"
    >
        <header class="flex w-full items-center gap-3 p-4">
            <img class="bg-white border rounded-full p-1 shadow-lg w-6 aspect-square drag-none z-1" src="/192w/icon.png" />
            <div class="flex flex-col justify-center items-start text-left">
                <h1 class="font-medium text-lg">Fidelio Club.</h1>
            </div>
        </header>
        <NavigationRoutes />
        <footer class="flex flex-col gap-5">
            <div class="flex flex-col gap-5">
                <ThemeSwitch />
                <CurrencySelect class="w-full" />
            </div>
            <hr />
            <div class="flex gap-3">
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
