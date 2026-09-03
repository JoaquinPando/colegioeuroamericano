export const ROUTES = {
  home: "/",
  nosotros: "/nosotros",
  servicios: "/servicios-educativos",
  actividades: "/actividades",
  // No dedicated "vida escolar" page exists yet; it points to /actividades for now.
  vidaEscolar: "/actividades",
  admision: "/admision",
  contacto: "/contacto",
  admisionFormulario: "/admision#formulario-admision",
} as const;

export const EXTERNAL_LINKS = {
  aulaVirtual: "https://edusys.pe/iepeuroamericanosd/",
  whatsapp: "https://wa.me/51997382368",
  facebook: "https://www.facebook.com/euroamericanoschool",
} as const;
