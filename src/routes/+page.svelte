<script lang="ts">
	import { _ } from 'svelte-i18n'
</script>

<ul>
	<li><a href={`/game/${Date.now()}`}>{$_('home.new-game')}</a></li>
	<li><a href={`/game/stats`}>{$_('home.stats')}</a></li>
	<li><a href={`/game/settings`}>{$_('home.settings')}</a></li>
	<li><a href={`/game/about`}>{$_('home.about')}</a></li>
</ul>
