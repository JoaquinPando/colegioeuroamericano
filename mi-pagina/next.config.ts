import type { NextConfig } from "next";

// Las fotos de las actividades las sirve el backend PHP (ver backend/README.md).
// next/image solo optimiza imágenes de hosts autorizados acá.
const backend = new URL(process.env.BACKEND_URL ?? "http://localhost:8000");

// Next 16 rechaza imágenes cuyo host resuelve a una IP privada, como defensa
// contra SSRF. En desarrollo el backend corre en localhost, así que hay que
// permitirlo; apuntando a un dominio real vuelve a quedar desactivado solo.
const backendEsLocal = ["localhost", "127.0.0.1", "[::1]"].includes(
  backend.hostname
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("/uploads/**", backend)],
    dangerouslyAllowLocalIP: backendEsLocal,
  },
};

export default nextConfig;
