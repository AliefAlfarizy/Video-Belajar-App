import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthHeader from '../components/molecules/AuthHeader';
import FormInput from '../components/atoms/FormInput';
import FormDivider from '../components/molecules/FormDivider';
import SocialButton from '../components/molecules/SocialButton';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleValidate = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid';

    if (!formData.password) newErrors.password = 'Kata sandi wajib diisi';
    else if (formData.password.length < 6) newErrors.password = 'Kata sandi minimal 6 karakter';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      alert('Login Berhasil!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAF5] flex flex-col">
      
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-sm border border-gray-100 px-10 py-10">

          {/* Title */}
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Masuk ke Akun</h1>
            <p className="text-sm text-gray-500">Yuk, lanjutin belajarmu di videobelajar.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <FormInput
              label="E-Mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
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

            {/* Lupa Password */}
            <div className="flex justify-end -mt-1">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Lupa Password?
              </a>
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors"
            >
              Masuk
            </button>

            {/* Tombol Daftar */}
            <Link
              to="/register"
              className="w-full py-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-500 font-semibold text-sm text-center transition-colors"
            >
              Daftar
            </Link>

            <FormDivider />

            <SocialButton 
              provider="google" 
              text="Masuk dengan Google" 
              onClick={() => alert('Masuk dengan Google')} 
            />

          </form>
        </div>
      </main>

    </div>
  );
}

export default Login;
