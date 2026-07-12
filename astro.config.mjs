// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://tahabasri.com',
	integrations: [mdx(), sitemap()],
	vite: {
		plugins: [yaml()],
	},
});
