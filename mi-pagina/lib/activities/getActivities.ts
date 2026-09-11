import type { Activity, ActivityImage } from "./types";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

interface ApiFoto {
  url?: unknown;
  miniatura?: unknown;
}

interface ApiActividad {
  titulo?: unknown;
  fecha?: unknown;
  descripcion?: unknown;
  fotos?: unknown;
}

function parseImage(foto: ApiFoto): ActivityImage | null {
  if (typeof foto?.url !== "string" || foto.url === "") {
    return null;
  }

  return {
    url: foto.url,
    thumbnailUrl:
      typeof foto.miniatura === "string" && foto.miniatura !== ""
        ? foto.miniatura
        : foto.url,
  };
}

function parseActivity(actividad: ApiActividad): Activity | null {
  const { titulo, fecha, descripcion, fotos } = actividad;

  if (typeof titulo !== "string" || typeof fecha !== "string") {
    return null;
  }

  return {
    title: titulo,
    date: fecha,
    description: typeof descripcion === "string" ? descripcion : "",
    images: Array.isArray(fotos)
      ? fotos
          .map(parseImage)
          .filter((image): image is ActivityImage => image !== null)
      : [],
  };
}

async function fetchActivities(limit?: number): Promise<Activity[]> {
  const url = new URL("/api/actividades", BACKEND_URL);

  if (limit !== undefined) {
    url.searchParams.set("limit", String(limit));
  }

  try {
    const response = await fetch(url, {
      // El backend avisa a /api/revalidar al publicar; el revalidate horario
      // queda como red de seguridad por si ese aviso se pierde.
      next: { revalidate: 3600, tags: ["actividades"] },
    });

    if (!response.ok) {
      throw new Error(`El backend respondió ${response.status}.`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("El backend no devolvió una lista de actividades.");
    }

    return data
      .map(parseActivity)
      .filter((activity): activity is Activity => activity !== null);
  } catch (error) {
    // Si el backend no está disponible la página se muestra vacía en lugar
    // de romper el build.
    console.error("No se pudieron cargar las actividades:", error);
    return [];
  }
}

export async function getAllActivities(): Promise<Activity[]> {
  return fetchActivities();
}

export async function getLatestActivities(count: number): Promise<Activity[]> {
  return fetchActivities(count);
}
