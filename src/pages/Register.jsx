import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthHeader from '../components/molecules/AuthHeader';
import FormInput from '../components/atoms/FormInput';
import FormSelect from '../components/atoms/FormSelect';
import PhoneInput from '../components/atoms/PhoneInput';
import FormDivider from '../components/molecules/FormDivider';
import SocialButton from '../components/molecules/SocialButton';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleValidate = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Nama lengkap wajib diisi';
    else if (formData.fullName.length < 3) newErrors.fullName = 'Nama lengkap minimal 3 karakter';

    if (!formData.email) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid';

    if (!formData.phone) newErrors.phone = 'Nomor HP wajib diisi';
    else if (!/^\d{7,13}$/.test(formData.phone)) newErrors.phone = 'Nomor HP harus 7-13 digit angka';

    if (!formData.password) newErrors.password = 'Kata sandi wajib diisi';
    else if (formData.password.length < 6) newErrors.password = 'Kata sandi minimal 6 karakter';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Konfirmasi kata sandi wajib diisi';
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Kata sandi tidak cocok';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      alert('Pendaftaran Berhasil! Silakan masuk.');
      navigate('/login');
    }
  };

  const genderOptions = [
    { value: 'pria', label: 'Pria' },
    { value: 'wanita', label: 'Wanita' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAF5] flex flex-col">

      <AuthHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-sm border border-gray-100 px-10 py-10">

          {/* Title */}
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Pendaftaran Akun</h1>
            <p className="text-sm text-gray-500">Yuk, daftarkan akunmu sekarang juga!</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <FormInput
              label="Nama Lengkap"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
            />

            <FormInput
              label="E-Mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <FormSelect
              label="Jenis Kelamin"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={genderOptions}
              placeholder="Pilih jenis kelamin"
              required
            />

            <PhoneInput
              label="No. Hp"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />

            <FormInput
              label="Kata Sandi"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <FormInput
              label="Konfirmasi Kata Sandi"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              showPasswordToggle
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {/* Lupa Password */}
            <div className="flex justify-end -mt-1">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Lupa Password?
              </a>
            </div>

            {/* Tombol Daftar */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors"
            >
              Daftar
            </button>

            {/* Tombol Masuk */}
            <Link
              to="/login"
              className="w-full py-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-500 font-semibold text-sm text-center transition-colors"
            >
              Masuk
            </Link>

            <FormDivider />

            <SocialButton 
              provider="google" 
              text="Daftar dengan Google" 
              onClick={() => alert('Daftar dengan Google')} 
            />

          </form>
        </div>
      </main>

    </div>
  );
}

export default Register;
