-- ===================================================
-- Database Schema for EduCourse App
-- ===================================================

CREATE DATABASE IF NOT EXISTS educourse_db;
USE educourse_db;

-- Tabel Kategori (opsional / referensi)
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Tutor (opsional / referensi)
CREATE TABLE IF NOT EXISTS tutors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    headline VARCHAR(150) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Utama: Courses
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE SET NULL
);

-- Sample Data Inisialisasi
INSERT INTO categories (id, name, slug, description) VALUES
(1, 'Web Development', 'web-development', 'Kategori seputar pengembangan website modern'),
(2, 'Data Science', 'data-science', 'Kategori analisis data dan machine learning')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO tutors (id, name, headline) VALUES
(1, 'Budi Santoso', 'Senior Fullstack Engineer'),
(2, 'Siti Rahma', 'Lead Data Scientist')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO courses (id, category_id, tutor_id, title, slug, description, price, discount_price, level, is_published) VALUES
(1, 1, 1, 'Mastering Node.js & Express.js for Backend Developer', 'mastering-nodejs-express', 'Pelajari konsep fundamental Node.js, asynchronous programming, DML SQL, dan pembuatan RESTful API dari dasar.', 250000.00, 199000.00, 'intermediate', 1),
(2, 1, 1, 'React.js & Redux Toolkit Modern Web Apps', 'react-redux-modern', 'Kuasai pembuatan frontend interaktif dengan React.js 19, Redux Toolkit, dan Tailwind CSS.', 300000.00, 249000.00, 'beginner', 1),
(3, 2, 2, 'Python Data Analysis & Visualization Fundamentals', 'python-data-analysis', 'Panduan lengkap analisis data menggunakan Python, Pandas, Matplotlib, dan Seaborn.', 280000.00, NULL, 'beginner', 1)
ON DUPLICATE KEY UPDATE title=VALUES(title);
