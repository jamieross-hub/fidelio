<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronLeft, mdiChevronRight, mdiChevronDoubleRight, mdiChevronDoubleLeft } from "@mdi/js";

interface Props {
    year: number;
}

interface Emits {
    (event: "update:year", value: number): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();
</script>

<template>
    <div class="flex justify-between items-center">
        <div class="p-1 cursor-pointer hover:bg-card">
            <RouterLink v-if="year > new Date().getFullYear()" :to="{ name: 'year', params: { year: new Date().getFullYear() } }">
                <SvgIcon type="mdi" :path="mdiChevronDoubleLeft" />
            </RouterLink>
        </div>
        <div class="p-1 cursor-pointer hover:bg-card">
            <RouterLink :to="{ name: 'year', params: { year: year - 1 } }">
                <SvgIcon type="mdi" :path="mdiChevronLeft" class="cursor-pointer" />
            </RouterLink>
        </div>
        <div class="flex flex-col gap-1 items-center">
            <h1 class="text-lg font-medium select-none">{{ year }}</h1>
        </div>
        <div class="p-1 cursor-pointer hover:bg-card">
            <RouterLink :to="{ name: 'year', params: { year: year + 1 } }">
                <SvgIcon type="mdi" :path="mdiChevronRight" class="cursor-pointer" />
            </RouterLink>
        </div>
        <div class="p-1 cursor-pointer hover:bg-card">
            <RouterLink v-if="year < new Date().getFullYear()" :to="{ name: 'year', params: { year: new Date().getFullYear() } }">
                <SvgIcon type="mdi" :path="mdiChevronDoubleRight" />
            </RouterLink>
        </div>
    </div>
</template>
