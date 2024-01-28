import type { Cell } from '$lib/types'

export class GameBoard {
	cells: Cell[]
	selectedCells: Cell[] = []
	score: number = 0
	words: string[] = []

	constructor(letters: string[], words: string[]) {
		if (letters.length !== 19) {
			throw new Error('Board must have 19 cells')
		}

		this.words = words

		this.cells = letters.map((value) => ({
			value,
			checked: false,
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

	finalizeSelection() {
		this.cells.forEach((cell) => {
			cell.checked = false
		})
		this.score += this.selectedCells.length
		this.selectedCells = []
	}

	removeCellFromSelection(cell: Cell) {
		this.selectedCells = this.selectedCells.filter((c) => c !== cell)
		cell.checked = false
	}

	addCellToSelection(cell: Cell) {
		this.selectedCells.push(cell)
		cell.checked = true
	}
}
