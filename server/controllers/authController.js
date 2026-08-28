import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as userService from '../services/userService.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'educourse_jwt_secret_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

/**
 * Controller 1: POST /auth/register - Registrasi Pengguna Baru (Langkah Kedua)
 * Payload: fullname, username, email, password
 */
export async function registerHandler(req, res) {
    try {
        const { fullname, username, email, password } = req.body;

        // 1. Validasi Input Payload
        if (!fullname || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Payload tidak lengkap. Atribut fullname, username, email, dan password wajib diisi.'
            });
        }

        // 2. Periksa apakah Email sudah terdaftar
        const existingEmail = await userService.findUserByEmail(email);
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah terdaftar. Silakan gunakan email lain atau melakukan login.'
            });
        }

        // 3. Periksa apakah Username sudah terdaftar
        const existingUsername = await userService.findUserByUsername(username);
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username sudah digunakan. Silakan pilih username lain.'
            });
        }

        // 4. Buat User Baru (Password di-hash menggunakan bcrypt di userService)
        const newUser = await userService.createUser({ fullname, username, email, password });

        return res.status(201).json({
            success: true,
            message: 'Registrasi pengguna berhasil!',
            data: newUser
        });
    } catch (error) {
        console.error('Error in registerHandler:', error);
        return res.status(500).json({
            success: false,
            message: 'Gagal melakukan registrasi pengguna',
            error: error.message
        });
    }
}

/**
 * Controller 2: POST /auth/login - Autentikasi & Penerbitan Token JWT (Langkah Ketiga)
 * Payload: email, password
 */
export async function loginHandler(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Validasi Input Payload
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Payload tidak lengkap. Email dan password wajib diisi.'
            });
        }

        // 2. Memeriksa keberadaan user berdasarkan email
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email atau password yang dimasukkan salah.'
            });
        }

        // 3. Memeriksa kesesuaian password menggunakan bcrypt.compare
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Email atau password yang dimasukkan salah.'
            });
        }

        // 4. Generate JWT Token
        const payload = {
            id: user.id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Sertakan data user tanpa field password
        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            success: true,
            message: 'Login berhasil!',
            token: token,
            expiresIn: JWT_EXPIRES_IN,
            data: userWithoutPassword
        });
    } catch (error) {
        console.error('Error in loginHandler:', error);
        return res.status(500).json({
            success: false,
            message: 'Gagal melakukan proses login',
            error: error.message
        });
    }
}

/**
 * Controller 3: GET /auth/me - Mengambil Profil User Terautentikasi
 */
export async function getMeHandler(req, res) {
    try {
        const userId = req.user.id;
        const userProfile = await userService.findUserById(userId);

        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: 'Profil pengguna tidak ditemukan.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Berhasil mengambil profil pengguna terautentikasi',
            data: userProfile
        });
    } catch (error) {
        console.error('Error in getMeHandler:', error);
        return res.status(500).json({
            success: false,
            message: 'Gagal mengambil profil pengguna',
            error: error.message
        });
    }
}
