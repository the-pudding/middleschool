<script>
	import { onMount } from "svelte";
	import Kid from "$components/MiddleSchool/MiddleSchool.Kid.svelte";

	export let data;
	export let value;
	export let attribute;
	let oldAttribute = "";
	// data.sort((a, b) => a.id - b.id); // Initial sort by ID
	let positionDataCopy = [];
	let positionLookup = {};

	// Constants for padding and item sizes
	const padding = 10;
	const borderPadding = 40;
	const w = 80;
	const h = 40;
	let cols = 15;
	let rows = 10;
	let items = cols * rows;

	let containerWidth = 0; // Dynamically updated width
	let containerHeight = 0; // Dynamically updated height

	// Helper: Calculate the number of items that fit and their positions
	function calculatePositions() {
		positionDataCopy = [...positionDataCopy].sort((a, b) => {
			if (a[attribute] < b[attribute]) return -1;
			if (a[attribute] > b[attribute]) return 1;
			return 0;
		}) 

		// Ensure sampledData matches the number of items that fit
		

		// Center the grid horizontally
		const gridWidth = cols * (w + padding) - padding;
		const startX = (containerWidth - gridWidth) / 2;

		// Calculate positions for each item
		positionLookup = {}; // Reset position lookup

		positionDataCopy.forEach((d, index) => {
			const row = Math.floor(index / cols);
			const col = index % cols;
			const x = startX + col * (w + padding);
			const y = borderPadding + row * (h + padding);
			const v = d[attribute];
			const speed = 1000 + 2000*Math.random();
			// console.log("attribute: " + attribute)
			// Add to position lookup
			positionLookup[d.id] = { x: x, y: y, w: w, h: h, v: v, speed: speed };
		});
	}

	// Update positions on mount and resize
	onMount(() => {
		handleResize();
	});

	function handleResize() {
	    cols = Math.floor((containerWidth - 2 * borderPadding + padding) / (w + padding));
	    rows = Math.floor((containerHeight - 2 * borderPadding + padding) / (h + padding));
	    items = cols * rows;

	    // Shuffle the data using the Fisher-Yates algorithm
	    const shuffledData = [...data]; // Create a copy of the data
	    for (let i = shuffledData.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
	    }

	    // Take a slice of the shuffled data
	    positionDataCopy = shuffledData.slice(0, items);

	    calculatePositions();
	}


	$: {
		value, attribute;
		calculatePositions();
	}
</script>

<svelte:options runes="{false}" />
<svelte:window on:resize={handleResize} />
<div bind:clientWidth={containerWidth} bind:clientHeight={containerHeight} class="eyes">
	{#each data as d}
	{#if d.id in positionLookup}
	<Kid {d} {positionLookup} {attribute} />
	{/if}
	{/each}
</div>

<style>
	.eyes {
		width: 100%;
		height: 100vh;
		position: relative;
	}
</style>
