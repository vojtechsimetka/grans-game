<script lang="ts">
	import { GameBoard } from '$lib/engine/game-board'
	import GameBoardComponent from './game-board.svelte'
	import { onDestroy, onMount } from 'svelte'
	import boards from '$lib/data/boards.json'
	import { Random } from '$lib/engine/utils'
	import logo from '$lib/data/logo.png'

	let state: 'waiting' | 'game' | 'score' = 'waiting'

	let words: Set<string> = new Set<string>()
	let timer: NodeJS.Timeout
	let waitTime = -1
	let gameTime = -1
	let scoreTime = -1
	let nextBoardSeed = Math.ceil(Date.now() / 120000) * 120000
	let thisBoardSeed = nextBoardSeed - 120000
	let randomBoard =
		boards[Math.floor((new Random(thisBoardSeed).next() * boards.length) % boards.length)]
	let gameBoard: GameBoard = new GameBoard(randomBoard.board, randomBoard.words)

	onMount(() => {
		// Calculate how long to wait until the next even minute
		waitTime = Math.ceil(Date.now() / 120000) * 120000 - Date.now()
		gameTime = waitTime - 30 * 1000
		timer = setInterval(() => {
			waitTime -= 1000
			gameTime = waitTime - 30 * 1000
			scoreTime = waitTime - gameTime

			if (waitTime <= 0) {
				waitTime = Math.ceil(Date.now() / 120000) * 120000 - Date.now()
				gameTime = waitTime - 30 * 1000

				nextBoardSeed = Math.ceil(Date.now() / 120000) * 120000
				thisBoardSeed = nextBoardSeed - 120000
				randomBoard =
					boards[Math.floor((new Random(thisBoardSeed).next() * boards.length) % boards.length)]
				gameBoard = new GameBoard(randomBoard.board, randomBoard.words)
				words = new Set<string>()
				state = 'game'
			}

			if (gameTime <= 0 && state === 'game') {
				state = 'score'
			}
		}, 1000)
	})
	onDestroy(() => {
		clearInterval(timer)
	})
</script>

{#if state === 'game'}
	<GameBoardComponent {gameBoard} bind:words {gameTime} />
{:else if state === 'waiting'}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="wrapper" on:mouseup|preventDefault|nonpassive on:touchend|preventDefault|nonpassive>
		<p>You've been invited to play</p>
		<img src={logo} alt="logo" />
		{#if gameTime > 0}
			<h1>There is already a game in process</h1>
			<p>
				Wait {`${Math.floor(waitTime / 60 / 1000).toFixed()}:${((waitTime / 1000) % 60).toFixed().padStart(2, '0')}`}
			</p>
			<button on:click={() => (state = 'game')}>Play anyway</button>
		{:else}
			<h1>
				The game will start soon in {`${Math.floor(waitTime / 60 / 1000).toFixed()}:${((waitTime / 1000) % 60).toFixed().padStart(2, '0')}`}
			</h1>
		{/if}
	</div>
{:else if state === 'score'}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="wrapper" on:mouseup|preventDefault|nonpassive on:touchend|preventDefault|nonpassive>
		<div class="score">
			<div>Final score: {gameBoard.score}</div>
			<div>
				{`${Math.floor(waitTime / 60 / 1000).toFixed()}:${((waitTime / 1000) % 60).toFixed().padStart(2, '0')}`}
			</div>
		</div>
		<ul>
			{#each gameBoard.words as word}
				<li class:found={words.has(word)}>{word}</li>
			{/each}
		</ul>
	</div>
{/if}

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
	}
	li {
		font-size: 1.5rem;
		padding: 0 0.5rem;
	}

	li.found {
		text-decoration: line-through;
		color: #16a220;
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
