import { Users, Loader2, AlertCircle, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useGroups } from "@/hooks/use-supabase-data";

const gradients = [
  "from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20",
  "from-violet-500/10 to-violet-600/10 dark:from-violet-500/20 dark:to-violet-600/20",
  "from-cyan-500/10 to-cyan-600/10 dark:from-cyan-500/20 dark:to-cyan-600/20",
  "from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20",
];

export default function Kelompok() {
  const { data: kelompokData = [], isLoading, isError } = useGroups();

  return (
    <PageTransition>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Kelompok Belajar Bertiga</h1>
        <p className="text-muted-foreground">Pembagian kelompok belajar bertiga rombel PPLG X-1</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={32} /></div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
          <AlertCircle size={40} className="text-destructive" />
          <p className="text-lg font-medium">Gagal memuat data kelompok</p>
          <p className="text-sm">Periksa koneksi internet atau konfigurasi database.</p>
        </div>
      ) : kelompokData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
          <Inbox size={40} />
          <p className="text-lg font-medium">Belum ada data kelompok</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kelompokData.map((k, i) => (
            <motion.div
              key={k.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} border border-border p-6 shadow-md hover:shadow-lg transition-shadow`}
            >
              <h3 className="text-lg font-bold text-foreground mb-4">{k.nama}</h3>
              
              {/* Mapel badges */}
              {k.mapel && k.mapel.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {k.mapel.map((m, idx) => (
                    <button
                      key={idx}
                      className="inline-block rounded-full bg-primary/20 text-primary px-3 py-1 text-xs font-medium hover:bg-primary/30 transition-colors"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}

              {k.anggota.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada anggota</p>
              ) : (
                <div className="space-y-2">
                  {k.anggota.map((a, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-foreground">
                      <Users size={14} className="text-primary shrink-0" />
                      <span>{a || "Nama tidak tersedia"}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
