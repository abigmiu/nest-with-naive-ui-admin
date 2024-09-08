/*
  Warnings:

  - Added the required column `file_name` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` ADD COLUMN `file_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `mimetype` VARCHAR(191) NOT NULL;
