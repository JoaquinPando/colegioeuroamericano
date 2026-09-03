export type ServiceIconKey = "book" | "cap" | "pencil" | "sun";

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: ServiceIconKey;
  image: string;
  includes: string[];
}
