import { Router } from "express";
import HelloController from "./controllers/HelloController";
import UsersController from "./controllers/UsersController";
import repositoriesController from "./controllers/repositoriesController";

const routes = new Router();

routes.get("/hello", HelloController.index);

routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

routes.get("/users/:user_id/repositories", repositoriesController.index);
routes.post("/users/:user_id/repositories", repositoriesController.create);
routes.delete("/users/:user_id/:id/repositories", repositoriesController.destroy);


export default routes;