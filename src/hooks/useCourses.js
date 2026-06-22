import { useState, useEffect } from "react";
import courseAPI from "../services/courseAPI";
import useToast from "./useToast";

export default function useCourses() {
  const { showToast } = useToast();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await courseAPI.getCourses();
      setCourses(Array.isArray(res.data) ? res.data : []);
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
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async (payload) => {
    setLoading(true);
    try {
      const res = await courseAPI.createCourse(payload);
      setCourses((prev) => [...prev, res.data]);
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
      const res = await courseAPI.updateCourse(id, payload);
      setCourses((prev) =>
        prev.map((c) => (String(c.id) === String(id) ? res.data : c)),
      );
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
      await courseAPI.deleteCourse(id);
      setCourses((prev) => prev.filter((c) => String(c.id) !== String(id)));
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
