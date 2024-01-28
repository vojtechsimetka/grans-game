import esbuild from 'esbuild'
import alias from 'esbuild-plugin-alias'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

esbuild
	.build({
		entryPoints: ['src/lib/data/generate.ts'],
		bundle: true,
		outfile: 'dist/generate.js',
		platform: 'node',
		target: 'node20',
		format: 'esm', // Explicitly set the module format to ES modules
		plugins: [
			alias({
				$lib: path.resolve(__dirname, 'src/lib'),
				// other aliases...
			}),
		],
	})
	.catch(() => process.exit(1))
