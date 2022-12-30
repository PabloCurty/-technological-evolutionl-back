import { Router } from "express";
import HelloController from "./controllers/HelloController";
import UsersController from "./controllers/UsersController";

const routes = new Router();

routes.get("/hello", HelloController.index);

routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

export default routes;