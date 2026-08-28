import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Parameter koneksi database dari environment variables
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'educourse_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Membuka Connection Pool mysql2
export const pool = mysql.createPool(dbConfig);

// Fungsi pembantu untuk menguji koneksi ke database MySQL
export async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log(`[DB] Berhasil terhubung ke database MySQL '${dbConfig.database}' pada ${dbConfig.host}:${dbConfig.port}`);
        connection.release();
        return true;
    } catch (error) {
        console.warn(`[DB WARNING] Gagal terhubung ke MySQL (${error.message}).`);
        console.warn(`[DB TIP] Pastikan service MySQL/XAMPP sudah berjalan dan database '${dbConfig.database}' sudah dibuat.`);
        return false;
    }
}

export default pool;
