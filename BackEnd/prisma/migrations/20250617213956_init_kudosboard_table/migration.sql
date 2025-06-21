-- CreateTable
CREATE TABLE "board" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "gifurl" TEXT NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);
