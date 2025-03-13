import { FastifyInstance } from "fastify";
import { create } from "./create";
import { get } from "./get";
import { list } from "./list";
import { deleteSale } from "./delete";
import { updateSale } from "./update";

export async function salesRoutes(app: FastifyInstance) {
    app.post("/sales", create);
    app.patch("/sales/:id", updateSale);
    app.delete("/sales/:id", deleteSale);
    app.get("/sales/:id", get);
    app.get("/sales", list);
}
