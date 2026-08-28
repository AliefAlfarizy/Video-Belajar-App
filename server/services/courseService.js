import pool, { testConnection } from '../config/db.js';

// In-Memory Data Store fallback
let inMemoryCourses = [
    {
        id: 1,
        category_id: 1,
        tutor_id: 1,
        title: 'Mastering Node.js & Express.js for Backend Developer',
        slug: 'mastering-nodejs-express',
        description: 'Pelajari konsep fundamental Node.js, asynchronous programming, DML SQL, dan pembuatan RESTful API dari dasar.',
        price: 250000.00,
        discount_price: 199000.00,
        level: 'intermediate',
        is_published: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 2,
        category_id: 1,
        tutor_id: 1,
        title: 'React.js & Redux Toolkit Modern Web Apps',
        slug: 'react-redux-modern',
        description: 'Kuasai pembuatan frontend interaktif dengan React.js 19, Redux Toolkit, dan Tailwind CSS.',
        price: 300000.00,
        discount_price: 249000.00,
        level: 'beginner',
        is_published: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 3,
        category_id: 2,
        tutor_id: 2,
        title: 'Python Data Analysis & Visualization Fundamentals',
        slug: 'python-data-analysis',
        description: 'Panduan lengkap analisis data menggunakan Python, Pandas, Matplotlib, dan Seaborn.',
        price: 280000.00,
        discount_price: null,
        level: 'beginner',
        is_published: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

let nextInMemoryId = 4;

/**
 * Service 1: SELECT dengan Query Params (Filter, Search, & Sort)
 * Supports: ?search=keyword & level=beginner & sort=price_asc
 */
export async function getAllCourses({ search, level, sort } = {}) {
    try {
        const isDbConnected = await testConnection();
        if (isDbConnected) {
            let sql = 'SELECT * FROM courses WHERE 1=1';
            const params = [];

            // 1. Search Query Param
            if (search) {
                sql += ' AND (title LIKE ? OR description LIKE ?)';
                const term = `%${search}%`;
                params.push(term, term);
            }

            // 2. Filter Query Param (level)
            if (level) {
                sql += ' AND level = ?';
                params.push(level);
            }

            // 3. Sort Query Param
            if (sort === 'price_asc') {
                sql += ' ORDER BY price ASC';
            } else if (sort === 'price_desc') {
                sql += ' ORDER BY price DESC';
            } else if (sort === 'title_asc') {
                sql += ' ORDER BY title ASC';
            } else if (sort === 'latest') {
                sql += ' ORDER BY id DESC';
            } else {
                sql += ' ORDER BY id ASC';
            }

            const [rows] = await pool.query(sql, params);
            return rows;
        }
    } catch (err) {
        console.warn(`[Service] Menggunakan fallback in-memory untuk getAllCourses: ${err.message}`);
    }

    // In-memory Filtering, Searching, Sorting Fallback
    let result = [...inMemoryCourses];

    if (search) {
        const term = search.toLowerCase();
        result = result.filter(c => c.title.toLowerCase().includes(term) || c.description.toLowerCase().includes(term));
    }

    if (level) {
        result = result.filter(c => c.level.toLowerCase() === level.toLowerCase());
    }

    if (sort === 'price_asc') {
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === 'price_desc') {
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sort === 'title_asc') {
        result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'latest') {
        result.sort((a, b) => b.id - a.id);
    } else {
        result.sort((a, b) => a.id - b.id);
    }

    return result;
}

/**
 * Service 2: SELECT by ID
 */
export async function getCourseById(id) {
    const courseId = parseInt(id, 10);
    try {
        const isDbConnected = await testConnection();
        if (isDbConnected) {
            const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [courseId]);
            return rows.length > 0 ? rows[0] : null;
        }
    } catch (err) {
        console.warn(`[Service] Menggunakan fallback in-memory untuk getCourseById: ${err.message}`);
    }
    return inMemoryCourses.find(c => c.id === courseId) || null;
}

/**
 * Service 3: INSERT / ADD
 */
export async function createCourse(data) {
    const {
        title,
        slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        description,
        price,
        discount_price = null,
        level = 'beginner',
        is_published = 1,
        category_id = null,
        tutor_id = null
    } = data;

    try {
        const isDbConnected = await testConnection();
        if (isDbConnected) {
            const query = `
                INSERT INTO courses (category_id, tutor_id, title, slug, description, price, discount_price, level, is_published)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [category_id, tutor_id, title, slug, description, price, discount_price, level, is_published ? 1 : 0];
            const [result] = await pool.query(query, values);
            
            const [newRows] = await pool.query('SELECT * FROM courses WHERE id = ?', [result.insertId]);
            return newRows[0];
        }
    } catch (err) {
        console.warn(`[Service] Menggunakan fallback in-memory untuk createCourse: ${err.message}`);
    }

    const newCourse = {
        id: nextInMemoryId++,
        category_id,
        tutor_id,
        title,
        slug,
        description,
        price: parseFloat(price),
        discount_price: discount_price ? parseFloat(discount_price) : null,
        level,
        is_published: is_published ? 1 : 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    inMemoryCourses.push(newCourse);
    return newCourse;
}

/**
 * Service 4: UPDATE
 */
export async function updateCourse(id, data) {
    const courseId = parseInt(id, 10);
    const existing = await getCourseById(courseId);
    if (!existing) {
        return null;
    }

    try {
        const isDbConnected = await testConnection();
        if (isDbConnected) {
            const fields = [];
            const values = [];

            if (data.title !== undefined) {
                fields.push('title = ?');
                values.push(data.title);
            }
            if (data.slug !== undefined) {
                fields.push('slug = ?');
                values.push(data.slug);
            }
            if (data.description !== undefined) {
                fields.push('description = ?');
                values.push(data.description);
            }
            if (data.price !== undefined) {
                fields.push('price = ?');
                values.push(data.price);
            }
            if (data.discount_price !== undefined) {
                fields.push('discount_price = ?');
                values.push(data.discount_price);
            }
            if (data.level !== undefined) {
                fields.push('level = ?');
                values.push(data.level);
            }
            if (data.is_published !== undefined) {
                fields.push('is_published = ?');
                values.push(data.is_published ? 1 : 0);
            }
            if (data.category_id !== undefined) {
                fields.push('category_id = ?');
                values.push(data.category_id);
            }
            if (data.tutor_id !== undefined) {
                fields.push('tutor_id = ?');
                values.push(data.tutor_id);
            }

            if (fields.length === 0) {
                return existing;
            }

            values.push(courseId);
            const query = `UPDATE courses SET ${fields.join(', ')} WHERE id = ?`;
            await pool.query(query, values);

            const [updatedRows] = await pool.query('SELECT * FROM courses WHERE id = ?', [courseId]);
            return updatedRows[0];
        }
    } catch (err) {
        console.warn(`[Service] Menggunakan fallback in-memory untuk updateCourse: ${err.message}`);
    }

    const index = inMemoryCourses.findIndex(c => c.id === courseId);
    if (index !== -1) {
        inMemoryCourses[index] = {
            ...inMemoryCourses[index],
            ...data,
            price: data.price !== undefined ? parseFloat(data.price) : inMemoryCourses[index].price,
            discount_price: data.discount_price !== undefined ? (data.discount_price !== null ? parseFloat(data.discount_price) : null) : inMemoryCourses[index].discount_price,
            updated_at: new Date().toISOString()
        };
        return inMemoryCourses[index];
    }
    return null;
}

/**
 * Service 5: DELETE
 */
export async function deleteCourse(id) {
    const courseId = parseInt(id, 10);
    const existing = await getCourseById(courseId);
    if (!existing) {
        return false;
    }

    try {
        const isDbConnected = await testConnection();
        if (isDbConnected) {
            const [result] = await pool.query('DELETE FROM courses WHERE id = ?', [courseId]);
            return result.affectedRows > 0;
        }
    } catch (err) {
        console.warn(`[Service] Menggunakan fallback in-memory untuk deleteCourse: ${err.message}`);
    }

    const index = inMemoryCourses.findIndex(c => c.id === courseId);
    if (index !== -1) {
        inMemoryCourses.splice(index, 1);
        return true;
    }
    return false;
}
