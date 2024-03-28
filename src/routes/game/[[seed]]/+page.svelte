<script lang="ts">
	import { withBoardStore } from '$lib/engine/game-board.svelte'
	import GameBoardComponent from '$lib/components/game-board.svelte'
	import { onDestroy, onMount } from 'svelte'
	import boards from '$lib/data/boards.json'
	import { Random } from '$lib/engine/utils'
	import { _ } from 'svelte-i18n'
	import { page } from '$app/stores'
	import { get } from 'svelte/store'
	import Button from '$lib/components/ui/button.svelte'
	import { ArrowLeft } from 'carbon-icons-svelte'

	const seed = Number(get(page).params.seed ?? Math.random())

	const gameDuration = 150000
	let timer: ReturnType<typeof setInterval> | undefined = $state()
	let gameTime = $state(gameDuration)
	let randomBoard = boards[Math.floor((new Random(seed).next() * boards.length) % boards.length)]

	const gameBoard = withBoardStore(randomBoard.board, randomBoard.words)

	onMount(() => {
		timer = setInterval(() => {
			gameTime -= 1000
			if (gameTime <= 0) {
				clearInterval(timer)
			}
		}, 1000)
	})
	onDestroy(() => {
		clearInterval(timer)
	})
</script>

<div class="page">
	<div class="wrapper">
		<div class="score">
			<div>
				<Button variant="ghost" href="/"><ArrowLeft />{$_('game.back')}</Button>
			</div>
			<div>
				{$_('game.time')}:
				{new Date(gameTime).toISOString().substring(14, 19)}
			</div>
			<div>
				{$_('game.score')}:
				{gameBoard.score}
			</div>
		</div>
	</div>
	<div class="game">
		<GameBoardComponent
			checkCell={gameBoard.checkCell}
			finalizeSelection={gameBoard.finalizeSelection}
			cells={gameBoard.cells}
		/>
	</div>
	<ul>
		{#if gameBoard.selectedCells.length > 0}
			<li>
				{gameBoard.selectedCells.map((c) => c.value).join('')}
			</li>
		{:else}
			<li class="transparent">_</li>
		{/if}
		{#each gameBoard.foundWords.slice(-10).reverse() as word}
			<li>{word}</li>
		{/each}
	</ul>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}
	.game {
		width: 100%;
		height: 100%;
		max-width: min(90vw, 80vh);
		max-height: min(90vw, 80vh);
		flex-grow: 1;
	}
	h1 {
		text-align: center;
	}
	ul {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		list-style: none;
		text-align: center;
		height: 80vh;
		padding: 0;
	}
	li {
		font-size: 1.5rem;
		padding: 0 0.5rem;
	}

	li.found {
		text-decoration: line-through;
		color: #16a220;
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
	.transparent {
		opacity: 0;
	}
</style>
