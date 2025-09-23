/*
  Warnings:

  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "amount" DECIMAL(14,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "orders_items" ADD COLUMN     "amount" DECIMAL(14,2) NOT NULL DEFAULT 0,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "price",
ADD COLUMN     "amount" DECIMAL(14,2) NOT NULL DEFAULT 0;
