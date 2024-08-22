/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'DAmico_blue': '#019fae',
				DAmico_orange: '#dfb500',
				'DAmico_baige_pink': '#c6b5a4',
				'Miro-beige_light': '#dedcc1',
				'Miro-beige_dark': '#dccebf',
				'Miro-mauve_dark': '#577cb3',
				'Miro-orange_brown': '#ca7050',
			},
		},
	},
	plugins: [],
}

