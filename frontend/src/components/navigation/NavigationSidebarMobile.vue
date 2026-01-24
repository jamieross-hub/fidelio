<script lang="ts" setup>
import { computed, ref } from "vue";
import { DrawerHandle, DrawerRoot, DrawerPortal, DrawerContent } from "vaul-vue";
import { clamp } from "lodash";

const snapPoints = [`${window.innerHeight - 215}px`, 1];
const activeSnapPoint = ref(snapPoints[0]);

const isOpen = computed(() => activeSnapPoint.value === snapPoints[1]);

const dragPoint = ref(1);

const overlayOpacity = computed(() => clamp(dragPoint.value, 0, 0.5));

const setSnap = (snap: number | string) => {
    activeSnapPoint.value = snap;
    dragPoint.value = clamp(snapPoints.indexOf(snap), 0, 0.5);
};

const handleDrag = (value: number) => (dragPoint.value = (1 - value) / 2);
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
                class="md:hidden flex flex-col gap-5 z-9999 h-full mt-24 max-h-fit fixed bottom-0 left-0 right-0 bg-card p-4 menu-shadow rounded-t-2xl"
            >
                <DrawerHandle class="bg-accent! w-24!" />
                <div>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                </div>
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
