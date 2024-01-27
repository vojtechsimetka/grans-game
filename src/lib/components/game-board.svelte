<script lang="ts">
	import type { Cell } from '$lib/types'
	import GameCell from './game-cell.svelte'
	import GameCellBg from './game-cell-bg.svelte'
	import { GameBoard } from '$lib/engine/game-board'

	let gameBoard = new GameBoard([
		'a',
		'p',
		'o',
		'l',
		'p',
		's',
		'a',
		'l',
		'e',
		'a',
		'p',
		'o',
		'l',
		'p',
		's',
		'a',
		'l',
		'e',
		'a',
	])

	let isMouseDown = false

	function onmouseup() {
		msg = gameBoard.selectedCells.map((c) => c.value).join('')
		isMouseDown = false
		gameBoard.finalizeSelection()
		gameBoard = gameBoard
	}

	function onmouseenter(cell: Cell) {
		if (isMouseDown) {
			const last = gameBoard.selectedCells[gameBoard.selectedCells.length - 1]
			const secondToLast = gameBoard.selectedCells[gameBoard.selectedCells.length - 2]
			if (secondToLast === cell) {
				gameBoard.removeCellFromSelection(last)
				gameBoard = gameBoard
			}

			if (
				!cell.checked &&
				(gameBoard.selectedCells.length === 0 || last?.neighbors.includes(cell))
			) {
				gameBoard.addCellToSelection(cell)
				gameBoard = gameBoard
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
					const cell = gameBoard.cells[parseInt(g.id)]
					if (cell) {
						onmouseenter(cell)
					}
				} catch (error) {
					console.error(error)
				}
			}
		}
	}

	let msg = 'hello'
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
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
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each gameBoard.cells as _, index}
			<GameCellBg {index} />
		{/each}
		{#each gameBoard.cells as cell, index}
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

		/* FIXME: once telegram mini-app is not closed on scroll down this can be removed */
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}
</style>
