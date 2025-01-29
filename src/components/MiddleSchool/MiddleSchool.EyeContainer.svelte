<script>
	import { fade } from 'svelte/transition';
	import { onMount } from "svelte";
	import Kid from "$components/MiddleSchool/MiddleSchool.Kid.svelte";
	import Text from "$components/MiddleSchool/MiddleSchool.Text.svelte";

	

	export let data, kid_id, hl_kid, sorted, value, attribute, exclude, sort_attribute, proportions, grade, quote, quote_id, hl, customSpeed;

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
	let zoomed = "";

	let zoomStyle = ''; // Will hold the dynamic zoom styles
	// Helper function to calculate positions
	function calculatePositions() {
		if (sorted == 1 && !exclude) {
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
			for (let i = 0; i < hl_kid.length; i++) {
				const index = positionDataCopy.findIndex(obj => obj.id == hl_kid[i]);
				if (index !== -1) {
					const [item] = positionDataCopy.splice(index, 1);
					positionDataCopy.unshift(item);
				}
			}
		}

		const gridWidth = cols * (w + padding) - padding;
		const startX = (containerWidth - gridWidth) / 2;

		positionLookup = {};
		let attribute_grade_proportions = proportions[attribute] ?? 100;
		const targetOnCount = Math.round((attribute_grade_proportions / 100) * positionDataCopy.length);
		let onCount = 0;

		positionDataCopy.forEach((d, index) => {
			const row = Math.floor(index / cols);
			const col = index % cols;
			const x = startX + col * (w + padding);
			const y = borderPadding + row * (h + padding);
			const v = d[attribute];
			const z = quote_id == d.id ? 99 : 1;

			let light = "off"
			if (v >= 4) {
				light = "on";
			}
			if (kid_id == d.id) {
				light = "on";
			}
			if (attribute == "id" || exclude) {
				light = ""
			}
			if (hl == 1) {
				light = "on";
			}
			if (light == "on") {
				onCount++;
			}
			let opacity = 1;
			if (kid_id != null && kid_id != d.id) {
				opacity = 0;
			} else {
				opacity = 1;
			}
			let speed = 1000 + Math.round(2000 * Math.random());
			if (hl_kid.indexOf(d.id) != -1) {
				speed = 1900;
			}
			if (customSpeed < 0) {
				speed = customSpeed;
			}
			positionLookup[d.id] = { x, y, w, h, v, z, speed, opacity, light };	
		});

		// Adjust to match targetOnCount
		if (!exclude) {
			if (targetOnCount > onCount) {
				let needed = targetOnCount - onCount;
				for (let i = positionDataCopy.length - 1; i >= 0 && needed > 0; i--) {
					if (positionLookup[positionDataCopy[i].id].light === "off") {
						positionLookup[positionDataCopy[i].id].light = "on";
			            positionDataCopy[i].light = "on"; // Keep consistent
			            onCount++;
			            needed--;
			        }
			    }
			} else if (targetOnCount < onCount) {
				let excess = onCount - targetOnCount;
				for (let i = 0; i < positionDataCopy.length && excess > 0; i++) {
					if (positionLookup[positionDataCopy[i].id].light === "on") {
						positionLookup[positionDataCopy[i].id].light = "off";
			            positionDataCopy[i].light = "off"; // Keep consistent
			            onCount--;
			            excess--;
			        }
			    }
			}
		}
		
		// console.log(grade + ": " + targetOnCount + " // " + onCount);
	}



	// Update positions on mount and resize
	onMount(() => {
		handleResize();
		checkZoom();
		setInterval(function() {
			checkZoom();
		}, 200);
		loaded = true;
	});

	function handleResize() {
	    padding = 5; // Base padding
	    borderPadding = 15;

	    // Initial width and height calculations
	    if (containerWidth > 600) {
	    	w = containerWidth / 6;
	    	h = w / 2;
	    } else if (containerWidth < 400) {
	    	w = containerWidth / 4;
	    	h = w / 2;
	    } else {
	    	w = containerWidth / 5;
	    	h = w / 2;
	    }

	    // For grade <= 5, increase size while maintaining aspect ratio
	    let scaleFactor = 1.414; // √2
	    let boxHeight = h; // Base height
	    if (grade <= 5) {
	    	w *= scaleFactor;
	    	h *= scaleFactor;
	        boxHeight = h; // Update box height for scaled boxes
	    }

	    // Calculate rows and ensure padding consistency
	    cols = Math.floor((containerWidth - 2 * borderPadding + padding) / (w + padding));
	    rows = Math.floor((containerHeight - 2 * borderPadding + padding) / (boxHeight + padding));

	    // Ensure total height fits within the container
	    let totalHeight = rows * boxHeight + (rows - 1) * padding;
	    if (totalHeight > containerHeight - 2 * borderPadding) {
	        rows -= 1; // Reduce rows if they exceed the container height
	        totalHeight = rows * boxHeight + (rows - 1) * padding;
	    }

	    // Adjust padding slightly to ensure alignment
	    let remainingSpace = containerHeight - totalHeight - 2 * borderPadding;
	    if (remainingSpace > 0) {
	        padding += remainingSpace / (rows - 1); // Distribute extra space evenly
	    }

	    // Recalculate items
	    items = cols * rows;

	    const hl_item = data.find(item => item.id == hl_kid);

	    // Use the data directly without shuffling
	    if (hl_item) {
	    	positionDataCopy = data.slice(0, items);

	        // Ensure hl_item is always included in positionDataCopy
	    	if (!positionDataCopy.some(item => item.id == hl_kid)) {
	    		positionDataCopy[positionDataCopy.length - 1] = hl_item;
	    	}
	    } else {
	        // Fallback: Use the data as-is without ensuring hl_item is included
	    	positionDataCopy = data.slice(0, items);
	    }

	    calculatePositions();
	}

	let scale = 2;
	function checkZoom() {
		const transZoom = "transition: all 2s ease-in-out";

		if (kid_id) {
			const target = positionLookup[positionDataCopy[0]?.id];
			zoomed = "zoomed";


			if (containerWidth < 200) {
				scale = 3;
			} else if (containerWidth < 666) {
				scale = 2;
			} else {
				scale = 1.5;
			}

			if (target) {
	            // Adjust zoomStyle based on recalculated dimensions
				zoomStyle = `margin-top: -${containerHeight / 10}px; transform: scale(${scale}) translate3d(${(containerWidth / 2 - (target.x + target.w / 2))}px, ${(containerHeight / 2 - (target.y + target.h))}px, 0);`;
				if (loaded) {
					zoomStyle = zoomStyle + " " + transZoom;
				}
			}
		} else {
			if (loaded) {
				zoomStyle = transZoom;
			}
			zoomed = "";
	        // Reset zoomStyle if necessary
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
<div bind:clientWidth={containerWidth} bind:clientHeight={containerHeight} class="eyes {zoomed}" style={zoomStyle}>
	{#key w}
	{#each data as d}
	{#if d.id in positionLookup}
	<div style="transform: translateZ(0);" transition:fade>
		<Kid {d} quote={null} {positionLookup} {sort_attribute} {attribute} {kid_id} {exclude} grade={d.respondent_grade_level} />
	</div>
	{/if}
	{/each}
	{#if quote}
	<div class="quote" style="
	left: {positionLookup[quote_id].x - positionLookup[quote_id].w / 10.5}px;
	top: {positionLookup[quote_id].y + positionLookup[quote_id].h + 20}px;
	" transition:fade><Text copy={quote} /></div>
	{/if}
	{/key}
</div>

<style>
	.eyes {
		top:  50px;
		width: 100%;
		height: calc(100vh - 100px);
		position: relative;
/* 		box-sizing: content-box; */
}
</style>
