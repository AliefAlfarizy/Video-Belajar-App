import { Router } from 'express';
import {
    getCoursesHandler,
    getCourseByIdHandler,
    addCourseHandler,
    updateCourseHandler,
    deleteCourseHandler
} from '../controllers/courseController.js';

const router = Router();

// Endpoint 1 & 4: GET /course (List All) & POST /course (Add New Course)
router.route('/')
    .get(getCoursesHandler)
    .post(addCourseHandler);

// Endpoint 2, 3 & 5: GET /course/:id, PATCH/PUT /course/:id, DELETE /course/:id
router.route('/:id')
    .get(getCourseByIdHandler)
    .patch(updateCourseHandler)
    .put(updateCourseHandler)
    .delete(deleteCourseHandler);

export default router;
