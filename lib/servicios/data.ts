import type { Service } from "./types";

/**
 * Contenido genérico de referencia (nivel típico de un colegio privado peruano).
 * Reemplazar por el contenido real del colegio cuando esté disponible.
 */
export const services: Service[] = [
  {
    slug: "educacion-primaria",
    title: "Educación Primaria",
    shortDescription:
      "Del 1° al 6° grado, una base sólida en valores, hábitos de estudio e inglés reforzado.",
    description:
      "Nuestro nivel de Primaria acompaña a los estudiantes de 1° a 6° grado con una currícula alineada al MINEDU y reforzada con inglés intensivo desde el primer grado. Ponemos énfasis en la formación de hábitos de estudio, valores y habilidades socioemocionales, en un ambiente cercano donde cada niño y niña recibe seguimiento personalizado.",
    icon: "book",
    image: "/servicios/primaria.jpg",
    includes: [
      "Inglés intensivo desde 1er grado",
      "Talleres de arte y música",
      "Educación física y deporte",
      "Tutoría y acompañamiento socioemocional",
      "Laboratorio de cómputo",
      "Biblioteca escolar",
    ],
  },
  {
    slug: "educacion-secundaria",
    title: "Educación Secundaria",
    shortDescription:
      "Del 1° al 5° de secundaria, con orientación vocacional y preparación preuniversitaria.",
    description:
      "En Secundaria preparamos a los estudiantes para los retos académicos y personales de la vida universitaria y profesional. Combinamos la currícula regular con orientación vocacional, proyectos de investigación y un plan de preparación preuniversitaria que se intensifica en los últimos años.",
    icon: "cap",
    image: "/servicios/secundaria.jpg",
    includes: [
      "Plan de orientación vocacional",
      "Preparación preuniversitaria",
      "Cursos de robótica y tecnología",
      "Certificación internacional de inglés",
      "Proyectos de investigación y feria de ciencias",
      "Actividades deportivas y culturales",
    ],
  },
  {
    slug: "seminario-de-reforzamiento",
    title: "Seminario de Reforzamiento",
    shortDescription:
      "Clases de apoyo académico fuera del horario regular, en grupos reducidos.",
    description:
      "El Seminario de Reforzamiento está dirigido a estudiantes que necesitan afianzar conocimientos en cursos específicos o que buscan ir un paso adelante. Se dicta en grupos reducidos, con horarios flexibles y docentes especializados por área, permitiendo una atención mucho más personalizada que en el aula regular.",
    icon: "pencil",
    image: "/servicios/seminario.jpg",
    includes: [
      "Grupos reducidos por curso",
      "Horarios flexibles (tardes y sábados)",
      "Material de práctica adicional",
      "Evaluaciones de seguimiento",
      "Docentes especializados por área",
      "Reporte de avance a los padres de familia",
    ],
  },
  {
    slug: "cursos-de-verano",
    title: "Cursos de Verano",
    shortDescription:
      "Programa vacacional de enero y febrero con nivelación académica y talleres recreativos.",
    description:
      "Nuestro programa de Cursos de Verano se dicta durante enero y febrero, combinando nivelación y adelanto académico con talleres recreativos y deportivos. Es una oportunidad para que los estudiantes refuercen lo aprendido durante el año o se adelanten al siguiente, sin dejar de lado la diversión propia del verano.",
    icon: "sun",
    image: "/servicios/verano.jpg",
    includes: [
      "Cursos de nivelación y adelanto académico",
      "Talleres recreativos y deportivos",
      "Excursiones y actividades al aire libre",
      "Horario de verano con cuidado extendido",
      "Grupos organizados por edad",
      "Certificado de participación",
    ],
  },
];

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
