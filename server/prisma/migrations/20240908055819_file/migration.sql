-- CreateTable
CREATE TABLE `file` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `location` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `tags` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
