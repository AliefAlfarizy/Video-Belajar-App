import * as courseService from '../services/courseService.js';

/**
 * Controller 1: GET /course - Mendapatkan daftar semua course
 */
export async function getCoursesHandler(req, res) {
    try {
        const courses = await courseService.getAllCourses();
        return res.status(200).json({
            success: true,
            message: 'Berhasil mengambil daftar course',
            total: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Error in getCoursesHandler:', error);
        return res.status(500).json({
            success: false,
            message: 'Gagal mengambil data course',
            error: error.message
        });
    }
}

/**
 * Controller 2: GET /course/:id - Mendapatkan satu course berdasarkan ID
 */
export async function getCourseByIdHandler(req, res) {
    try {
        const { id } = req.params;
        const course = await courseService.getCourseById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: `Course dengan ID ${id} tidak ditemukan`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Berhasil mengambil data course dengan ID ${id}`,
            data: course
        });
    } catch (error) {
        console.error('Error in getCourseByIdHandler:', error);
        return res.status(500).json({
            success: false,
            message: 'Gagal mengambil detail course',
            error: error.message
        });
    }
}

/**
 * Controller 3: POST /course - Menambahkan course baru (INSERT DML)
 */
export async function addCourseHandler(req, res) {
    try {
        const { title, description, price } = req.body;

        // Validasi Payload
        if (!title || !description || price === undefined || price === null) {
            return res.status(400).json({
                success: false,
                message: 'Payload tidak lengkap. Atribut title, description, dan price wajib diisi.'
            });
        }

        const newCourse = await courseService.createCourse(req.body);
        return res.status(201).json({
            success: true,
            message: 'Berhasil menambahkan data course baru',
            data: newCourse
        });
    } catch (error) {
        console.error('Error in addCourseHandler:', error);
        return res.status(500).json({
            success: false,
            message: 'Gagal menambahkan course baru',
            error: error.message
        });
    }
}

/**
 * Controller 4: PATCH /course/:id (atau PUT) - Mengubah data course spesifik (UPDATE DML)
 */
export async function updateCourseHandler(req, res) {
    try {
        const { id } = req.params;
        const payload = req.body;

        if (Object.keys(payload).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Payload data yang akan diubah tidak boleh kosong.'
            });
        }

        const updatedCourse = await courseService.updateCourse(id, payload);

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: `Course dengan ID ${id} tidak ditemukan`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Berhasil memperbarui data course dengan ID ${id}`,
            data: updatedCourse
        });
    } catch (error) {
        console.error('Error in updateCourseHandler:', error);
        return res.status(500).json({
            success: false,
            message: 'Gagal mengubah data course',
            error: error.message
        });
    }
}

/**
 * Controller 5: DELETE /course/:id - Menghapus data course spesifik (DELETE DML)
 */
export async function deleteCourseHandler(req, res) {
    try {
        const { id } = req.params;
        const isDeleted = await courseService.deleteCourse(id);

        if (!isDeleted) {
            return res.status(404).json({
                success: false,
                message: `Course dengan ID ${id} tidak ditemukan`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus course dengan ID ${id}`
        });
    } catch (error) {
        console.error('Error in deleteCourseHandler:', error);
        return res.status(500).json({
            success: false,
            message: 'Gagal menghapus data course',
            error: error.message
        });
    }
}
