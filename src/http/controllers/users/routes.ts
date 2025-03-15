import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { getById } from "./getById";
import { update } from "./update";
import { list } from "./list";
import { deleteUser } from "./delete";

export async function userRoutes(app: FastifyInstance) {
    app.post("/users", register)
    app.post("/authenticate", authenticate)

    app.get("/users/:userId", getById)
    app.get("/users", list)

    app.patch("/users/:userId", update)


    app.delete("/users/:userId", deleteUser)
}