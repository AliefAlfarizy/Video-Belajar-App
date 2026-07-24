import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../services/api";
import { setCourses } from "../../store/redux/coursesSlice";
import CourseCard from "../molecules/CourseCard";

function ListView({ courses: propCourses }) {
  const dispatch = useDispatch();
  // Mengambil data dari state Redux menggunakan useSelector
  const reduxCourses = useSelector((state) => state.courses || []);
  const courses = propCourses && propCourses.length > 0 ? propCourses : reduxCourses;

  useEffect(() => {
    if (reduxCourses.length === 0) {
      getData()
        .then((res) => {
          if (res && res.data) {
            dispatch(setCourses(Array.isArray(res.data) ? res.data : []));
          }
        })
        .catch((err) => console.error("Error fetching data in ListView:", err));
    }
  }, [dispatch, reduxCourses.length]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300">
      {courses.map((course) => (
        <div key={course.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
}

export default ListView;
