import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes.js';
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
// Support endpoint '/course' sesuai spesifikasi misi dan gambar referensi
app.use('/course', courseRoutes);
app.use('/api/course', courseRoutes);

// Root Route Info
app.get('/', (req, res) => {
    res.status(200).json({
        app: 'EduCourse Backend REST API Server',
        status: 'Active',
        endpoints: [
            { method: 'GET', path: '/course', description: 'List semua courses/kelas' },
            { method: 'GET', path: '/course/:id', description: 'Menampilkan satu course/kelas berdasarkan id' },
            { method: 'POST', path: '/course', description: 'Menambahkan data course/kelas (INSERT DML)' },
            { method: 'PATCH / PUT', path: '/course/:id', description: 'Mengubah data course/kelas berdasarkan id (UPDATE DML)' },
            { method: 'DELETE', path: '/course/:id', description: 'Menghapus data course/kelas berdasarkan id (DELETE DML)' }
        ]
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
        console.log(`📌 Endpoint Utama: http://localhost:${PORT}/course`);
    });
}

startServer();
