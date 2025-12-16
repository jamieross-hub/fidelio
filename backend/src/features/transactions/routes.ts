import { apiContract, MONTH_NAMES } from "@api-contract";
import type { AppRouteImplementationOrOptions, RouterImplementation } from "@ts-rest/express/src/lib/types";
import {
    createNewTransaction,
    deleteSingleTransaction,
    getAllTransactions,
    getMonthTransactions,
    getSingleTransaction,
    getYearTransactions,
    updateSingleTransaction,
} from "./models";

type TransactionRouter = RouterImplementation<typeof apiContract.transactions>;

const getTransaction: TransactionRouter["getTransaction"] = async ({ req: { user }, params: { id } }) => {
    const transaction = await getSingleTransaction(id, user.id);

    return transaction
        ? {
              status: 200,
              body: transaction,
          }
        : {
              status: 404,
              body: { message: "Transaction not found" },
          };
};

const createTransaction: TransactionRouter["createTransaction"] = async ({ req: { user }, body }) => {
    return {
        status: 200,
        body: await createNewTransaction(body, user.id),
    };
};

const updateTransaction: TransactionRouter["updateTransaction"] = async ({ req: { user }, body, params: { id } }) => {
    return {
        status: 200,
        body: await updateSingleTransaction(body, id, user.id),
    };
};

const deleteTransaction: TransactionRouter["deleteTransaction"] = async ({ req: { user }, params: { id } }) => {
    await deleteSingleTransaction(id, user.id);
    return {
        status: 204,
        body: undefined,
    };
};

const getTransactions: TransactionRouter["getTransactions"] = async ({ req: { user } }) => {
    return {
        status: 200,
        body: await getAllTransactions(user.id),
    };
};

const getCalendarYear: TransactionRouter["getCalendarYear"] = async ({ req: { user }, params: { year } }) => {
    return {
        status: 200,
        body: await getYearTransactions(year, user.id),
    };
};

const getCalendarMonth: TransactionRouter["getCalendarMonth"] = async ({ req: { user }, params: { year, month } }) => {
    return {
        status: 200,
        body: await getMonthTransactions(year, MONTH_NAMES.indexOf(month), user.id),
    };
};

export const transactionRouter: TransactionRouter = {
    getTransaction,
    createTransaction,
    deleteTransaction,
    updateTransaction,
    getTransactions,
    getCalendarYear,
    getCalendarMonth,
};
