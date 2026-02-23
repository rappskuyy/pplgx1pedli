import { useState, useEffect, useMemo, useRef } from "react";
import { Bell, Clock, BookOpen, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useSchedules } from "@/hooks/use-supabase-data";
import { motion, AnimatePresence } from "framer-motion";

const daysMap: Record<number, string> = {
  1: "Senin", 2: "Selasa", 3: "Rabu", 4: "Kamis", 5: "Jumat",
};

function getWeekType(): "ganjil" | "genap" {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return weekNum % 2 === 0 ? "ganjil" : "genap";
}

function parseTime(jam: string): { start: number; end: number } | null {
  const match = jam.match(/(\d{1,2})[.:](\d{2})\s*[-–]\s*(\d{1,2})[.:](\d{2})/);
  if (!match) return null;
  return {
    start: parseInt(match[1]) * 60 + parseInt(match[2]),
    end: parseInt(match[3]) * 60 + parseInt(match[4]),
  };
}

export default function ScheduleNotification() {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);

  const dayOfWeek = now.getDay();
  const minggu = getWeekType();
  const hariStr = daysMap[dayOfWeek] || "";
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const { data: allSchedules = [] } = useSchedules(minggu);
  const todaySchedules = useMemo(
    () => allSchedules.filter((s) => s.hari === hariStr),
    [allSchedules, hariStr]
  );

  // Refresh time every minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const upcomingCount = useMemo(() => {
    if (isWeekend) return 0;
    return todaySchedules.filter((s) => {
      const t = parseTime(s.jam);
      return t && t.end > currentMinutes;
    }).length;
  }, [todaySchedules, currentMinutes, isWeekend]);

  const dateStr = now.toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <Bell size={18} />
        {upcomingCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            {upcomingCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-border bg-card shadow-xl"
          >
            {/* Header */}
            <div className="border-b border-border px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Calendar size={14} className="text-primary" />
                {dateStr}
              </div>
              <span className="text-xs text-muted-foreground">
                Minggu {minggu.charAt(0).toUpperCase() + minggu.slice(1)}
              </span>
            </div>

            {/* Content */}
            <div className="max-h-72 overflow-y-auto p-3 space-y-2">
              {isWeekend ? (
                <p className="text-center text-sm text-muted-foreground py-4">🎉 Hari libur! Tidak ada jadwal.</p>
              ) : todaySchedules.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-4">Tidak ada jadwal hari ini.</p>
              ) : (
                todaySchedules.map((s) => {
                  const t = parseTime(s.jam);
                  let status: "done" | "active" | "upcoming" = "upcoming";
                  let countdown = "";
                  if (t) {
                    if (currentMinutes >= t.start && currentMinutes < t.end) {
                      status = "active";
                    } else if (currentMinutes >= t.end) {
                      status = "done";
                    } else {
                      const diff = t.start - currentMinutes;
                      if (diff <= 60) countdown = `${diff} menit lagi`;
                    }
                  }

                  return (
                    <div
                      key={s.id}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        status === "active"
                          ? "bg-orange-500/10 border border-orange-500/30"
                          : status === "done"
                          ? "opacity-50"
                          : "bg-muted/50"
                      }`}
                    >
                      <BookOpen size={14} className={status === "active" ? "text-orange-500 animate-pulse" : "text-primary"} />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-foreground ${status === "done" ? "line-through" : ""}`}>{s.mata_pelajaran}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock size={10} /> {s.jam}
                          {status === "active" && <span className="text-orange-500 font-semibold">Sedang berlangsung</span>}
                          {countdown && <span className="text-primary font-medium">{countdown}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-2">
              <Link
                to="/jadwal"
                onClick={() => setOpen(false)}
                className="text-xs font-medium text-primary hover:underline"
              >
                Lihat jadwal lengkap →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}