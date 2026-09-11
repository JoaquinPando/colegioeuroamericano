import { getDriveImage } from "@/lib/google/drive";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;

  try {
    const { mimeType, data } = await getDriveImage(fileId);

    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error(`No se pudo obtener la imagen de Drive (${fileId}):`, error);
    return new Response(null, { status: 404 });
  }
}
