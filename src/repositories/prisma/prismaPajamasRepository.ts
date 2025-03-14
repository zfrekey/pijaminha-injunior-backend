import { prisma } from "@/http/lib/prisma";
import { Pajama, Prisma } from "@prisma/client";
import { PajamasRepository, PajamaUpdateInput } from "../pajamasRepository";

export class PrismaPajamaRepository implements PajamasRepository {
    async create(data: Prisma.PajamaCreateInput): Promise<Pajama> {
        const pajama = await prisma.pajama.create({
            data: {
                ...data,
                sizes: {
                    create: [
                        { size: "PP", stock_quantity: 10 },
                        { size: "P", stock_quantity: 10 },
                        { size: "M", stock_quantity: 10 },
                        { size: "G", stock_quantity: 10 },
                        { size: "GG", stock_quantity: 10 }
                    ]
                }
            },
            include: { sizes: true }
        });

        return pajama;
    }

    async get(id: string): Promise<Pajama | null> {
        return await prisma.pajama.findUnique({
            where: { id },
            include: { sizes: true, sales: true }
        });
    }

    async getAll(): Promise<Pajama[]> { // ✅ Implementado corretamente!
        return await prisma.pajama.findMany({
            include: { sizes: true, sales: true }
        });
    }

    async update(id: string, data: PajamaUpdateInput): Promise<Pajama | null> {
        const { sizes, ...updateData } = data;

        const pajama = await prisma.pajama.update({
            where: { id },
            data: {
                ...updateData,
                sizes: sizes
                    ? {
                          updateMany: sizes.map((s) => ({
                              where: { pajamaId: id, size: s.size },
                              data: { stock_quantity: s.stock_quantity }
                          }))
                      }
                    : undefined
            },
            include: { sizes: true, sales: true }
        });

        return pajama;
    }

    async delete(id: string): Promise<Pajama> {
        await prisma.pajamaSize.deleteMany({ where: { pajamaId: id } });
        const pajama = await prisma.pajama.delete({ where: { id } });

        return pajama;
    }
}

