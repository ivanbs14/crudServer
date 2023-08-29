import User from "../models/User.js";
import { createPasswordHash } from "../services/auth.js";

class UsersController {
    async indexUser(req, res) {
        try {
            const users = await User.find();
            return res.json(users);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error."})
        }
    };

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if(!user) {
                return res.status(404).json();
            }

            return res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error."})
        }
    };
    
    async postUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if(user) {
                return res.status(422).json({ message:`User ${email} already exists.`});
            }

            // cryptograf password
            const encryptedPassword = await createPasswordHash(password);
    
            const newUser = await User.create({ 
                email, 
                password: encryptedPassword
            }); 
            return res.status(201).json( { newUser });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error."})
        }
    };
    
    async putUser(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;

            const user = await User.findById(id); 

            if(!user) {
                return res.status(404).json();
            }

            const encryptedPassword = await createPasswordHash(password);
            await user.updateOne({ email, password: encryptedPassword });

            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error."})
        }
    };

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if(!user) {
                return res.status(404).json();
            }

            await user.deleteOne();
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error."})
        }
    };
}

export default new UsersController();