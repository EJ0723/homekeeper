-- CreateTable
CREATE TABLE "chore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "intervalValue" INTEGER NOT NULL,
    "intervalUnit" TEXT NOT NULL,
    "lastCompletedAt" TIMESTAMP(3) NOT NULL,
    "nextDueAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chore_userId_idx" ON "chore"("userId");

-- AddForeignKey
ALTER TABLE "chore" ADD CONSTRAINT "chore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
