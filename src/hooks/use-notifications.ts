import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Notification {
  id: string;
  siswa_id: string;
  judul: string;
  pesan: string;
  tipe: "info" | "peringatan" | "pujian";
  dibaca: boolean;
  created_at: string;
}

// Fetch semua notif untuk satu siswa
export function useNotifications(siswaId: string | null) {
  return useQuery({
    queryKey: ["notifications", siswaId],
    enabled: !!siswaId,
    refetchInterval: 30000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("siswa_id", siswaId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as Notification[];
    },
  });
}

// Fetch count notif belum dibaca untuk semua siswa sekaligus (untuk dot merah di grid)
export function useUnreadCounts() {
  return useQuery({
    queryKey: ["notifications_unread_counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("siswa_id")
        .eq("dibaca", false);
      if (error) throw error;
      // Return map: siswaId -> count
      const counts: Record<string, number> = {};
      (data || []).forEach((row: { siswa_id: string }) => {
        counts[row.siswa_id] = (counts[row.siswa_id] || 0) + 1;
      });
      return counts;
    },
  });
}

// Tandai semua notif siswa sebagai dibaca
export function useMarkAllRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (siswaId: string) => {
      const { error } = await supabase
        .from("notifications")
        .update({ dibaca: true })
        .eq("siswa_id", siswaId)
        .eq("dibaca", false);
      if (error) throw error;
    },
    onSuccess: (_data, siswaId) => {
      qc.invalidateQueries({ queryKey: ["notifications", siswaId] });
      qc.invalidateQueries({ queryKey: ["notifications_unread_counts"] });
    },
  });
}

// Kirim notif baru (admin)
export function useSendNotification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      siswa_id: string;
      judul: string;
      pesan: string;
      tipe: "info" | "peringatan" | "pujian";
    }) => {
      const { error } = await supabase.from("notifications").insert({
        ...payload,
        dibaca: false,
      });
      if (error) throw error;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["notifications", vars.siswa_id] });
      qc.invalidateQueries({ queryKey: ["notifications_unread_counts"] });
    },
  });
}

// Hapus notif (admin)
export function useDeleteNotification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, siswaId }: { id: string; siswaId: string }) => {
      const { error } = await supabase.from("notifications").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["notifications", vars.siswaId] });
      qc.invalidateQueries({ queryKey: ["notifications_unread_counts"] });
    },
  });
}