-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL DEFAULT 1,
    `account` VARCHAR(191) NULL,

    INDEX `user_roleId_fkey`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `good` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rest_count` INTEGER NOT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `production_data` DATETIME(3) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `type` INTEGER NOT NULL,
    `parent_id` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `permission_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoleToPermission` (
    `roleId` INTEGER NOT NULL,
    `permissionId` INTEGER NOT NULL,

    INDEX `RoleToPermission_permissionId_fkey`(`permissionId`),
    PRIMARY KEY (`roleId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleToPermission` ADD CONSTRAINT `RoleToPermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleToPermission` ADD CONSTRAINT `RoleToPermission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
