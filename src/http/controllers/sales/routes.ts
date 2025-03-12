import { FastifyInstance } from "fastify";
import { create } from "./create";
import { get } from "./get";
import { list } from "./list";

export async function salesRoutes(app: FastifyInstance) {
    app.post("/sales", create);
    //app.put("/sales/:id", update);
    //app.delete("/sales/:id", deleteSales);
    app.get("/sales/:id", get);
    app.get("/sales", list);
}
