import { createHash, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

/**
 * El backend PHP llama a esta ruta cada vez que se publica, edita o borra una
 * actividad, para que el sitio deje de servir la copia guardada en caché.
 */

// Comparación a tiempo constante. Se hashea primero para que las dos entradas
// midan lo mismo, que es lo que exige timingSafeEqual.
function tokenValido(recibido: string, esperado: string): boolean {
  return timingSafeEqual(
    createHash("sha256").update(recibido).digest(),
    createHash("sha256").update(esperado).digest()
  );
}

export async function POST(request: Request) {
  const esperado = process.env.REVALIDATE_TOKEN;

  if (!esperado) {
    console.error("Falta REVALIDATE_TOKEN en las variables de entorno.");
    return Response.json({ error: "Revalidación no configurada." }, { status: 500 });
  }

  if (!tokenValido(request.headers.get("x-token") ?? "", esperado)) {
    return Response.json({ error: "Token inválido." }, { status: 401 });
  }

  // expire: 0 obliga a que la próxima visita espere los datos nuevos. Sin eso,
  // Next 16 sirve la versión vieja una vez más mientras revalida por detrás, y
  // quien acaba de publicar no vería su actividad al recargar.
  revalidateTag("actividades", { expire: 0 });

  return Response.json({ revalidado: true, fecha: new Date().toISOString() });
}
