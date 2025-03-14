/*
  Warnings:

  - A unique constraint covering the columns `[zip_code,number]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pajamaId,size]` on the table `PajamaSize` will be added. If there are existing duplicate values, this will fail.
  - Made the column `addressId` on table `Sale` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "PajamaSize_size_pajamaId_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyer_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "addressId" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "installments" INTEGER DEFAULT 1,
    "card_number" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Sale_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sale" ("addressId", "buyer_name", "card_number", "cpf", "createdAt", "id", "installments", "payment_method", "price") SELECT "addressId", "buyer_name", "card_number", "cpf", "createdAt", "id", "installments", "payment_method", "price" FROM "Sale";
DROP TABLE "Sale";
ALTER TABLE "new_Sale" RENAME TO "Sale";
CREATE UNIQUE INDEX "Sale_addressId_key" ON "Sale"("addressId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Address_zip_code_number_key" ON "Address"("zip_code", "number");

-- CreateIndex
CREATE UNIQUE INDEX "PajamaSize_pajamaId_size_key" ON "PajamaSize"("pajamaId", "size");
