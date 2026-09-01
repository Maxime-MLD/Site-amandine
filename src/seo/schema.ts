import type { SchemaObject } from './types';

/**
 * JSON-LD helpers will be added once the professional information is validated.
 * Keeping this typed entry point avoids coupling future schemas to page files.
 */
export function defineSchema<T extends SchemaObject>(schema: T): T {
	return schema;
}
