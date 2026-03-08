export interface WorkEntry {
  fecha: Date;
  horasTrabajadas: number;
  montoPagado: number;
}

export interface WeeklyData {
  semana: string;
  fechaInicio: Date;
  fechaFin: Date;
  totalHoras: number;
  totalPagado: number;
  promedioPorHora: number;
  entradas: WorkEntry[];
}

export interface MonthlyData {
  mes: string;
  año: number;
  totalHoras: number;
  totalPagado: number;
  promedioPorHora: number;
  entradas: WorkEntry[];
}

export interface YearlyData {
  año: number;
  totalHoras: number;
  totalPagado: number;
  promedioPorHora: number;
  entradas: WorkEntry[];
}

export type ViewMode = "weekly" | "monthly" | "yearly";
