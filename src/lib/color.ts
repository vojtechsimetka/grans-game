import { getClosestColor, hexToRgb } from '@waku-objects/luminance'

interface Color {
	name: string
	luminance: number
}

const lightColorsVars: Color[] = [
	{
		name: '--color-top',
		luminance: 0.01,
	},
	{
		name: '--color-ultra-high',
		luminance: 0.03,
	},
	{
		name: '--color-high',
		luminance: 0.09,
	},
	{
		name: '--color-mid',
		luminance: 0.4,
	},
	{
		name: '--color-low',
		luminance: 0.8,
	},
	{
		name: '--color-ultra-low',
		luminance: 0.95,
	},
	{
		name: '--color-base',
		luminance: 0.99,
	},
]

const darkColorVars: Color[] = [
	{
		name: '--color-top',
		luminance: 0.99,
	},
	{
		name: '--color-ultra-high',
		luminance: 0.85,
	},
	{
		name: '--color-high',
		luminance: 0.45,
	},
	{
		name: '--color-mid',
		luminance: 0.2,
	},
	{
		name: '--color-low',
		luminance: 0.05,
	},
	{
		name: '--color-ultra-low',
		luminance: 0.02,
	},
	{
		name: '--color-base',
		luminance: 0.01,
	},
]

export function changeColors(baseColor: string, isDarkMode: boolean, element: HTMLElement) {
	if (!element) return

	const colors = isDarkMode ? darkColorVars : lightColorsVars

	// Define the correct variant of colors (either dark or light)
	colors.forEach(({ name, luminance }) => {
		const color = getClosestColor(baseColor, luminance)
		const { r, g, b } = hexToRgb(color)
		element.style.setProperty(name, color)
		// FIXME: we likely just need the RGB variant not the hex ones
		element.style.setProperty(`${name}-rgb`, `${r.toFixed()}, ${g.toFixed()}, ${b.toFixed()}`)
	})
}
