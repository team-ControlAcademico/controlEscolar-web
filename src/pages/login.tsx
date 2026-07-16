import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { Eye, EyeOff, LogIn } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    try {
      await login(data);
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
      <div className="rounded-2xl border border-border dark:border-white/20 bg-surface/75 dark:bg-white/10 backdrop-blur-md p-8 shadow-2xl">
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-foreground dark:text-white">Iniciar Sesión</h2>
          <p className="mt-1 text-sm text-muted dark:text-white/60">Ingresa tus credenciales para acceder al sistema</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted dark:text-white/70">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="correo@universidad.mx"
              {...register("email")}
              className="w-full rounded-lg border border-border dark:border-white/20 bg-background/60 dark:bg-white/10 backdrop-blur-sm px-3 py-2.5 text-sm text-foreground dark:text-white placeholder:text-muted/60 dark:placeholder:text-white/40 focus:border-primary dark:focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/20 transition-colors"
            />
            {errors.email && (
              <p className="text-xs text-red-500 dark:text-red-300">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted dark:text-white/70">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full rounded-lg border border-border dark:border-white/20 bg-background/60 dark:bg-white/10 backdrop-blur-sm px-3 py-2.5 pr-10 text-sm text-foreground dark:text-white placeholder:text-muted/60 dark:placeholder:text-white/40 focus:border-primary dark:focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/20 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-muted dark:text-white/50 hover:text-foreground dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 dark:text-red-300">{errors.password.message}</p>
            )}
          </div>

          <p className="text-xs text-muted dark:text-white/40">Credenciales de prueba en CREDENTIALS.md</p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-semibold shadow-lg hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
          >
            <LogIn className="h-4 w-4" />
            {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted dark:text-white/50">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-primary dark:text-white/80 hover:text-primary-foreground dark:hover:text-white underline underline-offset-2 transition-colors font-semibold">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
}
