import User from "../models/User.js";
import Repository from "../models/Repository.js"
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
                return res.status(404).json({ message: 'User not found.' });
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
            const deletedUser = await User.findByIdAndDelete( id );

            if(!deletedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }

            await Repository.deleteMany({ userId: id });

            return res.json({ message: 'User and associated repositories deleted successfully.' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error."})
        }
    };
}

export default new UsersController();