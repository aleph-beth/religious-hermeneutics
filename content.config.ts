import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en', 'fr']),
    pair: z.string(),
    category: z.enum(['hermeneutics', 'philosophy', 'cultural', 'etymology']),
    dossier: z.string().optional(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { en: articles, fr: articles };
