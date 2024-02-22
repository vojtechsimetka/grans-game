<script lang="ts">
	import type { Cell } from '$lib/types'
	import GameCell from './game-cell.svelte'
	import GameCellBg from './game-cell-bg.svelte'
	import { onDestroy, onMount } from 'svelte'

	interface Props {
		cells: Cell[]
		checkCell: (cell: Cell) => void
		finalizeSelection: () => void
	}
	let { cells, finalizeSelection, checkCell } = $props<Props>()

	let isMouseDown = $state(false)

	function onmouseup() {
		isMouseDown = false
		finalizeSelection()
	}

	function onmouseenter(cell: Cell) {
		if (isMouseDown) {
			checkCell(cell)
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
				} catch (error) {
					console.error(error)
				}
			}
		}
	}

	onMount(() => {
		document.addEventListener('touchend', onmouseup, { passive: false })
		document.addEventListener('mouseup', onmouseup, { passive: false })
	})

	onDestroy(() => {
		document.removeEventListener('touchend', onmouseup)
		document.removeEventListener('mouseup', onmouseup)
	})
</script>

<svg
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	x="0"
	y="0"
	height="100%"
	width="100%"
	viewBox="0, 0, 320, 320"
	ontouchmove={handleTouchMove}
>
	{#each cells as _, index}
		<GameCellBg {index} />
	{/each}
	{#each cells as cell, index}
		<GameCell
			onmouseenter={() => {
				onmouseenter(cell)
			}}
			onmousedown={() => {
				onmousedown(cell)
			}}
			ontouchstart={() => {
				onmousedown(cell)
			}}
			{index}
			{...cell}
		>
			{cell.value.toUpperCase()}
		</GameCell>
	{/each}
</svg>

<style>
	svg {
		user-select: none;
		-webkit-user-select: none; /* Chrome/Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE/Edge */
		user-select: none; /* Standard syntax */
		-webkit-touch-callout: none; /* iOS Safari */
		flex-grow: 1;
	}

	ul {
		height: 50%;
		display: flex;
		flex-direction: column;
		list-style: none;
		text-align: center;
	}

	li:nth-child(1) {
		font-size: 2rem;
		opacity: 1;
	}

	li:nth-child(1).transparent {
		opacity: 0;
	}
	li:nth-child(2) {
		font-size: 1.5rem;
		opacity: 0.9;
	}
	li:nth-child(3) {
		font-size: 1.25rem;
		opacity: 0.8;
	}
	li:nth-child(4) {
		font-size: 1.1rem;
		opacity: 0.7;
	}
	li:nth-child(5) {
		font-size: 1rem;
		opacity: 0.6;
	}
	li:nth-child(6) {
		font-size: 0.9rem;
		opacity: 0.5;
	}
	li:nth-child(7) {
		font-size: 0.8rem;
		opacity: 0.4;
	}
	li:nth-child(8) {
		font-size: 0.7rem;
		opacity: 0.3;
	}
	li:nth-child(9) {
		font-size: 0.6rem;
		opacity: 0.2;
	}
	li:nth-child(10) {
		font-size: 0.5rem;
		opacity: 0.1;
	}
	li:nth-child(11) {
		font-size: 0.4rem;
		opacity: 0.01;
	}
</style>
