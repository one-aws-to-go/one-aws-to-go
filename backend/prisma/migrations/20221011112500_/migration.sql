-- CreateTable
CREATE TABLE "Fork_template" (
    "fork_id" INTEGER NOT NULL,
    "owner" TEXT NOT NULL,
    "repo" TEXT NOT NULL,

    CONSTRAINT "Fork_template_pkey" PRIMARY KEY ("fork_id")
);
