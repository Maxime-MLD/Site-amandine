import type { SchemaObject } from './types';
import { siteConfig } from '../config/site';

/**
 * JSON-LD helpers will be added once the professional information is validated.
 * Keeping this typed entry point avoids coupling future schemas to page files.
 */
export function defineSchema<T extends SchemaObject>(schema: T): T {
	return schema;
}

const hasPhone = !siteConfig.phone.startsWith('TODO_');
const hasEmail = !siteConfig.email.startsWith('TODO_');
const hasAddress = !siteConfig.address.startsWith('TODO_') && !siteConfig.postalCode.startsWith('TODO_');

const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? siteConfig.siteUrl;
const hasSiteUrl = /^https?:\/\//.test(siteUrl) && !siteUrl.startsWith('TODO_');

export const homeLocalBusinessSchema = defineSchema({
	'@context': 'https://schema.org',
	'@type': ['MedicalBusiness', 'LocalBusiness'],
	name: siteConfig.fullName,
	description: `${siteConfig.profession} à ${siteConfig.city} et dans les communes environnantes.`,
	...(hasSiteUrl ? { url: siteUrl } : {}),
	...(hasSiteUrl ? { image: `${siteUrl.replace(/\/$/, '')}/og-image.png` } : {}),
	areaServed: [
		{ '@type': 'City', name: siteConfig.city },
		{ '@type': 'AdministrativeArea', name: 'Loire' },
	],
	address: {
		'@type': 'PostalAddress',
		addressLocality: siteConfig.city,
		addressCountry: 'FR',
		...(hasAddress ? {
			streetAddress: siteConfig.address,
			postalCode: siteConfig.postalCode,
		} : {}),
	},
	openingHoursSpecification: {
		'@type': 'OpeningHoursSpecification',
		dayOfWeek: [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		],
		opens: '07:00',
		closes: '19:00',
	},
	...(hasPhone ? { telephone: siteConfig.phone } : {}),
	...(hasEmail ? { email: siteConfig.email } : {}),
});
