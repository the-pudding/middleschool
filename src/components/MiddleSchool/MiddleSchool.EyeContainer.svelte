<script>
	import { onMount } from "svelte";
	import Kid from "$components/MiddleSchool/MiddleSchool.Kid.svelte";

	export let data;
	export let value;
	export let attribute;
	data.sort((a, b) => a.id - b.id);
	let sampledData;

	// Constants for padding and item sizes
	const padding = 10;
	const borderPadding = 20;
	const w = 80;
	const h = 40;

	let containerWidth = 0; // Dynamically updated width
	let containerHeight = 0; // Dynamically updated height
	let itemsThatFit = 100;

	// Helper: Calculate the number of items that fit and their positions
	function calculatePositions() {
		// Skip calculations if dimensions are invalid
		if (containerWidth <= 0 || containerHeight <= 0) return;

		const itemsPerRow = Math.floor((containerWidth - 2 * borderPadding + padding) / (w + padding));
		const rowsThatFit = Math.floor((containerHeight - 2 * borderPadding + padding) / (h + padding));
		itemsThatFit = itemsPerRow * rowsThatFit;

		// Ensure sampledData matches the number of items that fit
		sampledData = data.slice(0, itemsThatFit);

		// Center the grid horizontally
		const gridWidth = itemsPerRow * (w + padding) - padding;
		const startX = (containerWidth - gridWidth) / 2;

		// Calculate positions for each item
		sampledData.forEach((d, index) => {
			const row = Math.floor(index / itemsPerRow);
			const col = index % itemsPerRow;
			d.x = startX + col * (w + padding);
			d.y = borderPadding + row * (h + padding);
			d.w = w;
			d.h = h;
			d.uniqueKey = d.id || `${d[attribute]}-${index}`;
		});
	}

	// Recalculate positions when data changes
	$: {
		if (data.length > 0) calculatePositions();
		itemsThatFit;
	}

	// Update positions on mount and resize
	onMount(() => {
		calculatePositions();
	});

	function handleResize() {
		calculatePositions();
	}
</script>

<svelte:options runes="{false}" />
<svelte:window on:resize={handleResize} />
<div bind:clientWidth={containerWidth} bind:clientHeight={containerHeight} class="eyes">
	{#each sampledData as d}
	<Kid {d} {attribute} />
	{/each}
</div>

<style>
	.eyes {
		width: 100%;
		height: 100vh;
		background: #000;
		position: relative;
	}
</style>
