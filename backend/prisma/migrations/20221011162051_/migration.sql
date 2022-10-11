/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `github_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Created_fork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fork_template` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `githubId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Created_fork" DROP CONSTRAINT "Created_fork_creatorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "github_id",
ADD COLUMN     "githubId" INTEGER NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("githubId");

-- DropTable
DROP TABLE "Created_fork";

-- DropTable
DROP TABLE "Fork_template";

-- CreateTable
CREATE TABLE "ForkTemplate" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ForkTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fork" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "Fork_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fork" ADD CONSTRAINT "Fork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fork" ADD CONSTRAINT "Fork_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ForkTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
