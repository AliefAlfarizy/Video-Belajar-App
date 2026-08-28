import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { testConnection } from './config/db.js';
import { initDatabase } from './config/initDb.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing REST API EduCourse App
// 1. Module Course API
app.use('/course', courseRoutes);
app.use('/api/course', courseRoutes);

// 2. Module Auth API (Register, Login, Me)
app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);

// Direct Aliases untuk fleksibilitas endpoint
app.post('/register', (req, res, next) => req.url = '/register' && authRoutes(req, res, next));
app.post('/login', (req, res, next) => req.url = '/login' && authRoutes(req, res, next));

// Root Route Info
app.get('/', (req, res) => {
    res.status(200).json({
        app: 'EduCourse Backend REST API Server',
        status: 'Active',
        modules: {
            auth: [
                { method: 'POST', path: '/auth/register', description: 'Registrasi user baru (Bcrypt Password Hashing)' },
                { method: 'POST', path: '/auth/login', description: 'Login user & Penerbitan JWT Token' },
                { method: 'GET', path: '/auth/me', description: 'Profil user terautentikasi (Protected Header Authorization)' }
            ],
            courses: [
                { method: 'GET', path: '/course', description: 'List semua courses/kelas (Query params: search, level, sort)' },
                { method: 'GET', path: '/course/:id', description: 'Menampilkan satu course/kelas berdasarkan id' },
                { method: 'POST', path: '/course', description: 'Menambahkan data course/kelas (INSERT DML)' },
                { method: 'PATCH / PUT', path: '/course/:id', description: 'Mengubah data course/kelas berdasarkan id (UPDATE DML)' },
                { method: 'DELETE', path: '/course/:id', description: 'Menghapus data course/kelas berdasarkan id (DELETE DML)' }
            ]
        }
    });
});

// Middleware 404 Not Found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Endpoint '${req.originalUrl}' dengan method '${req.method}' tidak ditemukan.`
    });
});

// Middleware Error Handling
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan internal pada server.',
        error: err.message
    });
});

// Jalankan Server & Inisialisasi DB
async function startServer() {
    console.log(`[SERVER] Memulai Express Backend Server...`);
    const dbConnected = await testConnection();
    if (dbConnected) {
        await initDatabase();
    } else {
        console.log(`[SERVER INFO] Server berjalan dengan in-memory database fallback (MySQL offline).`);
    }

    app.listen(PORT, () => {
        console.log(`🚀 EduCourse REST API Server berjalan pada http://localhost:${PORT}`);
        console.log(`📌 Endpoint Auth: http://localhost:${PORT}/auth/register & http://localhost:${PORT}/auth/login`);
        console.log(`📌 Endpoint Course: http://localhost:${PORT}/course`);
    });
}

startServer();
