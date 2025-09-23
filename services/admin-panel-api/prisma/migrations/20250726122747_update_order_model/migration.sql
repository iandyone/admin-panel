-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_manager_id_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "manager_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
