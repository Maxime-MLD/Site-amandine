import { writeFile } from 'node:fs/promises';

const outputPath = new URL('../src/assets/images/map/roanne-area.svg', import.meta.url);
const bounds = { south: 45.99, west: 4.0, north: 46.08, east: 4.145 };
const center = { lat: 46.0345572, lon: 4.0729178 };
const width = 960;
const height = 560;

const query = `[out:json][timeout:60];
(
  way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential)$"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
  way["waterway"~"^(river|canal)$"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
  way["railway"~"^(rail|tram)$"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
);
out geom;`;

const response = await fetch('https://overpass-api.de/api/interpreter', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		'User-Agent': 'Amandine website static map generator',
	},
	body: new URLSearchParams({ data: query }),
});

if (!response.ok) {
	throw new Error(`OpenStreetMap Overpass request failed: ${response.status}`);
}

const { elements } = await response.json();
const longitudeScale = Math.cos((center.lat * Math.PI) / 180);
const projectedWidth = (bounds.east - bounds.west) * longitudeScale;
const projectedHeight = bounds.north - bounds.south;
const scale = Math.min(width / projectedWidth, height / projectedHeight);
const offsetX = (width - projectedWidth * scale) / 2;
const offsetY = (height - projectedHeight * scale) / 2;

function project(point) {
	return {
		x: offsetX + (point.lon - bounds.west) * longitudeScale * scale,
		y: offsetY + (bounds.north - point.lat) * scale,
	};
}

function distanceToSegment(point, start, end) {
	const dx = end.x - start.x;
	const dy = end.y - start.y;
	if (dx === 0 && dy === 0) return Math.hypot(point.x - start.x, point.y - start.y);
	const t = Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy)));
	return Math.hypot(point.x - (start.x + t * dx), point.y - (start.y + t * dy));
}

function simplify(points, tolerance = 0.7) {
	if (points.length <= 2) return points;
	let maxDistance = 0;
	let index = 0;
	for (let i = 1; i < points.length - 1; i += 1) {
		const distance = distanceToSegment(points[i], points[0], points.at(-1));
		if (distance > maxDistance) {
			maxDistance = distance;
			index = i;
		}
	}
	if (maxDistance <= tolerance) return [points[0], points.at(-1)];
	return [...simplify(points.slice(0, index + 1), tolerance).slice(0, -1), ...simplify(points.slice(index), tolerance)];
}

function pathFor(element) {
	const points = simplify(element.geometry.map(project));
	return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join('');
}

function groupFor(element) {
	if (element.tags?.waterway) return 'water';
	if (element.tags?.railway) return 'rail';
	if (['motorway', 'trunk', 'primary'].includes(element.tags?.highway)) return 'road-major';
	if (['secondary', 'tertiary'].includes(element.tags?.highway)) return 'road-secondary';
	return 'road-local';
}

const groups = new Map([
	['road-local', []],
	['rail', []],
	['road-secondary', []],
	['road-major', []],
	['water', []],
]);

for (const element of elements) {
	if (!element.geometry?.length) continue;
	groups.get(groupFor(element)).push(`<path d="${pathFor(element)}"/>`);
}

const roanne = project(center);
const sourceDate = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit' }).format(new Date());
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">Carte géographique de Roanne</title>
  <desc id="desc">Carte statique basée sur les données OpenStreetMap, avec les routes et cours d’eau réels autour de Roanne.</desc>
  <rect width="${width}" height="${height}" fill="#E4F8EC"/>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    <g stroke="#D7E9DF" stroke-width="1.2">${groups.get('road-local').join('')}</g>
    <g stroke="#C9DDD2" stroke-width="1.1" stroke-dasharray="5 5">${groups.get('rail').join('')}</g>
    <g stroke="#C7DDD1" stroke-width="2.2">${groups.get('road-secondary').join('')}</g>
    <g stroke="#B6D2C3" stroke-width="3.8">${groups.get('road-major').join('')}</g>
    <g stroke="#A7D9C0" stroke-width="7" opacity=".9">${groups.get('water').join('')}</g>
  </g>
  <circle cx="${roanne.x.toFixed(1)}" cy="${roanne.y.toFixed(1)}" r="118" fill="#8BE0B0" opacity=".22"/>
  <circle cx="${roanne.x.toFixed(1)}" cy="${roanne.y.toFixed(1)}" r="15" fill="#FB6F84" stroke="#FFFFFF" stroke-width="6"/>
  <circle cx="${roanne.x.toFixed(1)}" cy="${roanne.y.toFixed(1)}" r="25" fill="none" stroke="#FB6F84" stroke-width="2" opacity=".42"/>
  <g fill="#171717" font-family="Arial, sans-serif" text-anchor="middle">
    <text x="${roanne.x.toFixed(1)}" y="${(roanne.y + 55).toFixed(1)}" font-size="24" font-weight="700">Roanne</text>
    <text x="${roanne.x.toFixed(1)}" y="${(roanne.y + 80).toFixed(1)}" font-size="12" font-weight="700" letter-spacing="1.6" opacity=".55">RAYON ILLUSTRATIF</text>
  </g>
  <text x="24" y="536" fill="#171717" font-family="Arial, sans-serif" font-size="11" opacity=".52">Données © contributeurs OpenStreetMap · ${sourceDate}</text>
</svg>
`;

await writeFile(outputPath, svg);
console.log(`Generated ${outputPath.pathname} from ${elements.length} OpenStreetMap ways.`);
