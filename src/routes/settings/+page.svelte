<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { getContext } from 'svelte'
	import { ArrowLeft } from 'carbon-icons-svelte'

	import Language from '$lib/components/language.svelte'
	import Button from '$lib/components/ui/button.svelte'

	import type { ThemeStore } from '$lib/stores/theme.svelte'
	import { darkModeOptions } from '$lib/types'
	import Select from '$lib/components/ui/select.svelte'

	const themeStore = getContext<ThemeStore>('theme-store')
</script>

<ul>
	<li><Language /></li>
	<li>
		<Select
			bind:value={themeStore.darkModeSettings}
			items={darkModeOptions}
			placeholder={$_('settings.theme-label')}
		/>
	</li>
	<li class="spacer"></li>
	<li><Button variant="ghost" href="/"><ArrowLeft />{$_('settings.back')}</Button></li>
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
