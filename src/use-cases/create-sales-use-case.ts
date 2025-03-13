import { AddressRepository } from "@/repositories/addressRepository";
import { SalesRepository } from "@/repositories/salesRepository";
import { Sale } from "@prisma/client"; 

interface CreateSaleUseCaseRequest {
    buyer_name: string;
    cpf: string;
    price: number;
    payment_method: string;
    installments: number;
    card_number?: string;
    address: {
        zip_code: string;
        state: string;
        city: string;
        neighborhood: string;
        street: string;
        number: string;
    };
}

export class CreateSaleUseCase {
    constructor(
        private salesRepository: SalesRepository,
        private addressRepository: AddressRepository
    ) {}

    async execute({
        buyer_name,
        cpf,
        price,
        payment_method,
        installments,
        card_number,
        address
    }: CreateSaleUseCaseRequest): Promise<Sale> {


        const addressCreated = await this.addressRepository.create({
            ...address, 
            address: address.street 
        });

        try {
            return await this.salesRepository.create({
                buyer_name,
                cpf,
                price,
                payment_method,
                installments,
                card_number,
                address: { connect: { id: addressCreated.id } } 
            });
        } catch (error) {
            console.error("ERRO DETALHADO AO CRIAR VENDA:", error); 
            throw new Error("Erro ao criar venda no banco de dados");
        }        
    }
}

