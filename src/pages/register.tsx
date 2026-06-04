import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Registro</CardTitle>
        <CardDescription>Crea una cuenta en el sistema de control escolar</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" type="email" placeholder="correo@universidad.mx" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Rol</Label>
            <Select value={selectedRole} onValueChange={(v) => setValue("role", v as Role)}>
              <SelectTrigger>
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
            {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input id="nombre" placeholder="Nombre completo" {...register("nombre")} />
            {errors.nombre && <p className="text-sm text-destructive">{errors.nombre.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="curp">CURP (opcional)</Label>
            <Input id="curp" placeholder="ABCD800101HDFRNN09" maxLength={18} {...register("curp")} />
            {errors.curp && <p className="text-sm text-destructive">{errors.curp.message}</p>}
          </div>

          {selectedRole === "ALUMNO" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="matricula">Matrícula</Label>
                <Input id="matricula" placeholder="Ej: 20240001" {...register("matricula")} />
                {errors.matricula && <p className="text-sm text-destructive">{errors.matricula.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="semestre">Semestre</Label>
                <Input id="semestre" type="number" min={1} max={12} placeholder="1" {...register("semestre")} />
                {errors.semestre && <p className="text-sm text-destructive">{errors.semestre.message}</p>}
              </div>
            </>
          )}

          {selectedRole === "DOCENTE" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="especialidad">Especialidad</Label>
                <Input id="especialidad" placeholder="Matemáticas, Física..." {...register("especialidad")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradoAcademico">Grado académico</Label>
                <Input id="gradoAcademico" placeholder="Licenciatura, Maestría, Doctorado" {...register("gradoAcademico")} />
              </div>
            </>
          )}

          {selectedRole === "ADMINISTRATIVO" && (
            <div className="space-y-2">
              <Label htmlFor="departamento">Departamento</Label>
              <Input id="departamento" placeholder="Finanzas, RRHH..." {...register("departamento")} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </Button>
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
