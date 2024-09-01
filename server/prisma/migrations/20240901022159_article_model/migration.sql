-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
