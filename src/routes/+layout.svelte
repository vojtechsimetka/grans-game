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
		width: 100vw;
		overflow: hidden;
	}
</style>
