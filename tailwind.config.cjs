const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [
		require('flowbite/plugin'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms')
	],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				// primary: {
				// 	50: '#FFF5F2',
				// 	100: '#FFF1EE',
				// 	200: '#FFE4DE',
				// 	300: '#FFD5CC',
				// 	400: '#FFBCAD',
				// 	500: '#FE795D',
				// 	600: '#EF562F',
				// 	700: '#EB4F27',
				// 	800: '#CC4522',
				// 	900: '#A5371B'
				// },
				primary: {
					50: '#e1faff',
					100: '#cbf0ff',
					200: '#9adeff',
					300: '#64cbff',
					400: '#3bbcfe',
					500: '#50A1FF',
					600: '#50A1FF',
					700: '#0097e4',
					800: '#0086cd',
					900: '#0075b5'
				},
				gray: {
					500: '#DCDFDE'
				}
			},
			backdropBlur: {
				xs: '2px'
			}
		}
	}
};

module.exports = config;
