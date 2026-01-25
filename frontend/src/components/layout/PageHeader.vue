<script setup lang="ts">
interface Props {
    title: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="sticky top-0 flex justify-between items-center p-6 bg-sidebar">
        <h1 class="text-2xl font-bold">{{ title }}</h1>
        <slot></slot>
    </div>
</template>
