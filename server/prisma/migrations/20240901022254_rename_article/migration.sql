/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Article`;

-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
