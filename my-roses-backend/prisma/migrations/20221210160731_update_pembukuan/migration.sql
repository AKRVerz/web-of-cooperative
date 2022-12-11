/*
  Warnings:

  - Added the required column `harga` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hari` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlah` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keluar` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masuk` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumWood` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uraian` to the `Pembukuan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pembukuan` ADD COLUMN `harga` INTEGER NOT NULL,
    ADD COLUMN `hari` VARCHAR(191) NOT NULL,
    ADD COLUMN `jumlah` DOUBLE NOT NULL,
    ADD COLUMN `keluar` DOUBLE NOT NULL,
    ADD COLUMN `masuk` DOUBLE NOT NULL,
    ADD COLUMN `sumWood` DOUBLE NOT NULL,
    ADD COLUMN `tanggal` DOUBLE NOT NULL,
    ADD COLUMN `uraian` VARCHAR(191) NOT NULL;
