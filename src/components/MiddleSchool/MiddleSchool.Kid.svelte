<script>
	import { onMount } from "svelte";
	import Eye from "$components/MiddleSchool/MiddleSchool.Eye.svelte";
	export let d, attribute, positionLookup;
	let light = getLight(positionLookup[d.id].v);
	let rand = seededRandom(d.id);

	
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
	    return Math.abs(result % m) / m; // Normalize to [0, 1)
	}


	function getLight(v) {
		if (attribute == "id") {
			return "off";
		}
		if (v == "") {
			return "none"
		}
		if (v >= 4) {
			return "on";
		}
		return "off"
	}

	$: {
		light = getLight(positionLookup[d.id].v);
	}
</script>



<svelte:options runes="{false}" />
<div class="eye" style="
	left: {positionLookup[d.id].x}px;
	top: {positionLookup[d.id].y}px;
	width: {positionLookup[d.id].w}px;
	height: {positionLookup[d.id].h}px;
	transition: all {positionLookup[d.id].speed}ms cubic-bezier(0.740, 0.160, 0.250, 1.000);
">

	<div class="lefteye oneeye">
		<Eye side={"left"} {rand}/>
	</div>
	<div class="righteye oneeye">
		<Eye side={"right"} {rand}/>
	</div>

	<div class="light {light}"></div>
	<!-- <div class="debug">{positionLookup[d.id].v}</div> -->
</div>


<style>
	.debug {
		position: absolute;
		left:  0px;
		bottom:  0px;
		color:  red;
	}
	.eye {
		background: white;
		border:  0.3px solid #333;
		position: absolute;
		transition-timing-function: cubic-bezier(0.740, 0.160, 0.250, 1.000);
	}
	.light {
		position: absolute;
		left:  0px;
		top:  0px;
		width:  100%;
		height:  100%;
		opacity: 1;
		transition: all 400ms cubic-bezier(0.740, 0.160, 0.250, 1.000);
		transition-timing-function: cubic-bezier(0.740, 0.160, 0.250, 1.000);
		
	}
	.light.none {
		background:  purple;
	}
	.light.off {
		background:  black;
		opacity: 0.9;
		box-shadow:  2px 2px 12px -2px #000;
	}
	.light.on {
		background:  white;
		opacity: 0.3;
		box-shadow:  2px 2px 12px -2px #fff;
	}
</style>