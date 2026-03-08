"use client";

import { MonthlyData } from "@/types";
import { formatCurrency, formatDate } from "@/utils/dataProcessing";

interface MonthlyViewProps {
  data: MonthlyData[];
}

export default function MonthlyView({ data }: MonthlyViewProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay datos disponibles
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((month) => (
        <div
          key={`${month.mes}-${month.año}`}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {month.mes} {month.año}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {month.entradas.length} días trabajados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">Total Horas</p>
              <p className="text-2xl font-bold text-blue-800 mt-1">
                {month.totalHoras.toFixed(2)}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-medium">Total Pagado</p>
              <p className="text-2xl font-bold text-green-800 mt-1">
                {formatCurrency(month.totalPagado)}
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-medium">
                Promedio x Hora
              </p>
              <p className="text-2xl font-bold text-purple-800 mt-1">
                {formatCurrency(month.promedioPorHora)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Detalles por día
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-2 font-medium text-gray-600">
                      Fecha
                    </th>
                    <th className="px-4 py-2 font-medium text-gray-600">
                      Horas
                    </th>
                    <th className="px-4 py-2 font-medium text-gray-600">
                      Monto
                    </th>
                    <th className="px-4 py-2 font-medium text-gray-600">
                      Tarifa/Hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {month.entradas.map((entry, idx) => (
                    <tr key={idx} className="border-t border-gray-100">
                      <td className="px-4 py-2 text-gray-800">
                        {formatDate(entry.fecha)}
                      </td>
                      <td className="px-4 py-2 text-gray-800">
                        {entry.horasTrabajadas.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-gray-800">
                        {formatCurrency(entry.montoPagado)}
                      </td>
                      <td className="px-4 py-2 text-gray-800">
                        {formatCurrency(
                          entry.horasTrabajadas > 0
                            ? entry.montoPagado / entry.horasTrabajadas
                            : 0,
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
