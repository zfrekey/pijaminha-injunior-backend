import { prisma } from "@/http/lib/prisma";
import { AddressRepository } from "../addressRepository";
import { Address, Prisma } from "@prisma/client";

export class PrismaAddressRepository implements AddressRepository {
    async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
        const address = await prisma.address.create({
            data: {
                zip_code: data.zip_code,
                state: data.state,
                city: data.city,
                neighborhood: data.neighborhood,
                address: data.address,  // ✅ Usando `address` corretamente
                number: data.number
            }
        });

        return address;
    }

    async countSales(id: string): Promise<number> {
        const adress = await prisma.address.findUnique({
            where: { id },
            include: { sales: true }
        });
        return adress?.sales.length || 0
    }
    
    async delete(id: string): Promise<Address | null> {
        const address = await prisma.address.delete({
            where: { id }
        });
        return address
    }
}