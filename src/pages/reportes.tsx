import React from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import api from "@/services/api";

export default function Reportes() {
  const handleExportarAlumnos = async () => {
    try {
      const res = await api.post("/estadisticas/exportar/alumnos", {}, { responseType: "blob" });
      
      const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reporte_alumnos_${new Date().getTime()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al exportar el reporte");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Generación de Reportes</h1>
        <p className="text-slate-500 dark:text-slate-400">Exporta información concentrada en formato Excel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card Reporte Alumnos */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg mb-4">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Padrón de Alumnos</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6 flex-1">
            Descarga un archivo Excel con la información general de todos los alumnos registrados, su carrera y estatus actual.
          </p>
          <button 
            onClick={handleExportarAlumnos}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar Excel
          </button>
        </div>
        
        {/* Placeholder para más reportes */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center opacity-70">
          <FileSpreadsheet className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-2" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Próximos Reportes</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Cartera vencida, promedios por carrera, etc.</p>
        </div>
      </div>
    </div>
  );
}
