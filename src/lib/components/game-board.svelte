<script lang="ts">
	import type { Cell } from '$lib/types'
	import GameCell from './game-cell.svelte'
	import GameCellBg from './game-cell-bg.svelte'
	import { GameBoard } from '$lib/engine/game-board'
	import { onMount } from 'svelte'

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
		words.add(gameBoard.selectedCells.map((c) => c.value).join(''))
		words = words
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

	let words: Set<string> = new Set<string>()
	let time = 2 * 60
	let timer: NodeJS.Timeout

	onMount(() => {
		timer = setInterval(() => {
			time -= 1
			if (time <= 0) {
				time = 0

				clearInterval(timer)
				var userResponse = confirm(`Game over! Your score is ${gameBoard.score}`)
				if (userResponse) {
					// Refresh the page
					window.location.reload()
				}
			}
		}, 1000)
	})

	$: console.log(gameBoard.selectedCells.length === 0 && words.size !== 0)
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="wrapper"
	on:mouseup|preventDefault|nonpassive={onmouseup}
	on:touchend|preventDefault|nonpassive={onmouseup}
>
	<div class="score">
		<div>Score: {gameBoard.score}</div>
		<div>
			Time: {`${Math.floor(time / 60).toFixed()}:${(time % 60).toFixed().padStart(2, '0')}`}
		</div>
	</div>
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0"
		y="0"
		width="100%"
		viewBox="0, 0, 320, 320"
		on:touchmove|preventDefault|nonpassive={handleTouchMove}
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
					onmouseenter(cell)
				}}
				on:mousedown={(e) => {
					onmousedown(cell)
				}}
				on:touchstart={(e) => {
					onmousedown(cell)
				}}
			/>
		{/each}
	</svg>
	<ul>
		<li class:transparent={gameBoard.selectedCells.length === 0 && words.size !== 0}>
			{gameBoard.selectedCells.length > 0
				? gameBoard.selectedCells.map((c) => c.value).join('')
				: words.size === 0
					? 'Create a word...'
					: '_______'}
		</li>
		{#each Array.from(words).slice(-10).reverse() as word}
			<li>{word}</li>
		{/each}
	</ul>
</div>

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

	.score {
		width: 100vw;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 2rem;
	}
	.score > div {
		padding: 1rem;
	}
</style>
