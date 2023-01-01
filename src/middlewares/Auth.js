import jwt from "jsonwebtoken";
import AuthConfig from "../config/AuthConfig";
import { promisify } from "util";

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token was not provided." });
    }
    //Bearer XXXX
    const [, token] = authHeader.split(' ');
    try {
        const decoded = await promisify(jwt.verify)(token, AuthConfig.secret);
        req.userId = decoded.id;
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token." });
    }
}