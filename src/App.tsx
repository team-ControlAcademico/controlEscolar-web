import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth.store";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/theme-context";

export default function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
