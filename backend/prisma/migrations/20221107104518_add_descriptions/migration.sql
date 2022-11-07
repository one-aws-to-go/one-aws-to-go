/*
  Warnings:

  - Added the required column `name` to the `ForkAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ForkAction" ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ForkTemplate" ADD COLUMN     "description" TEXT;
