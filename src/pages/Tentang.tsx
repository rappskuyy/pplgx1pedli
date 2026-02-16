import { Info, Target, Eye, Heart, Rocket, Code, Users, Zap, Shield, Globe, Cpu, Sparkles } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const stats = [
  { label: "Siswa Aktif", value: "35", icon: Users, color: "from-blue-500 to-cyan-400" },
  { label: "Bahasa Pemrograman", value: "3+", icon: Code, color: "from-violet-500 to-purple-400" },
  { label: "Project Selesai", value: "7+", icon: Rocket, color: "from-emerald-500 to-green-400" },
  { label: "Prestasi", value: "Soon", icon: Sparkles, color: "from-amber-500 to-yellow-400" },
];

const values = [
  { icon: Zap, title: "Inovatif", desc: "Selalu mencari solusi kreatif dan pendekatan baru dalam setiap tantangan teknologi." },
  { icon: Shield, title: "Disiplin", desc: "Menjunjung tinggi kedisiplinan dalam belajar, berkarya, dan menyelesaikan tugas tepat waktu." },
  { icon: Heart, title: "Kolaboratif", desc: "Saling membantu dan bekerja sama sebagai tim untuk mencapai tujuan bersama." },
  { icon: Globe, title: "Berwawasan Global", desc: "Mengikuti perkembangan teknologi dunia dan siap bersaing di kancah internasional." },
  { icon: Cpu, title: "Tech-Savvy", desc: "Menguasai berbagai teknologi modern dari web development hingga game development." },
  { icon: Sparkles, title: "Berkarakter", desc: "Tidak hanya pintar secara teknis, tetapi juga memiliki akhlak dan etika yang baik." },
];

export default function Tentang() {
  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-10 md:p-16 mb-10 text-white text-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Cpu size={16} /> Pengembangan Perangkat Lunak & Gim
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">PPLG X-1</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Membangun generasi developer masa depan yang kreatif, inovatif, dan siap menghadapi era digital dengan keterampilan pemrograman tingkat tinggi.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="relative overflow-hidden rounded-xl p-5 text-white shadow-lg hover:-translate-y-1 transition-transform">
            <div className={`absolute inset-0 bg-gradient-to-br ${s.color}`} />
            <div className="relative z-10 flex flex-col items-center text-center">
              <s.icon size={28} className="mb-2 opacity-90" />
              <span className="text-3xl font-extrabold">{s.value}</span>
              <span className="text-sm opacity-80 mt-1">{s.label}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Deskripsi */}
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-card border border-border p-8 shadow-md">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Info size={24} className="text-primary" /> Tentang Kami
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">PPLG X-1</strong> adalah rombel jurusan Pengembangan Perangkat Lunak dan Gim di SMK Wikrama Bogor yang berfokus pada pengembangan kemampuan siswa di bidang teknologi informasi. Kelas ini terdiri dari siswa-siswi yang memiliki semangat tinggi dalam dunia pemrograman, pengembangan software, desain UI/UX, dan game development.
            </p>
            <p>
              Dengan kurikulum yang mengikuti standar industri terkini, siswa PPLG X-1 mempelajari berbagai bahasa pemrograman seperti JavaScript, Python, PHP. Pembelajaran tidak hanya bersifat teori, tetapi juga praktik langsung melalui project-based learning.
            </p>
            <p>
              Dibimbing oleh guru-guru berpengalaman di bidangnya, setiap siswa didorong untuk mengembangkan portofolio digital, berpartisipasi dalam kompetisi teknologi, dan membangun proyek nyata yang dapat memberikan dampak positif bagi masyarakat.
            </p>
          </div>
        </motion.div>

        {/* Visi Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 shadow-md">
            <Target size={32} className="text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Visi</h3>
            <p className="text-muted-foreground leading-relaxed">
              Menjadi rombel unggulan yang akan menghasilkan lulusan developer berkompeten, berkarakter, dan berdaya saing global dalam industri teknologi informasi dan pengembangan perangkat lunak (aamiin).
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 p-8 shadow-md">
            <Eye size={32} className="text-secondary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Misi</h3>
            <ul className="text-muted-foreground space-y-2 text-sm leading-relaxed">
              <li className="flex gap-2"><Rocket size={16} className="text-secondary mt-0.5 shrink-0" /> Menciptakan lingkungan belajar yang kolaboratif, inovatif, dan menyenangkan</li>
              <li className="flex gap-2"><Rocket size={16} className="text-secondary mt-0.5 shrink-0" /> Mengembangkan keterampilan coding dan problem-solving setiap siswa</li>
              <li className="flex gap-2"><Rocket size={16} className="text-secondary mt-0.5 shrink-0" /> Membangun portofolio proyek nyata untuk persiapan karir</li>
              <li className="flex gap-2"><Rocket size={16} className="text-secondary mt-0.5 shrink-0" /> Mendorong partisipasi dalam kompetisi dan hackathon</li>
            </ul>
          </motion.div>
        </div>

        {/* Nilai-Nilai */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Nilai-Nilai Kami</h2>
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp} className="rounded-xl bg-card border border-border p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
                <v.icon size={24} className="text-primary mb-3" />
                <h4 className="font-bold text-foreground mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Teknologi */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl bg-card border border-border p-8 shadow-md text-center">
          <h2 className="text-2xl font-bold text-foreground mb-6">Teknologi yang Kami Pelajari</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["JavaScript", "PHP", "HTML", "CSS", "Git", "Figma", "MySQL"].map((tech) => (
              <span key={tech} className="rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
