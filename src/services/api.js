import courseAPI, {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "./courseAPI";

// Alias functions for mission instruction compliance
export const getData = () => getCourses();
export const addData = (payload) => createCourse(payload);
export const editData = (id, payload) => updateCourse(id, payload);
export const deleteData = (id) => deleteCourse(id);

export { getCourses, getCourse, createCourse, updateCourse, deleteCourse };

const api = {
  getData,
  addData,
  editData,
  deleteData,
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};

export default api;
