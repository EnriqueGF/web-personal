import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Colección de entradas del blog.
 * Cada post es un archivo .md o .mdx en src/content/blog/
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
    // Idioma de la entrada. Las versiones en inglés viven en la subcarpeta en/.
    lang: z.enum(['es', 'en']).default('es'),
  }),
});

/**
 * Colección de proyectos del portfolio.
 * Cada proyecto es un archivo .md o .mdx en src/content/projects/
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Orden de aparición (menor = primero) y destacado en la home.
    order: z.number().default(0),
    featured: z.boolean().default(false),
    tech: z.array(z.string()).default([]),
    year: z.number().optional(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
    // Idioma de la ficha. Las versiones en inglés viven en la subcarpeta en/.
    lang: z.enum(['es', 'en']).default('es'),
  }),
});

export const collections = { blog, projects };
