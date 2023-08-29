import User from "../models/User.js";
import Repository from "../models/Repository.js"



class RepositoriesController {
    async index(req, res) {
        try {
            const { user_id } = req.params;
            const users = await User.findById(user_id);

            if (!users) {
                return res.status(404).json();
            }

            const repositories = await Repository.find({
                userId: user_id
            });

            return res.json(repositories);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error."})
        }
    };
    
    async post(req, res) {
        try {
            const { user_id } = req.params;
            const { name, url } = req.body;
            
            const user = await User.findById(user_id);
            
            if (!user) {
                return res.status(404).json();
            }
            
            const repository = await Repository.findOne({
                userId: user_id,
                name
            })
            
            if (repository) {
                return res.status(422).json({ message: `Repository ${name} already exists.`});
            }
            
            const newRepository = await Repository.create({
                name,
                url,
                userId: user_id
            })

            return res.status(201).json(newRepository);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error."})
        }
    };
    
    async delete(req, res) {
        try {
            const { user_id, id } = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }
            
            const repository = await Repository.findOne({
                userId: user_id,
                id
            });
            
            if (!repository) {
                return res.status(404).json();
            }
            
            await repository.deleteOne();
            
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error."})
        }
    };
    
    async deleteall(req, res) {
        try {
            // Execute a ação de exclusão em massa
            const deleteResult = await Repository.deleteMany({});
    
            if (deleteResult.deletedCount === 0) {
                return res.status(404).json({ message: "No repositories found to delete." });
            }
    
            return res.json({ message: `${deleteResult.deletedCount} repositories deleted successfully.` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    };
    
    async full(req, res) {
        try {
            const repositories = await Repository.find();
    
            return res.json(repositories);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    };
}

export default new RepositoriesController();