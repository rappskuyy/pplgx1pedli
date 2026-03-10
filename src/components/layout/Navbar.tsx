import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, LogOut, LogIn, User, Bell, Info, AlertTriangle, Star } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ScheduleNotification from "@/components/ScheduleNotification";
import { useNotifications, useMarkAllRead } from "@/hooks/use-notifications";
import { supabase } from "@/lib/supabase";


const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/galeri", label: "Galeri" },
  { to: "/tentang", label: "Tentang" },
  { to: "/struktur", label: "Struktur" },
  { to: "/siswa", label: "Siswa" },
  { to: "/jadwal", label: "Jadwal" },
  { to: "/tugas", label: "Tugas" },
  { to: "/kelompok", label: "Kelompok" },
  { to: "/karya", label: "Karya" },
  { to: "/infaq", label: "Infaq" },
];

const TIPE_CONFIG = {
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800" },
  peringatan: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-200 dark:border-red-800" },
  pujian: { icon: Star, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20", border: "border-yellow-200 dark:border-yellow-800" },
} as const;



export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [namaUser, setNamaUser] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const { data: myNotifs = [] } = useNotifications(user?.id ?? null);
  const markAllRead = useMarkAllRead();
  const unreadCount = myNotifs.filter((n: any) => !n.dibaca).length;

  // Fetch avatar & nama
  useEffect(() => {
    if (!user) { setAvatarUrl(null); setNamaUser(null); return; }
    supabase
      .from("profiles")
      .select("avatar_url, nama")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setAvatarUrl(data.avatar_url);
          setNamaUser(data.nama);
        }
      });
  }, [user]);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Saat notif panel dibuka → tandai semua dibaca
  const handleOpenNotif = () => {
    setNotifOpen((prev) => {
      if (!prev && unreadCount > 0) {
        if (user?.id) markAllRead.mutate(user.id);
      }
      return !prev;
    });
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut();
    toast.success("Berhasil logout!");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            X1
          </div>
          <span className="text-lg font-bold text-foreground">PPLG X-1</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ScheduleNotification />
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <>
              {/* ===== AVATAR + BADGE NOTIF ===== */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={handleOpenNotif}
                  className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden ring-2 ring-border hover:ring-primary transition-all focus:outline-none"
                  title="Notifikasi saya"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={namaUser || "profil"} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {namaUser?.charAt(0).toUpperCase() ?? <User size={16} />}
                    </div>
                  )}
                </button>
                {/* Badge merah — di luar button, tidak overlap wajah */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-0.5 items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold ring-2 ring-card z-10 pointer-events-none">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}

                {/* Dropdown notifikasi */}
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 rounded-xl bg-card border border-border shadow-xl overflow-hidden z-50"
                    >
                      {/* Header notif */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                        <div className="flex items-center gap-2">
                          <Bell size={15} className="text-primary" />
                          <p className="text-sm font-semibold text-foreground">Notifikasi</p>
                        </div>
                        {myNotifs.length > 0 && (
                          <span className="text-xs text-muted-foreground">{myNotifs.length} pesan</span>
                        )}
                      </div>

                      {/* List notif */}
                      <div className="max-h-80 overflow-y-auto">
                        {myNotifs.length === 0 ? (
                          <div className="flex flex-col items-center py-8 text-muted-foreground">
                            <Bell size={28} className="mb-2 opacity-25" />
                            <p className="text-sm">Tidak ada notifikasi</p>
                          </div>
                        ) : (
                          <div className="p-2 space-y-1.5">
                            {myNotifs.map((notif: any) => {
                              const cfg = TIPE_CONFIG[notif.tipe as keyof typeof TIPE_CONFIG] ?? TIPE_CONFIG.info;
                              const Icon = cfg.icon;
                              return (
                                <div
                                  key={notif.id}
                                  className={`flex items-start gap-3 rounded-lg p-3 border transition-colors ${
                                    !notif.dibaca
                                      ? `${cfg.bg} ${cfg.border}`
                                      : "border-transparent hover:bg-muted/50"
                                  }`}
                                >
                                  <span className={`mt-0.5 shrink-0 ${cfg.color}`}>
                                    <Icon size={15} />
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <p className="text-sm font-semibold text-foreground leading-tight">{notif.judul}</p>
                                      {!notif.dibaca && (
                                        <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-red-500" />
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.pesan}</p>
                                    <p className="text-[10px] text-muted-foreground/60 mt-1">
                                      {new Date(notif.created_at).toLocaleDateString("id-ID", {
                                        day: "numeric", month: "short",
                                        hour: "2-digit", minute: "2-digit"
                                      })}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Footer — link ke profil & logout */}
                      <div className="border-t border-border">
                        <Link
                          to="/profile"
                          onClick={() => setNotifOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <User size={14} className="text-primary" /> Edit Profil
                        </Link>
                        <button
                          onClick={() => { setNotifOpen(false); handleLogout(); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <LogOut size={14} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <LogIn size={16} /> Login
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border bg-card"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="mt-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <User size={15} /> Edit Profil
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 sm:hidden inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}