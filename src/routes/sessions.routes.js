import { Router } from "express";

import sectionController from "../controllers/SessionsController.js";

const secRoutes = Router();

secRoutes.post('/', sectionController.create);

export default secRoutes;