import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0',
		strictPort: false,
	},
	preview: {
		host: '0.0.0.0',
		port: 4545,
		strictPort: false,
		allowedHosts: [
			'localhost',
			'test.wasaw.com',
			'wasaw.com',
			'.wasaw.com'  // This should match all subdomains
		]
	}
}); 