import { useState, useEffect } from "react";
import { LogIn, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 menit

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [failAttempts, setFailAttempts] = useState(0);
  const [captcha, setCaptcha] = useState<{ num1: number; num2: number; answer: number } | null>(null);
  const navigate = useNavigate();

  // Generate CAPTCHA
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, answer: num1 + num2 });
  }, []);

  // Check lockout status on mount
  useEffect(() => {
    const stored = localStorage.getItem("login_lockout");
    if (stored) {
      const lockTime = parseInt(stored);
      const now = Date.now();
      if (now < lockTime) {
        setIsLocked(true);
        setLockoutTime(Math.ceil((lockTime - now) / 1000));
      } else {
        localStorage.removeItem("login_lockout");
        localStorage.removeItem("login_attempts");
      }
    }
    const attempts = localStorage.getItem("login_attempts");
    if (attempts) {
      setFailAttempts(parseInt(attempts));
    }
  }, []);

  // Update lockout timer
  useEffect(() => {
    if (!isLocked || lockoutTime <= 0) return;
    const timer = setInterval(() => {
      setLockoutTime((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          localStorage.removeItem("login_lockout");
          localStorage.removeItem("login_attempts");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isLocked, lockoutTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check lockout
    if (isLocked) {
      toast.error(`Akun terkunci. Coba lagi dalam ${lockoutTime} detik.`);
      return;
    }

    // Validate CAPTCHA
    if (!captcha || parseInt(captchaAnswer) !== captcha.answer) {
      toast.error("CAPTCHA salah. Coba lagi.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const newAttempts = failAttempts + 1;
      setFailAttempts(newAttempts);
      localStorage.setItem("login_attempts", newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockTime = Date.now() + LOCKOUT_DURATION;
        localStorage.setItem("login_lockout", lockTime.toString());
        setIsLocked(true);
        setLockoutTime(30 * 60);
        toast.error(`Terlalu banyak percobaan gagal. Akun terkunci selama 30 menit.`);
      } else {
        toast.error(`${error.message} (${newAttempts}/${MAX_ATTEMPTS})`);
      }
    } else {
      toast.success("Berhasil login!");
      localStorage.removeItem("login_attempts");
      localStorage.removeItem("login_lockout");
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <PageTransition>
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LogIn size={24} />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Masuk ke PPLG X-1</h1>
            <p className="text-sm text-muted-foreground mt-1">Gunakan akun yang terdaftar</p>
          </div>

          {isLocked && (
            <div className="mb-4 flex items-start gap-3 rounded-lg bg-destructive/10 p-4 text-destructive">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Akun Terkunci</p>
                <p className="text-xs mt-1">Terlalu banyak percobaan login gagal. Coba lagi dalam {lockoutTime} detik.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={loading || isLocked}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={loading || isLocked}
                />
              </div>
            </div>

            {/* CAPTCHA */}
            {captcha && (
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <p className="text-sm font-medium text-foreground">Keamanan: {captcha.num1} + {captcha.num2} = ?</p>
                <input
                  type="number"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Jawaban"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={loading || isLocked}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || isLocked}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Memproses..." : "Masuk"}
            </button>

            {failAttempts > 0 && !isLocked && (
              <p className="text-xs text-muted-foreground text-center">Percobaan gagal: {failAttempts}/{MAX_ATTEMPTS}</p>
            )}
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
