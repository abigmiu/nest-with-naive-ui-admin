/*
  Warnings:

  - You are about to drop the column `authorId` on the `user-video` table. All the data in the column will be lost.
  - You are about to drop the column `collectionCount` on the `user-video` table. All the data in the column will be lost.
  - You are about to drop the column `coverUrl` on the `user-video` table. All the data in the column will be lost.
  - You are about to drop the column `likeCount` on the `user-video` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `user-video` table. All the data in the column will be lost.
  - You are about to drop the column `replyCount` on the `user-video` table. All the data in the column will be lost.
  - You are about to drop the column `shareCount` on the `user-video` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `user-video` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `user-video` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `user-video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_url` to the `user-video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_url` to the `user-video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user-video` DROP FOREIGN KEY `user-video_authorId_fkey`;

-- AlterTable
ALTER TABLE `user-video` DROP COLUMN `authorId`,
    DROP COLUMN `collectionCount`,
    DROP COLUMN `coverUrl`,
    DROP COLUMN `likeCount`,
    DROP COLUMN `published`,
    DROP COLUMN `replyCount`,
    DROP COLUMN `shareCount`,
    DROP COLUMN `videoUrl`,
    DROP COLUMN `viewCount`,
    ADD COLUMN `author_id` INTEGER NOT NULL,
    ADD COLUMN `collection_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `cover_url` VARCHAR(100) NOT NULL,
    ADD COLUMN `like_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `publish_status` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `replay_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `share_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `video_url` VARCHAR(100) NOT NULL,
    ADD COLUMN `view_count` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `user-video` ADD CONSTRAINT `user-video_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
