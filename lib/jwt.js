import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "qwgquwyge37hq3ww";

if(!JWT_SECRET) {
    throw new Error("JWT secret not defined")
}

export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '7d'})
}