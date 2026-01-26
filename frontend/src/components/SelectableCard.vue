<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";

interface Props {
    icon: string;
    selectedValue: any;
    deselectValue?: any;
    modelValue: any;
    label: string;
}

interface Emits {
    (event: "update:modelValue", value: any): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
    deselectValue: null,
});
</script>

<template>
    <button
        class="bg-card px-20! py-10! border border-border rounded-lg flex flex-col items-center cursor-pointer group"
        :class="{
            'bg-accent/50! hover:bg-accent/70! border-accent!': modelValue === selectedValue,
            'hover:bg-muted': modelValue !== selectedValue,
        }"
        @click="emit('update:modelValue', modelValue === selectedValue ? deselectValue : selectedValue)"
    >
        <SvgIcon
            type="mdi"
            :path="icon"
            :size="60"
            class="transition-all"
            :class="{
                'text-primary': modelValue === selectedValue,
                'text-foreground/50 group-hover:text-foreground/70': modelValue !== selectedValue,
            }"
        />
        <p
            class="transition-all"
            :class="{
                'text-primary': modelValue === selectedValue,
                'text-foreground/50 group-hover:text-foreground/70': modelValue !== selectedValue,
            }"
        >
            {{ label }}
        </p>
    </button>
</template>
