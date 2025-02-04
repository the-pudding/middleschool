<script>
	import { fade } from 'svelte/transition';
	import { onMount } from "svelte";
	import Kid from "$components/MiddleSchool/MiddleSchool.Kid.svelte";
	let isWebKit = false;
	let isMobileWebKit = false;
	export let data, kid_id, hl_kid, sorted, value, attribute, exclude, sort_attribute, proportions, grade, quote, quote_id, hl, customSpeed, grades, prefersReducedMotion;
	let oldvalue = -1;
	let loaded = false;
	let positionDataCopy = [];
	let positionLookup = {};

	// Constants for padding and item sizes
	let padding = 0;
	let borderPadding = 20;
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
			const x = Math.round(startX + col * (w + padding));
			const y = Math.round(borderPadding + row * (h + padding));
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
				light = "neutral";
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
			let w1 = w;
			let h1 = h;
			if (kid_id == d.id && isMobileWebKit) {
				w1 = w * 4;
				h1 = w * 2;
			}
			let speed = 1000 + 2000 * Math.random();
			if (hl_kid.indexOf(d.id) != -1) {
				speed = 1900;
			}
			if (customSpeed < 0) {
				speed = customSpeed;
			}
			positionLookup[d.id] = { x, y, w: w1, h: h1, v, z, speed, opacity, light };	
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
		 const userAgent = navigator.userAgent;

	    // Check if the browser uses WebKit (excluding Edge, Opera, and Chromium-based browsers)
	    isWebKit = /WebKit/.test(userAgent) && !/Edge|OPR|Chromium/.test(userAgent);

	    // Mobile WebKit check: Detects iOS Safari and WebView browsers
	    isMobileWebKit = isWebKit && (
	      /iPhone|iPad|iPod/.test(userAgent) || // iOS device check
	      (navigator.maxTouchPoints > 0 && /Macintosh/.test(userAgent)) // Detects iPadOS
	    );
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
	    	w = containerWidth / 6 * 1.414;
	    	h = w / 2;
	    } else if (containerWidth < 400) {
	    	w = containerWidth / 4 * 1.414;
	    	h = w / 2;
	    } else {
	    	w = containerWidth / 5 * 1.414;
	    	h = w / 2;
	    }

	    // Calculate rows and ensure padding consistency
	    cols = Math.floor((containerWidth - 2 * borderPadding + padding) / (w + padding));
	    rows = Math.floor((containerHeight - 2 * borderPadding + padding) / (h + padding));

	    // Ensure total height fits within the container
	    let totalHeight = rows * h + (rows - 1) * padding;
	    if (totalHeight > containerHeight - 2 * borderPadding) {
	        rows -= 1; // Reduce rows if they exceed the container height
	        totalHeight = rows * h + (rows - 1) * padding;
	    }

	    // Adjust padding slightly to ensure alignment
	    // let remainingSpace = containerHeight - totalHeight - 2 * borderPadding;
	    // if (remainingSpace > 0) {
	    //     padding += remainingSpace / (rows - 1); // Distribute extra space evenly
	    // }

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

			if (isMobileWebKit) {
				scale = 1;
			} else if (containerWidth < 200) {
				scale = 5;
			} else if (containerWidth < 666) {
				scale = 2;
			} else {
				scale = 1.5;
			}
			zoomed = "zoomed" + String(scale).replace(".","");
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

	function addOrdinalSuffix(num) {
		if (typeof num !== "number" || isNaN(num)) {
			throw new Error("Input must be a valid number");
		}

		const remainder10 = num % 10;
		const remainder100 = num % 100;

		if (remainder100 >= 11 && remainder100 <= 13) {
			return `${num}th`;
		}

		switch (remainder10) {
		case 1:
			return `${num}st`;
		case 2:
			return `${num}nd`;
		case 3:
			return `${num}rd`;
		default:
			return `${num}th`;
		}
	}
	function getSchoolType(grade) {
		if (grade < 6) {
			return "Elementary";
		} else if (grade < 9) {
			return "Middle";
		} else {
			return "High school"
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
	<!-- <div style="transform: translateZ(0);" transition:fade> -->
		<Kid {prefersReducedMotion} {zoomed} {d} {quote} {value} {quote_id} positionLookup={positionLookup[d.id]} {sort_attribute} {hl_kid} {attribute} {kid_id} {exclude} grade={d.respondent_grade_level} {grades}/>
		<!-- </div> -->
		{/if}
		{/each}
		{/key}

		<div class="gradeLevel" style="top:{rows * (h+padding)}px;">
			{#if kid_id == null}
			<span transition:fade>{addOrdinalSuffix(grade)}
				<br>
				<span class="schoolType">{getSchoolType(grade)}</span>
			</span>
			{/if}
		</div>
	</div>

	<style>
		.eyes {
			top:  80px;
			width: 100%;
			height: calc(100vh - 130px);
			position: relative;
		}
		.gradeLevel {
			width:  100%;
			text-align:  center;
			font-size: 25px;
			height:  25px;
			padding:  0px;
			color: var(--color-light);
			font-weight: bold;
			position: absolute;
			margin-top: 20px;
		}

		.schoolType {
			font-size: 15px;
			font-weight: normal;
			margin-top: -5px;
			display: block;
		}
		@media screen and (max-width: 500px) {
			.gradeLevel {
				font-size:  16px;
				height:  20px;
				padding:  2px 0;
				bottom:  40px;
			}
		}
	</style>
