const TODO_SITE_ORIGIN = "https://todo-site-url.invalid";

export const siteConfig = {
  firstName: "Amandine",
  lastName: "Gauthier",
  fullName: "Amandine Gauthier",
  profession: "Infirmière à domicile",
  city: "Montagny",
  country: "France",
  phone: "06.77.53.58.79",
  email: "contact@amandine.fr",
  address: "TODO_ADDRESS",
  postalCode: "TODO_POSTAL_CODE",
  hours: "TODO_HOURS",
  siret: "TODO_SIRET",
  rpps: "TODO_RPPS",
  serviceArea: ["TODO_SERVICE_AREA"],
  siteUrl: "TODO_SITE_URL",
  googleBusinessUrl: "TODO_GOOGLE_BUSINESS_URL",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Montagny%2C+42840",
  professionalTitle: "TODO_PROFESSIONAL_TITLE",
  host: {
    name: "TODO_HOST_NAME",
    address: "TODO_HOST_ADDRESS",
    phone: "TODO_HOST_PHONE",
  },
  locale: "fr-FR",
  language: "fr",
  themeColor: "#123b4a",
} as const;

export function resolveSiteUrl(value: string): string {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.origin
      : TODO_SITE_ORIGIN;
  } catch {
    return TODO_SITE_ORIGIN;
  }
}
