-- CreateTable
CREATE TABLE "User" (
    "githubId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("githubId")
);

-- CreateTable
CREATE TABLE "ForkTemplate" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "repo" TEXT NOT NULL,

    CONSTRAINT "ForkTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fork" (
    "id" SERIAL NOT NULL,
    "appName" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "Fork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fork_appName_key" ON "Fork"("appName");

-- AddForeignKey
ALTER TABLE "Fork" ADD CONSTRAINT "Fork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fork" ADD CONSTRAINT "Fork_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ForkTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
