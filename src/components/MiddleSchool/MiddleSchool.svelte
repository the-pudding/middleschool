<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Text from "$components/MiddleSchool/MiddleSchool.Text.svelte";
	import EyeContainer from "$components/MiddleSchool/MiddleSchool.EyeContainer.svelte";

	export let data, copy; // Non-reactive copy
	let value = null; // Reactive state variable for value
	let attribute = null;

	$: {
		attribute = copy.story[value]?.attribute || null;
	}
</script>
<svelte:options runes="{false}" />
<div class="outsideContainer">
	<section id="scrolly">
		<div class="visualContainer">
			<span class="panda">{value || "🐼"}</span>

			<EyeContainer {data} {value} {attribute}/>

		</div>
		<Scrolly bind:value top={100}>
			{#each copy.story as step_obj, i}
				{@const active = value === i}
				<div class="step {step_obj.addclass ? step_obj.addclass : ''}" class:active>
					<Text copy={step_obj.text} type={step_obj.type} />
				</div>
			{/each}
		</Scrolly>
	</section>
</div>

<style>
	.panda {
		position: absolute;
		left:  0%;
		top:  0%;
		text-align:  left;
		font-size: 20px;
		width:  100px;
		height:  100px;
	}
</style>