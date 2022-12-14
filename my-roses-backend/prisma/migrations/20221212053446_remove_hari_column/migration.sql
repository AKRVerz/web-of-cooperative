/*
  Warnings:

  - You are about to drop the column `hari` on the `pembukuan` table. All the data in the column will be lost.
  - Changed the type of `tanggal` on the `pembukuan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `pembukuan` DROP COLUMN `hari`,
    DROP COLUMN `tanggal`,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL;
