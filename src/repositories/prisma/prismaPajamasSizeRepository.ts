import { prisma } from "@/http/lib/prisma";
import { PajamaSize, Prisma } from "@prisma/client";
import { PajamaSizesRepository } from "../pajamasSizesRepository";

export class PrismaPajamaSizeRepository implements PajamaSizesRepository {
    async createMany(data: Prisma.PajamaSizeCreateManyInput[]): Promise<void> {
        await prisma.pajamaSize.createMany({ data });
    }
}