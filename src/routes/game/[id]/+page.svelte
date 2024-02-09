<script lang="ts">
	import { GameBoard } from '$lib/engine/game-board'
	import GameBoardComponent from '$lib/components/game-board.svelte'
	import { onDestroy, onMount } from 'svelte'
	import boards from '$lib/data/boards.json'
	import { Random } from '$lib/engine/utils'
	import { _ } from 'svelte-i18n'

	interface Props {
		seed: number
	}

	const { seed } = $props<Props>()

	const gameDuration = 150000
	let timer: ReturnType<typeof setInterval> | undefined = $state()
	let gameTime = $state(gameDuration)
	let randomBoard = boards[Math.floor((new Random(seed).next() * boards.length) % boards.length)]
	let gameBoard: GameBoard = $state(new GameBoard(randomBoard.board, randomBoard.words))

	$effect(() => {
		$inspect(gameBoard)
	})

	onMount(() => {
		// Calculate how long to wait until the next even minute
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

<div class="wrapper">
	<h1>{`Word Search`}</h1>
	<div class="score">
		<div>
			{`Time`}:
			{new Date(gameTime).toISOString().substr(14, 5)}
		</div>
		<div>
			{`Score`}:
			{gameBoard.score}
		</div>
	</div>
</div>
<GameBoardComponent bind:gameBoard />
<ul>
	<li class:transparent={gameBoard.selectedCells.length === 0 && gameBoard.foundWords.size !== 0}>
		{gameBoard.selectedCells.length > 0
			? gameBoard.selectedCells.map((c) => c.value).join('')
			: gameBoard.foundWords.size === 0
				? 'Create a word...'
				: '_______'}
	</li>
	{#each Array.from(gameBoard.foundWords).slice(-10).reverse() as word}
		<li>{word}</li>
	{/each}
</ul>

<style>
	img {
		max-height: 300px;
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
</style>
