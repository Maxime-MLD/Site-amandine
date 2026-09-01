export type RobotsDirective =
	| 'index, follow'
	| 'noindex, follow'
	| 'noindex, nofollow'
	| 'index, nofollow';

export type SchemaPrimitive = string | number | boolean | null;

export type SchemaValue =
	| SchemaPrimitive
	| SchemaObject
	| readonly SchemaValue[];

export interface SchemaObject {
	readonly [key: string]: SchemaValue;
}

export interface SEOProps {
	title: string;
	description: string;
	canonical?: string;
	image?: string;
	imageAlt?: string;
	robots?: RobotsDirective;
	schema?: SchemaObject | readonly SchemaObject[];
}
