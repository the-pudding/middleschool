<script>
	import { onMount } from "svelte";
	import Eye from "$components/MiddleSchool/MiddleSchool.Eye.svelte";
	export let d, attribute;

	let light = d[attribute] > 3 ? "on" : "off";
	let rand = seededRandom(d.id);

	
	function seededRandom(seed) {
		const a = 1664525;
		const c = 1013904223;
		const m = Math.pow(2, 32);

		seed = (a * seed + c) % m;
		return seed / m;
	}

	$: {
		light = d[attribute] > 3 ? "on" : "off";
	}
</script>



<svelte:options runes="{false}" />
<div class="eye" style="
	left: {d.x}px;
	top: {d.y}px;
	width: {d.w}px;
	height: {d.h}px;
">

	<div class="lefteye oneeye">
		<!-- {d.id} -->
		<Eye side={"left"} {rand}/>
	</div>
	<div class="righteye oneeye">
		<Eye side={"right"} {rand}/>
	</div>

	<div class="light {light}"></div>
</div>

<style>
	.eye {
		background: white;
		border:  0.3px solid #333;
		position: absolute;
	}
	.light {
		position: absolute;
		left:  0px;
		top:  0px;
		width:  100%;
		height:  100%;
		opacity: 0.9;
		transition: all 400ms cubic-bezier(0.740, 0.160, 0.250, 1.000);
		transition-timing-function: cubic-bezier(0.740, 0.160, 0.250, 1.000);
		background:  black;
	}
	.light.on {
		background:  white;
		opacity: 0.5;
		box-shadow:  2px 2px 12px -2px #fff;
	}
</style>