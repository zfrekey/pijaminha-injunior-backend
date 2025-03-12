import { FastifyInstance } from "fastify";
import { create } from "./create";
import { get } from "./get";
import { list } from "./list";
import { deleteSale } from "./delete";

export async function salesRoutes(app: FastifyInstance) {
    app.post("/sales", create);
    //app.put("/sales/:id", update);
    app.delete("/sales/:id", deleteSale);
    app.get("/sales/:id", get);
    app.get("/sales", list);
}
