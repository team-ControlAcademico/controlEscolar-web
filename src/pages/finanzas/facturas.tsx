import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Factura, Pago } from "@/types";
import * as api from "@/services/api";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatMoney, formatDate } from "@/lib/format";
import { Plus, RefreshCw } from "lucide-react";

export default function FacturasPage() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [pagosFacturables, setPagosFacturables] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [detalle, setDetalle] = useState<Factura | null>(null);
  const [form, setForm] = useState({ pagoId: "", rfcReceptor: "", razonSocial: "", usoCfdi: "G03" });

  const load = async () => {
    try {
      const [f, pagos] = await Promise.all([api.getFacturas(), api.getPagos()]);
      setFacturas(f);
      setPagosFacturables(pagos.filter((p) => p.estatus === "CONFIRMADO" && !p.factura));
    } catch { toast.error("Error al cargar facturas"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleGenerar = async () => {
    try {
      await api.generarFactura(form);
      toast.success("Factura timbrada");
      setForm({ pagoId: "", rfcReceptor: "", razonSocial: "", usoCfdi: "G03" });
      setShowForm(false);
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleCancelar = async (id: string) => {
    if (!confirm("¿Cancelar este CFDI?")) return;
    try {
      await api.cancelarFactura(id);
      toast.success("Factura cancelada");
      load();
    } catch (err: any) { toast.error(err.response?.data?.message || "Error"); }
  };

  const verDetalle = async (id: string) => {
    try {
      setDetalle(await api.getFactura(id, true));
    } catch { toast.error("Error al cargar el CFDI"); }
  };

  const columns: Column<Factura>[] = [
    { key: "folio", header: "Folio", render: (f) => `${f.serie}-${f.folio}` },
    { key: "cfdiUuid", header: "UUID", render: (f) => <span className="font-mono text-xs">{f.cfdiUuid.slice(0, 13)}…</span> },
    { key: "razonSocial", header: "Receptor", render: (f) => `${f.razonSocial} (${f.rfcReceptor})` },
    { key: "total", header: "Total", render: (f) => formatMoney(f.total) },
    { key: "createdAt", header: "Fecha", render: (f) => formatDate(f.createdAt) },
    { key: "estatus", header: "Estatus", render: (f) => <span className={f.estatus === "CANCELADA" ? "text-red-600" : "text-green-600"}>{f.estatus}</span> },
    {
      key: "acciones", header: "Acciones",
      render: (f) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => verDetalle(f.id)}>Ver</Button>
          {f.estatus === "TIMBRADA" && <Button variant="destructive" size="sm" onClick={() => handleCancelar(f.id)}>Cancelar</Button>}
        </div>
      ),
    },
  ];

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Facturación CFDI</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Button onClick={() => setShowForm((v) => !v)}><Plus className="h-4 w-4 mr-1" />Timbrar</Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Timbrar CFDI 4.0</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Pago a facturar</Label>
                <Select value={form.pagoId} onValueChange={(v) => setForm({ ...form, pagoId: v })}>
                  <SelectTrigger><SelectValue placeholder="Pago confirmado" /></SelectTrigger>
                  <SelectContent>
                    {pagosFacturables.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.alumno?.nombre} — {formatMoney(p.monto)} ({formatDate(p.fecha)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>RFC receptor</Label><Input value={form.rfcReceptor} onChange={(e) => setForm({ ...form, rfcReceptor: e.target.value.toUpperCase() })} placeholder="XAXX010101000" /></div>
              <div><Label>Razón social</Label><Input value={form.razonSocial} onChange={(e) => setForm({ ...form, razonSocial: e.target.value })} /></div>
              <div><Label>Uso CFDI</Label><Input value={form.usoCfdi} onChange={(e) => setForm({ ...form, usoCfdi: e.target.value })} placeholder="G03" /></div>
            </div>
            {pagosFacturables.length === 0 && <p className="text-sm text-muted-foreground">No hay pagos confirmados sin factura.</p>}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button onClick={handleGenerar} disabled={!form.pagoId}>Timbrar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {detalle && (
        <Card>
          <CardHeader><CardTitle>CFDI {detalle.serie}-{detalle.folio}</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">UUID:</span> <span className="font-mono">{detalle.cfdiUuid}</span></p>
            <p><span className="text-muted-foreground">Receptor:</span> {detalle.razonSocial} ({detalle.rfcReceptor}) — Uso {detalle.usoCfdi}</p>
            <p><span className="text-muted-foreground">Subtotal:</span> {formatMoney(detalle.subtotal)} · <span className="text-muted-foreground">IVA:</span> {formatMoney(detalle.iva)} · <span className="text-muted-foreground">Total:</span> <span className="font-medium">{formatMoney(detalle.total)}</span></p>
            {detalle.cadenaOriginal && <div><p className="text-muted-foreground">Cadena original:</p><pre className="bg-muted p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap">{detalle.cadenaOriginal}</pre></div>}
            {detalle.xmlData && <div><p className="text-muted-foreground">XML CFDI:</p><pre className="bg-muted p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap">{detalle.xmlData}</pre></div>}
            <div className="flex justify-end"><Button variant="outline" size="sm" onClick={() => setDetalle(null)}>Cerrar</Button></div>
          </CardContent>
        </Card>
      )}

      <DataTable columns={columns} data={facturas} emptyMessage="No hay facturas emitidas" />
    </div>
  );
}
