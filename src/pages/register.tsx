import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import type { Role } from "@/types";

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "ADMIN", label: "Administrador" },
  { value: "ESCOLAR", label: "Control Escolar" },
  { value: "ADMINISTRATIVO", label: "Administrativo" },
  { value: "DOCENTE", label: "Docente" },
  { value: "ALUMNO", label: "Alumno" },
  { value: "PADRE", label: "Padre" },
];

const registerSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirmPassword: z.string(),
  role: z.enum(["ADMIN", "ESCOLAR", "ADMINISTRATIVO", "DOCENTE", "ALUMNO", "PADRE"]),
  nombre: z.string().min(2, "Nombre requerido"),
  curp: z.string().length(18, "CURP debe tener 18 caracteres").optional().or(z.literal("")),
  especialidad: z.string().optional().or(z.literal("")),
  gradoAcademico: z.string().optional().or(z.literal("")),
  departamento: z.string().optional().or(z.literal("")),
  matricula: z.string().optional().or(z.literal("")),
  semestre: z.coerce.number().int().min(1).max(12).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

// Glassmorphism field component for reuse
function GlassField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted dark:text-white/70">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 dark:text-red-300">{error}</p>}
    </div>
  );
}

const glassInput =
  "w-full rounded-lg border border-border dark:border-white/20 bg-background/60 dark:bg-white/10 backdrop-blur-sm px-3 py-2.5 text-sm text-foreground dark:text-white placeholder:text-muted/60 dark:placeholder:text-white/40 focus:border-primary dark:focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/20 transition-colors";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: registerUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "ALUMNO" },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterForm) => {
    setIsSubmitting(true);
    try {
      const { confirmPassword, ...payload } = data;
      if (!payload.curp) delete (payload as any).curp;
      await registerUser(payload as any);
      toast.success("Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al registrarse";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200 my-8">
      <div className="rounded-2xl border border-border dark:border-white/20 bg-surface/75 dark:bg-white/10 backdrop-blur-md p-8 shadow-2xl">
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-foreground dark:text-white">Registro</h2>
          <p className="mt-1 text-sm text-muted dark:text-white/60">Crea una cuenta en el sistema de control escolar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <GlassField label="Correo electrónico" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              placeholder="correo@universidad.mx"
              {...register("email")}
              className={glassInput}
            />
          </GlassField>

          <GlassField label="Contraseña" error={errors.password?.message}>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={glassInput}
            />
          </GlassField>

          <GlassField label="Confirmar contraseña" error={errors.confirmPassword?.message}>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={glassInput}
            />
          </GlassField>

          <GlassField label="Rol" error={errors.role?.message}>
            <Select value={selectedRole} onValueChange={(v) => setValue("role", v as Role)}>
              <SelectTrigger className="border-border dark:border-white/20 bg-background/60 dark:bg-white/10 backdrop-blur-sm text-foreground dark:text-white focus:ring-primary/20 dark:focus:ring-white/20 focus:border-primary dark:focus:border-white/50 [&>span]:text-foreground dark:[&>span]:text-white">
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </GlassField>

          <GlassField label="Nombre completo" error={errors.nombre?.message}>
            <input
              id="nombre"
              placeholder="Nombre completo"
              {...register("nombre")}
              className={glassInput}
            />
          </GlassField>

          <GlassField label="CURP (opcional)" error={errors.curp?.message}>
            <input
              id="curp"
              placeholder="ABCD800101HDFRNN09"
              maxLength={18}
              {...register("curp")}
              className={glassInput}
            />
          </GlassField>

          {selectedRole === "ALUMNO" && (
            <>
              <GlassField label="Matrícula" error={errors.matricula?.message}>
                <input
                  id="matricula"
                  placeholder="Ej: 20240001"
                  {...register("matricula")}
                  className={glassInput}
                />
              </GlassField>
              <GlassField label="Semestre" error={errors.semestre?.message}>
                <input
                  id="semestre"
                  type="number"
                  min={1}
                  max={12}
                  placeholder="1"
                  {...register("semestre")}
                  className={glassInput}
                />
              </GlassField>
            </>
          )}

          {selectedRole === "DOCENTE" && (
            <>
              <GlassField label="Especialidad">
                <input
                  id="especialidad"
                  placeholder="Matemáticas, Física..."
                  {...register("especialidad")}
                  className={glassInput}
                />
              </GlassField>
              <GlassField label="Grado académico">
                <input
                  id="gradoAcademico"
                  placeholder="Licenciatura, Maestría, Doctorado"
                  {...register("gradoAcademico")}
                  className={glassInput}
                />
              </GlassField>
            </>
          )}

          {selectedRole === "ADMINISTRATIVO" && (
            <GlassField label="Departamento">
              <input
                id="departamento"
                placeholder="Finanzas, RRHH..."
                {...register("departamento")}
                className={glassInput}
              />
            </GlassField>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-semibold shadow-lg hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
          >
            <UserPlus className="h-4 w-4" />
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted dark:text-white/50">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-primary dark:text-white/80 hover:text-primary-foreground dark:hover:text-white underline underline-offset-2 transition-colors font-semibold"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
