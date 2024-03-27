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
		fill: var(--color-base);
		stroke: var(--color-ultra-high);
		stroke-width: 1;
	}
</style>
