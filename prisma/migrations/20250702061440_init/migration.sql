-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_cartId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "cartId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
