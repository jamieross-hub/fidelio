<script setup lang="ts">
import { useCurrency } from "@/composables/currency";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/stores/settings-store";

interface Props {
    monthName: string;
    year: number;
    income: number | null;
    expenses: number | null;
    remaining: number | null;
    isCurrentMonth: boolean;
}

const props = defineProps<Props>();

const { getFormattedCurrencyString } = useCurrency();
const { settings } = storeToRefs(useSettingsStore());
</script>

<template>
    <RouterLink :to="{ name: 'month', params: { year, month: monthName } }">
        <div
            class="h-full w-full flex flex-col items-center justify-center gap-5 border border-transparent rounded-lg p-5 cursor-pointer hover:bg-card hover:border-border focus-visible:bg-card focus:border focus:border-border active:shadow-inner group transition-all ease-out"
        >
            <h1 class="w-full border-b border-border font-bold">{{ monthName }}</h1>
            <div class="flex flex-col w-full gap-5">
                <div class="flex flex-col justify-between">
                    <div class="flex justify-between">
                        <p class="font-extralight">Income</p>
                        <Skeleton v-if="income === null" class="w-12" />
                        <p v-else>{{ getFormattedCurrencyString(income, settings.currency.code) }}</p>
                    </div>
                    <div class="flex justify-between">
                        <p class="font-extralight">Outgoings</p>
                        <Skeleton v-if="expenses === null" class="w-12" />
                        <p v-else>{{ getFormattedCurrencyString(expenses, settings.currency.code) }}</p>
                    </div>
                </div>
                <div class="flex justify-between">
                    <p class="font-extralight">Spare</p>
                    <Skeleton v-if="remaining === null" class="w-26 h-10" />
                    <p v-else class="text-4xl group-hover:font-bold transition-all">
                        {{ getFormattedCurrencyString(remaining, settings.currency.code) }}
                    </p>
                </div>
            </div>
        </div>
    </RouterLink>
</template>
