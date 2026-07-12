// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import { defineConfig } from 'astro/config';

/**
 * Markdown convention: give an image the title "white-bg" — e.g.
 *   ![alt](./diagram.png "white-bg")
 * — and it renders with a white backing (class img-white-bg, styled in
 * src/styles/global.css). For transparent diagrams authored for light
 * backgrounds that would otherwise vanish on the dark theme.
 */
function rehypeWhiteBg() {
	/** @param {any} node */
	const visit = (node) => {
		if (node.tagName === 'img' && node.properties?.title === 'white-bg') {
			delete node.properties.title;
			node.properties.className = [...(node.properties.className ?? []), 'img-white-bg'];
		}
		for (const child of node.children ?? []) visit(child);
	};
	return (/** @type {any} */ tree) => visit(tree);
}

// https://astro.build/config
export default defineConfig({
	site: 'https://tahabasri.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		rehypePlugins: [rehypeWhiteBg],
	},
	vite: {
		plugins: [yaml()],
	},
});
