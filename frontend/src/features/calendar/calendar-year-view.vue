<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import debounce from "lodash.debounce";
import { apiClient } from "@/api";

const route = useRoute();

const router = useRouter();

const year = ref<number>(Array.isArray(route.params.year) ? parseInt(route.params.year[0]) : parseInt(route.params.year));

const nullMonths = [
    {
        monthName: "January",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "February",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "March",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "April",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "May",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "June",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "July",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "August",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "September",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "October",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "November",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "December",
        income: null,
        expenses: null,
        remaining: null,
    },
];

const months = ref<{ monthName: string; income: number | null; expenses: number | null; remaining: number | null }[]>(nullMonths);

const getYearData = debounce(async () => {
    try {
        months.value = nullMonths;
        const response = await apiClient.transactions.getCalendarYear({ params: { year: year.value } });

        if (response.status === 200) {
            months.value = response.body;
        }
    } catch (err: any) {
        console.error(err);
    }
}, 300);

watch(
    () => route.params.year,
    async () => {
        year.value = Array.isArray(route.params.year) ? parseInt(route.params.year[0]) : parseInt(route.params.year);
        await getYearData();
    }
);

onMounted(async () => {
    await getYearData();
});
</script>

<template>
    <div class="w-full h-full">
        <div class="calendar-grid w-full h-full">
            <RouterLink v-for="(month, index) in months" :to="{ name: 'month', params: { year, month: month.monthName } }">
                <FinancialCalendarMonth
                    :key="month.monthName"
                    :monthName="month.monthName"
                    :income="month.income"
                    :expenses="month.expenses"
                    :remaining="month.remaining"
                    :isCurrentMonth="new Date().getMonth() === index"
                />
            </RouterLink>
        </div>
        <!-- This is a fixed overlay that sits behind the navigator. It acts as an accidental touch protection and also adds some visual appeal. -->
        <!-- <div class="bg-neutral-300/50 fixed bottom-0 left-0 h-[75px] w-full blur-xl"></div> -->
        <!-- <CalendarNavigator
            v-model:year="year"
            @update:year="
                months = nullMonths;
                router.replace({ name: 'year', params: { year } });
            "
        /> -->
    </div>
</template>

<style scoped>
.calendar-grid {
    display: flex;
    flex-direction: column;

    @media (width >= 72rem /* 1152px */) {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 1fr;
    }

    @media (width >= 88rem /* 1408px */) {
        display: grid;
        grid-template-columns: 33.333% 33.333% 33.333%;
        grid-template-rows: 25% 25% 25% 25%;
    }
}
</style>
