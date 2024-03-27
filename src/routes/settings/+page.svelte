<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { getContext } from 'svelte'

	import Language from '$lib/components/language.svelte'
	import Button from '$lib/components/ui/button.svelte'

	import type { ThemeStore } from '$lib/stores/theme.svelte'
	import { darkModeOptions } from '$lib/types'

	const themeStore = getContext<ThemeStore>('theme-store')
</script>

<ul>
	<li><Language /></li>
	<li>
		<select bind:value={themeStore.darkModeSettings}>
			{#each darkModeOptions as mode}
				<option value={mode}>{mode}</option>
			{/each}
		</select>
	</li>
	<li class="spacer"></li>
	<li><Button variant="ghost" href="/">{$_('settings.back')}</Button></li>
</ul>

<style lang="scss">
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

	.spacer {
		width: 1px;
		height: 2rem;
	}
</style>
