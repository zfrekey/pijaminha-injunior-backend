import { prisma } from "@/http/lib/prisma";
import { Pajama, Prisma } from "@prisma/client";
import { PajamasRepository } from "../pajamasRepository";

export class PrismaPajamaRepository implements PajamasRepository {
    async create(data: Prisma.PajamaCreateInput): Promise<Pajama> {
        const pajama = await prisma.pajama.create({ data });
        
        return pajama
    }

    async get(id: string): Promise<Pajama | null> {
        const pajama = await prisma.pajama.findUnique({
            where: { id },
            include: {sizes: true}
        });
        
        return pajama
    }

    async delete(id: string): Promise<Pajama> {
        const pajama = await prisma.pajama.delete({ where: { id } });
        
        return pajama
    }
}