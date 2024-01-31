import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'dictionary-en': path.resolve(__dirname, 'node_modules/dictionary-en'),
			'dictionary-cs': path.resolve(__dirname, 'node_modules/dictionary-cs'),
			'dictionary-de': path.resolve(__dirname, 'node_modules/dictionary-de'),
		},
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
