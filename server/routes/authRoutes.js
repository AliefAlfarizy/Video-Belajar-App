import { Router } from 'express';
import { registerHandler, loginHandler, getMeHandler } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Endpoint Registrasi Pengguna Baru
router.post('/register', registerHandler);

// Endpoint Login Pengguna & JWT Token Generation
router.post('/login', loginHandler);

// Endpoint Profil Pengguna Terproteksi JWT
router.get('/me', authenticateToken, getMeHandler);

export default router;
