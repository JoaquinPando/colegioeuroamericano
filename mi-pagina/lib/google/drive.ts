import { google } from "googleapis";
import { getGoogleAuth } from "./auth";

const DRIVE_ID_PATTERN = /\/folders\/([a-zA-Z0-9_-]+)|\/d\/([a-zA-Z0-9_-]+)|[?&]id=([a-zA-Z0-9_-]+)/;

export function extractDriveId(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(DRIVE_ID_PATTERN);
  if (match) {
    return match[1] ?? match[2] ?? match[3];
  }
  return trimmed;
}

export async function getFolderImageIds(folderId: string): Promise<string[]> {
  const drive = google.drive({ version: "v3", auth: getGoogleAuth() });

  const { data } = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id, name)",
    orderBy: "name",
    pageSize: 50,
  });

  return (data.files ?? [])
    .map((file) => file.id)
    .filter((id): id is string => Boolean(id));
}

export async function getDriveImage(
  fileId: string
): Promise<{ mimeType: string; data: Buffer }> {
  const drive = google.drive({ version: "v3", auth: getGoogleAuth() });

  const [metadata, media] = await Promise.all([
    drive.files.get({ fileId, fields: "mimeType" }),
    drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" }
    ),
  ]);

  return {
    mimeType: metadata.data.mimeType ?? "application/octet-stream",
    data: Buffer.from(media.data as ArrayBuffer),
  };
}
