import type { Cell } from '$lib/types'

const getScore = (length: number) => {
	switch (length) {
		case 3:
			return 1
		case 4:
			return 2
		case 5:
			return 3
		case 6:
			return 5
		case 7:
			return 8
		case 8:
			return 13
		case 9:
			return 21
		case 10:
			return 34
		case 11:
			return 55
		case 12:
			return 89
		case 13:
			return 144
		case 14:
			return 233
		case 15:
			return 377
		case 16:
			return 610
		case 17:
			return 987
		case 18:
			return 1597
		case 19:
			return 2584
		default:
			return 0
	}
}

export class GameBoard {
	cells: Cell[]
	selectedCells: Cell[] = []
	score: number = 0
	words: string[] = []
	foundWords: Set<string> = new Set()

	constructor(letters: string[], words: string[]) {
		if (letters.length !== 19) {
			throw new Error('Board must have 19 cells')
		}

		this.words = words

		this.cells = letters.map((value) => ({
			value,
			checked: false,
			correct: false,
			wrong: false,
			alreadyFound: false,
			neighbors: [],
		}))

		// Link the cells together
		this.cells[0].neighbors = [this.cells[1], this.cells[3], this.cells[4]]
		this.cells[1].neighbors = [this.cells[0], this.cells[2], this.cells[4], this.cells[5]]
		this.cells[2].neighbors = [this.cells[1], this.cells[5], this.cells[6]]
		this.cells[3].neighbors = [this.cells[0], this.cells[4], this.cells[7], this.cells[8]]
		this.cells[4].neighbors = [
			this.cells[0],
			this.cells[1],
			this.cells[3],
			this.cells[5],
			this.cells[8],
			this.cells[9],
		]
		this.cells[5].neighbors = [
			this.cells[1],
			this.cells[2],
			this.cells[4],
			this.cells[6],
			this.cells[9],
			this.cells[10],
		]
		this.cells[6].neighbors = [this.cells[2], this.cells[5], this.cells[10], this.cells[11]]
		this.cells[7].neighbors = [this.cells[3], this.cells[8], this.cells[12]]
		this.cells[8].neighbors = [
			this.cells[3],
			this.cells[4],
			this.cells[7],
			this.cells[9],
			this.cells[12],
			this.cells[13],
		]
		this.cells[9].neighbors = [
			this.cells[4],
			this.cells[5],
			this.cells[8],
			this.cells[10],
			this.cells[13],
			this.cells[14],
		]
		this.cells[10].neighbors = [
			this.cells[5],
			this.cells[6],
			this.cells[9],
			this.cells[11],
			this.cells[14],
			this.cells[15],
		]
		this.cells[11].neighbors = [this.cells[6], this.cells[10], this.cells[15]]
		this.cells[12].neighbors = [this.cells[7], this.cells[8], this.cells[13], this.cells[16]]
		this.cells[13].neighbors = [
			this.cells[9],
			this.cells[8],
			this.cells[12],
			this.cells[14],
			this.cells[17],
			this.cells[16],
		]
		this.cells[14].neighbors = [
			this.cells[13],
			this.cells[9],
			this.cells[10],
			this.cells[15],
			this.cells[18],
			this.cells[17],
		]
		this.cells[15].neighbors = [this.cells[18], this.cells[14], this.cells[10], this.cells[11]]
		this.cells[16].neighbors = [this.cells[12], this.cells[13], this.cells[17]]
		this.cells[17].neighbors = [this.cells[16], this.cells[13], this.cells[14], this.cells[18]]
		this.cells[18].neighbors = [this.cells[17], this.cells[14], this.cells[15]]
	}

	finalizeSelection(): string | undefined {
		const word = this.selectedCells.map((cell) => cell.value).join('')
		if (this.words.includes(word)) {
			if (this.foundWords.has(word)) {
				this.selectedCells.forEach((cell) => {
					cell.checked = false
					cell.correct = false
					cell.wrong = false
					cell.alreadyFound = true
				})
				this.selectedCells = []
				return
			}
			this.score += getScore(this.selectedCells.length)
			this.selectedCells.forEach((cell) => {
				cell.checked = false
				cell.correct = true
				cell.wrong = false
				cell.alreadyFound = false
			})
			this.selectedCells = []
			this.foundWords.add(word)
			return word
		}
		this.selectedCells.forEach((cell) => {
			cell.checked = false
			cell.correct = false
			cell.wrong = true
			cell.alreadyFound = false
		})
		this.selectedCells = []
	}

	removeCellFromSelection(cell: Cell) {
		this.selectedCells = this.selectedCells.filter((c) => c !== cell)
		cell.checked = false
	}

	addCellToSelection(cell: Cell) {
		if (this.selectedCells.length === 0) {
			this.cells.forEach((cell) => {
				cell.checked = false
				cell.correct = false
				cell.wrong = false
				cell.alreadyFound = false
			})
		}
		this.selectedCells.push(cell)
		cell.checked = true
	}
}
