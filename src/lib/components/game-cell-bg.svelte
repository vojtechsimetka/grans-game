<script lang="ts">
	import type { Cell } from '$lib/types';

	export let value: string;
	export let neighbors: Cell[];
	export let path: string;
	export let transform: string;
</script>

<path d={path} />

<style>
	path {
		fill: white;
		stroke: black;
		stroke-width: 1;
	}
</style>
