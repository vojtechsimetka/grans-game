<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { ArrowLeft } from 'carbon-icons-svelte'
	import Button from '$lib/components/ui/button.svelte'
</script>

<ul>
	<li><Button variant="ghost" href={`/`}><ArrowLeft />{$_('stats.back')}</Button></li>
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
