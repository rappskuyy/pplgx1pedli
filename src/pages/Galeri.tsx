import { Image, Loader2 } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useGallery } from "@/hooks/use-supabase-data";

export default function Galeri() {
  const { data: photos = [], isLoading } = useGallery();

  return (
    <PageTransition>
      <div className="text-center mb-8">
        <Image size={40} className="mx-auto mb-3 text-primary" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Galeri Rombel</h1>
        <p className="text-muted-foreground">Dokumentasi kegiatan rombel PPLG X-1</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={32} /></div>
      ) : photos.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Belum ada foto di galeri</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl bg-card border border-border shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                {photo.image_url ? (
                  <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <Image size={40} className="text-muted-foreground/30 group-hover:scale-110 transition-transform" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{photo.title}</h3>
                <p className="text-sm text-muted-foreground">{photo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
