<script lang="ts">
	import { cells } from './cells'

	export let index: number
	export let value: string
	export let checked: boolean = false
</script>

<g class="cell" class:checked on:mouseenter on:mouseleave on:mousedown id={index.toFixed()}>
	<path class="bg" d={cells[index].path} />
	<text transform={cells[index].transform}>
		<tspan y="12.804" font-family="Arial-BoldMT" font-size="33" fill="#000000">
			{value.toUpperCase()}
		</tspan>
	</text>
	<path class="fg" d={cells[index].path} />
</g>

<style>
	text {
		text-anchor: middle;
	}
	.cell {
		cursor: pointer;
	}
	/* g:hover path.bg, */
	g.checked path.bg {
		fill: #ccc;
		fill-opacity: 0.5;
	}
	g path.bg {
		fill: rgba(255, 255, 255, 0);
		stroke: none;
	}
	g path.fg {
		fill: none;
		stroke: rgba(255, 255, 255, 0);
		stroke-width: 2;
	}
	/* g:hover path.fg, */
	g.checked path.fg {
		stroke: blue;
		stroke-width: 2;
	}
</style>
