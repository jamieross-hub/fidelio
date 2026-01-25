<script lang="ts" setup>
import { computed, ref, useTemplateRef, watchEffect } from "vue";
import { DrawerHandle, DrawerRoot, DrawerPortal, DrawerContent, DrawerTitle, DrawerDescription } from "vaul-vue";
import { clamp } from "lodash";
import { remToPixels } from "@/lib/utils";
import { useUserStore } from "@/stores/user-store";
import { VisuallyHidden } from "reka-ui";

const userStore = useUserStore();

const snapPoints = ref<(string | number)[]>([]);
const activeSnapPoint = ref();

const isOpen = computed(() => snapPoints.value && activeSnapPoint.value === snapPoints.value[1]);

const dragPoint = ref(0);

const overlayOpacity = computed(() => clamp(dragPoint.value, 0, 0.5));

const setSnap = (snap: number | string) => {
    if (!snapPoints.value) return;
    activeSnapPoint.value = snap;
    dragPoint.value = clamp(snapPoints.value.indexOf(snap), 0, 0.5);
};

const handleDrag = (value: number) => (dragPoint.value = (1 - value) / 2);

const drawer = useTemplateRef("drawer");
const handle = useTemplateRef("handle");

const spacing = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue("--spacing"));
const padding = remToPixels(spacing * 5);
const gap = remToPixels(spacing * 4);

watchEffect(() => {
    if (!drawer.value || !handle.value) return;
    const handleSectionHeight = drawer.value.$el.offsetHeight - (spacing + padding + gap + handle.value.$el.offsetHeight);
    snapPoints.value = [`${window.innerHeight - handleSectionHeight}px`, 1];
    activeSnapPoint.value = snapPoints.value[0];
});
</script>

<template>
    <DrawerRoot
        direction="bottom"
        :open="true"
        :handleOnly="true"
        :dismissible="false"
        :snapPoints="snapPoints"
        :activeSnapPoint="activeSnapPoint"
        :modal="false"
        :should-scale-background="true"
        @update:active-snap-point="setSnap"
        @drag="handleDrag"
    >
        <DrawerPortal>
            <div
                @click="setSnap(snapPoints[0])"
                class="md:hidden fixed top-0 left-0 w-full h-full bg-black z-9998"
                :style="{ opacity: overlayOpacity, pointerEvents: isOpen ? 'auto' : 'none' }"
            ></div>
            <DrawerContent
                ref="drawer"
                class="md:hidden flex flex-col gap-5 z-9999 h-full mt-24 max-h-fit fixed bottom-0 left-0 right-0 bg-card p-4 menu-shadow rounded-t-2xl"
            >
                <VisuallyHidden>
                    <DrawerTitle>Navigation drawer</DrawerTitle>
                    <DrawerDescription>Mobile drawer containing the app routes and settings</DrawerDescription>
                </VisuallyHidden>
                <DrawerHandle ref="handle" class="bg-accent! w-24!" />
                <NavigationRoutes class="h-fit!" />
                <hr />
                <footer class="flex justify-between items-center">
                    <template v-if="userStore.user">
                        <img :src="userStore.user.image ?? undefined" class="w-10 h-10" />
                    </template>
                    <div class="flex gap-5">
                        <ThemeSwitch />
                        <CurrencySelect class="w-full" />
                    </div>
                </footer>
            </DrawerContent>
        </DrawerPortal>
    </DrawerRoot>
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

.menu-shadow {
    box-shadow: 0 -5px 13px 1px rgba(0, 0, 0, 0.1);
}
</style>
