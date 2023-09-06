import jwt from "jsonwebtoken";

import User from "../models/User.js"
import { checkPassword } from "../services/auth.js";

import authConfig from "../config/auth.js"

class SessionController {
    async create(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'User / password invalid.'});
        }

        if (!checkPassword(user, password)) {
            return res.status(401).json({ error: 'User / Password invalid.'})
        }

        const { id } = user;
        
        return res.json({
            user: {
                id,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });
    }
}

export default new SessionController();