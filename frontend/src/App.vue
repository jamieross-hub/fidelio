<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import "vue-sonner/style.css";

const route = useRoute();
</script>

<template>
    <!-- Global toast component - Sonner -->
    <Sonner position="top-center" richColors />
    <TooltipProvider>
        <main class="w-full h-full flex gap-5 overscroll-none" :class="{ 'md:p-5': route.meta.showNav }">
            <template v-if="route.meta.showNav">
                <Navigation />
                <PageLayout>
                    <RouterView />
                </PageLayout>
            </template>
            <template v-else>
                <RouterView />
            </template>
        </main>
    </TooltipProvider>
</template>
