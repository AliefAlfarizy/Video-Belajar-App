# Video Belajar App

Platform pembelajaran online berbasis video untuk meningkatkan skill dan pengetahuan.

## Tech 

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- localStorage untuk data persistence

## Fitur Utama

- Katalog kelas pembelajaran dengan filter kategori
- Sistem autentikasi (Register & Login)
- Admin dashboard untuk CRUD kelas
- Responsive design untuk semua device
- Data persisten menggunakan localStorage

Aplikasi akan berjalan di `http://localhost:5173`

## Konfigurasi Environment (env)

Proyek ini menggunakan variabel environment untuk menyimpan URL dasar API. Jangan meng-commit file `.env.local` yang berisi nilai sensitif — gunakan file lokal di mesin Anda.

Contoh isi `.env.local` (tambahkan di root proyek Anda):

```
VITE_API_BASE_URL=https://6a39283d64a2d826922382f5.mockapi.io
```

Setelah menambahkan atau mengubah `.env.local`, restart dev server:

```
npm run dev
```

Catatan: `.gitignore` sudah mengabaikan file `*.local` sehingga `.env.local` tidak akan ikut ter-push ke GitHub.

