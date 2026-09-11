import { fetchActivitiesRows } from "@/lib/google/sheets";
import { extractDriveId, getFolderImageIds } from "@/lib/google/drive";
import type { Activity } from "./types";

interface ParsedRow {
  title: string;
  date: string;
  description: string;
  folderId: string | null;
}

// Sheets cuenta los números de serie de fecha desde el 30 de diciembre de 1899.
const SHEETS_DATE_EPOCH = Date.UTC(1899, 11, 30);

function parseSheetDate(value: unknown): string | null {
  if (typeof value === "number") {
    const date = new Date(SHEETS_DATE_EPOCH + value * 86400000);
    return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return Number.isNaN(new Date(`${trimmed}T00:00:00`).getTime())
        ? null
        : trimmed;
    }
  }

  return null;
}

function parseRow(row: unknown[]): ParsedRow | null {
  const [titulo, fecha, descripcion, carpetaFotos] = row;

  const title = typeof titulo === "string" ? titulo.trim() : "";
  const date = parseSheetDate(fecha);

  if (!title || !date) {
    return null;
  }

  const folderIdRaw = typeof carpetaFotos === "string" ? carpetaFotos.trim() : "";

  return {
    title,
    date,
    description: typeof descripcion === "string" ? descripcion.trim() : "",
    folderId: folderIdRaw ? extractDriveId(folderIdRaw) : null,
  };
}

export async function getAllActivities(): Promise<Activity[]> {
  try {
    const rows = await fetchActivitiesRows();
    const parsedRows = rows
      .map(parseRow)
      .filter((row): row is ParsedRow => row !== null);

    const activities = await Promise.all(
      parsedRows.map(async (row): Promise<Activity> => ({
        title: row.title,
        date: row.date,
        description: row.description,
        imageIds: row.folderId
          ? await getFolderImageIds(row.folderId).catch(() => [])
          : [],
      }))
    );

    return activities.sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.error("No se pudieron cargar las actividades desde Google Sheets:", error);
    return [];
  }
}

export async function getLatestActivities(count: number): Promise<Activity[]> {
  const all = await getAllActivities();
  return all.slice(0, count);
}
