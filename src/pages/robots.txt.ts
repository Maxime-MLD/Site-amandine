import type { APIRoute } from 'astro';

// The Sitemap directive is only emitted once a real production domain is
// configured (PUBLIC_SITE_URL). Until then `Astro.site` resolves to the
// placeholder `todo-site-url.invalid` and we omit the line rather than ship a
// bogus URL. @astrojs/sitemap generates `sitemap-index.xml`.
const isRealSite = (url: URL | undefined): url is URL =>
	!!url && !url.host.endsWith('todo-site-url.invalid');

export const GET: APIRoute = ({ site }) => {
	const lines = ['User-agent: *', 'Allow: /'];

	if (isRealSite(site)) {
		lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`);
	}

	return new Response(`${lines.join('\n')}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
