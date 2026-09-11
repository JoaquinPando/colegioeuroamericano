export interface ActivityImage {
  /** Foto en tamaño completo, para la vista ampliada. */
  url: string;
  /** Versión reducida que usa la galería. */
  thumbnailUrl: string;
}

export interface Activity {
  title: string;
  date: string;
  description: string;
  images: ActivityImage[];
}
