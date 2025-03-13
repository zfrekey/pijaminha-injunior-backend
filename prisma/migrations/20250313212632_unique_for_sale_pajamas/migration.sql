/*
  Warnings:

  - A unique constraint covering the columns `[saleId,pajamaId]` on the table `Sale_Pajamas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sale_Pajamas_saleId_pajamaId_key" ON "Sale_Pajamas"("saleId", "pajamaId");
