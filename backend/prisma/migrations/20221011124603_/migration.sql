/*
  Warnings:

  - The primary key for the `Fork_template` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fork_id` on the `Fork_template` table. All the data in the column will be lost.
  - Added the required column `fork_template_id` to the `Fork_template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fork_template" DROP CONSTRAINT "Fork_template_pkey",
DROP COLUMN "fork_id",
ADD COLUMN     "fork_template_id" INTEGER NOT NULL,
ADD CONSTRAINT "Fork_template_pkey" PRIMARY KEY ("fork_template_id");

-- CreateTable
CREATE TABLE "Created_fork" (
    "created_fork_id" INTEGER NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Created_fork_pkey" PRIMARY KEY ("created_fork_id")
);

-- AddForeignKey
ALTER TABLE "Created_fork" ADD CONSTRAINT "Created_fork_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("github_id") ON DELETE RESTRICT ON UPDATE CASCADE;
