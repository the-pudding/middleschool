<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Text from "$components/MiddleSchool/MiddleSchool.Text.svelte";
    let { data, copy } = $props();
    let value = $state();
    
</script>

<div class="outsideContainer">
	<section id="scrolly">
		<div class="visualContainer">
			<span class="panda">{value || "🐼"}</span>
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
		left:  50%;
		top:  50%;
		text-align:  center;
		font-size: 100px;
		width:  100px;
		height:  100px;
		transform: translate(-50%, -50%);
	}
</style>