import { WorkEntry, WeeklyData, MonthlyData, YearlyData } from "@/types";

export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export function getEndOfWeek(date: Date): Date {
  const start = getStartOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return end;
}

export function groupByWeek(entries: WorkEntry[]): WeeklyData[] {
  const weekMap = new Map<string, WorkEntry[]>();

  entries.forEach((entry) => {
    const weekStart = getStartOfWeek(entry.fecha);
    const weekKey = `${weekStart.getFullYear()}-W${getWeekNumber(weekStart)}`;

    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, []);
    }
    weekMap.get(weekKey)!.push(entry);
  });

  const weeklyData: WeeklyData[] = [];

  weekMap.forEach((entries, weekKey) => {
    const firstEntry = entries[0];
    const fechaInicio = getStartOfWeek(firstEntry.fecha);
    const fechaFin = getEndOfWeek(firstEntry.fecha);

    const totalHoras = entries.reduce((sum, e) => sum + e.horasTrabajadas, 0);
    const totalPagado = entries.reduce((sum, e) => sum + e.montoPagado, 0);
    const promedioPorHora = totalHoras > 0 ? totalPagado / totalHoras : 0;

    weeklyData.push({
      semana: weekKey,
      fechaInicio,
      fechaFin,
      totalHoras,
      totalPagado,
      promedioPorHora,
      entradas: entries.sort((a, b) => a.fecha.getTime() - b.fecha.getTime()),
    });
  });

  return weeklyData.sort(
    (a, b) => a.fechaInicio.getTime() - b.fechaInicio.getTime(),
  );
}

export function groupByMonth(entries: WorkEntry[]): MonthlyData[] {
  const monthMap = new Map<string, WorkEntry[]>();

  entries.forEach((entry) => {
    const monthKey = `${entry.fecha.getFullYear()}-${String(entry.fecha.getMonth() + 1).padStart(2, "0")}`;

    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, []);
    }
    monthMap.get(monthKey)!.push(entry);
  });

  const monthlyData: MonthlyData[] = [];
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  monthMap.forEach((entries, monthKey) => {
    const [year, month] = monthKey.split("-").map(Number);

    const totalHoras = entries.reduce((sum, e) => sum + e.horasTrabajadas, 0);
    const totalPagado = entries.reduce((sum, e) => sum + e.montoPagado, 0);
    const promedioPorHora = totalHoras > 0 ? totalPagado / totalHoras : 0;

    monthlyData.push({
      mes: monthNames[month - 1],
      año: year,
      totalHoras,
      totalPagado,
      promedioPorHora,
      entradas: entries.sort((a, b) => a.fecha.getTime() - b.fecha.getTime()),
    });
  });

  return monthlyData.sort((a, b) => {
    if (a.año !== b.año) return a.año - b.año;
    return monthNames.indexOf(a.mes) - monthNames.indexOf(b.mes);
  });
}

export function groupByYear(entries: WorkEntry[]): YearlyData[] {
  const yearMap = new Map<number, WorkEntry[]>();

  entries.forEach((entry) => {
    const year = entry.fecha.getFullYear();

    if (!yearMap.has(year)) {
      yearMap.set(year, []);
    }
    yearMap.get(year)!.push(entry);
  });

  const yearlyData: YearlyData[] = [];

  yearMap.forEach((entries, year) => {
    const totalHoras = entries.reduce((sum, e) => sum + e.horasTrabajadas, 0);
    const totalPagado = entries.reduce((sum, e) => sum + e.montoPagado, 0);
    const promedioPorHora = totalHoras > 0 ? totalPagado / totalHoras : 0;

    yearlyData.push({
      año: year,
      totalHoras,
      totalPagado,
      promedioPorHora,
      entradas: entries.sort((a, b) => a.fecha.getTime() - b.fecha.getTime()),
    });
  });

  return yearlyData.sort((a, b) => a.año - b.año);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
