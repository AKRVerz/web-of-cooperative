/*
  Warnings:

  - Added the required column `afterCashBack` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cashBack` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumCashBack` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pembukuan" ADD COLUMN     "afterCashBack" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cashBack" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sumCashBack" DOUBLE PRECISION NOT NULL;


