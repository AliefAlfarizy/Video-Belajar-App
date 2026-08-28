import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'educourse_jwt_secret_key_2026';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Akses ditolak. Token autentikasi tidak ditemukan pada header Authorization.'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { id, email, username, role }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token autentikasi tidak valid atau sudah kedaluwarsa.',
            error: error.message
        });
    }
}
