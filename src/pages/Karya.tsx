import { useState, useRef } from "react";
import {
  Sparkles, Plus, X, Loader2, Trash2, ExternalLink, Code2,
  Globe, Gamepad2, Palette, Smartphone, AlertCircle, Inbox, Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// ==================== TYPES ====================
interface Karya {
  id: string;
  user_id: string;
  user_email: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  link_url: string | null;
  image_url: string | null;
  created_at: string;
}

// ==================== KATEGORI CONFIG ====================
const KATEGORI_LIST = [
  { value: "web", label: "Web Dev", icon: Globe, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { value: "game", label: "Game", icon: Gamepad2, color: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  { value: "design", label: "Design / UI", icon: Palette, color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
  { value: "mobile", label: "Mobile App", icon: Smartphone, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { value: "other", label: "Lainnya", icon: Code2, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
];

function getKategori(value: string) {
  return KATEGORI_LIST.find((k) => k.value === value) ?? KATEGORI_LIST[4];
}

// ==================== HOOKS ====================
function useKarya() {
  return useQuery<Karya[]>({
    queryKey: ["karya"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("karya")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Karya[];
    },
    retry: 2,
  });
}

// ==================== EMPTY STATE ====================
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
        <Sparkles size={32} className="text-primary" />
      </div>
      <p className="text-lg font-semibold text-foreground">Belum ada karya</p>
      <p className="text-sm text-center max-w-xs">
        Jadilah yang pertama menambahkan karya! Login dulu untuk mulai share proyekmu.
      </p>
    </div>
  );
}

// ==================== KARYA CARD ====================
function KaryaCard({
  karya,
  canDelete,
  onDelete,
  isDeleting,
}: {
  karya: Karya;
  canDelete: boolean;
  onDelete: (id: string, judul: string) => void;
  isDeleting: boolean;
}) {
  const kat = getKategori(karya.kategori);
  const KatIcon = kat.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      className="group relative rounded-2xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image / Placeholder */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {karya.image_url ? (
          <img
            src={karya.image_url}
            alt={karya.judul}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
            <KatIcon size={40} className="text-primary/30" />
          </div>
        )}

        {/* Kategori badge */}
        <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm bg-card/80 border border-border ${kat.color}`}>
          <KatIcon size={12} />
          {kat.label}
        </span>

        {/* Delete button */}
        {canDelete && (
          <button
            onClick={() => onDelete(karya.id, karya.judul)}
            disabled={isDeleting}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-destructive/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive shadow-lg disabled:opacity-50"
            title="Hapus karya"
          >
            {isDeleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-foreground text-base mb-1.5 line-clamp-1">{karya.judul}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {karya.deskripsi || "Tidak ada deskripsi."}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">
              {karya.user_email.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-muted-foreground truncate">
              {karya.user_email.split("@")[0]}
            </span>
          </div>

          {karya.link_url && (
            <a
              href={karya.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shrink-0 shadow-sm shadow-primary/20"
            >
              <ExternalLink size={11} />
              Lihat
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ==================== ADD FORM ====================
function AddKaryaForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    kategori: "web",
    link_url: "",
    image_url: "",
  });

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.judul.trim()) { toast.error("Judul wajib diisi"); return; }

    setLoading(true);
    const { error } = await supabase.from("karya").insert({
      user_id: user.id,
      user_email: user.email ?? "unknown",
      judul: form.judul.trim(),
      deskripsi: form.deskripsi.trim(),
      kategori: form.kategori,
      link_url: form.link_url.trim() || null,
      image_url: form.image_url.trim() || null,
    });

    if (error) {
      toast.error(`Gagal menambahkan: ${error.message}`);
    } else {
      toast.success("Karya berhasil ditambahkan! 🎉");
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="mb-8 rounded-2xl bg-card border border-border p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Sparkles size={18} className="text-primary" />
          Tambah Karya
        </h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Judul */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Judul Karya *</label>
          <input
            value={form.judul}
            onChange={(e) => set("judul", e.target.value)}
            placeholder="Nama proyek kamu..."
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Kategori</label>
          <div className="flex flex-wrap gap-2">
            {KATEGORI_LIST.map((k) => {
              const KIcon = k.icon;
              return (
                <button
                  key={k.value}
                  type="button"
                  onClick={() => set("kategori", k.value)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium border transition-all ${
                    form.kategori === k.value
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                      : "bg-background text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  <KIcon size={13} />
                  {k.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Deskripsi</label>
          <textarea
            value={form.deskripsi}
            onChange={(e) => set("deskripsi", e.target.value)}
            placeholder="Ceritakan proyekmu secara singkat..."
            rows={3}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Link URL */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Link Proyek (opsional)</label>
            <input
              value={form.link_url}
              onChange={(e) => set("link_url", e.target.value)}
              type="url"
              placeholder="https://github.com/..."
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">URL Gambar / Screenshot (opsional)</label>
            <input
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
              type="url"
              placeholder="https://i.imgur.com/..."
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-md shadow-primary/20"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
            {loading ? "Menyimpan..." : "Publish Karya"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ==================== MAIN PAGE ====================
export default function Karya() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const { data: karyaList = [], isLoading, isError } = useKarya();

  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterKat, setFilterKat] = useState<string>("all");

  const filtered = filterKat === "all"
    ? karyaList
    : karyaList.filter((k) => k.kategori === filterKat);

  const handleSuccess = async () => {
    setShowForm(false);
    await queryClient.invalidateQueries({ queryKey: ["karya"] });
  };

  const handleDelete = async (id: string, judul: string) => {
    if (!confirm(`Hapus karya "${judul}"?`)) return;

    setDeletingId(id);
    // Optimistic update
    queryClient.setQueryData(["karya"], (old: Karya[] | undefined) =>
      (old ?? []).filter((k) => k.id !== id)
    );

    const { error } = await supabase.from("karya").delete().eq("id", id);
    if (error) {
      toast.error(`Gagal menghapus: ${error.message}`);
      await queryClient.invalidateQueries({ queryKey: ["karya"] });
    } else {
      toast.success("Karya dihapus");
    }
    setDeletingId(null);
  };

  // Cek apakah user boleh delete karya tertentu
  const canDeleteKarya = (karya: Karya) => {
    if (!user) return false;
    return isAdmin || karya.user_id === user.id;
  };

  return (
    <PageTransition>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-4">
          <Sparkles size={28} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Karya Rombel</h1>
        <p className="text-muted-foreground">Koleksi proyek dan karya terbaik siswa PPLG X-1</p>
      </div>

      {/* Filter + Add Button Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Filter Kategori */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterKat("all")}
            className={`rounded-lg px-4 py-2 text-xs font-medium transition-all border ${
              filterKat === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:bg-muted"
            }`}
          >
            Semua ({karyaList.length})
          </button>
          {KATEGORI_LIST.map((k) => {
            const count = karyaList.filter((x) => x.kategori === k.value).length;
            if (count === 0) return null;
            const KIcon = k.icon;
            return (
              <button
                key={k.value}
                onClick={() => setFilterKat(k.value)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all border ${
                  filterKat === k.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                <KIcon size={12} />
                {k.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Add / Login prompt */}
        {user ? (
          !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 shrink-0"
            >
              <Plus size={16} />
              Tambah Karya
            </button>
          )
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors shrink-0"
          >
            <Lock size={14} />
            Login untuk tambah karya
          </Link>
        )}
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && user && (
          <AddKaryaForm onClose={() => setShowForm(false)} onSuccess={handleSuccess} />
        )}
      </AnimatePresence>

      {/* States */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-card border border-border shadow-md overflow-hidden animate-pulse">
              <div className="aspect-video bg-muted" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-muted rounded-lg w-3/4" />
                <div className="h-3 bg-muted rounded-lg w-full" />
                <div className="h-3 bg-muted rounded-lg w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
          <AlertCircle size={40} className="text-destructive" />
          <p className="text-lg font-semibold">Gagal memuat data karya</p>
          <p className="text-sm">Pastikan tabel "karya" sudah dibuat di Supabase.</p>
        </div>
      ) : filtered.length === 0 ? (
        karyaList.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
            <Inbox size={36} />
            <p className="font-medium">Tidak ada karya di kategori ini</p>
          </div>
        )
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((karya) => (
              <KaryaCard
                key={karya.id}
                karya={karya}
                canDelete={canDeleteKarya(karya)}
                onDelete={handleDelete}
                isDeleting={deletingId === karya.id}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </PageTransition>
  );
}