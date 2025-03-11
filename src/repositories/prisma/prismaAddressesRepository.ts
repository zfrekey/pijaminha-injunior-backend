import { prisma } from "@/http/lib/prisma";
import { Prisma, Address } from "@prisma/client";
import { AddressesRepository } from "../addressesRepository";

export class PrismaAddressesRepository implements AddressesRepository {

    async create(data: Prisma.AddressCreateInput) {
        const address = await prisma.address.create({
            data
        })

        return address
    }

    async findById(id: string) {
        const address = await prisma.address.findUnique({
            where: {
                id
            }
        })
        return address
    }

    async findByAdressUnique(zip_code: string, number: string) {
        const address = await prisma.address.findFirst({
            where: {
                zip_code,
                number
            }
        })
        return address
    }

    async delete(id: string): Promise<Address | null> {
        const address = await prisma.address.delete({
            where: {
                id
            }
        })
        return address
    }

}