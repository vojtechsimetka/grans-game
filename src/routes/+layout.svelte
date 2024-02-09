<script lang="ts">
	import '../style.css'
</script>

<div class="page">
	<slot />
</div>

<style>
	.page {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}
</style>
