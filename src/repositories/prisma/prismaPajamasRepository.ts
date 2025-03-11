import { prisma } from "@/http/lib/prisma";
import { Pajama, Prisma } from "@prisma/client";
import { PajamasRepository } from "../pajamasRepository";

export class PrismaPajamaRepository implements PajamasRepository {
    async create(data: Prisma.PajamaCreateInput): Promise<Pajama> {
        const pajama = await prisma.pajama.create({ data });
        
        return pajama
    }
}