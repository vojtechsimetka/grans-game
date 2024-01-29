<script lang="ts">
	import { cells } from './cells'

	export let index: number
	export let value: string
	export let checked: boolean = false
	export let correct: boolean = false
	export let wrong: boolean = false
	export let alreadyFound: boolean = false
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<g
	class="cell"
	class:checked
	class:correct
	class:wrong
	class:alreadyFound
	on:mouseenter|preventDefault|nonpassive
	on:mouseleave|preventDefault|nonpassive
	on:mousedown|preventDefault|nonpassive
	id={index.toFixed()}
>
	<path class="bg" d={cells[index].path} />
	<text transform={cells[index].transform}>
		<tspan y="12.804">
			{value.toUpperCase()}
		</tspan>
	</text>
	<path class="fg" d={cells[index].path} />
</g>

<style>
	text {
		text-anchor: middle;
		font-family: Arial;
		font-weight: bold;
		font-size: 33px;
		fill: #000000;
	}
	.cell {
		cursor: pointer;
	}
	g.wrong path.bg {
		fill: #f9a9a2;
	}
	g.correct path.bg {
		fill: #a2f9a8;
	}
	g.checked path.bg {
		fill: #a2bbf9;
	}
	g.alreadyFound path.bg {
		fill: #f9f5a2;
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
