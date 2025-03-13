/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Pajama` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PajamaSize" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock_quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    CONSTRAINT "PajamaSize_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "Pajama" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PajamaSize" ("id", "pajamaId", "size", "stock_quantity") SELECT "id", "pajamaId", "size", "stock_quantity" FROM "PajamaSize";
DROP TABLE "PajamaSize";
ALTER TABLE "new_PajamaSize" RENAME TO "PajamaSize";
CREATE UNIQUE INDEX "PajamaSize_size_pajamaId_key" ON "PajamaSize"("size", "pajamaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Pajama_name_key" ON "Pajama"("name");
