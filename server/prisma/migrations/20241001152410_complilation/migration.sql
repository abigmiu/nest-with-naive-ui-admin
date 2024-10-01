/*
  Warnings:

  - Added the required column `compilation_id` to the `user-video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user-video` ADD COLUMN `compilation_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `compilation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `published_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `publish_status` INTEGER NOT NULL,
    `collection_count` INTEGER NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `desc` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user-video` ADD CONSTRAINT `user-video_compilation_id_fkey` FOREIGN KEY (`compilation_id`) REFERENCES `compilation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
