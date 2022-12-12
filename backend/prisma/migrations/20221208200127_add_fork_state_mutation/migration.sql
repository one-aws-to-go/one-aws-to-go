-- CreateTable
CREATE TABLE "ForkStateMutation" (
    "actionRunId" TEXT NOT NULL,
    "toState" TEXT NOT NULL,
    "forkId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ForkStateMutation_forkId_key" ON "ForkStateMutation"("forkId");

-- AddForeignKey
ALTER TABLE "ForkStateMutation" ADD CONSTRAINT "ForkStateMutation_forkId_fkey" FOREIGN KEY ("forkId") REFERENCES "Fork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
