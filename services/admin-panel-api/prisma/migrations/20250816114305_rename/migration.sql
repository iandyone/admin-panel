/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "totalAmount",
ADD COLUMN     "total_amount" DECIMAL(14,2) NOT NULL DEFAULT 0;
