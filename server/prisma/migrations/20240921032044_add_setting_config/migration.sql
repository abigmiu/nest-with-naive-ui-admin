-- CreateTable
CREATE TABLE `setting_config` (
    `filed` VARCHAR(191) NOT NULL,
    `value` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `setting_config_filed_key`(`filed`),
    PRIMARY KEY (`filed`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
