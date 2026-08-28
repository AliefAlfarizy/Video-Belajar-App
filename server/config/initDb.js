import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function initDatabase() {
    const host = process.env.DB_HOST || 'localhost';
    const port = parseInt(process.env.DB_PORT || '3306', 10);
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME || 'educourse_db';

    let connection;
    try {
        connection = await mysql.createConnection({ host, port, user, password });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await connection.query(`USE \`${dbName}\`;`);

        // 1. Buat tabel users jika belum ada
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(100) NOT NULL,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('student', 'tutor', 'admin') DEFAULT 'student',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // 2. Buat tabel categories jika belum ada
        await connection.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                slug VARCHAR(120) NOT NULL UNIQUE,
                description TEXT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // 3. Buat tabel tutors jika belum ada
        await connection.query(`
            CREATE TABLE IF NOT EXISTS tutors (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                user_id BIGINT NULL UNIQUE,
                name VARCHAR(100) NOT NULL,
                headline VARCHAR(150) NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // 4. Buat tabel courses jika belum ada
        await connection.query(`
            CREATE TABLE IF NOT EXISTS courses (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                category_id BIGINT NULL,
                tutor_id BIGINT NULL,
                title VARCHAR(200) NOT NULL,
                slug VARCHAR(220) NOT NULL UNIQUE,
                description TEXT NOT NULL,
                price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
                discount_price DECIMAL(12, 2) DEFAULT NULL,
                level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
                is_published TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // 5. Seed initial data
        const [rows] = await connection.query(`SELECT COUNT(*) as count FROM courses;`);
        if (rows[0].count === 0) {
            await connection.query(`
                INSERT INTO courses (title, slug, description, price, discount_price, level, is_published) VALUES
                ('Mastering Node.js & Express.js for Backend Developer', 'mastering-nodejs-express', 'Pelajari konsep fundamental Node.js, asynchronous programming, DML SQL, dan pembuatan RESTful API dari dasar.', 250000.00, 199000.00, 'intermediate', 1),
                ('React.js & Redux Toolkit Modern Web Apps', 'react-redux-modern', 'Kuasai pembuatan frontend interaktif dengan React.js 19, Redux Toolkit, dan Tailwind CSS.', 300000.00, 249000.00, 'beginner', 1),
                ('Python Data Analysis & Visualization Fundamentals', 'python-data-analysis', 'Panduan lengkap analisis data menggunakan Python, Pandas, Matplotlib, dan Seaborn.', 280000.00, NULL, 'beginner', 1);
            `);
            console.log(`[DB INIT] Seed data berhasil dimasukkan ke tabel 'courses'.`);
        }

        console.log(`[DB INIT] Inisialisasi Database '${dbName}' & Tabel ('users', 'courses') berhasil!`);
        return true;
    } catch (error) {
        console.warn(`[DB INIT WARNING] Tidak dapat melakukan inisialisasi otomatis MySQL: ${error.message}`);
        return false;
    } finally {
        if (connection) await connection.end();
    }
}
