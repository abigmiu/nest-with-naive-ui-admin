/*
  Warnings:

  - A unique constraint covering the columns `[account]` on the table `app_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `app_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `app_user_account_key` ON `app_user`(`account`);

-- CreateIndex
CREATE UNIQUE INDEX `app_user_phone_key` ON `app_user`(`phone`);
