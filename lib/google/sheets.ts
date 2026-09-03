import { google } from "googleapis";
import { getGoogleAuth } from "./auth";

const SHEET_RANGE = "Actividades!A2:D";

export async function fetchActivitiesRows(): Promise<unknown[][]> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error("Falta GOOGLE_SHEET_ID en las variables de entorno.");
  }

  const sheets = google.sheets({ version: "v4", auth: getGoogleAuth() });

  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: SHEET_RANGE,
    // UNFORMATTED_VALUE evita que fechas escritas como AAAA-MM-DD vuelvan
    // reformateadas al locale del Sheet (ej. DD/MM/AAAA); en su lugar, una
    // celda con tipo Fecha llega como número de serie de Sheets.
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  return data.values ?? [];
}
