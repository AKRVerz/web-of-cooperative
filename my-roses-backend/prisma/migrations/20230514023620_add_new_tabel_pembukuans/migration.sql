/*
  Warnings:

  - You are about to drop the column `afterCashBack` on the `Pembukuan` table. All the data in the column will be lost.
  - You are about to drop the column `jumlah` on the `Pembukuan` table. All the data in the column will be lost.
  - Added the required column `operationalQc` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payBreed` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pph` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roadMoney` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `royalti` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipCost` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shu` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pembukuan" DROP COLUMN "afterCashBack",
DROP COLUMN "jumlah",
ADD COLUMN     "operationalQc" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "payBreed" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pph" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "roadMoney" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "royalti" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shipCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shu" DOUBLE PRECISION NOT NULL;
