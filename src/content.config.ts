import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema (see MIGRATION brief §3)
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Original publish date (Medium date preserved on migrated posts)
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			// "sfdefacto" only on sfdefacto-branded posts
			series: z.string().optional(),
			// Original Medium URL, for the record
			mediumUrl: z.string().url().optional(),
			heroImage: z.optional(image()),
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
