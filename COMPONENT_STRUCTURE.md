# Struktur Komponen - Atomic Design

Project ini menggunakan **Atomic Design Pattern** untuk membangun UI yang modular dan reusable.

## Hirarki Komponen

### 🔹 Atoms (Komponen Terkecil)
Komponen dasar yang tidak bisa dipecah lagi:

- **Button.jsx** - Tombol dengan berbagai variant (primary, secondary, google, dll)
- **InputField.jsx** - Input field dengan label dan error handling
- **FormInput.jsx** - Input field khusus untuk form auth (email, password, text)
- **FormSelect.jsx** - Dropdown select dengan styling konsisten
- **PhoneInput.jsx** - Input nomor HP dengan flag Indonesia dan kode +62
- **Badge.jsx** - Label badge untuk kategori/status
- **Typography.jsx** - Komponen text dengan variant (h1, h2, h3, body, caption)

### 🔸 Molecules (Gabungan Atoms)
Komponen yang terdiri dari beberapa atoms:

- **FormGroup.jsx** - Wrapper untuk input field dengan label
- **SocialLoginGroup.jsx** - Group tombol login sosial media
- **SocialButton.jsx** - Tombol login dengan provider (Google, Facebook, dll)
- **FormDivider.jsx** - Divider "atau" untuk memisahkan form section
- **AuthHeader.jsx** - Header navbar untuk halaman auth (login/register)
- **CourseCard.jsx** - Card untuk menampilkan course dengan gambar, title, mentor, price

### 🔶 Organisms (Gabungan Molecules & Atoms)
Komponen kompleks yang membentuk section halaman:

- **AuthCard.jsx** - Card container untuk form login/register
- **Navbar.jsx** - Navigation bar dengan logo dan menu
- **HeroSection.jsx** - Section hero di homepage
- **CourseSection.jsx** - Section daftar course dengan filter
- **NewsletterSection.jsx** - Section newsletter subscription
- **Footer.jsx** - Footer dengan link dan social media

### 📄 Pages (Template Lengkap)
Halaman lengkap yang menggabungkan organisms:

- **Home.jsx** - Homepage dengan Navbar, Hero, Courses, Newsletter, Footer
- **Login.jsx** - Halaman login dengan AuthHeader dan form login
- **Register.jsx** - Halaman register dengan AuthHeader dan form register

---

## Prinsip Reusable Component

### ✅ Penggunaan Props
Semua komponen menerima data melalui **props**, contoh:

```jsx
// Atom - FormInput
<FormInput
  label="E-Mail"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
  required
/>

// Molecule - SocialButton
<SocialButton 
  provider="google" 
  text="Masuk dengan Google" 
  onClick={handleLogin} 
/>

// Organism - CourseSection
<CourseSection courses={courseData} />
```

### ✅ Komponen Dapat Digunakan Ulang
- `FormInput` dipakai di Login dan Register
- `AuthHeader` dipakai di Login dan Register
- `SocialButton` dipakai di Login dan Register
- `CourseCard` dipakai berkali-kali di CourseSection
- `Button` dipakai di berbagai halaman dengan variant berbeda

---

## Responsive Design

### 🎨 Framework: Tailwind CSS
Semua komponen menggunakan **Tailwind CSS** untuk styling dan responsive breakpoints:

- `sm:` - Small devices (≥640px)
- `md:` - Medium devices (≥768px)
- `lg:` - Large devices (≥1024px)
- `xl:` - Extra large devices (≥1280px)

### 📱 Contoh Responsive Implementation

```jsx
// Navbar - Mobile menu hidden, desktop visible
<div className="hidden md:flex items-center gap-6">
  {/* Desktop menu */}
</div>

// AuthHeader - Logo center on mobile, left on desktop
<img className="h-7 w-auto object-contain mx-auto sm:mx-0" />

// Footer - Accordion on mobile, grid on desktop
<div className="hidden md:grid grid-cols-4 gap-8">
  {/* Desktop footer */}
</div>
<div className="md:hidden flex flex-col">
  {/* Mobile accordion */}
</div>
```

### 🔧 React Responsive (Optional)
Jika diperlukan logic responsive yang lebih kompleks, bisa tambahkan library:
- `react-responsive` - Media query hooks
- `react-device-detect` - Device detection
- `react-media` - Component-based media queries

---

## Kesimpulan Checklist

✅ **1. Slicing UI dengan Atomic Design**
- Atoms: FormInput, Button, Badge, Typography, dll
- Molecules: FormGroup, SocialButton, CourseCard, dll
- Organisms: Navbar, Footer, HeroSection, CourseSection, dll
- Pages: Home, Login, Register

✅ **2. Reusable Component dengan Props**
- Semua komponen menerima data via props
- Tidak ada hardcoded data di dalam komponen
- Komponen bisa dipakai ulang di berbagai halaman

✅ **3. Responsive dengan Tailwind CSS**
- Breakpoints: sm, md, lg, xl
- Mobile-first approach
- Conditional rendering untuk mobile/desktop
- Siap untuk integrasi react-responsive jika diperlukan
