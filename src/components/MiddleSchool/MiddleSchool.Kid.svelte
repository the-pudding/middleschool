<script>
	import { onMount, onDestroy } from "svelte";
	import { fade } from 'svelte/transition';
	import Eye from "$components/MiddleSchool/MiddleSchool.Eye.svelte";
	import Text from "$components/MiddleSchool/MiddleSchool.Text.svelte";
	export let d, attribute, positionLookup, kid_id, exclude, grade, sort_attribute, quote, quote_id, value, grades, talkers, hl_kid, zoomed, prefersReducedMotion;
	let delayedQuote = quote; // Holds the quote value with a delay
	let quoteChangeTimeout;

	let rand = seededRandom(d.id + 8);
	let rand2 = seededRandom(d.id + 2);
	let rand3 = seededRandom(d.id + 1);
	const imageNumbers = 9;
	const randImage = Math.floor(Math.abs(rand2) * imageNumbers);
	let color = getColor(d.student_race, d.student_ethnicity, grade, d[attribute]);
	let ty = 0;
	let tx = 0;
	let time = 800;
	let quoteOpacity = 0;
	const imageType = grade < 6 ? "kid" : "full";

	
	
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

	function adjustColor(color) {
		if (positionLookup.light === "neutral") {
			return color;
		}

	    // Convert hex to RGB
		let [r, g, b] = color.match(/\w\w/g).map((c) => parseInt(c, 16));

		if (positionLookup.light === "off") {
	        const shadowFactor = 0.4; // Adjusts brightness while reducing saturation
			const desaturationFactor = 0.3; // Increase this for more desaturation

			// Compute luminance-based grayscale equivalent
			const luminance = Math.floor(0.3 * r + 0.59 * g + 0.11 * b);

			// Blend original color with grayscale while keeping brightness
			r = Math.floor(r * (1 - desaturationFactor) + luminance * desaturationFactor);
			g = Math.floor(g * (1 - desaturationFactor) + luminance * desaturationFactor);
			b = Math.floor(b * (1 - desaturationFactor) + luminance * desaturationFactor);

			r = Math.floor(r * shadowFactor);
			g = Math.floor(g * shadowFactor);
			b = Math.floor(b * shadowFactor);

			return `rgb(${r}, ${g}, ${b})`;
		} else {
	        // Yellow light color (#FFD375)
			const lightR = 200, lightG = 150, lightB = 120;

	        // Blend the original color with the yellow light (stronger blend for warmth)
	        const blendFactor = 0.4; // More yellow influence
	        r = Math.round(r * (1 - blendFactor) + lightR * blendFactor);
	        g = Math.round(g * (1 - blendFactor) + lightG * blendFactor);
	        b = Math.round(b * (1 - blendFactor) + lightB * blendFactor);

	        // Apply contrast enhancement
	        const contrastFactor = 1.05;
	        r = Math.min(255, Math.max(0, Math.round((r - 128) * contrastFactor + 128)));
	        g = Math.min(255, Math.max(0, Math.round((g - 128) * contrastFactor + 128)));
	        b = Math.min(255, Math.max(0, Math.round((b - 128) * contrastFactor + 128)));

	        return `rgb(${r}, ${g}, ${b})`;
	    }
	}



	// Helper functions for RGB to HSL and HSL to RGB conversions
	function rgbToHsl(r, g, b) {
		r /= 255, g /= 255, b /= 255;
		let max = Math.max(r, g, b), min = Math.min(r, g, b);
		let h, s, l = (max + min) / 2;

		if (max === min) {
	        h = s = 0; // achromatic
	    } else {
	    	let d = max - min;
	    	s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	    	switch (max) {
	    	case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	    	case g: h = (b - r) / d + 2; break;
	    	case b: h = (r - g) / d + 4; break;
	    	}
	    	h /= 6;
	    }

	    return [h * 360, s, l];
	}

	function hslToRgb(h, s, l) {
		h /= 360;
		let r, g, b;

		if (s === 0) {
	        r = g = b = l; // achromatic
	    } else {
	    	const hue2rgb = (p, q, t) => {
	    		if (t < 0) t += 1;
	    		if (t > 1) t -= 1;
	    		if (t < 1 / 6) return p + (q - p) * 6 * t;
	    		if (t < 1 / 2) return q;
	    		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	    		return p;
	    	};

	    	let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	    	let p = 2 * l - q;
	    	r = hue2rgb(p, q, h + 1 / 3);
	    	g = hue2rgb(p, q, h);
	    	b = hue2rgb(p, q, h - 1 / 3);
	    }

	    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}



	function getColor(race, eth, grade) {
		let colors;
		if (race === "Black") {
	        colors = ["#3d1f3a", "#732e64"]; // Darker, higher contrast
	    } else if (race === "White" && eth === "Latinx") {
	        colors = ["#7b315b", "#b14d8a"]; // Stronger contrast with fewer colors
	    } else if (race === "White") {
	        colors = ["#b06ba1", "#e3a1e3"]; // Keeping some lightness but increasing contrast
	    } else {
	        colors = ["#7e3f69", "#b76aa1"]; // More contrast in mid-tones
	    }

	    const randomColor = colors[Math.floor(Math.abs(rand2) * colors.length)];
	    return adjustColor(randomColor);
	}


	function meanderRandom(seed) {
		return function () {
	        // Simple Linear Congruential Generator (LCG) for pseudo-random numbers
			seed = (seed * 9301 + 49297) % 233280;
			return seed / 233280;
		};
	}

	function createRandBetween(seed) {
		const random = meanderRandom(seed);
		return function (min, max) {
			return Math.floor(random() * (max - min + 1)) + min;
		};
	}

	// Separate seeded random generators for tx and ty
	const randTx = createRandBetween(rand); // Seed for tx
	const randTy = createRandBetween(rand2); // Seed for ty

	function meander() {
	    tx = randTx(-(14 - grade)*rand, (14- grade)*rand ); // Meander tx
	    ty = randTy( (-(14 - grade)/1.5)*rand, ((14- grade)/1.5)*rand ); // Meander ty
	}

	let animationFrame;

	function checkMeander() {
		if (time > 3000) {
			time = 0;
		}
		time++;

		if (time % Math.round(10 + Math.abs(rand) * 10) == 0) {
			meander();
		}

		animationFrame = requestAnimationFrame(checkMeander);
	}

	onMount(() => {
		if (!prefersReducedMotion) {
			animationFrame = requestAnimationFrame(checkMeander);	
		}
	});

	onDestroy(() => {
		cancelAnimationFrame(animationFrame);
		clearTimeout(quoteChangeTimeout);
	});
	let quotePosition = ["left",0];
	let scale = 1;
	$: {
		if (quote !== delayedQuote || quote == "") {
			console.log("delay")
			clearTimeout(quoteChangeTimeout);
			quoteChangeTimeout = setTimeout(() => {
				delayedQuote = quote;
			}, 500);
		} else {
			console.log("no delay")
			delayedQuote = quote;
		}
		value;
		color = getColor(d.student_race, d.student_ethnicity, grade);
		if (quote_id == d.id) {
			quoteOpacity = 1;
		} else {
			quoteOpacity = 0;
		}
		if ( (grades.indexOf(grade) / grades.length >= 0.5 || grades.length == 1) && kid_id == null) {
			quotePosition = ["right",-100];
		} else {
			quotePosition = ["left",0];
		}
		if (zoomed == "" || zoomed == 1) {
			scale = 1;
		} else {
			scale = 1 / Number(zoomed.replace("15","1.5").replace("zoomed",""));	
		}

		
	}
</script>



<svelte:options runes="{false}" />
<div class="eye {positionLookup.light}" style="
transform: translate3d({positionLookup.x}px, {positionLookup.y}px, 0);
z-index: {positionLookup.z};
width: {positionLookup.w}px;
height: {positionLookup.h}px;
opacity: {positionLookup.opacity};
transition: height {Math.round(positionLookup.speed + 300*rand2)}ms cubic-bezier(0.420, 0.000, 0.580, 1.000), width {Math.round(positionLookup.speed + 300*rand2)}ms cubic-bezier(0.420, 0.000, 0.580, 1.000), transform {Math.round(positionLookup.speed + 300*rand2)}ms cubic-bezier(0.420, 0.000, 0.580, 1.000), background 500ms linear, opacity 1500ms linear; 
">
<div class="face" style="background: {color}; transform: translate({Math.round(tx)}%,{Math.round(ty)}%); width: {Math.round(64 + rand*5) }%; left: { Math.round((100 - (64 + rand*5))/2) }%;">
	<Eye side="left" {color} {rand} {rand2} {rand3} light={positionLookup.light} {grade}/>
	<Eye side="right" {color} {rand} {rand2} {rand3} light={positionLookup.light} {grade}/>
	{#if rand > 0.5}
	<img class="glasses" style="top: {26 + Math.round(Math.abs(rand) * 3)}%;" src="assets/app/glasses{Math.floor(Math.abs(rand)*3)}.png" />
	{/if}
	<img class="hair" src="assets/app/{imageType}hair{randImage}.png" />
</div>
<!-- <div class="sort_attribute">{Math.round(d[sort_attribute])}</div> -->
<!-- <div class="sort_attribute">{d.id}</div> -->
</div>

{#if hl_kid.includes(d.id)}
<div class="quote {quotePosition[0]}" style="
transform: translate3d({positionLookup.x - positionLookup.w / 10.5 + quotePosition[1]}px, {positionLookup.y + positionLookup.h + 20}px,0) scale({scale});
/* 	transform: scale({scale}); */
opacity: {quoteOpacity};
transition: transform {Math.round(positionLookup.speed + 500*rand2)}ms cubic-bezier(0.420, 0.000, 0.580, 1.000), opacity 300ms cubic-bezier(0.420, 0.000, 0.580, 1.000);
">
<Text copy={delayedQuote} /></div>
{/if}

<style>
	
	
	.eye {
		overflow: clip;
		will-change: transform;
		backface-visibility: hidden;
		transform: translateZ(0); /* Triggers GPU rendering */
		background: #c2a1bd;
/* 		border:  1px solid #000; */
position: absolute;
overflow:  hidden;
transition-timing-function: cubic-bezier(0.420, 0.000, 0.580, 1.000); 
image-rendering: crisp-edges;
box-shadow: inset 0px 2px 8px -2px #000;
/* 		transform: translate3d(0,0,0); */
}
.eye.on {
	background: #ffd375;
}
.eye.off {
	background: #30132f;
}
.glasses {
	position: absolute;
	max-width: none;
	width: 120%;
	height: 120%;
	left: -10%;
	opacity: 0.6;
}
.grain {
	background-image:  url('assets/app/grain.png');
	background-size: 240% 200%;
	width: 100%;
	height: 100%;
	position: absolute;
	pointer-events: none;
}
.face {
	position: absolute;
	left: 18%;
	width: 64%;
	bottom:  -5%;
	height: 100%;
	border-radius: 50% 50% 0 0;
	transition: background 500ms cubic-bezier(0.420, 0.000, 0.580, 1.000), transform 1500ms cubic-bezier(0.420, 0.000, 0.580, 1.000);
	transition-timing-function: cubic-bezier(0.420, 0.000, 0.580, 1.000);
}
.hair {
	position: absolute;
	top: -18%;
	height: 140%;
	left:-20%;
	width: 140%;
	max-width: none;
}
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
</style>