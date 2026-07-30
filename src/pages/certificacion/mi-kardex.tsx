import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import api from "@/services/api";
import { Download, FileText, CheckCircle2, XCircle } from "lucide-react";

export default function MiKardex() {
  const { user } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // @ts-ignore
    if (!user?.perfilId) return;
    // @ts-ignore
    api.get(`/certificacion/alumnos/${user.perfilId}/kardex`)
      .then((res: any) => setData(res.data))
      .catch((err: any) => console.error("Error al cargar kardex:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDownload = () => {
    // @ts-ignore
    if (!user?.perfilId) return;
    // @ts-ignore
    window.open(`${import.meta.env.VITE_API_URL}/certificacion/alumnos/${user.perfilId}/kardex/pdf`, "_blank");
  };

  if (loading) return <div className="p-8 text-center text-neutral-500">Cargando historial...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">No se pudo cargar el historial académico.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mi Historial Académico</h1>
          <p className="text-slate-500 dark:text-slate-400">Consulta tus calificaciones y avance de créditos.</p>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Download className="h-4 w-4" />
          Descargar Kárdex Oficial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Avance Total</span>
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{data.resumen.porcentajeAvance}%</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Promedio General</span>
          <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{data.resumen.promedioGeneral}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Créditos Obtenidos</span>
          <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{data.resumen.creditosObtenidos}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Créditos Totales</span>
          <span className="text-3xl font-bold text-slate-700 dark:text-slate-200 mt-2">{data.resumen.creditosTotales}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-medium border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">Clave</th>
                <th className="px-6 py-4">Materia</th>
                <th className="px-6 py-4">Ciclo</th>
                <th className="px-6 py-4">Créditos</th>
                <th className="px-6 py-4">Promedio</th>
                <th className="px-6 py-4 text-center">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {data.historial.map((item: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono">{item.clave}</td>
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{item.materia}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{item.ciclo}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{item.creditos}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">{item.promedio.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {item.aprobada ? (
                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Aprobada
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          <XCircle className="w-3.5 h-3.5" />
                          Reprobada
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
