<script lang="ts">
	import '../style.css'
	import Theme from '$lib/components/ui/theme.svelte'
</script>

<Theme>
	<div class="page">
		<slot />
	</div>
</Theme>

<style>
	.page {
		height: 100vh;
		height: 100dvh;
		width: 100vw;
		overflow: hidden;
		background-color: var(--color-base);
		color: var(--color-ultra-high);
	}
</style>
