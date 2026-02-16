import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
    },
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Background Stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-primary/30"
          style={{
            width: Math.random() * 6 + 3,
            height: Math.random() * 6 + 3,
            top: `${Math.random() * 80 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2, ease: "easeInOut" as const }}
        />
      ))}

      {/* Floating Astronaut Character */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="relative mb-6"
      >
        <div className="relative">
          {/* Planet */}
          <motion.div
            className="absolute -right-10 -top-6 h-14 w-14 rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute left-1 top-3 h-2 w-5 rounded-full bg-orange-300/50" />
            <div className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-red-600/30" />
          </motion.div>

          {/* Astronaut Helmet */}
          <div className="relative mx-auto h-28 w-28 rounded-full bg-gradient-to-b from-slate-200 to-slate-300 shadow-xl dark:from-slate-600 dark:to-slate-700">
            {/* Visor */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-purple-700 shadow-inner">
              {/* Reflection */}
              <div className="absolute left-3 top-3 h-4 w-6 rounded-full bg-white/30 blur-sm" />
              {/* Eyes */}
              <motion.div
                className="flex items-center justify-center gap-3 pt-6"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="h-3 w-3 rounded-full bg-white shadow" />
                <div className="h-3 w-3 rounded-full bg-white shadow" />
              </motion.div>
              {/* Mouth */}
              <div className="mx-auto mt-2 h-2 w-5 rounded-full border-b-2 border-white/60" />
            </div>
          </div>

          {/* Body */}
          <div className="mx-auto -mt-2 h-20 w-20 rounded-b-3xl rounded-t-lg bg-gradient-to-b from-slate-200 to-slate-300 shadow-lg dark:from-slate-600 dark:to-slate-700">
            <div className="flex justify-center gap-1 pt-3">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              <div className="h-2 w-2 rounded-full bg-green-400" />
            </div>
          </div>

          {/* Arms */}
          <motion.div
            className="absolute -left-8 top-32 h-5 w-12 rounded-full bg-slate-200 dark:bg-slate-600"
            style={{ rotate: -30 }}
            animate={{ rotate: [-30, -20, -30] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -right-8 top-32 h-5 w-12 rounded-full bg-slate-200 dark:bg-slate-600"
            style={{ rotate: 30 }}
            animate={{ rotate: [30, 20, 30] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* 404 Text */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <h1 className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-8xl font-black tracking-tighter text-transparent md:text-9xl">
          404
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 space-y-2"
      >
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          Oops! Tersesat di Luar Angkasa 🚀
        </h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          Halaman yang kamu cari tidak ditemukan. Mungkin sudah terbang ke galaksi lain!
        </p>
      </motion.div>

      {/* Search Bar Decoration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 shadow-sm"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          halaman-tidak-ditemukan.exe
        </span>
        <span className="animate-pulse text-primary">|</span>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Button onClick={() => navigate(-1)} variant="outline" className="gap-2 rounded-full">
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
        <Button onClick={() => navigate("/")} className="gap-2 rounded-full">
          <Home className="h-4 w-4" />
          Ke Beranda
        </Button>
      </motion.div>

      {/* Orbiting Moon */}
      <motion.div
        className="pointer-events-none absolute bottom-20 right-10 h-8 w-8 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 shadow-lg md:h-12 md:w-12"
        animate={{
          x: [0, 30, 0, -30, 0],
          y: [0, -15, -30, -15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default NotFound;
