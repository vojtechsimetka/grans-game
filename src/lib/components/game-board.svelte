<script lang="ts">
	import type { Cell } from '$lib/types'
	import GameCell from './game-cell.svelte'
	import GameCellBg from './game-cell-bg.svelte'

	let cells: Cell[] = [
		{
			value: 'a',
			checked: false,
			neighbors: [],
			path: 'M129.999,74.617 L99.998,91.694 L69.997,74.617 L69.997,40.464 L99.998,23.387 L129.999,40.464 z',
			transform: 'matrix(1, 0, 0, 1, 99.998, 57.54)',
		},
		{
			value: 'p',
			checked: false,
			neighbors: [],
			path: 'M190.001,74.617 L160,91.694 L129.999,74.617 L129.999,40.464 L160,23.387 L190.001,40.464 z',
			transform: 'matrix(1, 0, 0, 1, 160, 57.54)',
		},
		{
			value: 'o',
			checked: false,
			neighbors: [],
			path: 'M250.003,74.617 L220.002,91.694 L190.001,74.617 L190.001,40.464 L220.002,23.387 L250.003,40.464 z',
			transform: 'matrix(1, 0, 0, 1, 220.002, 57.54)',
		},
		{
			value: 'l',
			checked: false,
			neighbors: [],
			path: 'M99.998,125.847 L69.997,142.923 L39.996,125.847 L39.996,91.694 L69.997,74.617 L99.998,91.694 z',
			transform: 'matrix(1, 0, 0, 1, 69.997, 108.77)',
		},
		{
			value: 'p',
			checked: false,
			neighbors: [],
			path: 'M160,125.847 L129.999,142.923 L99.998,125.847 L99.998,91.694 L129.999,74.617 L160,91.694 z',
			transform: 'matrix(1, 0, 0, 1, 129.999, 108.77)',
		},
		{
			value: 's',
			checked: false,
			neighbors: [],
			path: 'M220.002,125.847 L190.001,142.923 L160,125.847 L160,91.694 L190.001,74.617 L220.002,91.694 z',
			transform: 'matrix(1, 0, 0, 1, 190.001, 108.77)',
		},
		{
			value: 'a',
			checked: false,
			neighbors: [],
			path: 'M280.004,125.847 L250.003,142.923 L220.002,125.847 L220.002,91.694 L250.003,74.617 L280.004,91.694 z',
			transform: 'matrix(1, 0, 0, 1, 250.003, 108.77)',
		},
		{
			value: 'l',
			checked: false,
			neighbors: [],
			path: 'M69.997,177.077 L39.996,194.153 L9.995,177.077 L9.995,142.923 L39.996,125.847 L69.997,142.923 z',
			transform: 'matrix(1, 0, 0, 1, 39.996, 160)',
		},
		{
			value: 'e',
			checked: false,
			neighbors: [],
			path: 'M129.999,177.077 L99.998,194.153 L69.997,177.077 L69.997,142.923 L99.998,125.847 L129.999,142.923 z',
			transform: 'matrix(1, 0, 0, 1, 99.998, 160)',
		},
		{
			value: 'a',
			checked: false,
			neighbors: [],
			path: 'M190.001,177.077 L160,194.153 L129.999,177.077 L129.999,142.923 L160,125.847 L190.001,142.923 z',
			transform: 'matrix(1, 0, 0, 1, 160, 160)',
		},
		{
			value: 'p',
			checked: false,
			neighbors: [],
			path: 'M250.003,177.077 L220.002,194.153 L190.001,177.077 L190.001,142.923 L220.002,125.847 L250.003,142.923 z',
			transform: 'matrix(1, 0, 0, 1, 220.002, 160)',
		},
		{
			value: 'o',
			checked: false,
			neighbors: [],
			path: 'M310.005,177.077 L280.004,194.153 L250.003,177.077 L250.003,142.923 L280.004,125.847 L310.005,142.923 z',
			transform: 'matrix(1, 0, 0, 1, 280.004, 160)',
		},
		{
			value: 'p',
			checked: false,
			neighbors: [],
			path: 'M99.998,194.153 L69.997,177.077 L39.996,194.153 L39.996,228.307 L69.997,245.383 L99.998,228.307 z',
			transform: 'matrix(1, 0, 0, 1, 69.997, 211.23)',
		},
		{
			value: 'l',
			checked: false,
			neighbors: [],
			path: 'M160,194.153 L129.999,177.077 L99.998,194.153 L99.998,228.307 L129.999,245.383 L160,228.307 z',
			transform: 'matrix(1, 0, 0, 1, 129.999, 211.23)',
		},
		{
			value: 'p',
			checked: false,
			neighbors: [],
			path: 'M220.002,194.153 L190.001,177.077 L160,194.153 L160,228.307 L190.001,245.383 L220.002,228.307 z',
			transform: 'matrix(1, 0, 0, 1, 190.001, 211.23)',
		},
		{
			value: 'a',
			checked: false,
			neighbors: [],
			path: 'M280.004,194.153 L250.003,177.077 L220.002,194.153 L220.002,228.307 L250.003,245.383 L280.004,228.307 z',
			transform: 'matrix(1, 0, 0, 1, 250.003, 211.23)',
		},
		{
			value: 'c',
			checked: false,
			neighbors: [],
			path: 'M129.999,245.383 L99.998,228.307 L69.997,245.383 L69.997,279.536 L99.998,296.613 L129.999,279.536 z',
			transform: 'matrix(1, 0, 0, 1, 99.998, 262.46)',
		},
		{
			value: 'e',
			checked: false,
			neighbors: [],
			path: 'M190.001,245.383 L160,228.307 L129.999,245.383 L129.999,279.536 L160,296.613 L190.001,279.536 z',
			transform: 'matrix(1, 0, 0, 1, 160, 262.46)',
		},
		{
			value: 'c',
			checked: false,
			neighbors: [],
			path: 'M250.003,245.383 L220.002,228.307 L190.001,245.383 L190.001,279.536 L220.002,296.613 L250.003,279.536 z',
			transform: 'matrix(1, 0, 0, 1, 220.002, 262.46)',
		},
	]
	cells[0].neighbors = [cells[1], cells[3], cells[4]]
	cells[1].neighbors = [cells[0], cells[2], cells[4], cells[5]]
	cells[2].neighbors = [cells[1], cells[5], cells[6]]
	cells[3].neighbors = [cells[0], cells[4], cells[7], cells[8]]
	cells[4].neighbors = [cells[0], cells[1], cells[3], cells[5], cells[8], cells[9]]
	cells[5].neighbors = [cells[1], cells[2], cells[4], cells[6], cells[9], cells[10]]
	cells[6].neighbors = [cells[2], cells[5], cells[10], cells[11]]
	cells[7].neighbors = [cells[3], cells[8], cells[12]]
	cells[8].neighbors = [cells[3], cells[4], cells[7], cells[9], cells[12], cells[13]]
	cells[9].neighbors = [cells[4], cells[5], cells[8], cells[10], cells[13], cells[14]]
	cells[10].neighbors = [cells[5], cells[6], cells[9], cells[11], cells[14], cells[15]]
	cells[11].neighbors = [cells[6], cells[10], cells[15]]
	cells[12].neighbors = [cells[7], cells[8], cells[13], cells[16]]
	cells[13].neighbors = [cells[9], cells[8], cells[12], cells[14], cells[17], cells[16]]
	cells[14].neighbors = [cells[13], cells[9], cells[10], cells[15], cells[18], cells[17]]
	cells[15].neighbors = [cells[18], cells[14], cells[10], cells[11]]
	cells[16].neighbors = [cells[12], cells[13], cells[17]]
	cells[17].neighbors = [cells[16], cells[13], cells[14], cells[18]]
	cells[18].neighbors = [cells[17], cells[14], cells[15]]
	cells = cells

	let selectedCells: Cell[] = []

	let isMouseDown = false

	function onmouseup() {
		msg = selectedCells.map((c) => c.value).join('')
		isMouseDown = false
		for (let cell of cells) {
			cell.checked = false
		}
		cells = cells
		selectedCells = []
	}

	function removeCell(cell: Cell) {
		selectedCells = selectedCells.filter((c) => c !== cell)
		cell.checked = false
		cells = cells
	}

	function addCell(cell: Cell) {
		selectedCells.push(cell)
		cell.checked = true
		cells = cells
	}

	function onmouseenter(cell: Cell) {
		if (isMouseDown) {
			const last = selectedCells[selectedCells.length - 1]
			const secondToLast = selectedCells[selectedCells.length - 2]
			if (secondToLast === cell) {
				removeCell(last)
			}

			if (!cell.checked && (selectedCells.length === 0 || last?.neighbors.includes(cell))) {
				addCell(cell)
			}
		}
	}

	function onmousedown(cell: Cell) {
		isMouseDown = true
		if (cell) {
			onmouseenter(cell)
		}
	}

	function handleTouchMove(event: TouchEvent) {
		isMouseDown = true

		event.preventDefault()
		const touch = event.touches[0]

		// Get the element at the touch position
		const elementAtTouch = document.elementFromPoint(touch.clientX, touch.clientY)

		// Check if the element or its parent is one of your SVG `g` elements
		if (elementAtTouch) {
			let g: Element | null = elementAtTouch
			if (elementAtTouch.tagName !== 'g') g = elementAtTouch.closest('g')

			if (g) {
				try {
					const cell = cells[parseInt(g.id)]
					if (cell) {
						onmouseenter(cell)
					}
				} catch (error) {}
			}
		}
	}

	let msg = 'hello'
</script>

<div class="wrapper" on:mouseup={onmouseup} on:touchend={onmouseup}>
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0"
		y="0"
		width="100%"
		height="100%"
		viewBox="0, 0, 320, 320"
		on:touchmove={handleTouchMove}
	>
		{#each cells as cell}
			<GameCellBg {...cell} />
		{/each}
		{#each cells as cell, index}
			<GameCell
				{...cell}
				{index}
				on:mouseenter={(e) => {
					e.preventDefault()
					onmouseenter(cell)
				}}
				on:mousedown={(e) => {
					e.preventDefault()
					onmousedown(cell)
				}}
				on:touchstart={(e) => {
					e.preventDefault()
					onmousedown(cell)
				}}
			/>
		{/each}
	</svg>
	<div style="widht: 100%; height: 50px;">
		{msg}
	</div>
</div>

<style>
	svg {
		user-select: none;
		-webkit-user-select: none; /* Chrome/Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE/Edge */
		user-select: none; /* Standard syntax */
		-webkit-touch-callout: none; /* iOS Safari */
	}

	.wrapper {
		width: 100vw;
		height: 100vh;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
