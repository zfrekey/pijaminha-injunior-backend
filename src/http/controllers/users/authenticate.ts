import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository"
import { AuthenticateUseCase } from "@/use-cases/authenticate-use-case"
import { InvalidCredentialsError } from "@/use-cases/errors/invalidCredentialsError"
import { UserAlreadyExists } from "@/use-cases/errors/userAlreadyExists"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    
    const authenticateBodySchema = z.object({
        identifier: z.string(),
        password: z.string().min(6)
    })

    const {identifier,password} = authenticateBodySchema.parse(request.body)

    try {

        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
        
        const { user } = await authenticateUseCase.execute({
            identifier,
            password
        })

        const token = await reply.jwtSign({}, {
            sign: { 
                sub: user.id 
            }
        })

        const refreshToken = await reply.jwtSign({}, {
            sign: { 
                sub: user.id,
                expiresIn: "7d"
            }
        })

        return reply
                .status(201)
                .setCookie("refreshToken", refreshToken, {
                    path: "/",
                    secure: true,
                    sameSite: true,
                    httpOnly: true
                })
                .send({token})

    } catch (err) {

        if (err instanceof UserAlreadyExists) {
            return reply.status(400).send({ message: err.message });
        }
        if(err instanceof InvalidCredentialsError){
            return reply.status(401).send({ message: err.message })
        }
        return reply.status(401).send();

    }
    
}