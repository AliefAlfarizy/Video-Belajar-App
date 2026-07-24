import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getData, addData, editData, deleteData } from '../services/api';
import Button from '../components/atoms/Button';
import FormInput from '../components/atoms/FormInput';
import Badge from '../components/atoms/Badge';
import ConfirmDialog from '../components/atoms/ConfirmDialog';
import ToastContainer from '../components/atoms/ToastContainer';
import useToast from '../hooks/useToast';
import useCourses from '../hooks/useCourses';

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toasts, removeToast } = useToast();
  const { courses: hookCourses, addCourse, updateCourse, removeCourse } = useCourses();
  
  // Mengambil data dari Redux Store
  const reduxCourses = useSelector((state) => state.courses || []);
  const courses = reduxCourses.length > 0 ? reduxCourses : hookCourses;

  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mentor: '',
    jobTitle: '',
    price: '',
    rating: '',
    image: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };


  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Judul wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    if (!formData.mentor.trim()) newErrors.mentor = 'Nama mentor wajib diisi';
    if (!formData.price.trim()) newErrors.price = 'Harga wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData({ title: '', description: '', mentor: '', jobTitle: '', price: '', rating: '', image: '' });
    setErrors({});
    setShowModal(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      mentor: course.mentor,
      jobTitle: course.jobTitle || '',
      price: course.price,
      rating: course.rating || '',
      image: course.image || '',
    });
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCourse(null);
    setFormData({ title: '', description: '', mentor: '', jobTitle: '', price: '', rating: '', image: '' });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    (async () => {
      try {
        if (editingCourse) {
          await updateCourse(editingCourse.id, formData);
        } else {
          await addCourse(formData);
        }
        handleCloseModal();
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const handleDelete = (id) => {
    setConfirmDelete(id);
  };

  const handleConfirmDelete = () => {
    (async () => {
      try {
        await removeCourse(confirmDelete);
      } catch (err) {
        console.error(err);
      } finally {
        setConfirmDelete(null);
      }
    })();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <ConfirmDialog
        isOpen={confirmDelete !== null}
        title="Hapus Kelas?"
        message="Kelas yang dihapus tidak bisa dikembalikan. Yakin ingin melanjutkan?"
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete(null)}
      />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-none">Admin Dashboard</h1>
              <p className="text-xs text-gray-400 mt-0.5">Kelola data kelas pembelajaran</p>
            </div>
          </div>
          <Button variant="secondary" fullWidth={false} onClick={() => navigate('/')}>
            ← Kembali ke Home
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats + Action Bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 shadow-sm">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="font-semibold text-gray-900">{courses.length}</span> kelas tersedia
            </span>
          </div>
          <Button variant="primary" fullWidth={false} onClick={handleOpenAdd}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Kelas
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Kelas</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Mentor</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Harga</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Rating</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/70 transition-colors group">

                    {/* Kelas */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 max-w-xs">
                        <img
                          src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'}
                          alt={course.title}
                          className="w-11 h-11 rounded-xl object-cover bg-gray-100 shrink-0 shadow-sm"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate leading-snug">{course.title}</p>
                          <p className="text-xs text-gray-400 truncate mt-0.5 leading-snug">{course.description}</p>
                        </div>
                      </div>
                    </td>

                    {/* Mentor */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(course.mentor || 'mentor')}&backgroundColor=ffdfbf`}
                          alt={course.mentor}
                          className="w-8 h-8 rounded-full bg-amber-50 border border-gray-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate leading-snug">{course.mentor}</p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">{course.jobTitle}</p>
                        </div>
                      </div>
                    </td>

                    {/* Harga */}
                    <td className="px-5 py-4">
                      <Badge variant="price">{course.price}</Badge>
                    </td>

                    {/* Rating */}
                    <td className="px-5 py-4">
                      {course.rating ? (
                        <Badge variant="rating">
                          <svg className="w-3 h-3 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {course.rating}
                        </Badge>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>

                    {/* Aksi */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(course)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {courses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Belum ada data kelas</p>
              <p className="text-xs text-gray-400">Klik tombol "Tambah Kelas" untuk memulai</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${editingCourse ? 'bg-blue-50' : 'bg-green-50'}`}>
                  {editingCourse ? (
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  {editingCourse ? 'Edit Kelas' : 'Tambah Kelas Baru'}
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="md:col-span-2">
                  <FormInput
                    label="Judul Kelas"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Contoh: UI/UX Design Mastery"
                    error={errors.title}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Jelaskan isi kelas secara singkat..."
                    rows={3}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none
                      ${errors.description
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                      }`}
                  />
                  {errors.description && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>
                  )}
                </div>

                <FormInput label="Nama Mentor" name="mentor" value={formData.mentor} onChange={handleChange} placeholder="Contoh: Rina Kusuma" error={errors.mentor} required />
                <FormInput label="Jabatan Mentor" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Contoh: Lead Designer di Tokopedia" />
                <FormInput label="Harga" name="price" value={formData.price} onChange={handleChange} placeholder="Contoh: Rp 450K" error={errors.price} required />
                <FormInput label="Rating" name="rating" value={formData.rating} onChange={handleChange} placeholder="Contoh: 4.8 (1.2K)" />

                <div className="md:col-span-2">
                  <FormInput label="URL Gambar" name="image" value={formData.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-2 border-t border-gray-100 mt-2">
                <Button type="button" variant="secondary" onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" variant="primary">
                  {editingCourse ? 'Simpan Perubahan' : 'Tambah Kelas'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
