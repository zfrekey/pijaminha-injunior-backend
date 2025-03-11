import { prisma } from "@/http/lib/prisma";
import { AddressRepository } from "../addressRepository";
import { Address, Prisma } from "@prisma/client";

export class PrismaAddressRepository implements AddressRepository {
    async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
        const address = await prisma.address.create({ data });
        return address
    }
}