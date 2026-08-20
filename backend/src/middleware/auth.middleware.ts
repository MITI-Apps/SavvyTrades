import { expressjwt } from "express-jwt";
import type { Response, Request, NextFunction } from "express";

const secret = process.env.JWT_SECRET;

const jwtMiddleware = expressjwt({
    secret: secret || "",
    algorithms: ["HS256"],
});

function authJwt(req: Request, res: Response, next: NextFunction){
    if(!secret){
        return res.status(500).json({ error: 'JWT secret not configured' });
    }

    jwtMiddleware(req, res, (err) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        next();
    });
}

export default authJwt;