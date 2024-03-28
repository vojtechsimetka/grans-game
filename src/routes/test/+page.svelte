<script lang="ts">
	import dic from 'dictionary-cs/index.dic?raw'
	type Count = {
		[key: string | number]: number
	}

	const minLength = 3
	const maxLength = 19
	const words = dic
		.split('\n')
		.filter((item) => !/^(\s|\p{Lu}|\p{N})/u.test(item))
		.map((item) => item.replace(/\/.*$/, ''))
		.filter((item) => item.length >= minLength && item.length <= maxLength)
	const lengths: Count = {}
	words.forEach((item) => {
		const len = item.length
		if (!lengths[len]) lengths[len] = 0
		lengths[len]++
	})

	// Find the longest word
	let longest = ''
	words.forEach((item) => {
		if (item.length > longest.length) longest = item
	})
</script>

<div>
	<p>Nejdelsi slovo: {longest} ({longest.length} znaku)</p>
	<p>Celkovy pocet slov {words.length}</p>
	Pocet slov podle delky:
	{#each Object.keys(lengths) as len}
		<div>- {len}: {lengths[len]}</div>
	{/each}
	<!-- {#each words.filter(s => s.length === 9) as w}
        <div>{w}</div>
    {/each} -->
</div>
