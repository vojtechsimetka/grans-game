import type { Cell } from '$lib/types'

const scores: Record<number, number> = {
	3: 1,
	4: 2,
	5: 3,
	6: 5,
	7: 8,
	8: 13,
	9: 21,
	10: 34,
	11: 55,
	12: 89,
	13: 144,
	14: 233,
	15: 377,
	16: 610,
	17: 987,
	18: 1597,
	19: 2584,
}

export interface BoardStore {
	cells: Cell[]
	selectedCells: Cell[]
	score: number
	foundWords: string[]
	checkCell: (cell: Cell) => void
	finalizeSelection: () => void
}

export function withBoardStore(letters: string[], words: string[]): BoardStore {
	if (letters.length !== 19) {
		throw new Error('Board must have 19 cells')
	}

	let cells = $state<Cell[]>([])
	let selectedCells = $state<Cell[]>([])
	let score = $state<number>(0)
	const foundWords = $state<string[]>([])

	cells = letters.map((value) => ({
		value,
		checked: false,
		correct: false,
		wrong: false,
		alreadyFound: false,
		neighbors: [],
	}))

	// Link the cells together
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

	function checkCell(cell: Cell) {
		const last = selectedCells[selectedCells.length - 1]
		const secondToLast = selectedCells[selectedCells.length - 2]
		if (secondToLast === cell) {
			selectedCells.pop()
			last.checked = false
		}

		if (!cell.checked && (selectedCells.length === 0 || last?.neighbors.includes(cell))) {
			if (selectedCells.length === 0) {
				cells.forEach((cell) => {
					cell.checked = false
					cell.correct = false
					cell.wrong = false
					cell.alreadyFound = false
				})
			}
			cell.checked = true
			selectedCells.push(cell)
		}
	}

	function finalizeSelection() {
		const word = selectedCells.map((cell) => cell.value).join('')

		// This is not a word
		if (!words.includes(word)) {
			selectedCells.forEach((cell) => {
				cell.checked = false
				cell.correct = false
				cell.wrong = true
				cell.alreadyFound = false
			})
		}

		// This word has already been found
		else if (foundWords.includes(word)) {
			selectedCells.forEach((cell) => {
				cell.checked = false
				cell.correct = false
				cell.wrong = false
				cell.alreadyFound = true
			})
		}

		// This is a new word
		else {
			selectedCells.forEach((cell) => {
				cell.checked = false
				cell.correct = true
				cell.wrong = false
				cell.alreadyFound = false
			})
			score = score + scores[selectedCells.length] ?? 0
			foundWords.push(word)
		}
		selectedCells = []
	}

	return {
		get cells() {
			return cells
		},
		get selectedCells() {
			return selectedCells
		},
		get score() {
			return score
		},
		get foundWords() {
			return foundWords
		},
		checkCell,
		finalizeSelection,
	}
}
