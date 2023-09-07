import { Router } from "express";

import UsersController from "../controllers/UsersController.js";
import ensureAutheticated from "../middlewares/auth.js";

const usersRoutes = Router();

usersRoutes.get('/', UsersController.indexUser);
usersRoutes.get('/', ensureAutheticated, UsersController.getUser);
usersRoutes.post('/', UsersController.postUser);
usersRoutes.put('/', ensureAutheticated, UsersController.putUser);
usersRoutes.delete('/', ensureAutheticated, UsersController.deleteUser);

export default usersRoutes;
