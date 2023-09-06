import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';
import "./database/index.js";

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    };

    middlewares() {
        this.server.use(express.json());
        this.server.use(
            cors({
              origin: 'http://localhost:5173',
              methods: 'GET, POST, PUT, DELETE',
              allowedHeaders: 'Content-Type, Authorization',
            })
        );
    };

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;