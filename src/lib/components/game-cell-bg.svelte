<script lang="ts">
	import { cells } from './cells'

	interface Props {
		index: number
	}

	const { index } = $props<Props>()
</script>

<path d={cells[index].path} />

<style>
	path {
		fill: white;
		stroke: black;
		stroke-width: 1;
	}
</style>
