<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cells } from './cells'

	interface Props extends HTMLAttributes<SVGGElement> {
		index: number
		checked: boolean
		correct: boolean
		wrong: boolean
		alreadyFound: boolean
		count: number
	}

	let {
		index,
		checked = false,
		correct = false,
		wrong = false,
		alreadyFound = false,
		count,
		...restProps
	} = $props<Props>()
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<g
	class="cell"
	class:checked
	class:correct
	class:wrong
	class:alreadyFound
	id={index.toFixed() + count}
	{...restProps}
>
	<path class="bg" d={cells[index].path} />
	<text transform={cells[index].transform}>
		<tspan y="12.804">
			<slot />
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
	g.checked path.fg {
		stroke: blue;
		stroke-width: 2;
	}
</style>
