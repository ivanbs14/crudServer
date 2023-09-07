import { Router } from "express";

import repositorioController from "../controllers/RepositoriesController.js";
import ensureAutheticated from "../middlewares/auth.js"

const repoRoutes = Router();

repoRoutes.get('/', ensureAutheticated, repositorioController.index);
repoRoutes.post('/', ensureAutheticated, repositorioController.post);
repoRoutes.delete('/:id', ensureAutheticated, repositorioController.delete);

repoRoutes.get('/', repositorioController.full);
repoRoutes.delete('/', repositorioController.deleteall);

export default repoRoutes;
