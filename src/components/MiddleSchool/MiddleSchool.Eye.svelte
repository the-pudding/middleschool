<script>
	import { onMount } from "svelte";

	export let rand, rand2, rand3, light, side, grade, color;
	let time = 800;

	const imageNumbers = 9;
	const randImage = Math.floor(Math.abs(rand) * imageNumbers);
	const randImage2 = Math.floor(Math.abs(rand2) * imageNumbers);
	const randImage3 = Math.floor(Math.abs(rand3) * imageNumbers);

	// Configuration for dimensions and timing
	const config = {
		baseHeight: 1.5 + Math.round(Math.abs(rand) * 1.5) + ageAdjustEye(grade, "height"),
		baseWidth: 25 + Math.round(Math.abs(rand) * 5) + ageAdjustEye(grade, "width"),
		baseHeightBrow: 10 + Math.round(Math.abs(rand) * 5) + ageAdjustBrow(grade, "height"),
		baseWidthBrow: 45 + Math.round(Math.abs(rand) * 5) + ageAdjustBrow(grade, "width"),
		baseTop: 60 + Math.round(Math.abs(rand) * 3),
		baseTopBrow: 55 + Math.round(Math.abs(rand) * 2),
		baseTranslateX: side === "right" ? 20 - Math.round(rand * 50) : 20 + Math.round(rand * 50),
		baseTranslateXNose: side === "right" ? -Math.round(rand * 10) - 40 : Math.round(rand * 10) - 40,
		baseRotate: side === "right" ? -Math.round(rand * 5) : Math.round(rand * 5),
		baseRotateBrow: side === "right" ? -Math.round(rand2 * 5) : Math.round(rand2 * 5),
		baseRotateNose: side === "right" ? -Math.round(Math.abs(rand2) * 3) : Math.round(Math.abs(rand2) * 3),
		blinkDuration: 100,
		minBlinkInterval: 2000,
		maxBlinkIntervalMultiplier: 8,
	};

	function ageAdjustEye(g) {
		return (20 - (g));
	}
	function ageAdjustBrow(g) {
		return (g - 4)*2;
	}

	let eyewhiteStyle, browStyle, noseStyle; // Styles for the eye and brow
	let baseEyewhiteStyle, baseBrowStyle, baseNoseStyle; // Base styles
	let blinkInterval;

	// Initialize base styles
	function initializeBaseStyles() {
		baseEyewhiteStyle = generateStyle(
			config.baseWidth,
			config.baseHeight,
			config.baseTop,
			config.baseTranslateX,
			config.baseRotate
			);
		baseBrowStyle = generateStyle(
			config.baseWidthBrow,
			config.baseHeightBrow,
			config.baseTopBrow,
			config.baseTranslateX,
			config.baseRotateBrow,
			true
			);
		baseNoseStyle = generateStyle(
			config.baseWidthBrow,
			config.baseHeightBrow,
			config.baseTopBrow,
			config.baseTranslateXNose,
			config.baseRotateNose,
			false,
			true
			);
		eyewhiteStyle = baseEyewhiteStyle;
		browStyle = baseBrowStyle;
		noseStyle = baseNoseStyle;
	}


	// Generate styles for the eye, brow, and nose
	function generateStyle(width, height, top, translateX, rotate, isBrow = false, isNose = false) {
		const adj = side === "right" ? -10 + rand*4 : 10 - rand*4;
		if (isBrow) {
			return `width: ${width}%; height: ${height}%; margin-left: ${adj}%; top: ${top}%; transform: translateX(-50%) rotate(${rotate}deg);`;
		}
		if (isNose) {
			return `width: 0%; top: ${top - 20}%; transform: translateX(${translateX}%) translateY(10%) rotate(${rotate}deg); ${side === "right" ? `left: ${10 + Math.abs(rand) * 5}%;` : `right: ${Math.abs(rand) * 5}%;`}`;
		}
		if (height == 0) {
			return `width: ${width}%; margin-left: ${adj}%; height: ${2}%; top: ${top}%; transform: translateX(-${50 + adj}%) rotate(${rotate}deg);`;	
		}
		return `width: ${width}%; margin-left: ${adj}%; height: ${height}%; top: ${top}%; transform: translateX(-${50 + adj}%) rotate(${rotate}deg);`;
	}

	

	// Blink animation
	function blink() {
		// Collapse width and height to simulate a blink
		eyewhiteStyle = generateStyle(config.baseWidth, 4, config.baseTop + config.baseHeight/2, config.translateX, 0);

		setTimeout(() => {
			if (light === "on") {
				eyewhiteStyle = baseEyewhiteStyle;
			}
		}, config.blinkDuration);
	}

	function close() {
		eyewhiteStyle = generateStyle(config.baseWidth, 10, config.baseTop + config.baseHeight/2, config.translateX, 0);
	}

	function reset() {
		eyewhiteStyle = baseEyewhiteStyle;
	}



	function checkEyes() {
		if (time > 3000) {
			time = 0;
		}
		time++;
		try {
			// if (time % Math.round(10 + Math.abs(rand)*10) == 0) {
			// 	meander();
			// }
			// if (light == "off") {
			// 	close();
			// } else {
				reset();
				if (time % Math.round(50 + Math.abs(rand)*50) == 0) {
					blink();	
				}	
			// }
		} catch {

		}
		
	}



	onMount(() => {
		initializeBaseStyles();

		// Set up periodic blink
		// blinkInterval = Math.max(config.minBlinkInterval, Math.abs(rand) * config.maxBlinkIntervalMultiplier * 1000);
		// setInterval(meander, blinkInterval);
		setInterval(checkEyes, 100)
	});

	$: {
		light;
	}

</script>

<svelte:options runes="{false}" />
<div class="{side}eye oneeye {light}">
	<div class="ear" style="background: {color}; height: {20 + Math.abs(rand)*10}%; width: {10 + Math.abs(rand2)*5}%; top: {45 + Math.abs(rand2)*10}%;"></div>
	<div class="nose" style="{noseStyle}"></div>
	<!-- {#if light == "on"} -->
	<img
	class="eyewhite eyewhite{light}"
	style="{eyewhiteStyle}"
	src="assets/app/eye{randImage}_{side}.png"
	/>
	<!-- {:else}
	<img
	class="eyewhite eyewhite{light}"
	style="{eyewhiteStyle}"
	src="assets/app/eyeclosed_{side}.png"
	/>
	{/if} -->
	<img
	class="brow"
	style="{browStyle}"
	src="assets/app/brow{randImage2}_{side}.png"
	/>
	<!-- <img
	class="hair" 
	style="top: -8%; height: {100 + (rand*10)}%;"
	src="assets/app/hair{randImage3}_{side}.png"
	/> -->
	<!-- <div class="sort_attribute">{randImage3}</div> -->
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
/* 	.eye {
		position: absolute;
		background: white;
		border: 1px solid #666;
		box-shadow: inset 2px 2px 12px 2px #000;
		transition: all 0.2s ease-in-out;
	} */
	.nose {
		border-left: 2px solid transparent;
		border-right: 2px solid transparent;
		border-bottom: 60px solid rgba(0,0,0,0.4);
		height: 0px !important;
		position:  absolute;
		margin-top:  20%;
	}
	.hair {
		max-width: none;
		width: 130%;
		position: absolute;
	}
	.hair.back {
		z-index: -1;
		width: 120%;
	}
	.lefteye .hair {
		left: -10%;
	}
	.righteye .hair {
		right: -10%;
	}
	.righteye  .hair.back {
		left: 0%;
		right:  auto;
	} 
	.lefteye  .hair.back {
		right: 0%;
		left:  auto;
	} 
	.ear {
		position: absolute;
		transition: background 500ms cubic-bezier(0.420, 0.000, 0.580, 1.000);
		transition-timing-function: cubic-bezier(0.420, 0.000, 0.580, 1.000); /* linear */
	}
	.lefteye .ear {
		right: 98%;
		border-radius: 50% 0% 0% 50%;
		border-right: 2px solid rgba(0,0,0,0.1);
	}
	.righteye .ear {
		left: 98%;
		border-radius: 0% 50% 50% 0;
		border-left: 2px solid rgba(0,0,0,0.1);
	}
	.lefteye .nose {
		right:  1%;
	}
	.righteye .nose {
		left:  1%;
	} 

	.oneeye {
		width: 50%;
		height: 100%;
		top: 0%;
		position: absolute;
/* 		transform-origin: 50% 50%; */
transition: all 0.8s ease-in-out;
opacity:  1;
}
.lefteye {
	left: 0%;
}
.lefteye:after {
	content: "";
	position: absolute;
	left: 0;
	top: 0;
	width: 60%;
	height: 200%; /* Ensure it covers the entire element */
/* 		background: linear-gradient(to right, rgba(40, 0, 48, 1), rgba(40, 0, 48, 0)); */
pointer-events: none; /* Optional: Prevent interactions */
}
.righteye:after {
	content: "";
	position: absolute;
	right: 0;
	top: 0;
	width: 60%;
	height: 200%; /* Ensure it covers the entire element */
/* 		background: linear-gradient(to left, rgba(40, 0, 48, 1), rgba(40, 0, 48, 0)); */
pointer-events: none; /* Optional: Prevent interactions */
}

.righteye {
	right: 0%;
}
.side_wrapper {
	width:  45%;
	height: 90%;
	top: 35%;
	position: absolute;
}
.lefteye .side_wrapper {
	left: 55.5%;
	border-radius: 50% 0 0% 0;

}
.righteye .side_wrapper {
	right: 55.5%;
	border-radius: 0 50% 0% 0;
}
.eyewhite {
	position: absolute;
	left:  50%;
	transition: all 0.1s ease-in-out;
	transform-origin: 50% 50%;

}
.brow {
	position: absolute;
	width: 50%;
	height: 8px;
	left:  50%;
	margin-top: -6px;
	transition: all 0.1s ease-in-out;
	transform-origin: 50% 50%;
	opacity: 0.6;
}
</style>
