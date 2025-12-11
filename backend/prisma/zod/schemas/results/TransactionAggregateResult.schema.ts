import * as z from 'zod';
export const TransactionAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    createdAt: z.number(),
    userId: z.number(),
    user: z.number(),
    name: z.number(),
    isExpense: z.number(),
    amountInPence: z.number(),
    startDate: z.number(),
    finishDate: z.number(),
    isRecurring: z.number(),
    recurrenceType: z.number(),
    recurrenceRate: z.number(),
    specificDayOfWeek: z.number(),
    specificDayOfMonth: z.number(),
    firstLastDayOfMonth: z.number()
  }).optional(),
  _sum: z.object({
    amountInPence: z.number().nullable(),
    recurrenceRate: z.number().nullable(),
    specificDayOfWeek: z.number().nullable(),
    specificDayOfMonth: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    amountInPence: z.number().nullable(),
    recurrenceRate: z.number().nullable(),
    specificDayOfWeek: z.number().nullable(),
    specificDayOfMonth: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    createdAt: z.date().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    amountInPence: z.number().int().nullable(),
    startDate: z.date().nullable(),
    finishDate: z.date().nullable(),
    recurrenceType: z.string().nullable(),
    recurrenceRate: z.number().int().nullable(),
    specificDayOfWeek: z.number().int().nullable(),
    specificDayOfMonth: z.number().int().nullable(),
    firstLastDayOfMonth: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    createdAt: z.date().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    amountInPence: z.number().int().nullable(),
    startDate: z.date().nullable(),
    finishDate: z.date().nullable(),
    recurrenceType: z.string().nullable(),
    recurrenceRate: z.number().int().nullable(),
    specificDayOfWeek: z.number().int().nullable(),
    specificDayOfMonth: z.number().int().nullable(),
    firstLastDayOfMonth: z.string().nullable()
  }).nullable().optional()});