import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET!

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set')
}

// Token oluşturma (senkron)
export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' })
}



// Cookie ayarlama (sunucu bileşenlerinde kullanılacak)
export const setAuthCookie = (token: string): void => {
    cookies().set('token', token, {
        httpOnly: true,
        maxAge: 86400, // 1 gün
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    })
}

// Token doğrulama
export const verifyToken = (token: string | undefined): boolean => {
    if (!token) {
        return false
    }

    try {
        jwt.verify(token, JWT_SECRET)
        return true
    } catch (error) {
        return false
    }
}
