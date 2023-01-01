import User from "../models/User"
import Repository from "../models/Repository"

class RepositoriesController {
    async index(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);
            if (!user) {
                return res
                  .status(404)
                  .json({ message: `User id ${user_id} do not exists.` });
            }
            const repositories = await Repository.find({
              userId: user_id,
            });
            return res.status(200).json(repositories)
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res) { 
        try {
            const { user_id } = req.params;
            const { name, url } = req.body;
            const user = await User.findById(user_id);
            if (!user) {
              return res
                .status(404)
                .json({ message: `User id ${user_id} do not exists.` });
            }
            const repository = await Repository.findOne({
                userId: user_id,
                name
            })
            if (repository) {
                return res
                  .status(422)
                    .json({ message: `Repository ${name} and from user id ${user_id} already exists.` });
            }
            const newRepository = await Repository.create({
                name,
                url,
                userId: user_id
            });
            return res.status(201).json(newRepository)
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async destroy(req, res) {
        try {
            const { user_id, id } = req.params;
            const user = await User.findById(user_id);
            if (!user) {
              return res
                .status(404)
                .json({ message: `User id ${user_id} do not exists.` });
            }
            const repository = await Repository.findOne({
                userId: user_id,
                id
            });
            if (!repository) {
              return res
                .status(404)
                .json({
                  message: `Repository Id ${id} do not exists.`,
                });
            }

            await repository.deleteOne()
            return res.status(200).json(repository)
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

}
export default new RepositoriesController();