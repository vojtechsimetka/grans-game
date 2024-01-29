export interface Cell {
	value: string
	checked: boolean
	correct: boolean
	wrong: boolean
	alreadyFound: boolean
	neighbors: Cell[]
}

export interface Board {
	board: string[]
	words: string[]
}
