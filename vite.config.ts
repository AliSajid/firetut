import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

// eslint-disable-next-line new-cap
const IconsPlugin = Icons({
  compiler: 'svelte',
});

export default defineConfig({
  plugins: [sveltekit(), IconsPlugin],
});
