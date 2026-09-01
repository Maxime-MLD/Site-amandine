// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { resolveSiteUrl, siteConfig } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: resolveSiteUrl(process.env.PUBLIC_SITE_URL ?? siteConfig.siteUrl),
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
