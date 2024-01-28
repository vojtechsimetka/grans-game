// pseudo random generator splitmix32
// original source https://github.com/bryc/code/blob/master/jshash/PRNGs.md
// the ideas is to get the fastest possible PRNG that is good enough for the game
// we do want to be able to reproduce the same results for the same seed to test the game in CI
export class Random {
	constructor(private seed: number = 0) {}

	next(): number {
		this.seed = (this.seed + 0x9e3779b9) | 0
		let t = this.seed ^ (this.seed >>> 16)
		t = Math.imul(t, 0x21f0aaad)
		t = t ^ (t >>> 15)
		t = Math.imul(t, 0x735a2d97)
		t = t ^ (t >>> 15)
		return (t >>> 0) / 4294967296
	}
}
