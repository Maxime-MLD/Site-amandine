import { siteConfig } from '../config/site';
import servicePlaceholder1 from '../assets/images/services/service-placeholder-1.svg';
import servicePlaceholder2 from '../assets/images/services/service-placeholder-2.svg';
import servicePlaceholder3 from '../assets/images/services/service-placeholder-3.svg';
import servicePlaceholder4 from '../assets/images/services/service-placeholder-4.svg';
import servicePlaceholder5 from '../assets/images/services/service-placeholder-5.svg';
import servicePlaceholder6 from '../assets/images/services/service-placeholder-6.svg';

export interface NavigationItem {
	label: string;
	href: string;
}

export interface ContentPlaceholder {
	id: string;
	title: string;
	body: string;
}

export interface CallToAction {
	label: string;
	href: string;
}

export const homeSeo = {
	title: `${siteConfig.profession} à ${siteConfig.city} | ${siteConfig.fullName}`,
	description: `${siteConfig.fullName}, ${siteConfig.profession.toLowerCase()} à ${siteConfig.city}. Découvrez prochainement les soins proposés, la zone d’intervention et les informations pratiques.`,
} as const;

export const navigation: readonly NavigationItem[] = [
	{ label: 'Accueil', href: '#accueil' },
	{ label: 'Soins', href: '#soins' },
	{ label: 'À propos', href: '#a-propos' },
	{ label: 'Zone d’intervention', href: '#zone-intervention' },
	{ label: 'Contact', href: '#contact' },
];

export const heroContent = {
	title: {
		main: 'Infirmière à domicile à',
		accent: 'Roanne.',
	},
	subtitle:
		'Je me déplace chez vous pour réaliser vos soins avec professionnalisme, écoute et bienveillance.',
	actions: {
		primary: { label: 'Prendre rendez-vous', href: '#contact' },
		secondary: { label: 'Zone d’intervention', href: '#zone-intervention' },
	} satisfies Record<'primary' | 'secondary', CallToAction>,
	portrait: {
		placeholder: 'TODO_HERO_IMAGE',
		alt: 'Emplacement réservé à la future photographie de portrait',
	},
	trustCard: {
		title: 'Soins à domicile',
		location: 'Roanne & alentours',
		note: 'Sur rendez-vous',
	},
} as const;

export const trustBarItems = [
	'Infirmière à domicile',
	'Roanne & alentours',
	'Soins à domicile',
	'Sur rendez-vous',
] as const;

export const servicesContent = {
	eyebrow: 'Les soins',
	title: 'Soins infirmiers à domicile',
	intro: 'TODO_SERVICES_INTRO',
} as const;

export const services = [
	{
		title: 'TODO_SERVICE_1',
		description: 'TODO_SERVICE_DESCRIPTION_1',
		image: servicePlaceholder1,
		alt: 'Emplacement réservé à l’image du premier service',
	},
	{
		title: 'TODO_SERVICE_2',
		description: 'TODO_SERVICE_DESCRIPTION_2',
		image: servicePlaceholder2,
		alt: 'Emplacement réservé à l’image du deuxième service',
	},
	{
		title: 'TODO_SERVICE_3',
		description: 'TODO_SERVICE_DESCRIPTION_3',
		image: servicePlaceholder3,
		alt: 'Emplacement réservé à l’image du troisième service',
	},
	{
		title: 'TODO_SERVICE_4',
		description: 'TODO_SERVICE_DESCRIPTION_4',
		image: servicePlaceholder4,
		alt: 'Emplacement réservé à l’image du quatrième service',
	},
	{
		title: 'TODO_SERVICE_5',
		description: 'TODO_SERVICE_DESCRIPTION_5',
		image: servicePlaceholder5,
		alt: 'Emplacement réservé à l’image du cinquième service',
	},
	{
		title: 'TODO_SERVICE_6',
		description: 'TODO_SERVICE_DESCRIPTION_6',
		image: servicePlaceholder6,
		alt: 'Emplacement réservé à l’image du sixième service',
	},
] as const;

export const aboutContent = {
	eyebrow: 'Bonjour',
	title: 'Je suis Amandine Gauthier',
	text: 'TODO_ABOUT_TEXT',
	imageAlt: 'Emplacement réservé à la future photographie d’Amandine Gauthier',
	professionalInfo: [
		'TODO_PROFESSIONAL_INFO_1',
		'TODO_PROFESSIONAL_INFO_2',
		'TODO_PROFESSIONAL_INFO_3',
	],
} as const;

export const serviceAreas = ['Roanne', 'TODO_CITY_2', 'TODO_CITY_3', 'TODO_CITY_4'] as const;

export const zoneContent = {
	eyebrow: 'À proximité de chez vous',
	title: 'Zone d’intervention autour de Roanne',
	text: 'Vous habitez à proximité ? Contactez-moi pour vérifier si votre domicile se situe dans ma zone d’intervention.',
	areasLabel: 'Communes desservies',
	mapAlt: 'Carte géographique de Roanne basée sur les données OpenStreetMap',
	mapLinkLabel: 'Voir sur Google Maps',
} as const;

export const methodeContent = {
	eyebrow: 'La prise en charge',
	title: 'Comment se déroule une prise en charge ?',
	intro: 'De la prise de contact jusqu’aux soins à domicile, chaque étape est simple et claire.',
} as const;

export const methodeSteps = [
	{
		number: '01',
		title: 'Contact',
		description:
			'Prenez contact pour échanger sur vos besoins et organiser une première prise en charge.',
	},
	{
		number: '02',
		title: 'Organisation du rendez-vous',
		description:
			'Nous convenons ensemble d’un créneau adapté et des éléments nécessaires avant l’intervention.',
	},
	{
		number: '03',
		title: 'Soins à domicile',
		description:
			'Les soins sont réalisés directement chez vous dans un cadre simple, rassurant et professionnel.',
	},
] as const;

export const reviewsContent = {
	eyebrow: 'Avis patients',
	title: 'Des soins appréciés, en toute confiance.',
	intro: 'Des accompagnements attentifs, organisés avec douceur et dans le respect de chaque personne.',
} as const;

export const patientReviews = [
	{
		name: 'L.Jacques',
		initials: 'LJ',
		rating: 5,
		text: 'Toujours ponctuelle, très douce et attentive. Chaque soin est expliqué avec calme, ce qui met immédiatement en confiance.',
	},
	{
		name: 'M.Sophie',
		initials: 'MS',
		rating: 5,
		text: 'Une présence rassurante et beaucoup de professionnalisme. L’organisation des rendez-vous est simple et très fiable.',
	},
	{
		name: 'B.Thomas',
		initials: 'BT',
		rating: 5,
		text: 'Disponible et à l’écoute, avec des gestes précis et délicats. Je me suis senti accompagné dès le premier passage.',
	},
	{
		name: 'R.Camille',
		initials: 'RC',
		rating: 5,
		text: 'Des soins réalisés avec sérieux et douceur. La communication est claire et les horaires sont toujours respectés.',
	},
	{
		name: 'D.Marie',
		initials: 'DM',
		rating: 5,
		text: 'Très patiente avec ma mère âgée, rassurante et bienveillante. Toute la famille apprécie sa disponibilité.',
	},
	{
		name: 'G.Pierre',
		initials: 'GP',
		rating: 5,
		text: 'Professionnelle, efficace et toujours agréable. La qualité des soins à domicile est vraiment constante.',
	},
	{
		name: 'C.Émilie',
		initials: 'CÉ',
		rating: 5,
		text: 'Une infirmière attentive qui prend le temps d’écouter et de répondre aux questions sans jamais presser le rendez-vous.',
	},
	{
		name: 'P.Nathalie',
		initials: 'PN',
		rating: 4,
		text: 'Un suivi sérieux, des horaires bien organisés et une grande douceur pendant les soins. Une relation de confiance naturelle.',
	},
] as const;

export const practicalContent = {
	eyebrow: 'Informations pratiques',
	title: 'Tout ce qu’il faut savoir avant votre soin.',
	intro:
		'Horaires, secteur d’intervention et documents à prévoir pour une prise en charge simple et sans surprise.',
	availability: {
		label: 'Disponibilités',
		title: 'Du lundi au samedi',
		hours: '7h00 — 19h00',
		text: 'Les horaires peuvent être adaptés selon les soins et les besoins.',
	},
	area: {
		label: 'Secteur',
		title: 'Roanne et alentours',
		text: 'Déplacements à domicile dans un rayon d’environ 30 km autour de Roanne.',
		linkLabel: 'Voir la zone d’intervention',
	},
	documents: {
		label: 'À prévoir',
		title: 'Préparer votre prise en charge',
		text: 'Ces éléments permettent de préparer votre prise en charge dans les meilleures conditions.',
	},
	urgent: {
		label: 'Besoin rapide',
		title: 'Un soin à organiser rapidement ?',
		text: 'Contactez-moi directement afin de vérifier mes disponibilités et organiser votre prise en charge.',
		ctaLabel: 'Me contacter',
		href: '#contact',
	},
} as const;

export const practicalDocuments = [
	'Ordonnance si nécessaire',
	'Carte Vitale',
	'Carte de mutuelle',
	'Traitement ou matériel prescrit si besoin',
] as const;

export const faqContent = {
	eyebrow: 'Questions fréquentes',
	title: 'Une question avant votre prise en charge ?',
	intro:
		'Retrouvez les réponses aux questions les plus fréquentes concernant les soins à domicile.',
} as const;

export const faqItems = [
	{
		question: 'Quels soins pouvez-vous réaliser à domicile ?',
		answer:
			'Les soins sont réalisés selon votre prescription et vos besoins : injections, pansements, prises de sang, suivi de traitements et autres soins infirmiers courants.',
	},
	{
		question: 'Faut-il une ordonnance pour recevoir des soins ?',
		answer:
			'Certains soins nécessitent une prescription médicale. Lors de votre prise de contact, nous pouvons vérifier ensemble les documents nécessaires.',
	},
	{
		question: 'Dois-je préparer ma carte Vitale ?',
		answer:
			'Oui, pensez à préparer votre carte Vitale, votre ordonnance lorsqu’elle est nécessaire et votre carte de mutuelle.',
	},
	{
		question: 'Dans quelles communes vous déplacez-vous ?',
		answer:
			'Je me déplace à Roanne et dans les communes environnantes, dans un rayon d’environ 30 km.',
	},
	{
		question: 'Comment prendre rendez-vous ?',
		answer:
			'Vous pouvez me contacter directement afin que nous convenions ensemble d’un créneau adapté à vos besoins.',
	},
	{
		question: 'Que faire si j’ai besoin d’un soin rapidement ?',
		answer:
			'Contactez-moi directement afin que je puisse vérifier mes disponibilités et vous indiquer la solution la plus adaptée.',
	},
] as const;

// These collections will be populated once the corresponding content is validated.

export const contentPlaceholders: readonly ContentPlaceholder[] = [
	{ id: 'faq', title: 'TODO_FAQ_TITLE', body: 'TODO_FAQ_CONTENT' },
	{ id: 'practical', title: 'TODO_PRACTICAL_TITLE', body: 'TODO_PRACTICAL_CONTENT' },
];
