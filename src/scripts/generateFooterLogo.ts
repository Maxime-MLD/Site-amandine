import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

export async function ensureFooterLogo(): Promise<string> {
	const inputPath = path.resolve('src/assets/images/logo-amandine.png');
	const outputPath = path.resolve('src/assets/images/logo-amandine-footer.png');

	if (fs.existsSync(outputPath)) {
		return outputPath;
	}

	if (!fs.existsSync(inputPath)) {
		console.warn('[ensureFooterLogo] Input logo not found at:', inputPath);
		return '';
	}

	// Read raw RGBA pixels from original logo
	const image = sharp(inputPath);
	const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
	const { width, height, channels } = info;

	// Detect horizontal rows containing text vs the blank gap between
	// "Amandine Gauthier" and "Infirmière à domicile"
	// Text starts around x >= width * 0.20 (after the ECG)
	const startX = Math.floor(width * 0.2);
	const rowCounts = new Array(height).fill(0);

	for (let y = 0; y < height; y++) {
		for (let x = startX; x < width; x++) {
			const idx = (y * width + x) * channels;
			const a = data[idx + 3];
			if (a > 30) {
				const r = data[idx];
				const b = data[idx + 2];
				// Petrol text: bluish/dark tone (b > r, r < 90)
				if (b > r && r < 90) {
					rowCounts[y]++;
				}
			}
		}
	}

	// Find the blank trough (gap) between the title and subtitle
	let inFirstText = false;
	let gapY = Math.floor(height * 0.58); // default fallback

	for (let y = 0; y < height; y++) {
		if (rowCounts[y] > 5) {
			inFirstText = true;
		} else if (inFirstText && rowCounts[y] === 0) {
			gapY = y;
			break;
		}
	}

	// Target for text on dark petrol background: var(--c-offwhite) / ivory
	const targetR = 255;
	const targetG = 253;
	const targetB = 249;

	for (let y = 0; y < height; y++) {
		const isSubtitle = y >= gapY;
		for (let x = 0; x < width; x++) {
			const idx = (y * width + x) * channels;
			const a = data[idx + 3];
			if (a < 5) continue;

			const r = data[idx];
			const g = data[idx + 1];
			const b = data[idx + 2];

			// Amber ECG: R is prominent, much higher than B (e.g. r > 130, r > b * 1.4)
			const isAmber = r > 130 && r > b * 1.4;
			if (isAmber) {
				// Keep exact original ECG colors and antialiasing
				continue;
			}

			// Petrol text: bluish tone (b > r, r < 100) or dark antialiased fringe
			const isPetrol = (b > r && r < 100) || (r < 75 && g < 110 && b < 130);
			if (isPetrol) {
				data[idx] = targetR;
				data[idx + 1] = targetG;
				data[idx + 2] = targetB;
				if (isSubtitle) {
					// Subtitle opacity ~ 0.65 (requested 0.60 to 0.70)
					data[idx + 3] = Math.round(a * 0.65);
				}
			}
		}
	}

	// Write the resulting PNG with optimal compression
	await sharp(data, {
		raw: { width, height, channels },
	})
		.png({ compressionLevel: 9 })
		.toFile(outputPath);

	return outputPath;
}
