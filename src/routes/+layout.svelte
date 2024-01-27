<script lang="ts">
	import { onMount } from 'svelte'
	import '../style.css'
	import type { Telegram as TelegramType } from '@twa-dev/types'

	let Telegram: TelegramType

	onMount(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		Telegram = (window as any).Telegram
		// Initialize Telegram WebApp
		Telegram.WebApp.ready()

		// Not open within Telegram
		if (!Telegram.WebApp.platform || Telegram.WebApp.platform === 'unknown') return

		// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
		Telegram.WebApp.onEvent('themeChanged', function () {
			document.documentElement.className = Telegram.WebApp.colorScheme
		})

		Telegram.WebApp.setHeaderColor('secondary_bg_color')

		Telegram.WebApp.onEvent('themeChanged', function () {
			document.body.setAttribute('style', '--bg-color:' + Telegram.WebApp.backgroundColor)
		})

		Telegram.WebApp.expand()
		Telegram.WebApp.enableClosingConfirmation()

		// FIXME: once telegram mini-app is not closed on scroll down this can be removed
		if (Telegram.WebApp.platform === 'ios' || Telegram.WebApp.platform === 'android')
			endOfPage.scrollIntoView({ behavior: 'instant' })
	})

	let endOfPage: HTMLDivElement
</script>

<!-- FIXME: once telegram mini-app is not closed on scroll down this can be removed -->
{#if Telegram?.WebApp.platform === 'ios' || Telegram?.WebApp.platform === 'android'}
	<div class="hack" on:touchend={() => endOfPage.scrollIntoView({ behavior: 'instant' })}>
		<slot />
	</div>
	<div class="end-of-page" bind:this={endOfPage} />
{:else}
	<slot />
{/if}

<style>
	.hack {
		height: 500vh;
		width: 100vw;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	.hack::-webkit-scrollbar {
		display: none;
	}

	.end-of-page {
		height: 100vh;
		width: 100vw;
	}
</style>
