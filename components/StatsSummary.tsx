"use client";

import { WorkEntry } from "@/types";
import { formatCurrency } from "@/utils/dataProcessing";

interface StatsSummaryProps {
  entries: WorkEntry[];
}

export default function StatsSummary({ entries }: StatsSummaryProps) {
  if (entries.length === 0) {
    return null;
  }

  const totalHours = entries.reduce((sum, e) => sum + e.horasTrabajadas, 0);
  const totalPaid = entries.reduce((sum, e) => sum + e.montoPagado, 0);
  const averagePerHour = totalHours > 0 ? totalPaid / totalHours : 0;
  const totalDays = entries.length;

  return (
    <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white mb-6">
      <h2 className="text-2xl font-bold mb-6">Resumen General</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-blue-100 font-medium">Total de Días</p>
          <p className="text-3xl font-bold mt-2">{totalDays}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-blue-100 font-medium">Total de Horas</p>
          <p className="text-3xl font-bold mt-2">{totalHours.toFixed(2)}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-blue-100 font-medium">Total Pagado</p>
          <p className="text-3xl font-bold mt-2">{formatCurrency(totalPaid)}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-blue-100 font-medium">Promedio x Hora</p>
          <p className="text-3xl font-bold mt-2">
            {formatCurrency(averagePerHour)}
          </p>
        </div>
      </div>
    </div>
  );
}
