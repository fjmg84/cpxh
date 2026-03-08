import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

interface ParsedExcelDate {
  y: number;
  m: number;
  d: number;
}

function parseExcelDate(value: unknown): Date {
  if (typeof value === "number") {
    const parsedDate = XLSX.SSF.parse_date_code(
      value,
    ) as ParsedExcelDate | null;
    if (parsedDate && parsedDate.y && parsedDate.m && parsedDate.d) {
      return new Date(parsedDate.y, parsedDate.m - 1, parsedDate.d);
    }
  }

  if (typeof value === "string") {
    // Intentar parsear formato DD/MM/YYYY
    const ddmmyyyyMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (ddmmyyyyMatch) {
      const day = parseInt(ddmmyyyyMatch[1], 10);
      const month = parseInt(ddmmyyyyMatch[2], 10);
      const year = parseInt(ddmmyyyyMatch[3], 10);
      return new Date(year, month - 1, day);
    }

    // Fallback a parseo estándar
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  return new Date();
}

function parseNumber(value: unknown): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const normalized = value.replace(",", ".").trim();
    const num = Number(normalized);
    return Number.isFinite(num) ? num : 0;
  }

  return 0;
}

export async function GET() {
  try {
    const configuredUrl = process.env.GOOGLE_DRIVE_EXCEL_URL;

    console.log("URL configurada:", configuredUrl);

    if (!configuredUrl) {
      return NextResponse.json(
        {
          error:
            "Falta la variable de entorno GOOGLE_DRIVE_EXCEL_URL. Configurala en .env.local.",
        },
        { status: 500 },
      );
    }

    const response = await fetch(configuredUrl, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `No se pudo acceder al archivo. Verifica que la URL sea correcta, que el archivo esté compartido públicamente y que no haya restricciones de acceso. Código de respuesta: ${response.status}`,
        },
        { status: 400 },
      );
    }

    const values = await response.text();
    const splitValues = values
      .split("\n")
      .slice(1)
      .map((line) => {
        const [fechaValue, horasValue, montoValue] = line.split(",");
        const fecha = parseExcelDate(fechaValue);

        return {
          fecha: fecha.toISOString(),
          horasTrabajadas: parseNumber(horasValue),
          montoPagado: parseNumber(montoValue),
        };
      })
      .filter((entry) => !Number.isNaN(new Date(entry.fecha).getTime()));

    return NextResponse.json({ entries: splitValues });
  } catch (error) {
    console.error("Error al procesar el archivo:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error al procesar el archivo Excel. Verifica el formato y que el archivo esté compartido correctamente.",
      },
      { status: 500 },
    );
  }
}
