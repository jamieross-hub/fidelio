<script setup lang="ts">
import { apiClient } from "@/api/client";
import { useCurrency } from "@/composables/currency";
import { useSettingsStore } from "@/stores/settingsStore";
import type { MonthDateSchema, MonthName } from "@api-contract/contracts/transactions/types";
import { storeToRefs } from "pinia";
import { capitalize, computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { settings } = storeToRefs(useSettingsStore());
const { getFormattedCurrencyString } = useCurrency();

const year = ref<number>(Array.isArray(route.params.year) ? parseInt(route.params.year[0]) : parseInt(route.params.year));

const month = ref<string>(Array.isArray(route.params.month) ? capitalize(route.params.month[0]) : capitalize(route.params.month));

interface CollapsibleDate extends MonthDateSchema {
    collapsed: boolean;
}

const dates = ref<CollapsibleDate[] | null>(null);

const filteredDates = computed(() => {
    return dates.value?.filter((el) => el.transactions.length);
});

const formattedMonthName = computed(() => {
    return `${month.value[0].toUpperCase()}${month.value.slice(1)}`;
});

async function getTransactions() {
    try {
        const response = await apiClient.transactions.getCalendarMonth({
            params: {
                year: year.value,
                month: month.value as MonthName,
            },
        });

        if (response.status === 200) {
            const d: CollapsibleDate[] = [];

            response.body.forEach((el) => {
                d.push({ collapsed: false, ...el });
            });

            dates.value = d;
        }
    } catch (err: any) {
        console.error(err);
    }
}

onMounted(() => {
    getTransactions();
});
</script>

<template>
    <div v-if="dates" class="flex flex-col gap-5 p-6">
        <h1 class="mx-auto text-lg">{{ formattedMonthName }} {{ year }}</h1>
        <div v-for="date in filteredDates" :key="date.date" class="flex flex-col p-6" @click="date.collapsed = !date.collapsed">
            <h1 class="font-bold italic text-2xl border-b-1 pb-2 select-none sticky top-0 bg-white">{{ date.date }}</h1>
            <div class="flex flex-col overflow-hidden" :class="{ 'h-0': date.collapsed }">
                <div
                    v-for="transaction in date.transactions"
                    :key="transaction.id"
                    class="flex justify-between px-6 py-2 hover:bg-gray-100 rounded-lg"
                >
                    <p>{{ transaction.name }}</p>
                    <p class="font-medium" :class="{ 'text-state-danger-500': transaction.isExpense }">
                        {{ getFormattedCurrencyString(parseFloat(transaction.amountInPence.toString()), settings.currency.code) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
