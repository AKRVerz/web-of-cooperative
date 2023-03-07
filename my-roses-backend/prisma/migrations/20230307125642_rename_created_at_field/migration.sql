/*
  Warnings:

  - You are about to drop the column `createdAdt` on the `Mount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mount" DROP COLUMN "createdAdt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
