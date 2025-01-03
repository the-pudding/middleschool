<script>
	import { onMount } from "svelte";

	export let side, rand;

	// Configuration for dimensions and timing
	const config = {
		baseHeight: rand * 4 + 25, // Base height percentage
		baseWidth: 20 + rand * 2, // Base width percentage
		blinkDuration: 100, // Blink duration in ms
		minBlinkInterval: 2000, // Minimum interval between blinks
		maxBlinkIntervalMultiplier: 8, // Multiplier for max blink interval
	};

	let eyewhiteStyle, browStyle; // Styles for the eye and brow
	let baseEyewhiteStyle, baseBrowStyle; // Base styles
	let blinkInterval;

	// Generate styles for the eye and brow
	function generateStyle(height, top, isBrow = false) {
		if (isBrow) {
			return `top: ${top}%;`;
		}
		return `height: ${height}%; top: ${top}%;`;
	}

	// Initialize base styles
	function initializeBaseStyles() {
		baseEyewhiteStyle = generateStyle(config.baseHeight, 40);
		baseBrowStyle = generateStyle(0, 20, true); // Brow starts slightly above
		eyewhiteStyle = baseEyewhiteStyle;
		browStyle = baseBrowStyle;
	}

	// Blink animation
	function blink() {
		// Close the eye from the center outward
		eyewhiteStyle = generateStyle(0, 50); // Collapse height to 0 from center
		browStyle = generateStyle(0, 25, true); // Lower the brow slightly

		// Revert to base styles after the blink duration
		setTimeout(() => {
			eyewhiteStyle = baseEyewhiteStyle;
			browStyle = baseBrowStyle;
		}, config.blinkDuration);
	}

	onMount(() => {
		initializeBaseStyles();

		// Calculate random blink interval
		blinkInterval = Math.max(
			config.minBlinkInterval,
			rand * config.maxBlinkIntervalMultiplier * 1000
		);

		// Trigger periodic blinking
		setInterval(blink, blinkInterval);
	});
</script>


<svelte:options runes="{false}" />

<div class="{side}eye oneeye">
	<img class="eyewhite" style="{eyewhiteStyle}" src="assets/app/eye0{side}.png" />
	<img class="brow" style="{browStyle}" src="assets/app/brow0{side}.png" />
</div>
<style>
	.eye {
		position: absolute;
		background: white;
		border: 1px solid #666;
		box-shadow: inset 2px 2px 12px 2px #000;
		transition: all 0.2s ease-in-out;
	}

	.oneeye {
		width: 50%;
		height: 100%;
		position: absolute;
	}

	.righteye {
		left: 50%;
	}

	.eyewhite {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		transition: all 0.2s ease-in-out;
	}

	.brow {
		position: absolute;
		left: 50%;
		width: 50%;
		height: 8px;
		transform: translateX(-50%);
		transition: all 0.2s ease-in-out;
	}
</style>
