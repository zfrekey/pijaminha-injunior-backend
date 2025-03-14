import { prisma } from "@/http/lib/prisma";
import { PajamaSize, Prisma } from "@prisma/client";
import { PajamaSizesRepository, PajamaSizeUpdateInput } from "../pajamasSizesRepository";

export class PrismaPajamaSizeRepository implements PajamaSizesRepository {
    async createMany(data: Prisma.PajamaSizeCreateManyInput[]): Promise<void> {
        await prisma.pajamaSize.createMany({ data });
    }

    async findBy(pajamaId: string, size: string): Promise<PajamaSize | null> {
        const pajamaSize = await prisma.pajamaSize.findFirst({
            where: {
                AND: [
                    { pajamaId },
                    { size },
                ],
            }
        })
        return pajamaSize
    }

    async update(id : string, data: PajamaSizeUpdateInput): Promise<PajamaSize | null>{
        
        const pajamaSize = await prisma.pajamaSize.update({
            where: { id },
            data
        })
        return pajamaSize;

    }

}