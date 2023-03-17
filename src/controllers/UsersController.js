import User from "../models/User";
import { createPasswordHash } from "../services/AuthService";

class UsersController {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

    async show(req, res) {
      try {
          const { id } = req.params;
          const user = await User.findById(id);
          if (!user) {
              return res
                .status(404)
                .json({ message: `User id ${id} do not exists.` });
          }
          return res.status(200).json(user);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error." });
      }
  }

  async create(req, res) {
    try {
      const { email, password, isTutor } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(422)
          .json({ message: `User ${email} already exists.` });
      }
      //criptografa passaword
      const encryptedPassword = await createPasswordHash(password);
        
      const newUser = await User.create({
        email,
        password: encryptedPassword,
        isTutor,
      });

      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password, isTutor } = req.body;
            const user = await User.findById(id);
            if (!user) {
                return res
                  .status(404)
                  .json({ message: `User id ${id} do not exists.` });
            }
            const encryptedPassword = await createPasswordHash(password);
            await user.updateOne({ email, password: encryptedPassword, isTutor });
            return res.status(200).json(user)
        } catch (error) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
        
  }

    async destroy(req, res) {
      try {
          const { id } = req.params;
          const user = await User.findById(id);
          if (!user) {
            return res
              .status(404)
              .json({ message: `User id ${id} do not exists.` });
          }
          await user.deleteOne();
          return res.status(200).json(user);
      } catch (error) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error." });
      }
  }
}

export default new UsersController();
