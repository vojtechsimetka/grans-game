import type { DarkModeOption } from '$lib/types'
import { onDestroy } from 'svelte'

const isBrowserEnvironment = () => typeof window !== 'undefined'

export interface ThemeStore {
	darkModeSettings: DarkModeOption
	baseColor: string
	isDarkMode: boolean
}

export function withThemeSettingsStore(
	initialBaseColor = '#000000',
	initialDarkModeSetting: DarkModeOption = 'system',
): ThemeStore {
	const prefersDarkModeMediaQuery = isBrowserEnvironment()
		? window.matchMedia('(prefers-color-scheme: dark)')
		: undefined

	let darkModeSettings = $state<DarkModeOption>(initialDarkModeSetting)
	let isSystemDarkMode = $state<boolean>(prefersDarkModeMediaQuery?.matches || false)
	let baseColor = $state<string>(initialBaseColor)
	const isDarkMode = $derived<boolean>(
		darkModeSettings === 'dark' || (darkModeSettings === 'system' && isSystemDarkMode),
	)

	// Function to call when media query status changes
	function evaluateSystemDarkMode(event: MediaQueryListEvent) {
		isSystemDarkMode = event.matches
	}

	// Set up the media query listener immediately
	prefersDarkModeMediaQuery?.addEventListener('change', evaluateSystemDarkMode)

	// Clean up the listener when the store is destroyed
	onDestroy(() => {
		prefersDarkModeMediaQuery?.removeEventListener('change', evaluateSystemDarkMode)
	})

	return {
		set darkModeSettings(newDarkModeSetting: DarkModeOption) {
			darkModeSettings = newDarkModeSetting
		},
		get darkModeSettings() {
			return darkModeSettings
		},
		set baseColor(newColor: string) {
			baseColor = newColor
		},
		get baseColor() {
			return baseColor
		},
		get isDarkMode() {
			return isDarkMode
		},
	}
}
