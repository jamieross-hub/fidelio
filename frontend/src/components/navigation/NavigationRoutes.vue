<script lang="ts" setup>
import type { ExtendedRouteRecordNormalized } from "@/router/types";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const navRoutes = ref((router.getRoutes() as ExtendedRouteRecordNormalized[]).filter((route) => route.meta.navOptions));
</script>

<template>
    <nav class="flex flex-col gap-2 p-2 h-full max-h-full overflow-y-auto">
        <RouterLink
            v-for="navRoute in navRoutes"
            :key="navRoute.name"
            :to="navRoute"
            class="border border-transparent flex gap-2.5 items-center py-2 md:px-4 rounded hover:bg-muted"
            active-class="active-link bg-primary/15 hover:bg-primary/15"
        >
            <Component :is="navRoute.meta.navOptions.icon" :size="16" :stroke-width="1" class="max-md:hidden text-gray-400" />
            <small class="max-md:text-lg md:font-light">{{ navRoute.meta.navOptions.label }}</small>
        </RouterLink>
    </nav>
</template>

<style scoped>
.active-link * {
    color: var(--color-primary);
}
</style>
