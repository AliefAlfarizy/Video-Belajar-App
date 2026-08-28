import bcrypt from 'bcryptjs';
import pool, { testConnection } from '../config/db.js';

// In-memory user store fallback
let inMemoryUsers = [];
let nextUserId = 1;

/**
 * Service 1: Create User (Register User Baru dengan Password Hash)
 * SQL DML Query: INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)
 */
export async function createUser({ fullname, username, email, password }) {
    // Enkripsi password menggunakan library bcryptjs (salt 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const isDbConnected = await testConnection();
        if (isDbConnected) {
            const query = `
                INSERT INTO users (fullname, username, email, password)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await pool.query(query, [fullname, username, email, hashedPassword]);
            
            // SELECT user yang baru saja disisipkan (tanpa mengembalikan password)
            const [rows] = await pool.query('SELECT id, fullname, username, email, role, created_at FROM users WHERE id = ?', [result.insertId]);
            return rows[0];
        }
    } catch (err) {
        console.warn(`[User Service] Fallback ke in-memory untuk createUser: ${err.message}`);
    }

    // In-memory fallback
    const newUser = {
        id: nextUserId++,
        fullname,
        username,
        email,
        password: hashedPassword,
        role: 'student',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    inMemoryUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

/**
 * Service 2: Find User by Email (Cek Keberadaan User untuk Login)
 * SQL DML Query: SELECT * FROM users WHERE email = ?
 */
export async function findUserByEmail(email) {
    try {
        const isDbConnected = await testConnection();
        if (isDbConnected) {
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows.length > 0 ? rows[0] : null;
        }
    } catch (err) {
        console.warn(`[User Service] Fallback ke in-memory untuk findUserByEmail: ${err.message}`);
    }
    return inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Service 3: Find User by Username (Mencegah Duplicate Username saat Register)
 * SQL DML Query: SELECT * FROM users WHERE username = ?
 */
export async function findUserByUsername(username) {
    try {
        const isDbConnected = await testConnection();
        if (isDbConnected) {
            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            return rows.length > 0 ? rows[0] : null;
        }
    } catch (err) {
        console.warn(`[User Service] Fallback ke in-memory untuk findUserByUsername: ${err.message}`);
    }
    return inMemoryUsers.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
}

/**
 * Service 4: Find User by ID (Ambil Profil User berdasarkan Token JWT)
 * SQL DML Query: SELECT id, fullname, username, email, role, created_at FROM users WHERE id = ?
 */
export async function findUserById(id) {
    const userId = parseInt(id, 10);
    try {
        const isDbConnected = await testConnection();
        if (isDbConnected) {
            const [rows] = await pool.query('SELECT id, fullname, username, email, role, created_at FROM users WHERE id = ?', [userId]);
            return rows.length > 0 ? rows[0] : null;
        }
    } catch (err) {
        console.warn(`[User Service] Fallback ke in-memory untuk findUserById: ${err.message}`);
    }
    const user = inMemoryUsers.find(u => u.id === userId);
    if (!user) return null;
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
