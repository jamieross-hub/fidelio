import { MonthName } from "@api-contract/contracts/transactions/types";
import { Transaction } from "../prisma/generated/client";

export interface JWT {
    exp: Date;
    iat: Date;
    user_id: string;
    name: string;
    email: string;
    service: string;
    session_id: number;
}

export interface MonthSerializer {
    monthName: MonthName;
    income: number;
    expenses: number;
    remaining: number;
}

export interface MonthDate {
    date: string;
    transactions: Transaction[];
}
