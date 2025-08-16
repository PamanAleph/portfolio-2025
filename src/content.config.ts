import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
	work: defineCollection({
		// Load Markdown files in the src/content/work directory.
		loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			// Support both single image (backward compatibility) and multiple images
			img: z.string().optional(),
			img_alt: z.string().optional(),
			images: z.array(z.object({
				src: z.string(),
				alt: z.string().optional(),
				caption: z.string().optional(),
			})).optional(),
			projectUrl: z.string().optional(),
			githubUrl: z.string().optional(),
		}),
	}),
	blog: defineCollection({
		// Load Markdown files in the src/content/blog directory.
		loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			readTime: z.string().optional(),
			img: z.string().optional(),
			img_alt: z.string().optional(),
			publication: z.string().optional(), // For external publications like Medium, TechCrunch
			externalUrl: z.string().optional(), // Link to external article
		}),
	}),
};
