import { useState } from "react";
import { X, Send, Bell, Trash2, Info, AlertTriangle, Star, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSendNotification, useNotifications, useDeleteNotification } from "@/hooks/use-notifications";

interface SiswaMinimal {
  id: string;
  nama: string;
  no_absen: number;
  avatar_url: string | null;
  [key: string]: unknown;
}

interface AdminNotifPanelProps {
  siswa: SiswaMinimal | null;
  onClose: () => void;
}

const TIPE_OPTIONS = [
  { value: "info", label: "Info", icon: Info, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300", dot: "bg-blue-500" },
  { value: "peringatan", label: "Peringatan", icon: AlertTriangle, color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300", dot: "bg-red-500" },
  { value: "pujian", label: "Pujian", icon: Star, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300", dot: "bg-yellow-500" },
] as const;

export default function AdminNotifPanel({ siswa, onClose }: AdminNotifPanelProps) {
  const [judul, setJudul] = useState("");
  const [pesan, setPesan] = useState("");
  const [tipe, setTipe] = useState<"info" | "peringatan" | "pujian">("info");

  const { data: notifs = [], isLoading } = useNotifications(siswa?.id ?? null);
  const sendMutation = useSendNotification();
  const deleteMutation = useDeleteNotification();

  const handleSend = async () => {
    if (!siswa || !judul.trim() || !pesan.trim()) return;
    await sendMutation.mutateAsync({
      siswa_id: siswa.id,
      judul: judul.trim(),
      pesan: pesan.trim(),
      tipe,
    });
    setJudul("");
    setPesan("");
    setTipe("info");
  };

  const handleDelete = async (id: string) => {
    if (!siswa) return;
    await deleteMutation.mutateAsync({ id, siswaId: siswa.id });
  };

  const getTipeConfig = (t: string) => TIPE_OPTIONS.find((o) => o.value === t) ?? TIPE_OPTIONS[0];

  return (
    <AnimatePresence>
      {siswa && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Bell size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Kirim Notifikasi</p>
                  <p className="text-xs text-muted-foreground">kepada {siswa.nama}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Form */}
            <div className="p-5 border-b border-border space-y-4">
              {/* Tipe */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                  Tipe Notifikasi
                </label>
                <div className="flex gap-2">
                  {TIPE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setTipe(opt.value)}
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all border ${
                          tipe === opt.value
                            ? `${opt.color} border-current shadow-sm`
                            : "border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon size={13} /> {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Judul */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">
                  Judul
                </label>
                <input
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Tugas Belum Dikumpul"
                  maxLength={80}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>

              {/* Pesan */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">
                  Pesan
                </label>
                <textarea
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  placeholder="Tulis pesan untuk siswa..."
                  rows={3}
                  maxLength={300}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground text-right mt-0.5">{pesan.length}/300</p>
              </div>

              <button
                onClick={handleSend}
                disabled={!judul.trim() || !pesan.trim() || sendMutation.isPending}
                className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {sendMutation.isPending ? (
                  <><Loader2 size={15} className="animate-spin" /> Mengirim...</>
                ) : (
                  <><Send size={15} /> Kirim Notifikasi</>
                )}
              </button>
            </div>

            {/* Riwayat notif */}
            <div className="flex-1 overflow-y-auto p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Riwayat Notifikasi ({notifs.length})
              </p>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 size={24} className="animate-spin text-primary" />
                </div>
              ) : notifs.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-muted-foreground">
                  <Bell size={32} className="mb-2 opacity-30" />
                  <p className="text-sm">Belum ada notifikasi dikirim</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifs.map((notif) => {
                    const cfg = getTipeConfig(notif.tipe);
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={notif.id}
                        className={`rounded-xl border p-3 ${!notif.dibaca ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30"}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${cfg.color}`}>
                              <Icon size={12} />
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-foreground truncate">{notif.judul}</p>
                                {!notif.dibaca && (
                                  <span className="shrink-0 h-2 w-2 rounded-full bg-primary" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.pesan}</p>
                              <p className="text-[10px] text-muted-foreground/60 mt-1">
                                {new Date(notif.created_at).toLocaleDateString("id-ID", {
                                  day: "numeric", month: "short", year: "numeric",
                                  hour: "2-digit", minute: "2-digit"
                                })}
                                {notif.dibaca ? " · Sudah dibaca" : " · Belum dibaca"}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDelete(notif.id)}
                            disabled={deleteMutation.isPending}
                            className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}