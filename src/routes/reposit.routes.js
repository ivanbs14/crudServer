import { Router } from "express";

import repositorioController from "../controllers/RepositoriesController.js";

const repoRoutes = Router();

repoRoutes.get('/repositories', repositorioController.full);
repoRoutes.delete('/repositories', repositorioController.deleteall);

export default repoRoutes;
