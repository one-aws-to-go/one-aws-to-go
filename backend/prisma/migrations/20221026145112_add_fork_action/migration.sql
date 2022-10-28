/*
  Warnings:

  - You are about to drop the column `url` on the `ForkTemplate` table. All the data in the column will be lost.
  - Added the required column `state` to the `Fork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `ForkTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fork" ADD COLUMN     "actionsEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ref" TEXT NOT NULL DEFAULT 'master',
ADD COLUMN     "secretsSet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ForkTemplate" DROP COLUMN "url",
ADD COLUMN     "provider" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ForkAction" (
    "key" TEXT NOT NULL,
    "githubActionName" TEXT NOT NULL,
    "toState" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ForkAction_key_templateId_key" ON "ForkAction"("key", "templateId");

-- AddForeignKey
ALTER TABLE "ForkAction" ADD CONSTRAINT "ForkAction_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ForkTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
