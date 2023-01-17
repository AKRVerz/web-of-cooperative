/*
  Warnings:

  - Added the required column `alamat` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noKtp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "alamat" TEXT NOT NULL,
ADD COLUMN     "noKtp" INTEGER NOT NULL;
