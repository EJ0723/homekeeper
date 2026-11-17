/*
  Warnings:

  - Changed the type of `intervalUnit` on the `chore` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IntervalUnit" AS ENUM ('day', 'week', 'month');

-- AlterTable
ALTER TABLE "chore" DROP COLUMN "intervalUnit",
ADD COLUMN     "intervalUnit" "IntervalUnit" NOT NULL,
ALTER COLUMN "lastCompletedAt" DROP NOT NULL;
