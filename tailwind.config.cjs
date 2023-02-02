/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'sans': ['system-ui', '-apple-system', 'sans-serif'],
			'mono': ['Menlo', 'Monaco', 'monospace', 'ui-monospace']
		},
	},
	plugins: [],
}
