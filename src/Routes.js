import { Router } from "express";
import HelloController from "./controllers/HelloController";
import UsersController from "./controllers/UsersController";
import ExperienceController from "./controllers/ExperienceController";
import Auth from "./middlewares/Auth";
import SessionsController from "./controllers/SessionsController";

const routes = new Router();

routes.post("/sessions", SessionsController.create);
routes.get("/hello", HelloController.index);

//routes.use(Auth);

routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

routes.get("/users/:user_id/experiences", ExperienceController.index);
routes.post("/users/:user_id/experiences", ExperienceController.create);
routes.delete("/users/:user_id/:id/experiences", ExperienceController.destroy);


export default routes;