<script>
	import { fade } from 'svelte/transition';
	import { onMount } from "svelte";
	import Kid from "$components/MiddleSchool/MiddleSchool.Kid.svelte";


	const hl_index = 511; // Highlighted item ID

	export let data, kid_id, hl_kid, sorted, value, attribute, exclude, sort_attribute;
	let oldvalue = -1;
	let loaded = false;
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

	let zoomStyle = ''; // Will hold the dynamic zoom styles
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

		// move hl_kid to beginning
		if (attribute == "id") {
			const index = positionDataCopy.findIndex(obj => obj.id == hl_kid);
			if (index !== -1) {
				const [item] = positionDataCopy.splice(index, 1);
				positionDataCopy.unshift(item);
			}
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
				light = "on";
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
			let opacity = 1;
			if (kid_id != null && kid_id != d.id) {
				opacity = 0;
			} else {
				opacity = 1;
			}
			let speed = 1000 + 2000 * Math.random();
			if (d.id == hl_kid) {
				speed = 1900;
			}
			positionLookup[d.id] = { x, y, w, h, v, speed, opacity, light };	
		});
	}



	// Update positions on mount and resize
	onMount(() => {
		handleResize();
		checkZoom();
		loaded = true;
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

	function checkZoom() {
		const transZoom = "transition: all 2s ease-in-out";
		if (kid_id) {
			const target = positionLookup[positionDataCopy[0]?.id];
			let scale = 2;
			if (containerWidth < 200) {
				scale = 2;
			} else if (containerWidth < 666) {
				scale = 2;
			} else {
				scale = 1.5;
			}
			if (target) {
				
				zoomStyle = `margin-top: -30%; transform: scale(${scale}) translate(${(containerWidth / 2 - (target.x + target.w / 2))}px, ${(containerHeight / 2 - (target.y + target.h))}px);`;
				if (loaded) {
					zoomStyle = zoomStyle + " " + transZoom;
				}
			}
		} else {
			if (loaded) {
				zoomStyle = transZoom;
			}
        	// zoomStyle = ''; // Reset zoom
        }
	}


	// Reactive statement to recalculate positions when value or attribute changes
	$: {
		if (value !== oldvalue) {
			oldvalue = value;
			calculatePositions();
			checkZoom();
		}
    }
</script>

<svelte:options runes="{false}" />
<svelte:window on:resize={handleResize} />
<div bind:clientWidth={containerWidth} bind:clientHeight={containerHeight} class="eyes" style={zoomStyle}>
	{#each data as d}
	{#if d.id in positionLookup}
	<!-- {#if kid_id == null || kid_id === d.id} -->
	<div transition:fade>
		<Kid {d} {positionLookup} {sort_attribute} {attribute} {kid_id} {exclude} grade={d.respondent_grade_level} />
	</div>
	<!-- {/if} -->
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
