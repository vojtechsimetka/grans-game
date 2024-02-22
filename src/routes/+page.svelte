<script lang="ts">
	import { _, t } from 'svelte-i18n'
	import { getContext } from 'svelte'
	import type { ThemeStore } from '$lib/stores/theme.svelte'

	const themeStore = getContext<ThemeStore>('theme-store')

	$inspect(themeStore.baseColor, themeStore.darkModeSettings)

	const seed = Math.round(Date.now() / 60000)
</script>

<ul>
	<li><a href={`/game/${Date.now()}`}>{$_('home.new-game')}</a></li>
	<li><a href={`/stats`}>{$_('home.stats')}</a></li>
	<li><a href={`/settings`}>{$_('home.settings')}</a></li>
	<li><a href={`/about`}>{$_('home.about')}</a></li>
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	li {
		margin: 0;
	}

	a {
		color: var(--paragraph-color);
		font-family: var(--paragraph-font-family);
		font-size: var(--paragraph-font-size);
		font-style: var(--paragraph-font-style);
		font-weight: var(--paragraph-font-weight);
		line-height: var(--paragraph-line-height);
		letter-spacing: var(--paragraph-letter-spacing);
		text-decoration: none;
		cursor: pointer;
		padding: 8px;
		display: block;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
