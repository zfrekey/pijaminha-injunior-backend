-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pajama" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "season" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "favorite" BOOLEAN DEFAULT false,
    "on_sale" BOOLEAN DEFAULT false,
    "sale_percent" REAL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Pajama" ("createdAt", "description", "favorite", "gender", "id", "image", "name", "on_sale", "price", "sale_percent", "season", "type") SELECT "createdAt", "description", "favorite", "gender", "id", "image", "name", "on_sale", "price", "sale_percent", "season", "type" FROM "Pajama";
DROP TABLE "Pajama";
ALTER TABLE "new_Pajama" RENAME TO "Pajama";
CREATE UNIQUE INDEX "Pajama_name_key" ON "Pajama"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
