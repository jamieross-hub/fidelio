<script setup lang="ts">
import { apiClient } from "@/api";
import { useCurrency } from "@/composables/currency";
import { useSettingsStore } from "@/stores/settings-store";
import { storeToRefs } from "pinia";
import { capitalize, computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { MonthDateSchemaType, MonthName } from "@api-contract";

const route = useRoute();

const { settings } = storeToRefs(useSettingsStore());
const { getFormattedCurrencyString } = useCurrency();

const year = ref<number>(Array.isArray(route.params.year) ? parseInt(route.params.year[0]) : parseInt(route.params.year));

const month = ref<string>(Array.isArray(route.params.month) ? capitalize(route.params.month[0]) : capitalize(route.params.month));

interface CollapsibleDate extends MonthDateSchemaType {
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
    <PageHeader :title="`${formattedMonthName} ${year}`"></PageHeader>
    <PageContent v-if="dates" class="flex flex-col gap-5 p-6">
        <div v-for="date in filteredDates" :key="date.date" class="flex flex-col" @click="date.collapsed = !date.collapsed">
            <h1 class="font-bold italic text-2xl border-b border-border p-2 select-none sticky top-0">{{ date.date }}</h1>
            <div class="flex flex-col overflow-hidden mt-1" :class="{ 'h-0': date.collapsed }">
                <div
                    v-for="transaction in date.transactions"
                    :key="transaction.id"
                    class="flex justify-between px-6 py-2 hover:bg-muted rounded-lg"
                >
                    <p>{{ transaction.name }}</p>
                    <p class="font-medium" :class="{ 'text-state-danger-500': transaction.isExpense }">
                        {{ getFormattedCurrencyString(parseFloat(transaction.amountInPence.toString()), settings.currency.code) }}
                    </p>
                </div>
            </div>
        </div>
    </PageContent>
</template>
