import { siteConfig } from "../config/site";
import servicePansements from "../assets/images/services/service-pansements.webp";
import servicePriseSang from "../assets/images/services/prise-sang.webp";
import serviceInjections from "../assets/images/services/injections.webp";
import serviceDiabete from "../assets/images/services/diabete.webp";
import servicePilulier from "../assets/images/services/pilulie.webp";
import servicePerfusions from "../assets/images/services/perfusions.webp";
import patientAvatar1 from "../assets/images/reviews/patient-1.svg";
import patientAvatar2 from "../assets/images/reviews/patient-2.svg";
import patientAvatar3 from "../assets/images/reviews/patient-3.svg";
import patientAvatar4 from "../assets/images/reviews/patient-4.svg";
import patientAvatar5 from "../assets/images/reviews/patient-5.svg";
import patientAvatar6 from "../assets/images/reviews/patient-6.svg";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export const homeSeo = {
  title: `${siteConfig.profession} à ${siteConfig.city} | ${siteConfig.fullName}`,
  description: `${siteConfig.fullName}, ${siteConfig.profession.toLowerCase()} à ${siteConfig.city} et alentours. Soins infirmiers à domicile, prise de rendez-vous et informations pratiques.`,
} as const;

export const navigation: readonly NavigationItem[] = [
  { label: "Accueil", href: "#accueil" },
  { label: "Soins", href: "#soins" },
  { label: "À propos", href: "#a-propos" },
  { label: "Zone d’intervention", href: "#zone-intervention" },
  { label: "Contact", href: "#contact" },
];

export const heroContent = {
  eyebrow: "Écoute • Soins • Confiance",
  title: {
    main: "Infirmière à domicile à",
    accent: "Montagny",
  },
  subtitle:
    "Soins à domicile dans un rayon d’environ 10 km, et soins au cabinet sur rendez-vous.",
  actions: {
    primary: { label: "Prendre rendez-vous", href: "#contact" },
    secondary: { label: "Découvrir les soins", href: "#soins" },
  } satisfies Record<"primary" | "secondary", CallToAction>,
  portrait: {
    placeholder: "TODO_HERO_IMAGE",
    alt: "Infirmière à domicile souriante dans un cabinet lumineux à Montagny",
  },
  trustCard: {
    title: "Soins au cabinet uniquement sur rendez-vous",
    location: "Montagny",
    note: "Sur rendez-vous",
  },
} as const;

export const trustBarItems = [
  "Infirmière à domicile",
  "Montagny & alentours",
  "Soins à domicile",
  "Sur rendez-vous",
] as const;

export const servicesContent = {
  eyebrow: "Mes soins",
  title: {
    beforeAccent: "Soins infirmiers adaptés à vos",
    accent: "besoins",
  },
  intro:
    "Des soins réalisés à domicile autour de Montagny ou au cabinet sur rendez-vous, avec écoute et professionnalisme.",
} as const;

export const services = [
  {
    title: "Pansements",
    description:
      "Pansements simples ou complexes, surveillance et suivi de cicatrisation.",
    image: servicePansements,
    alt: "Préparation d’un pansement par une infirmière",
  },
  {
    title: "Prises de sang",
    description:
      "Prélèvements sanguins réalisés à domicile ou au cabinet sur rendez-vous.",
    image: servicePriseSang,
    alt: "Matériel préparé pour une prise de sang",
  },
  {
    title: "Injections",
    description:
      "Réalisation des injections prescrites et surveillance associée.",
    image: serviceInjections,
    alt: "Préparation d’une injection prescrite",
  },
  {
    title: "Suivi du diabète",
    description:
      "Surveillance, glycémie, injections et accompagnement du traitement.",
    image: serviceDiabete,
    alt: "Contrôle de la glycémie avec un lecteur adapté",
  },
  {
    title: "Préparation des traitements",
    description:
      "Préparation des piluliers et accompagnement dans la prise du traitement si nécessaire.",
    image: servicePilulier,
    alt: "Préparation organisée d’un pilulier",
  },
  {
    title: "Perfusions & dispositifs implantables",
    description:
      "Perfusions, entretien de PICC line et chambres implantables selon prescription.",
    image: servicePerfusions,
    alt: "Préparation d’une perfusion et de son dispositif",
  },
] as const;

export const aboutContent = {
  eyebrow: "À propos",
  title: {
    line1: "Je suis Amandine Gauthier,",
    line2Lead: "votre",
    line2Accent: "infirmière",
  },
  // Rendered as a single paragraph; `strong: true` segments are emphasised
  // (full colour + semi-bold) to create a light visual hierarchy.
  paragraph: [
    { text: "Infirmière à " },
    { text: "Montagny", strong: true },
    { text: ", je vous accompagne pour vos " },
    { text: "soins à domicile", strong: true },
    { text: " dans un rayon d’environ " },
    { text: "10 km", strong: true },
    { text: ", ainsi qu’au cabinet uniquement " },
    { text: "sur rendez-vous", strong: true },
    { text: ". J’accorde une attention particulière à l’" },
    { text: "écoute", strong: true },
    { text: ", à la douceur et à la qualité de chaque prise en charge." },
  ],
  imageAlt:
    "Amandine Gauthier, infirmière à domicile à Montagny, en tenue professionnelle",
  professionalInfo: [
    "TODO_PROFESSIONAL_INFO_1",
    "TODO_PROFESSIONAL_INFO_2",
    "TODO_PROFESSIONAL_INFO_3",
  ],
} as const;

export const serviceAreas = [
  "Montagny",
  "[Commune à compléter]",
  "[Commune à compléter]",
  "[Commune à compléter]",
] as const;

export const zoneContent = {
  eyebrow: "Zone d’intervention",
  title: {
    line1: "À vos côtés,",
    line2Lead: "autour de",
    line2Accent: "Montagny",
  },
  text: "Je me déplace à votre domicile dans un rayon d’environ 10 km autour de Montagny.",
  radius: "10 km",
  cabinetLabel: "Soins au cabinet",
  cabinetNote: "Uniquement sur rendez-vous.",
} as const;

export const methodeContent = {
  eyebrow: "La prise en charge",
  title: "Comment se déroule votre accompagnement ?",
  intro:
    "De la prise de contact jusqu’au soin, chaque étape est simple et claire.",
} as const;

export const methodeSteps = [
  {
    number: "01",
    title: "Contact",
    description:
      "Prenez contact pour échanger sur vos besoins et organiser une première prise en charge.",
  },
  {
    number: "02",
    title: "Organisation du rendez-vous",
    description:
      "Nous convenons ensemble d’un créneau adapté et des éléments nécessaires avant l’intervention.",
  },
  {
    number: "03",
    title: "Votre soin",
    description:
      "Les soins sont réalisés à votre domicile ou au cabinet sur rendez-vous, dans un cadre simple, rassurant et professionnel.",
  },
] as const;

export const reviewsContent = {
  eyebrow: "Avis patients",
  title: {
    line1: "Ce sont eux qui en parlent",
    line2Lead: "le",
    accent: "mieux",
  },
  rating: {
    value: "4,9",
    scale: "/ 5",
    stars: 5,
    label: "Avis patients",
    caption: "Des soins réalisés avec attention, disponibilité et bienveillance.",
  },
} as const;

export const patientReviews = [
  {
    name: "Jacques L.",
    rating: 5,
    avatar: patientAvatar1,
    text: "Toujours ponctuelle, très douce et attentive. Des soins expliqués avec calme qui mettent immédiatement en confiance.",
  },
  {
    name: "Sophie M.",
    rating: 5,
    avatar: patientAvatar2,
    text: "Une présence rassurante et beaucoup de professionnalisme. L’organisation des soins est simple et très fiable.",
  },
  {
    name: "Thomas B.",
    rating: 5,
    avatar: patientAvatar3,
    text: "Disponible et à l’écoute, avec des gestes précis et délicats. Je me suis senti accompagné dès le premier passage.",
  },
  {
    name: "Camille R.",
    rating: 5,
    avatar: patientAvatar4,
    text: "Des soins réalisés avec sérieux et douceur. La communication est claire et les horaires sont toujours respectés.",
  },
  {
    name: "Marie D.",
    rating: 5,
    avatar: patientAvatar5,
    text: "Très patiente avec ma mère âgée, rassurante et bienveillante. Toute la famille apprécie sa grande disponibilité.",
  },
  {
    name: "Pierre G.",
    rating: 5,
    avatar: patientAvatar6,
    text: "Professionnelle, efficace et toujours agréable. La qualité des soins à domicile est constante et irréprochable.",
  },
] as const;

export const practicalContent = {
  eyebrow: "Infos pratiques",
  title: {
    lead: "Tout ce qu’il faut savoir avant votre",
    accent: "soin",
  },
  availability: {
    label: "Disponibilités",
    headline: "Des soins organisés simplement.",
    description:
      "Les passages à domicile sont planifiés pour s'adapter à votre rythme et au protocole médical prescrit.",
    badge: "Continuité des soins",
    hoursPrimary: "24h/24",
    hoursSecondary: "7j/7",
    note: "Continuité des soins selon prescription et organisation de la prise en charge.",
  },
  documents: {
    label: "À prévoir",
    title: "Pour votre rendez-vous",
    items: [
      "Ordonnance médicale en cours",
      "Carte Vitale à jour",
      "Attestation de mutuelle",
      "Matériel prescrit si besoin",
    ],
  },
  cabinet: {
    label: "Au cabinet",
    headline: "Sur rendez-vous uniquement.",
    description: "Un espace adapté et calme pour vos soins programmés.",
    locationText: "Cabinet situé à Montagny (42)",
  },
  cta: {
    title: "Une question avant votre soin ?",
    description: "Contactez-moi pour organiser votre prise en charge.",
    buttonLabel: "Prendre contact",
    href: "#contact",
  },
} as const;

export const practicalDocuments = practicalContent.documents.items;

export const faqContent = {
  eyebrow: "FAQ",
  titleLead: "Une question avant votre",
  titleAccent: "soin",
  intro:
    "Retrouvez les réponses aux questions les plus fréquentes concernant les soins à domicile et au cabinet.",
  emergencyNote: "En cas d’urgence vitale, contactez le 15 ou le 112.",
} as const;

export const faqItems = [
  {
    question: "Intervenez-vous uniquement à domicile ?",
    answer:
      "Les soins peuvent être réalisés à domicile dans un rayon d’environ 10 km autour de Montagny, ou au cabinet uniquement sur rendez-vous.",
  },
  {
    question: "Jusqu’où vous déplacez-vous autour de Montagny ?",
    answer:
      "Je me déplace à votre domicile dans un rayon d’environ 10 km autour de Montagny, selon l’organisation de la prise en charge.",
  },
  {
    question: "Puis-je venir directement au cabinet ?",
    answer:
      "Les soins au cabinet sont réalisés uniquement sur rendez-vous. Il est donc préférable de me contacter avant votre venue.",
  },
  {
    question: "Que faut-il prévoir pour le rendez-vous ?",
    answer:
      "Selon votre situation, pensez notamment à votre ordonnance médicale en cours, votre Carte Vitale à jour et au matériel éventuellement prescrit.",
  },
  {
    question: "Êtes-vous disponible 24h/24 et 7j/7 ?",
    answer:
      "Une continuité des soins peut être assurée 24h/24 et 7j/7 selon prescription et organisation de la prise en charge.",
  },
  {
    question: "Comment prendre rendez-vous ?",
    answer:
      "Vous pouvez me contacter directement pour organiser votre soin à domicile ou au cabinet selon votre situation.",
    hasCta: true,
    ctaLabel: "Prendre contact",
    ctaHref: "#contact",
  },
] as const;

export const finalCtaContent = {
  eyebrow: "PRENDRE RENDEZ-VOUS",
  titleLead: "Besoin d’un soin ?",
  titleSubLead: "Je suis là pour vous",
  titleAccent: "accompagner",
  intro:
    "À domicile autour de Montagny ou au cabinet sur rendez-vous, contactez-moi pour organiser votre prise en charge.",
  primary: { label: "Prendre rendez-vous", href: "#contact" },
  secondary: {
    label: "Me contacter",
    href: siteConfig.phone.startsWith("TODO_")
      ? "#contact"
      : `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  },
  portraitAlt:
    "Portrait d’Amandine, infirmière souriante",
} as const;
