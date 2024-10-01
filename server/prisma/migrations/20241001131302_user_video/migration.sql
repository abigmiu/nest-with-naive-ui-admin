-- CreateTable
CREATE TABLE `user-video` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `desc` VARCHAR(1000) NOT NULL,
    `videoUrl` VARCHAR(100) NOT NULL,
    `coverUrl` VARCHAR(100) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `likeCount` INTEGER NOT NULL DEFAULT 0,
    `collectionCount` INTEGER NOT NULL DEFAULT 0,
    `replyCount` INTEGER NOT NULL DEFAULT 0,
    `shareCount` INTEGER NOT NULL DEFAULT 0,
    `location` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
