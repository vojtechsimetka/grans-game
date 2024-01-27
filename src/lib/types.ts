export interface Cell {
	value: string;
	checked: boolean;
	neighbors: Cell[];
	path: string;
	transform: string;
}
