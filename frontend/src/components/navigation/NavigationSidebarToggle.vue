<script lang="ts" setup>
import { ref } from "vue";
import { DrawerHandle, DrawerRoot, DrawerTrigger, DrawerPortal, DrawerOverlay, DrawerContent } from "vaul-vue";

const isOpen = ref(true);

const snapPoints = [`${window.innerHeight - 215}px`, 1];
const activeSnapPoint = ref(snapPoints[0]);

const setSnap = (snap: number | string) => {
    if (typeof snap === "number") activeSnapPoint.value = snap;
};
</script>

<template>
    <DrawerRoot
        direction="bottom"
        :open="isOpen"
        :handleOnly="true"
        :dismissible="false"
        :snap-points="snapPoints"
        :active-snap-point="activeSnapPoint"
        :modal="false"
        @update:active-snap-point="setSnap"
    >
        <DrawerPortal>
            <DrawerContent
                class="flex flex-col gap-5 z-9999 h-full mt-24 max-h-fit fixed bottom-0 left-0 right-0 bg-card p-4 menu-shadow rounded-t-2xl"
            >
                <DrawerHandle class="bg-accent! w-24!"></DrawerHandle>
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
