import { FastifyInstance } from "fastify";
import { createFeedback } from "./create";
import { getFeedback } from "./get";
import { deleteFeedback } from "./delete";


export function feedbackRoutes(app: FastifyInstance) {
    app.post("/feedbacks", createFeedback);
    app.get("/feedbacks/:id", getFeedback);
    app.delete("/feedbacks/:id", deleteFeedback);
}

