import { defineConfig } from 'astro/config';
import remarkCustomHeadingId from 'remark-custom-heading-id';

export default defineConfig({
  site: 'https://aleph-beth.github.io',
  base: '/',
  output: 'static',
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  markdown: {
    remarkPlugins: [remarkCustomHeadingId],
  },
});
