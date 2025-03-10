import { User } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { UsersRepository } from "@/repositories/usersRepository"

interface GetUserUseCaseRequest {
    userId: string
}

interface GetUserUseCaseResponse {
    user: User
}

export class GetUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({userId}: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new ResourceNotFoundError()
        }
        return { user }
    }

}