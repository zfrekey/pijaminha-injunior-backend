import { prisma } from "@/http/lib/prisma";
import { PajamaSize, Prisma } from "@prisma/client";
import { PajamaSizesRepository } from "../pajamasSizesRepository";

export class PrismaPajamasSizeRepository implements PajamaSizesRepository {
    async create(data: Prisma.PajamaSizeUncheckedCreateInput): Promise<PajamaSize> {
        const pajamaSize = await prisma.pajamaSize.create({ data });
        return pajamaSize
    }
}