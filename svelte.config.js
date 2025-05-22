import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing image errors
				if (path.startsWith('/images/') && message.includes('404')) {
					console.warn(`[Prerender] Ignoring missing image: ${path}`);
					return;
				}
				// Otherwise, throw the error
				throw new Error(message);
			}
		}
	}
};

export default config; 