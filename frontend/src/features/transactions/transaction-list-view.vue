<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { toast } from "vue-sonner";
import { EllipsisVerticalIcon, PlusIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/stores/settings-store";
import { useCurrency } from "@/composables/currency";
import { apiClient } from "@/api";
import type { TransactionPureType } from "@schemas/pure/Transaction.pure";
import { getFormattedDateString } from "@/lib/utils";

const { settings } = storeToRefs(useSettingsStore());

const { getFormattedCurrencyString } = useCurrency();

const activeTransactionTypeTab = ref<"all" | "income" | "expenses">("all");
const activeRecurrenceTypeTab = ref<"all" | "recurring" | "one-off">("all");

const transactions = ref<Omit<TransactionPureType, "user">[]>([]);
const filteredTransactions = computed<(typeof transactions)["value"]>(() => {
    return transactions.value
        .filter((transaction) => {
            if (activeTransactionTypeTab.value === "all") return transaction;
            return activeTransactionTypeTab.value === "expenses" ? transaction.isExpense : !transaction.isExpense;
        })
        .filter((transaction) => {
            if (activeRecurrenceTypeTab.value === "all") return transaction;
            return activeRecurrenceTypeTab.value === "recurring" ? transaction.isRecurring : !transaction.isRecurring;
        });
});

const deleteConfirmDialog = ref();

const selectedTransactionId = ref<string | null>();

async function getTransactions() {
    try {
        const response = await apiClient.transactions.getTransactions();

        if (response.status === 200) {
            transactions.value = response.body;
        }
    } catch (err: any) {
        console.error(err);
    }
}

async function deleteTransaction() {
    if (selectedTransactionId.value) {
        try {
            await apiClient.transactions.deleteTransaction({ params: { id: selectedTransactionId.value } });

            if (transactions.value) {
                const indexToRemove = transactions.value.findIndex((el) => el.id === selectedTransactionId.value);
                transactions.value.splice(indexToRemove, 1);
            }

            selectedTransactionId.value = null;

            toast("Transaction deleted successfully");
        } catch (err: any) {
            console.error(err);
        }
    }
}

onMounted(() => {
    getTransactions();
});
</script>

<template>
    <PageHeader title="Transactions">
        <RouterLink :to="{ name: 'createTransaction' }" class="ml-auto">
            <Button variant="outline">
                <p>Add transaction</p>
                <PlusIcon />
            </Button>
        </RouterLink>
    </PageHeader>
    <PageContent class="flex flex-col gap-5">
        <div class="w-full max-w-full flex items-center flex-wrap gap-5">
            <Tabs v-model="activeTransactionTypeTab" class="max-md:grow">
                <TabsList class="w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="income">Income</TabsTrigger>
                </TabsList>
            </Tabs>
            <Tabs v-model="activeRecurrenceTypeTab" class="max-md:grow">
                <TabsList class="w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="recurring">Recurring</TabsTrigger>
                    <TabsTrigger value="one-off">One-off</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
        <Table>
            <TableHeader class="bg-muted">
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Recurrence Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Finish Date</TableHead>
                    <TableHead><!-- Action button --></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="transaction in filteredTransactions" :key="transaction.id">
                    <TableCell class="font-medium min-w-20">{{ transaction.name }}</TableCell>
                    <TableCell class="min-w-20">
                        {{ getFormattedCurrencyString(transaction.amountInPence / 100, settings.currency.code) }}
                    </TableCell>
                    <TableCell class="min-w-20">
                        <Badge v-if="transaction.isExpense" variant="destructive-outline">Expense</Badge>
                        <Badge v-else variant="success-outline">Income</Badge>
                    </TableCell>
                    <TableCell class="min-w-20">
                        {{ transaction.isRecurring ? "Recurring" : "One-off" }}
                    </TableCell>
                    <TableCell class="min-w-20">
                        {{ transaction.startDate ? getFormattedDateString(transaction.startDate) : "N/A" }}
                    </TableCell>
                    <TableCell class="min-w-20">
                        {{ transaction.finishDate ? getFormattedDateString(transaction.finishDate) : "N/A" }}
                    </TableCell>
                    <TableCell class="min-w-20 text-right px-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <EllipsisVerticalIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent :align="'end'" class="flex flex-col p-1 w-fit min-w-35">
                                <Button asChild variant="ghost" class="justify-start">
                                    <RouterLink asChild :to="{ name: 'editTransaction', params: { transaction: transaction.id } }">
                                        Edit
                                    </RouterLink>
                                </Button>
                                <Button
                                    variant="ghost"
                                    class="text-destructive justify-start"
                                    @click="
                                        selectedTransactionId = transaction.id;
                                        deleteConfirmDialog.open = true;
                                    "
                                >
                                    Delete
                                </Button>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <ConfirmTransactionDeleteDialog ref="deleteConfirmDialog" @confirm="() => deleteTransaction()" />
    </PageContent>
</template>
