import { Quote, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useQuotes } from "@/hooks/use-supabase-data";

export default function Quotes() {
  const { data: quotesData = [], isLoading } = useQuotes();

  return (
    <PageTransition>
      <div className="text-center mb-8">
        <Quote size={40} className="mx-auto mb-3 text-primary" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Quotes Motivasi</h1>
        <p className="text-muted-foreground">Inspirasi harian untuk rombel PPLG X-1</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={32} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {quotesData.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-card border border-border p-6 shadow-md hover:shadow-lg transition-shadow relative"
            >
              <Quote size={24} className="text-primary/20 absolute top-4 right-4" />
              <p className="text-foreground italic leading-relaxed mb-4">"{q.text}"</p>
              <p className="text-sm font-semibold text-primary">— {q.author}</p>
            </motion.div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
