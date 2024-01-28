import wordlist from './wordlist'
import { GameBoard } from '$lib/engine/game-board'
import type { Board, Cell } from '$lib/types'
import * as fs from 'fs'

type NestedObject = {
	[key: string]: NestedObject | boolean
}

// Goes through the wordlist and creates single object which is a nested tree where the keys are individual letters each level
// contains the next letter in the word. The last level contains the word itself.
function generateBoard(): Board {
	const data: NestedObject = {}
	const possibleLetters: { [key: string]: boolean } = {}

	// Filter out words that are less than 3 letters long
	const list: string[] = wordlist.filter((word) => word.length > 2)
	const longWords = list.filter((word) => word.length > 7)
	list.forEach((word) => {
		word.split('').reduce((acc: NestedObject, letter: string, index: number, arr: string[]) => {
			possibleLetters[letter] = true
			if (!acc[letter]) {
				acc[letter] = {}
			}
			// If this is the last letter, store $=true in this object
			if (index === arr.length - 1) {
				acc[letter] = { $: true }
			}
			return acc[letter] as NestedObject
		}, data)
	})

	const randomLongWord = longWords[Math.floor(Math.random() * longWords.length)]
	const gameBoard = new GameBoard(
		['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
		[],
	)
	const randomIndexStart = Math.floor(Math.random() * gameBoard.cells.length)

	function populateNextCell(cell: Cell, word: string, index: number): boolean {
		cell.value = word[index]

		if (index === word.length - 1) return true

		let neighbors = cell.neighbors.filter((neighbour) => neighbour.value === '')
		if (neighbors.length === 0) {
			cell.value = ''
			return false
		}

		const maxlen = neighbors.length
		for (let i = 0; i < maxlen; i++) {
			const randomNeighbour = neighbors[Math.floor(Math.random() * neighbors.length)]
			neighbors = neighbors.filter((neighbour) => neighbour !== randomNeighbour)
			if (populateNextCell(randomNeighbour, word, index + 1)) {
				return true
			}
		}

		const randomNeighbourIndex = Math.floor(Math.random() * cell.neighbors.length)
		const neighbour = cell.neighbors[randomNeighbourIndex]
		return populateNextCell(neighbour, word, index + 1)
	}

	const cell = gameBoard.cells[randomIndexStart]

	// randomly go through the cell neighbours and try if I can put there the next letter
	const res = populateNextCell(cell, randomLongWord, 0)

	// This should really never happen, but just in case
	if (!res) {
		throw 'Failed to populate the board'
	}

	// Populate the rest of the board with random letters
	gameBoard.cells.forEach((cell) => {
		if (cell.value === '') {
			const randomLetter =
				Object.keys(possibleLetters)[
					Math.floor(Math.random() * Object.keys(possibleLetters).length)
				]
			cell.value = randomLetter
		}
	})

	function findWordsInBoard(board: Cell[], words: NestedObject): string[] {
		const foundWords = new Set<string>()

		function dfs(cell: Cell, node: NestedObject, path: string[]) {
			const letter = cell.value
			const nextNode = node[letter]

			// Ensure nextNode is not a boolean before proceeding
			if (!nextNode || typeof nextNode === 'boolean') {
				return // No further path in the trie
			}

			// Add letter to current path
			path.push(letter)

			if (nextNode['$']) {
				// Found a complete word
				foundWords.add(path.join(''))
			}

			cell.checked = true

			// Explore neighbors
			for (const neighbor of cell.neighbors) {
				if (!neighbor.checked) {
					dfs(neighbor, nextNode, path) // nextNode is already confirmed to be a NestedObject
				}
			}

			// Backtrack
			path.pop()
			cell.checked = false
		}

		// Start DFS from every cell
		for (const cell of board) {
			dfs(cell, words, [])
		}

		return Array.from(foundWords)
	}

	const foundWords: string[] = findWordsInBoard(gameBoard.cells, data)

	const gameSetup: Board = { board: gameBoard.cells.map((cell) => cell.value), words: foundWords }

	return gameSetup
}

function main() {
	// Get command line arguments
	const args = process.argv.slice(2)

	// Check if we have the correct number of arguments
	if (args.length !== 2) {
		console.error('Usage: node script.js <number_of_iterations> <output_directory>')
		process.exit(1)
	}

	const [iterations, outputDir] = args

	// Validate and parse the number of iterations
	const numIterations = parseInt(iterations, 10)
	if (isNaN(numIterations)) {
		console.error('The number of iterations must be a valid integer.')
		process.exit(1)
	}

	// Ensure the output directory exists
	if (!fs.existsSync(outputDir)) {
		console.error(`The directory ${outputDir} does not exist.`)
		process.exit(1)
	}

	const results: Board[] = []

	// Example operation: create files in the output directory
	for (let i = 0; i < numIterations; i++) {
		results.push(generateBoard())
	}

	fs.writeFileSync(`${outputDir}/boards.json`, JSON.stringify(results))
}

main()
