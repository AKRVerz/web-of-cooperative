-- CreateTable
CREATE TABLE "Mount" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "debt" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAdt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mount" ADD CONSTRAINT "Mount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
