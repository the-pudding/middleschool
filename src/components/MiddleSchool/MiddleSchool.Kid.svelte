<script>
	import { onMount } from "svelte";
	import Eye from "$components/MiddleSchool/MiddleSchool.Eye.svelte";
	export let d, attribute, positionLookup, kid_id, exclude, grade, sort_attribute;
	let rand = seededRandom(d.id + 8);
	let rand2 = seededRandom(d.id + 2);
	let rand3 = seededRandom(d.id + 1);
	let color = getColor(d.student_race, d.student_ethnicity, grade, d[attribute]);

	
	function seededRandom(seed) {
	    const a = 1664525;
	    const c = 1013904223;
	    const m = Math.pow(2, 32);

	    // Scramble the seed with a nonlinear transformation
	    seed = (seed ^ (seed >>> 21)) * 0x5bd1e995;
	    seed = (seed ^ (seed >>> 15)) * 0x1b873593;
	    seed = seed ^ (seed >>> 13);

	    // Apply the linear congruential generator (LCG)
	    seed = (a * seed + c) % m;

	    // Further scramble the output for reduced correlation
	    const result = (seed ^ (seed >>> 16)) * 0x85ebca6b;
	    const normalized = Math.abs(result % m) / m; // Normalize to [0, 1)
	    
	    return normalized * 2 - 1; // Scale to [-1, 1]
	}

	function adjustColor(color, isLightOn) {
	    if (isLightOn === "off") {
	        // Darken and desaturate the color
	        const [r, g, b] = color.match(/\w\w/g).map((c) => parseInt(c, 16)); // Convert hex to RGB
	        const darkenFactor = 0.5; // Adjust for darkness (0.5 = 50% darker)
	        const newR = Math.floor(r * darkenFactor * 0.6);
	        const newG = Math.floor(g * darkenFactor * 0.4);
	        const newB = Math.floor(b * darkenFactor * 0.7);
	        return `rgb(${newR}, ${newG}, ${newB})`; // Convert back to RGB format
	    }
	    return color; // Return original color if light is not "off"
	}

	function getColor(race, eth, grade, isLightOn) {
	    let colors;
	    if (race === "Black") {
		    colors = ["#8a4a80", "#7a3f73", "#97578f", "#854b7d", "#9b6096"];
		} else if (race === "White" && eth === "Latinx") {
		    colors = ["#b05496", "#9a4885", "#c169aa", "#a15b91", "#b26a9e"];
		} else if (race === "White") {
		    colors = ["#d28ed4", "#c17fc3", "#e3a1e3", "#ae6ea8", "#c07cb8"];
		} else {
		    colors = ["#b26ba1", "#9e5a92", "#ca82b5", "#af739e", "#9e608a"];
		}

	    const randomColor = colors[Math.floor(Math.abs(rand2) * colors.length)];
	    return adjustColor(randomColor, isLightOn);
	}

	$: {
		color = getColor(d.student_race, d.student_ethnicity, grade, positionLookup[d.id]?.light);
	}
</script>



<svelte:options runes="{false}" />
<div class="eye {positionLookup[d.id].light}" style="
	left: {positionLookup[d.id].x}px;
	top: {positionLookup[d.id].y}px;
	width: {positionLookup[d.id].w}px;
	height: {positionLookup[d.id].h}px;
	opacity: {positionLookup[d.id].opacity};
	transition: all {positionLookup[d.id].speed}ms cubic-bezier(0.420, 0.000, 0.580, 1.000); 
">

	<Eye side="left" {color} {rand} {rand2} {rand3} light={positionLookup[d.id].light} {grade}/>
	<Eye side="right" {color} {rand} {rand2} {rand3} light={positionLookup[d.id].light} {grade}/>
	<!-- <div class="sort_attribute">{Math.round(d[sort_attribute])}</div> -->
	<!-- <div class="sort_attribute">{positionLookup[d.id].light}</div> -->
</div>


<style>
	.sort_attribute {
		position: absolute;
		left:  4px;
		bottom:  4px;
		color:  white;
		font-family: var(--sans);
		z-index: 100;
		font-size: 15px;
		font-weight:  bold;
		text-shadow:  0px 0px 8px #000;
	}
	.eye {
		background: #ffe0fe;
		border:  1px solid #000;
		position: absolute;
		overflow:  hidden;
		transition-timing-function: cubic-bezier(0.420, 0.000, 0.580, 1.000); 
		transform: translate3d(0,0,0);
	}
	.eye.off {
		background: #450040;
	}
</style>