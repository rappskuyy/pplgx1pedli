export const siswaData = [
  { id: "1", nama: "Ahmad Fauzi", gender: "L", no_absen: 1, foto: "" },
  { id: "2", nama: "Aisyah Putri", gender: "P", no_absen: 2, foto: "" },
  { id: "3", nama: "Budi Santoso", gender: "L", no_absen: 3, foto: "" },
  { id: "4", nama: "Citra Dewi", gender: "P", no_absen: 4, foto: "" },
  { id: "5", nama: "Dimas Pratama", gender: "L", no_absen: 5, foto: "" },
  { id: "6", nama: "Eka Rahmawati", gender: "P", no_absen: 6, foto: "" },
  { id: "7", nama: "Farhan Rizky", gender: "L", no_absen: 7, foto: "" },
  { id: "8", nama: "Gita Ayu", gender: "P", no_absen: 8, foto: "" },
  { id: "9", nama: "Hadi Wijaya", gender: "L", no_absen: 9, foto: "" },
  { id: "10", nama: "Indah Permata", gender: "P", no_absen: 10, foto: "" },
  { id: "11", nama: "Joko Susilo", gender: "L", no_absen: 11, foto: "" },
  { id: "12", nama: "Kartika Sari", gender: "P", no_absen: 12, foto: "" },
];

export const jadwalData: Record<string, Record<string, { mapel: string; jam: string; guru: string }[]>> = {
  ganjil: {
    Senin: [
      { mapel: "Matematika", jam: "07:00 - 08:30", guru: "Pak Agus" },
      { mapel: "Bahasa Indonesia", jam: "08:30 - 10:00", guru: "Bu Sari" },
      { mapel: "Pemrograman Web", jam: "10:15 - 11:45", guru: "Pak Doni" },
      { mapel: "Basis Data", jam: "12:30 - 14:00", guru: "Bu Rina" },
    ],
    Selasa: [
      { mapel: "Bahasa Inggris", jam: "07:00 - 08:30", guru: "Bu Lia" },
      { mapel: "PKN", jam: "08:30 - 10:00", guru: "Pak Heru" },
      { mapel: "Pemrograman Berorientasi Objek", jam: "10:15 - 11:45", guru: "Pak Doni" },
    ],
    Rabu: [
      { mapel: "Fisika", jam: "07:00 - 08:30", guru: "Pak Budi" },
      { mapel: "Pemrograman Web", jam: "08:30 - 10:00", guru: "Pak Doni" },
      { mapel: "Desain Grafis", jam: "10:15 - 11:45", guru: "Bu Ani" },
    ],
    Kamis: [
      { mapel: "Matematika", jam: "07:00 - 08:30", guru: "Pak Agus" },
      { mapel: "Sejarah", jam: "08:30 - 10:00", guru: "Bu Maya" },
      { mapel: "Basis Data", jam: "10:15 - 11:45", guru: "Bu Rina" },
    ],
    Jumat: [
      { mapel: "Pendidikan Agama", jam: "07:00 - 08:30", guru: "Pak Usman" },
      { mapel: "Olahraga", jam: "08:30 - 10:00", guru: "Pak Joko" },
    ],
  },
  genap: {
    Senin: [
      { mapel: "Bahasa Indonesia", jam: "07:00 - 08:30", guru: "Bu Sari" },
      { mapel: "Matematika", jam: "08:30 - 10:00", guru: "Pak Agus" },
      { mapel: "Basis Data", jam: "10:15 - 11:45", guru: "Bu Rina" },
      { mapel: "Pemrograman Web", jam: "12:30 - 14:00", guru: "Pak Doni" },
    ],
    Selasa: [
      { mapel: "PKN", jam: "07:00 - 08:30", guru: "Pak Heru" },
      { mapel: "Bahasa Inggris", jam: "08:30 - 10:00", guru: "Bu Lia" },
      { mapel: "Desain Grafis", jam: "10:15 - 11:45", guru: "Bu Ani" },
    ],
    Rabu: [
      { mapel: "Pemrograman Berorientasi Objek", jam: "07:00 - 08:30", guru: "Pak Doni" },
      { mapel: "Fisika", jam: "08:30 - 10:00", guru: "Pak Budi" },
      { mapel: "Pemrograman Web", jam: "10:15 - 11:45", guru: "Pak Doni" },
    ],
    Kamis: [
      { mapel: "Sejarah", jam: "07:00 - 08:30", guru: "Bu Maya" },
      { mapel: "Matematika", jam: "08:30 - 10:00", guru: "Pak Agus" },
      { mapel: "Basis Data", jam: "10:15 - 11:45", guru: "Bu Rina" },
    ],
    Jumat: [
      { mapel: "Olahraga", jam: "07:00 - 08:30", guru: "Pak Joko" },
      { mapel: "Pendidikan Agama", jam: "08:30 - 10:00", guru: "Pak Usman" },
    ],
  },
};

export const infaqData = [
  { id: 1, siswa: "Ahmad Fauzi", nominal: 10000, tanggal: "2026-02-01" },
  { id: 2, siswa: "Aisyah Putri", nominal: 15000, tanggal: "2026-02-01" },
  { id: 3, siswa: "Budi Santoso", nominal: 5000, tanggal: "2026-02-03" },
  { id: 4, siswa: "Citra Dewi", nominal: 20000, tanggal: "2026-02-03" },
  { id: 5, siswa: "Ahmad Fauzi", nominal: 10000, tanggal: "2026-02-05" },
  { id: 6, siswa: "Dimas Pratama", nominal: 10000, tanggal: "2026-02-05" },
  { id: 7, siswa: "Eka Rahmawati", nominal: 25000, tanggal: "2026-02-07" },
  { id: 8, siswa: "Farhan Rizky", nominal: 5000, tanggal: "2026-02-07" },
];

export const tugasData = [
  { id: 1, judul: "Tugas Pemrograman Web - Membuat Landing Page", deskripsi: "Buat landing page responsive dengan HTML, CSS, dan JavaScript", deadline: "2026-02-15", selesai: false, mapel: "Pemrograman Web" },
  { id: 2, judul: "Laporan Praktikum Basis Data", deskripsi: "Buat laporan praktikum normalisasi database", deadline: "2026-02-10", selesai: true, mapel: "Basis Data" },
  { id: 3, judul: "Essay Bahasa Indonesia", deskripsi: "Tulis essay tentang teknologi masa depan minimal 500 kata", deadline: "2026-02-18", selesai: false, mapel: "Bahasa Indonesia" },
  { id: 4, judul: "Latihan Soal Matematika Bab 5", deskripsi: "Kerjakan halaman 120-125 buku paket", deadline: "2026-02-08", selesai: false, mapel: "Matematika" },
  { id: 5, judul: "Project OOP - Sistem Kasir", deskripsi: "Buat program kasir sederhana menggunakan Java", deadline: "2026-02-20", selesai: false, mapel: "PBO" },
];

export const kelompokData = [
  { id: 1, nama: "Kelompok 1 - Frontend", anggota: ["Ahmad Fauzi", "Aisyah Putri", "Budi Santoso"] },
  { id: 2, nama: "Kelompok 2 - Backend", anggota: ["Citra Dewi", "Dimas Pratama", "Eka Rahmawati"] },
  { id: 3, nama: "Kelompok 3 - Database", anggota: ["Farhan Rizky", "Gita Ayu", "Hadi Wijaya"] },
  { id: 4, nama: "Kelompok 4 - UI/UX", anggota: ["Indah Permata", "Joko Susilo", "Kartika Sari"] },
];

export const quotesData = [
  { id: 1, text: "Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.", author: "Nelson Mandela" },
  { id: 2, text: "Belajar tanpa berpikir itu tidaklah berguna, tapi berpikir tanpa belajar itu sangatlah berbahaya.", author: "Konfusius" },
  { id: 3, text: "Masa depan adalah milik mereka yang menyiapkan dirinya hari ini.", author: "Malcolm X" },
  { id: 4, text: "Kesuksesan bukanlah kunci kebahagiaan. Kebahagiaanlah kunci kesuksesan.", author: "Albert Schweitzer" },
  { id: 5, text: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah dengan mencintai apa yang kamu lakukan.", author: "Steve Jobs" },
  { id: 6, text: "Jangan pernah berhenti belajar, karena hidup tak pernah berhenti mengajarkan.", author: "Anonim" },
];

export const galeriData = [
  { id: "1", title: "Acara Pesta Ramadhan", description: "Kebersamaan kelas dalam merayakan Ramadhan bersama", image_url: "", created_at: "2025-03-15" },
  { id: "2", title: "Perpisahan Kelas X", description: "Momen indah saat lulus ke kelas XI", image_url: "", created_at: "2025-06-20" },
  { id: "3", title: "Kompetisi Olahraga Antar Kelas", description: "Antusiasme siswa dalam berkompetisi", image_url: "", created_at: "2025-09-10" },
  { id: "4", title: "Praktikum Laboratorium", description: "Siswa melakukan praktikum di laboratorium komputer", image_url: "", created_at: "2025-10-05" },
];

export const strukturData = [
  { jabatan: "Ketua Kelas", nama: "Ahmad Fauzi", foto: "" },
  { jabatan: "Wakil Ketua", nama: "Citra Dewi", foto: "" },
  { jabatan: "Sekretaris 1", nama: "Aisyah Putri", foto: "" },
  { jabatan: "Sekretaris 2", nama: "Gita Ayu", foto: "" },
  { jabatan: "Bendahara 1", nama: "Eka Rahmawati", foto: "" },
  { jabatan: "Bendahara 2", nama: "Indah Permata", foto: "" },
  { jabatan: "Seksi Kebersihan", nama: "Budi Santoso", foto: "" },
  { jabatan: "Seksi Keamanan", nama: "Dimas Pratama", foto: "" },
];
