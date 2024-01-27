import { describe, it, expect, beforeEach } from 'vitest'

import { GameBoard } from './game-board'

const letters = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
]

describe('constructor(...)', () => {
	it('should create a board with 19 cells', () => {
		const board = new GameBoard(letters)
		expect(board.cells.length).toBe(19)
	})
	it('should throw exception if amount of letters is less than 19', () => {
		expect(() => new GameBoard(['1', '2'])).toThrowError()
	})
	it('should throw exception if amount of letters is more than 19', () => {
		expect(
			() =>
				new GameBoard([
					'1',
					'2',
					'3',
					'4',
					'5',
					'6',
					'7',
					'8',
					'9',
					'10',
					'11',
					'12',
					'13',
					'14',
					'15',
					'16',
					'17',
					'18',
					'19',
					'20',
				]),
		).toThrowError()
	})
})

describe('.selectedCells', () => {
	let board: GameBoard
	beforeEach(() => {
		board = new GameBoard(letters)
	})
	it('should return an empty list of selected cells', () => {
		expect(board.selectedCells.length).toBe(0)
	})
	it('should add one cell and return a list with one cell', () => {
		board.addCellToSelection(board.cells[0])
		expect(board.selectedCells.length).toBe(1)
		expect(board.selectedCells).toEqual(expect.arrayContaining([board.cells[0]]))
	})
	it('should add two cells and return a list with two cells', () => {
		board.addCellToSelection(board.cells[0])
		board.addCellToSelection(board.cells[1])
		expect(board.selectedCells.length).toBe(2)
		expect(board.selectedCells).toEqual(expect.arrayContaining([board.cells[0], board.cells[1]]))
	})
	it('should add two cells and remove one cell and return a list with one cell', () => {
		board.addCellToSelection(board.cells[0])
		board.addCellToSelection(board.cells[1])
		board.removeCellFromSelection(board.cells[0])
		expect(board.selectedCells.length).toBe(1)
		expect(board.selectedCells).toEqual(expect.arrayContaining([board.cells[1]]))
	})
})
