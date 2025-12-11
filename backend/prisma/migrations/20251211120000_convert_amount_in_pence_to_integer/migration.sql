-- Convert existing decimal values to integers by multiplying by 100
-- Example: 10.50 -> 1050

-- First, update data to the target integer scale
UPDATE "Transaction"
SET "amountInPence" = ROUND("amountInPence" * 100);

-- Then, alter the column type from decimal(20,2) to integer
ALTER TABLE "Transaction"
ALTER COLUMN "amountInPence" TYPE INTEGER USING "amountInPence"::INTEGER;
