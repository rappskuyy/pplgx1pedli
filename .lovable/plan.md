

# Website Manajemen Kelas PPLG X-1

## Gambaran Umum
Website manajemen kelas dengan desain modern, clean dashboard, gradient cards, dan animasi smooth. Menggunakan React + Vite, Supabase (auth + database), Tailwind CSS, Lucide React, dan Framer Motion.

---

## 1. Setup & Design System
- Konfigurasi warna utama: Primary (#3B82F6), Secondary (#6366F1), Accent (#06B6D4), Success (#22C55E), Danger (#EF4444), Background (#F8FAFC)
- Install Framer Motion untuk animasi
- Setup layout utama: max-width 1200px, background abu terang
- Style global: rounded-xl/2xl, soft shadow, smooth transitions

## 2. Navbar (Fixed Top)
- **Kiri**: Logo kotak biru + teks "PPLG X-1"
- **Tengah**: Link navigasi — Dashboard, Quotes, Galeri, Tentang, Struktur, Siswa, Jadwal, Tugas, Kelompok, Infaq
- **Kanan**: Toggle dark mode + tombol Login (biru, rounded-lg)
- Sticky top, background putih, shadow bawah tipis

## 3. Autentikasi & Role System (Supabase)
- Login/Register dengan email & password via Supabase Auth
- Tabel `profiles` (nama, avatar, gender, nomor absen)
- Tabel `user_roles` terpisah dengan enum: admin, member
- Admin: CRUD tugas, infaq, quotes, struktur, galeri
- Member: view-only + centang tugas selesai

## 4. Halaman Dashboard
- **Hero Section**: Gradient biru tua → biru muda, judul besar "Selamat Datang di PPLG X-1", 2 tombol (Lihat Anggota, Tugas Kelas)
- **3 Statistik Cards**: Jumlah Siswa (gradient biru), Tugas Aktif (gradient cyan), Jadwal Hari Ini (gradient ungu) — hover naik, shadow-lg
- **2 Kolom Bawah**: Jadwal Hari Ini (kiri) + Tugas Mendatang (kanan) — card putih, icon, badge

## 5. Halaman Siswa
- Search bar rounded-full
- Grid 4 kolom card siswa: foto, nama, gender icon, badge nomor absen
- Hover zoom 1.05, shadow halus
- Data dari tabel `profiles` di Supabase

## 6. Halaman Jadwal
- Toggle Minggu Ganjil / Minggu Genap
- Button hari: Senin–Jumat (aktif = biru + shadow + teks putih)
- List mapel: card putih, icon buku, jam, guru, badge urutan
- Tabel `schedules` di Supabase

## 7. Halaman Tugas
- **3 Card statistik**: Total tugas, Selesai, Belum selesai
- **List tugas**: Checkbox, judul bold, deskripsi, deadline (icon kalender), badge merah "Terlambat" jika lewat
- Tugas selesai = strike-through
- Admin bisa tambah/edit tugas, member bisa centang
- Tabel `tasks` di Supabase

## 8. Halaman Infaq
- **3 Card top**: Total Infaq (hijau), Total Transaksi (abu), Siswa Berinfaq (biru)
- **2 Kolom bawah**: Riwayat infaq scrollable (kiri) + Ranking per siswa (kanan, nominal hijau bold)
- Admin bisa input infaq
- Tabel `infaq_transactions` di Supabase

## 9. Halaman Kelompok
- Grid 3 kolom
- Card: nama kelompok, list anggota (icon user), background gradient soft
- Tabel `groups` dan `group_members` di Supabase

## 10. Halaman Quotes
- Admin bisa tambah quotes motivasi
- Tampilan card quotes dengan styling menarik
- Tabel `quotes` di Supabase

## 11. Halaman Galeri
- Grid foto kegiatan kelas
- Admin bisa upload foto (Supabase Storage)
- Lightbox untuk melihat foto besar
- Tabel `gallery` + storage bucket di Supabase

## 12. Halaman Tentang
- Deskripsi kelas PPLG X-1
- Visi, misi, atau informasi umum kelas

## 13. Halaman Struktur
- Tampilan organisasi kelas: Ketua, Wakil, Sekretaris, Bendahara, dll
- Card dengan foto dan jabatan
- Admin bisa edit struktur
- Tabel `class_structure` di Supabase

## 14. Animasi (Framer Motion)
- Fade in saat load halaman
- Hover scale pada cards dan buttons
- Smooth transition 300ms
- Staggered animation pada list/grid items

## 15. Dark Mode
- Toggle di navbar
- Semua komponen support dark/light theme

