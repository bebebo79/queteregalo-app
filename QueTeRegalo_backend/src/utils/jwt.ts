import jwt from 'jsonwebtoken';

export const generateJWT = (payload: { id: number }) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '180d'
    });
};
