import Jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPassword } from "../services/AuthService";
import AuthConfig from "../config/AuthConfig";

class SessionsController {
    async create(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid user / password" });
        }
        if (!checkPassword(user, password)) {
            return res.status(401).json({ error: "Invalid user / password" });
        }

        const { id, isTutor } = user;
        return res.json({
            user: {
                id,
                email,
                isTutor
            },
            token: Jwt.sign({ id }, AuthConfig.secret, {
                expiresIn: AuthConfig.expiresIn
            })
        });
    }
}
export default new SessionsController();