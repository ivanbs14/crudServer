import { Router } from "express";

import usersRoutes from "./users.routes.js";
import repoRoutes from "./users.routes.js";
import secRoutes from "./sessions.routes.js";

const routes = Router();

routes.use("/sessions", secRoutes)
routes.use("/users", usersRoutes)
routes.use("/repositories", repoRoutes)

export default routes;