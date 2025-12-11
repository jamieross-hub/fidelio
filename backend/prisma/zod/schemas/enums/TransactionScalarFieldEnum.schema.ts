import * as z from 'zod';

export const TransactionScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'userId', 'name', 'isExpense', 'amountInPence', 'startDate', 'finishDate', 'isRecurring', 'recurrenceType', 'recurrenceRate', 'specificDayOfWeek', 'specificDayOfMonth', 'firstLastDayOfMonth'])

export type TransactionScalarFieldEnum = z.infer<typeof TransactionScalarFieldEnumSchema>;