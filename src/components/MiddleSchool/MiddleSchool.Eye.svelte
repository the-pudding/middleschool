<script>
	import { onMount } from "svelte";
	
	export let side, rand;

	let eyewhiteStyle = "height: 18%;"; // Default height
	let browStyle = "top: 40%;"; // Default brow position

	// Function to simulate blinking and brow movement
	function blink() {
		eyewhiteStyle = "height: 0%;"; // Shrink eye white
		browStyle = "top: 43%;"; // Move brow down by 3px
		setTimeout(() => {
			eyewhiteStyle = "height: 18%;"; // Restore eye white
			browStyle = "top: 40%;"; // Move brow back up
		}, 200); // Duration of the blink
	}

	onMount(() => {
		setInterval(() => {
			// Randomly decide whether to blink
			if (Math.random() > 0.95) { // Adjust probability as needed
				blink();
			}
		}, Math.random() * 3000 + 1000); // Random interval between blinks (1s to 4s)
	});


</script>

<svelte:options runes="{false}" />
<div class="{side}eye oneeye">
	<div class="brow" style="{browStyle}"></div>
	<div class="eyewhite" style="{eyewhiteStyle}">
		<div class="eyecolor">
			<div class="eyeblack"></div>
		</div>
	</div>
</div>


<style>
	.eye {
		background: white;
		border:  1px solid #666;
		position: absolute;
		transition-timing-function: cubic-bezier(0.740, 0.160, 0.250, 1.000);
		box-shadow:  inset 2px 2px 12px 2px #000;
	}
	.oneeye {
		position: absolute;
		left:  0px;
		top:  0px;
		width:  50%;
		height:  100%;
	}
	.righteye {
		left:  50%;
	}
	.brow {
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
		width: 50%;
		height: 4px;
		border-top-left-radius: 70%;
		border-top-right-radius: 70%;
		border: 2px solid black;
		border-bottom: 0;
	}
	.eyewhite {
		position: absolute;
		left:  50%;
		top:  60%;
		transform:  translate(-50%, -50%);
		width: 45%;
		border-radius: 50%;
		height:  10%;
		background:  white;
		border:  1px solid #666;
		overflow: hidden;
	}
	.eyecolor {
		position: absolute;
		left:  50%;
		top:  40%;
		transform:  translate(-50%, -50%);
		height: 120%;
		width: 8px;
		background:  #999;
		border-radius: 50%;
	}
	.eyeblack {
		position: absolute;
		left:  50%;
		top:  50%;
		transform:  translate(-50%, -50%);
		height: 3px;
		width: 3px;
		background: black;
	}
</style>