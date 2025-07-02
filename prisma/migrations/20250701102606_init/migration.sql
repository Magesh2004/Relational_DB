/*
  Warnings:

  - A unique constraint covering the columns `[bookId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "cartId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_bookId_key" ON "Cart"("bookId");
