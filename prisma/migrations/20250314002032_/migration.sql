/*
  Warnings:

  - A unique constraint covering the columns `[addressId]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sale_Pajamas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "saleId" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "Sale_Pajamas_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Sale_Pajamas_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "Pajama" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sale_Pajamas" ("id", "pajamaId", "price", "quantity", "saleId") SELECT "id", "pajamaId", "price", "quantity", "saleId" FROM "Sale_Pajamas";
DROP TABLE "Sale_Pajamas";
ALTER TABLE "new_Sale_Pajamas" RENAME TO "Sale_Pajamas";
CREATE UNIQUE INDEX "Sale_Pajamas_saleId_pajamaId_key" ON "Sale_Pajamas"("saleId", "pajamaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_addressId_key" ON "Sale"("addressId");
