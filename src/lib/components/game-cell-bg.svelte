<script lang="ts">
	import { cells } from './cells'

	export let index: number
</script>

<path d={cells[index].path} />

<style>
	path {
		fill: white;
		stroke: black;
		stroke-width: 1;
	}
</style>
