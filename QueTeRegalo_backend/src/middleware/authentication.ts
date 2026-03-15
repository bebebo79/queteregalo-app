import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

declare global {
    namespace Express {
        interface Request {
            user?: InstanceType<typeof User>
        }
    }
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(401).json({ error: 'Usuario No Autorizado' });
    }

    const [, token] = bearer.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

        // Validamos que el token contenga un id
        if (decoded && decoded.id) {
            const user = await User.findByPk(decoded.id, {
                attributes: ['id', 'name', 'email']
            });

            if (!user) {
                return res.status(401).json({ error: 'Token No Valido' });
            }

            req.user = user;
            return next();
        }

        return res.status(401).json({ error: 'Token No Valido' });

    } catch (error) {
        return res.status(401).json({ error: 'Token No Valido' });
    }
};
