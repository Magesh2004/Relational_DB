/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_bookId_fkey";

-- DropIndex
DROP INDEX "Cart_bookId_key";

-- DropIndex
DROP INDEX "Category_bookId_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "bookId";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "bookId",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BookCategory" (
    "bookId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "BookCategory_pkey" PRIMARY KEY ("bookId","categoryId")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCategory" ADD CONSTRAINT "BookCategory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCategory" ADD CONSTRAINT "BookCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
