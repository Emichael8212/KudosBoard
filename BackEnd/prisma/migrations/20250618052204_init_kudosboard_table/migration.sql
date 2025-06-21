/*
  Warnings:

  - You are about to drop the column `releaseDate` on the `Board` table. All the data in the column will be lost.
  - Added the required column `author` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boardId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "releaseDate",
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "boardId" INTEGER NOT NULL,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
