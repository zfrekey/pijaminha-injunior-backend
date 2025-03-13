import { FastifyInstance } from "fastify";
import { create } from "@/http/controllers/pajamas/create";
import { getAllPajamas } from "@/http/controllers/pajamas/get";
import { getPajamaById } from "@/http/controllers/pajamas/getById";
import { updatePajama } from "@/http/controllers/pajamas/update";
import { deletePajama } from "@/http/controllers/pajamas/delete";

export function pajamaRoutes(app: FastifyInstance) {
    app.post("/pajamas", create);
    app.get("/pajamas", getAllPajamas);
    app.get("/pajamas/:id", getPajamaById);
    app.patch("/pajamas/:id", updatePajama);
    app.delete("/pajamas/:id", deletePajama);
}
