import User from "../models/User"
import Experience from "../models/Experience"

class ExperienceController {
    async index(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);
            if (!user) {
                return res
                  .status(404)
                  .json({ message: `User id ${user_id} do not exists.` });
            }
            const experiences = await Experience.find({
              userId: user_id,
            });
            return res.status(200).json(experiences);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res) { 
        try {
            const { user_id } = req.params;
            const {
              nameProject,
              nameClient,
              nameTech,
              period,
              language,
              directLeaders,
            } = req.body;
            const user = await User.findById(user_id);
            if (!user) {
              return res
                .status(404)
                .json({ message: `User id ${user_id} do not exists.` });
            }
            const experience = await Experience.findOne({
              userId: user_id,
              nameClient,
              nameProject,
              language,
              nameTech,
              period,
              directLeaders,
            });
            if (experience) {
              return res
                .status(422)
                .json({
                  message: `Experience ${nameProject} and from user id ${user_id} already exists.`,
                });
            }
            const newExperience = await Experience.create({
              nameClient,
              nameProject,
              language,
              nameTech,
              period,
              directLeaders,
              userId: user_id,
            });
            return res.status(201).json(newExperience);
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
            const experience = await Experience.findOne({
              userId: user_id,
              id,
            });
            if (!experience) {
              return res.status(404).json({
                message: `Repository Id ${id} do not exists.`,
              });
            }

            await experience.deleteOne();
            return res.status(200).json(experience);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

}
export default new ExperienceController();