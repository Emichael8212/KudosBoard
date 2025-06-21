/*
  Warnings:

  - You are about to drop the `board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "board";

-- DropTable
DROP TABLE "card";

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "gifurl" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
