import { Router } from "express";

import auth from "./middlewares/auth.js";

import HelloControlller from "./controllers/HelloControlller.js";
import SessionController from "./controllers/SessionsController.js";
import UsersController from "./controllers/UsersController.js";

import RepositoriesController from "./controllers/RepositoriesController.js";

const routes = new Router();
// route test
routes.get('/hello', HelloControlller.index);

// middleware
routes.post('/sessions', SessionController.create);
routes.use(auth);

// crud user
routes.get('/users', UsersController.indexUser);
routes.get('/users/:id', UsersController.getUser);
routes.post('/users', UsersController.postUser);
routes.put('/users/:id', UsersController.putUser);
routes.delete('/users/:id', UsersController.deleteUser);

// crud adm reposit
routes.get('/repositories', RepositoriesController.full);
routes.delete('/repositories', RepositoriesController.deleteall);

// crud user reposit
routes.get('/users/:user_id/repositories', RepositoriesController.index);
routes.post('/users/:user_id/repositories', RepositoriesController.post);
routes.delete('/users/:user_id/repositories', RepositoriesController.delete);

export default routes;