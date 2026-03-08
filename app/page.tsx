"use client";

import { useState, useEffect } from "react";
import {
  WorkEntry,
  ViewMode,
  WeeklyData,
  MonthlyData,
  YearlyData,
} from "@/types";
import { groupByWeek, groupByMonth, groupByYear } from "@/utils/dataProcessing";
import StatsSummary from "@/components/StatsSummary";
import WeeklyView from "@/components/WeeklyView";
import MonthlyView from "@/components/MonthlyView";
import YearlyView from "@/components/YearlyView";

interface ApiEntry {
  fecha: string;
  horasTrabajadas: number;
  montoPagado: number;
}

interface ApiResponse {
  entries: ApiEntry[];
}

export default function Home() {
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("weekly");
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/datos", { cache: "no-store" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al cargar los datos");
      }

      const data: ApiResponse = await response.json();

      // Convertir las fechas de string a Date
      const parsedEntries: WorkEntry[] = data.entries.map((entry) => ({
        fecha: new Date(entry.fecha),
        horasTrabajadas: entry.horasTrabajadas,
        montoPagado: entry.montoPagado,
      }));

      setEntries(parsedEntries);
      setWeeklyData(groupByWeek(parsedEntries));
      setMonthlyData(groupByMonth(parsedEntries));
      setYearlyData(groupByYear(parsedEntries));
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Calculadora de Pagos por Hora
          </h1>
          {/* <p className="text-gray-600">
            Visualiza tus pagos usando un archivo CSV o Excel de Google Drive
            configurado en el servidor
          </p> */}
        </header>

        {loading && !entries.length ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">
              Cargando datos desde Google Drive...
            </p>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-red-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error al cargar los datos
              </h3>
              <p className="text-red-700 mb-4">{error}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleRefresh}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Intentar nuevamente
                </button>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                💡 Verifica lo siguiente:
              </h3>
              <ul className="list-disc list-inside text-blue-700 space-y-2">
                <li>
                  La variable de entorno `GOOGLE_DRIVE_EXCEL_URL` esta definida
                  en `.env.local`
                </li>
                <li>
                  El archivo de Google Drive esta compartido como
                  &quot;Cualquier persona con el enlace&quot;
                </li>
                <li>
                  El archivo tiene 3 columnas: Fecha, Horas Trabajadas, Monto
                  Total
                </li>
                <li>Las fechas están en formato reconocible (DD/MM/AAAA)</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 flex flex-col gap-1">
                <div>
                  <span className="font-medium">Última actualización:</span>{" "}
                  {lastUpdate?.toLocaleString("es-ES")}
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.01 2.011a9.99 9.99 0 0 1 6.364 2.301l-2.614 2.614a6.494 6.494 0 0 0-3.75-1.166A6.502 6.502 0 0 0 5.508 12c0 1.797.728 3.424 1.902 4.606l-2.614 2.614A9.997 9.997 0 0 1 2.011 12 9.998 9.998 0 0 1 12.01 2.011zm0 15.979a4.001 4.001 0 0 0 0-8.002 4.001 4.001 0 0 0 0 8.002z" />
                  </svg>
                  <span className="text-green-600 font-medium">
                    Conectado a Google Drive
                  </span>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap justify-center">
                <button
                  onClick={() => setViewMode("weekly")}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === "weekly"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Por Semana
                </button>
                <button
                  onClick={() => setViewMode("monthly")}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === "monthly"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Por Mes
                </button>
                <button
                  onClick={() => setViewMode("yearly")}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === "yearly"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Por Año
                </button>
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="px-6 py-2 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center gap-2 disabled:bg-gray-400"
                  title="Actualizar datos desde Google Drive"
                >
                  <svg
                    className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {loading ? "Actualizando..." : "Actualizar"}
                </button>
              </div>
            </div>

            <StatsSummary entries={entries} />

            {viewMode === "weekly" ? (
              <WeeklyView data={weeklyData} />
            ) : viewMode === "monthly" ? (
              <MonthlyView data={monthlyData} />
            ) : (
              <YearlyView data={yearlyData} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
