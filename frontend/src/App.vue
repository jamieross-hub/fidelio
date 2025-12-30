<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import "vue-sonner/style.css";

const route = useRoute();
</script>

<template>
    <!-- Global toast component - Sonner -->
    <Sonner position="top-center" richColors />
    <TooltipProvider>
        <main class="w-full flex gap-5 overscroll-none p-5 h-full">
            <template v-if="route.meta.showNav">
                <NavigationSidebar class="max-md:hidden md:w-90 md:min-w-90 h-full min-h-full" />
                <div class="w-full max-w-full h-full max-h-full overflow-y-auto border p-3.5 shadow-xl rounded border-gray-200 bg-card">
                    <RouterView />
                </div>
            </template>
            <template v-else>
                <RouterView />
            </template>
        </main>
    </TooltipProvider>
</template>
