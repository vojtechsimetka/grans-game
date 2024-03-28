<script lang="ts">
	import { withThemeSettingsStore } from '$lib/stores/theme.svelte'
	import { changeColors } from '$lib/color'
	import type { DarkModeOption } from '$lib/types'
	import { setContext } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import { browser } from '$app/environment'

	type Props = HTMLAttributes<HTMLDivElement>

	let { class: className, ...restProps } = $props<Props>()
	let storeColor: string = '#ffffff'
	let storeMode: DarkModeOption = 'light'
	try {
		if (browser) {
			storeColor = localStorage.getItem('color') ?? '#ffffff'
			storeMode = (localStorage.getItem('mode') as DarkModeOption) ?? 'light'
		}
	} catch (e) {
		console.log(e)
	}
	const themeStore = withThemeSettingsStore(storeColor, storeMode)
	let loading = $state(true)

	setContext('theme-store', themeStore)

	let wrapper = $state<HTMLDivElement>()

	$effect(() => {
		if (browser) {
			localStorage.setItem('color', themeStore.baseColor)
			localStorage.setItem('mode', themeStore.darkModeSettings)
		}
	})

	$effect(() => {
		if (wrapper !== undefined) {
			changeColors(themeStore.baseColor, themeStore.isDarkMode, wrapper)
			loading = false
		}
	})
</script>

<div
	bind:this={wrapper}
	class={`diete-theme ${className}`}
	class:diete-dark={themeStore.isDarkMode}
	{...restProps}
>
	{#if !loading}
		<slot />
	{/if}
</div>

<style lang="scss">
	/* Define everything locally */

	.diete-theme {
		margin: 0;
		padding: 0;

		// h1
		--h1-color: var(--color-ultra-high);
		--h1-font-family: Arial;
		--h1-font-size: 3rem;
		--h1-font-style: normal;
		--h1-font-weight: 700;
		--h1-line-height: 1.16;

		// h2
		--h2-color: var(--color-ultra-high);
		--h2-font-family: Arial;
		--h2-font-size: 2.5rem;
		--h2-font-style: normal;
		--h2-font-weight: 700;
		--h2-line-height: 1.2;

		// h3
		--h3-color: var(--color-ultra-high);
		--h3-font-family: Arial;
		--h3-font-size: 2rem;
		--h3-font-style: normal;
		--h3-font-weight: 700;
		--h3-line-height: 1.25rem;

		// h4
		--h4-color: var(--color-ultra-high);
		--h4-font-family: Arial;
		--h4-font-size: 1.5rem;
		--h4-font-style: normal;
		--h4-font-weight: 700;
		--h4-line-height: 1.33;
		--h4-letter-spacing: 0.03rem;

		// h5
		--h5-color: var(--color-ultra-high);
		--h5-font-family: Arial;
		--h5-font-size: 1rem;
		--h5-font-style: normal;
		--h5-font-weight: 700;
		--h5-line-height: 1.5rem;
		--h5-letter-spacing: 0.02rem;

		// h6
		--h6-color: var(--color-ultra-high);
		--h6-font-family: Arial;
		--h6-font-size: 0.75rem;
		--h6-font-style: normal;
		--h6-font-weight: 700;
		--h6-line-height: 1.33rem;
		--h6-letter-spacing: 0.05rem;

		// Large aragraph
		--large-paragraph-color: var(--color-ultra-high);
		--large-paragraph-font-family: Arial;
		--large-paragraph-font-size: 1.5rem;
		--large-paragraph-font-style: normal;
		--large-paragraph-font-weight: 400;
		--large-paragraph-line-height: 1.33;
		--large-paragraph-letter-spacing: 0.03rem;

		// Paragraph
		--paragraph-color: var(--color-ultra-high);
		--paragraph-font-family: Arial;
		--paragraph-font-size: 1rem;
		--paragraph-font-style: normal;
		--paragraph-font-weight: 400;
		--paragraph-line-height: 1.5;
		--paragraph-letter-spacing: 0.02rem;

		// Small paragraph
		--small-paragraph-color: var(--color-ultra-high);
		--small-paragraph-font-family: Arial;
		--small-paragraph-font-size: 0.75rem;
		--small-paragraph-font-style: normal;
		--small-paragraph-font-weight: 400;
		--small-paragraph-line-height: 1.33;
		--small-paragraph-letter-spacing: 0.05rem;

		--spacing-1: 4px;
		--spacing-2: 8px;
		--spacing-3: 12px;
		--spacing-4: 16px;
		--spacing-5: 20px;
		--spacing-6: 24px;

		--max-width: 498px;

		color: var(--paragraph-color);
		font-size: var(--paragraph-font-size);
		font-weight: var(--paragraph-font-weight);
		font-family: var(--paragraph-font-family);
		line-height: var(--paragraph-line-height);

		:global(h1),
		:global(.h1) {
			font-size: var(--font-size-h1);
			font-weight: var(--font-weight-h1);
			font-family: var(--font-h1);
			line-height: var(--line-height-h1);
			font-style: var(--font-style-h1);
		}

		:global(h2),
		:global(.h2) {
			font-size: var(--font-size-h2);
			font-weight: var(--font-weight-h2);
			font-family: var(--font-h2);
			line-height: var(--line-height-h2);
			font-style: var(--font-style-h2);
		}

		:global(h3),
		:global(.h3) {
			font-size: var(--font-size-h3);
			font-weight: var(--font-weight-h3);
			font-family: var(--font-h3);
			line-height: var(--line-height-h3);
			font-style: var(--font-style-h3);
		}

		:global(h4),
		:global(.h4) {
			font-size: var(--font-size-h4);
			font-weight: var(--font-weight-h4);
			font-family: var(--font-h4);
			line-height: var(--line-height-h4);
			font-style: var(--font-style-h4);
		}

		:global(.ultra-large-sans) {
			font-size: var(--font-size-ultra-large-sans);
			font-weight: var(--font-weight-ultra-large-sans);
			font-family: var(--font-ultra-large-sans);
			line-height: var(--line-height-ultra-large-sans);
			font-style: var(--font-style-ultra-large-sans);
		}

		:global(.large-sans) {
			font-size: var(--font-size-large-sans);
			font-weight: var(--font-weight-large-sans);
			font-family: var(--font-large-sans);
			line-height: var(--line-height-large-sans);
			font-style: var(--font-style-large-sans);
		}

		:global(.sans) {
			font-size: var(--font-size-sans);
			font-weight: var(--font-weight-sans);
			font-family: var(--font-sans);
			line-height: var(--line-height-sans);
		}

		:global(.small-sans) {
			font-size: var(--font-size-small-sans);
			font-weight: var(--font-weight-small-sans);
			font-family: var(--font-small-sans);
			line-height: var(--line-height-small-sans);
		}

		:global(.large-serif) {
			font-size: var(--font-size-large-serif);
			font-weight: var(--font-weight-large-serif);
			font-family: var(--font-large-serif);
			line-height: var(--line-height-large-serif);
			font-style: var(--font-style-large-serif);
		}

		:global(.serif) {
			font-size: var(--font-size-serif);
			font-weight: var(--font-weight-serif);
			font-family: var(--font-serif);
			line-height: var(--line-height-serif);
			font-style: var(--font-style-serif);
		}

		:global(.large-serif-italic) {
			font-size: var(--font-size-large-serif-italic);
			font-weight: var(--font-weight-large-serif-italic);
			font-family: var(--font-large-serif-italic);
			line-height: var(--line-height-large-serif-italic);
			font-style: var(--font-style-large-serif-italic);
		}

		:global(.serif-italic) {
			font-size: var(--font-size-serif-italic);
			font-weight: var(--font-weight-serif-italic);
			font-family: var(--font-serif-italic);
			line-height: var(--line-height-serif-italic);
			font-style: var(--font-style-serif-italic);
		}
	}
</style>
