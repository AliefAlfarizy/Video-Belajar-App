import axiosClient from "./axiosClient";

const RESOURCE = "/course";

export const getCourses = () => axiosClient.get(RESOURCE);
export const getCourse = (id) => axiosClient.get(`${RESOURCE}/${id}`);
export const createCourse = (payload) => axiosClient.post(RESOURCE, payload);
export const updateCourse = (id, payload) =>
  axiosClient.put(`${RESOURCE}/${id}`, payload);
export const deleteCourse = (id) => axiosClient.delete(`${RESOURCE}/${id}`);

const courseAPI = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
export default courseAPI;
