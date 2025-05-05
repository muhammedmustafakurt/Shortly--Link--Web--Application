import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}


export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
};


export const verifyToken = (token: string | undefined): boolean => {
    if (!token) {
        return false;
    }

    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
};