<script lang="ts">
	import { _ } from 'svelte-i18n'
	import Button from '$lib/components/ui/button.svelte'

	const seed = Math.round(Date.now() / 60000)
</script>

<ul>
	<li><Button variant="ghost" href={`/game/${seed}`}>{$_('home.new-game')}</Button></li>
	<li><Button variant="ghost" href={`/stats`}>{$_('home.stats')}</Button></li>
	<li><Button variant="ghost" href={`/settings`}>{$_('home.settings')}</Button></li>
	<li><Button variant="ghost" href={`/about`}>{$_('home.about')}</Button></li>
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
</style>
