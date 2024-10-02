-- CreateTable
CREATE TABLE `app_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(50) NOT NULL,
    `account` VARCHAR(100) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `avatar` VARCHAR(150) NOT NULL,
    `intro` VARCHAR(300) NOT NULL,
    `sex` INTEGER NOT NULL DEFAULT 0,
    `birth` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `location` VARCHAR(100) NOT NULL,
    `school` VARCHAR(50) NOT NULL,
    `like_count` INTEGER NOT NULL DEFAULT 0,
    `friend_count` INTEGER NOT NULL DEFAULT 0,
    `follow_count` INTEGER NOT NULL DEFAULT 0,
    `fans_count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
