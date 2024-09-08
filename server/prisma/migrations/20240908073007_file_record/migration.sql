/*
  Warnings:

  - You are about to drop the column `created_at` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `remark` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `file` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `created_at`,
    DROP COLUMN `remark`,
    DROP COLUMN `tags`,
    DROP COLUMN `updated_at`;

-- CreateTable
CREATE TABLE `file_record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `remark` VARCHAR(191) NULL,
    `tags` JSON NULL,
    `fileid` INTEGER NOT NULL,

    UNIQUE INDEX `file_record_fileid_key`(`fileid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `file_record` ADD CONSTRAINT `file_record_fileid_fkey` FOREIGN KEY (`fileid`) REFERENCES `file`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
