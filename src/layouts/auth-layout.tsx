import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-brand">Control Escolar</h1>
        <p className="text-muted-foreground mt-1">Universidad</p>
      </div>
      <Outlet />
    </div>
  );
}
