import { Router } from "express";

import UsersController from "../controllers/UsersController.js";
import repositorioController from "../controllers/RepositoriesController.js";

const usersRoutes = Router();

usersRoutes.get('/', UsersController.indexUser);
usersRoutes.get('/:id', UsersController.getUser);
usersRoutes.post('/', UsersController.postUser);
usersRoutes.put('/:id', UsersController.putUser);
usersRoutes.delete('/:id', UsersController.deleteUser);

usersRoutes.get('/:user_id/repositories', repositorioController.index);
usersRoutes.post('/:user_id/repositories', repositorioController.post);
usersRoutes.delete('/:user_id/repositories', repositorioController.delete);

export default usersRoutes;
