<script>
	import { fade } from 'svelte/transition';
	import { onMount } from "svelte";
	import Kid from "$components/MiddleSchool/MiddleSchool.Kid.svelte";


	const hl_index = 511; // Highlighted item ID

	export let data, kid_id, hl_kid, sorted, value, attribute, exclude, sort_attribute;
	let oldvalue = -1;

	let positionDataCopy = [];
	let positionLookup = {};

	// Constants for padding and item sizes
	let padding = 8;
	let borderPadding = 12;
	let w = 80;
	let h = 40;
	let cols = 15;
	let rows = 10;
	let items = cols * rows;

	let containerWidth = 0;
	let containerHeight = 0;

	// Helper function to calculate positions
	function calculatePositions() {
		if (sorted == 1) {
			positionDataCopy = [...positionDataCopy].sort((a, b) => {
				if (a.id < b.id) return -1;
				if (a.id > b.id) return 1;
				return 0;
			});
			positionDataCopy = [...positionDataCopy].sort((a, b) => {
				if (a[sort_attribute] < b[sort_attribute]) return -1;
				if (a[sort_attribute] > b[sort_attribute]) return 1;
				return 0;
			});
		} else {
			positionDataCopy = [...positionDataCopy].sort((a, b) => {
				if (a.id < b.id) return -1;
				if (a.id > b.id) return 1;
				return 0;
			});
		}

		const gridWidth = cols * (w + padding) - padding;
		const startX = (containerWidth - gridWidth) / 2;

		positionLookup = {};
		positionDataCopy.forEach((d, index) => {
			const row = Math.floor(index / cols);
			const col = index % cols;
			const x = startX + col * (w + padding);
			const y = borderPadding + row * (h + padding);
			const v = d[attribute];

			let light = "off"
			if (exclude) {
				light = "off";
			}
			if (attribute == "id") {
				light = "on";
			}
			if (v == "") {
				light = "none"
			}
			if (v >= 4) {
				light = "on";
			}
			if (kid_id == d.id) {
				light = "on";
			}
			let opacity = v > 3 ? 1 : 0.2;
			if (attribute == "id") {
				opacity = 1;
			}
			let speed = 1000 + 2000 * Math.random();
			if (d.id == hl_kid) {
				speed = 1900;
			}
			if (kid_id === d.id) {
				positionLookup[d.id] = { x: containerWidth / 2 - w, y: containerHeight/4, w: w * 2, h: h * 2, v: 5, speed: speed, opacity: 1, light };
			} else {
				if (kid_id) {
					positionLookup[d.id] = { x: (containerWidth-w) * (Math.random()), y: (containerHeight-h) * (Math.random()*1.5), w: w * 2, h: h * 2, v, speed, light, opacity: 0 };
				} else {
					positionLookup[d.id] = { x, y, w, h, v, speed, opacity, light };	
				}
			}
		});
	}



	// Update positions on mount and resize
	onMount(() => {
		handleResize();
	});

	function handleResize() {
		if (containerWidth > 600) {
			w = containerWidth/6;
			h = w/2;
			padding = 10;
			borderPadding = 15;
		} else if (containerWidth < 280) {
			w = containerWidth/3.5;
			h = w/2;
			padding = 3;
			borderPadding = 5;
		} else {
			w = 80;
			h = 40;
			padding = 8;
			borderPadding = 12;
		}
		cols = Math.floor((containerWidth - 2 * borderPadding + padding) / (w + padding));
		rows = Math.floor((containerHeight - 2 * borderPadding + padding) / (h + padding));
		items = cols * rows;

	    const hl_index = 511; // Highlighted item ID
	    const hl_item = data.find(item => item.id == hl_index);

	    // Use the data directly without shuffling
	    if (hl_item) {
	        // Ensure hl_item is always included in positionDataCopy
	    	positionDataCopy = data.slice(0, items);

	        // If hl_item is not in the selected data, replace the last item
	    	if (!positionDataCopy.some(item => item.id == hl_index)) {
	    		positionDataCopy[positionDataCopy.length - 1] = hl_item;
	    	}
	    } else {
	        // Fallback: Use the data as-is without ensuring hl_item is included
	    	positionDataCopy = data.slice(0, items);
	    }

	    calculatePositions();
	}




	// Reactive statement to recalculate positions when value or attribute changes
	$: {
		if (value !== oldvalue) {
			oldvalue = value;
			calculatePositions();
		}
	}
</script>

<svelte:options runes="{false}" />
<svelte:window on:resize={handleResize} />
<div bind:clientWidth={containerWidth} bind:clientHeight={containerHeight} class="eyes">
	{#each data as d}
	{#if d.id in positionLookup}
	{#if kid_id == null || kid_id === d.id}
	<div transition:fade>
		<Kid {d} {positionLookup} {sort_attribute} {attribute} {kid_id} {exclude} grade={d.respondent_grade_level} />
	</div>
	{/if}
	{/if}
	{/each}
</div>

<style>
	.eyes {
		width: 100%;
		height: calc(100vh - 60px);
		position: relative;
	}
</style>
