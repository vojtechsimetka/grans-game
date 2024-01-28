export interface Cell {
	value: string
	checked: boolean
	neighbors: Cell[]
}

export interface Board {
	board: string[]
	words: string[]
}
