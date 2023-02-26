/*
  Warnings:

  - You are about to drop the column `alamat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `noKtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "alamat",
DROP COLUMN "noKtp",
DROP COLUMN "tanggal";
