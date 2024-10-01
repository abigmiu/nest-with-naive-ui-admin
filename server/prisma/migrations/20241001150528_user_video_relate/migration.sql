/*
  Warnings:

  - Added the required column `authorId` to the `user-video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user-video` ADD COLUMN `authorId` INTEGER NOT NULL,
    ADD COLUMN `viewCount` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `user-video` ADD CONSTRAINT `user-video_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
