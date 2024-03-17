-- CreateEnum
CREATE TYPE "QR_TYPE" AS ENUM ('STATIC', 'DYNAMIC');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QR" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "label" TEXT,
    "type" "QR_TYPE" DEFAULT 'DYNAMIC',
    "uniqueID" TEXT,
    "url" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "scans" INTEGER,
    "userId" TEXT,

    CONSTRAINT "QR_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "QR_id_key" ON "QR"("id");

-- CreateIndex
CREATE UNIQUE INDEX "QR_uniqueID_key" ON "QR"("uniqueID");

-- AddForeignKey
ALTER TABLE "QR" ADD CONSTRAINT "QR_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
