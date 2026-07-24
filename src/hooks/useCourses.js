import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, addData, editData, deleteData } from "../services/api";
import {
  setCourses,
  addCourse as addCourseRedux,
  updateCourse as updateCourseRedux,
  deleteCourse as deleteCourseRedux,
} from "../store/redux/coursesSlice";
import useToast from "./useToast";

export default function useCourses() {
  const { showToast } = useToast();
  const dispatch = useDispatch();

  // Mengambil data dari state Redux
  const courses = useSelector((state) => state.courses || []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getData();
      const courseData = Array.isArray(res.data) ? res.data : [];
      dispatch(setCourses(courseData));
    } catch (err) {
      setError(err);
      showToast({
        type: "error",
        title: "Gagal Memuat",
        message: "Tidak dapat mengambil data kelas.",
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch, showToast]);

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses();
    }
  }, [fetchCourses, courses.length]);

  const addCourse = async (payload) => {
    setLoading(true);
    try {
      const res = await addData(payload);
      dispatch(addCourseRedux(res.data));
      showToast({
        type: "success",
        title: "Kelas Ditambahkan",
        message: `"${payload.title}" berhasil ditambahkan.`,
      });
      return res.data;
    } catch (err) {
      showToast({
        type: "error",
        title: "Gagal Menambah",
        message: "Terjadi kesalahan saat menambahkan kelas.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id, payload) => {
    setLoading(true);
    try {
      const res = await editData(id, payload);
      dispatch(updateCourseRedux(res.data));
      showToast({
        type: "success",
        title: "Kelas Diperbarui",
        message: `"${payload.title}" berhasil diperbarui.`,
      });
      return res.data;
    } catch (err) {
      showToast({
        type: "error",
        title: "Gagal Memperbarui",
        message: "Terjadi kesalahan saat memperbarui kelas.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async (id) => {
    setLoading(true);
    try {
      await deleteData(id);
      dispatch(deleteCourseRedux(id));
      showToast({
        type: "success",
        title: "Kelas Dihapus",
        message: "Kelas berhasil dihapus dari daftar.",
      });
      return true;
    } catch (err) {
      showToast({
        type: "error",
        title: "Gagal Menghapus",
        message: "Terjadi kesalahan saat menghapus kelas.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses,
    addCourse,
    updateCourse,
    removeCourse,
  };
}
