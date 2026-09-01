import { siteConfig } from '../config/site';

export const seoConfig = {
	author: siteConfig.fullName,
	locale: siteConfig.locale,
	language: siteConfig.language,
	siteName: `${siteConfig.fullName} - ${siteConfig.profession}`,
	themeColor: siteConfig.themeColor,
	defaultRobots: 'index, follow',
} as const;
