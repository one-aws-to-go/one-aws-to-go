/*
  Warnings:

  - The primary key for the `Created_fork` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_fork_id` on the `Created_fork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Created_fork" DROP CONSTRAINT "Created_fork_pkey",
DROP COLUMN "created_fork_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Created_fork_pkey" PRIMARY KEY ("id");
