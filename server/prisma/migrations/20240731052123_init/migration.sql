/*
  Warnings:

  - Added the required column `address` to the `good` table without a default value. This is not possible if the table is not empty.
  - Added the required column `production_data` to the `good` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `good` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `production_data` DATETIME(3) NOT NULL;
