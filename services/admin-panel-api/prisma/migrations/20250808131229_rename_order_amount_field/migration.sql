/*
  Warnings:

  - You are about to drop the column `amount` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "amount",
ADD COLUMN     "totalAmount" DECIMAL(14,2) NOT NULL DEFAULT 0;
