<script>
	import { fade } from 'svelte/transition';
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Text from "$components/MiddleSchool/MiddleSchool.Text.svelte";
	import EyeContainer from "$components/MiddleSchool/MiddleSchool.EyeContainer.svelte";

	export let data, copy; // Non-reactive copy
	let offset = 0;
	let marginLeft = 0;
	let transformedData = data.reduce((acc, curr) => {
	  // Check if the grade level already exists in the accumulator
	  if (!acc[curr.respondent_grade_level]) {
	    // If not, initialize it with an empty array
	    acc[curr.respondent_grade_level] = [];
	  }
	  // Push the current row into the corresponding grade level array
	  acc[curr.respondent_grade_level].push(curr);
	  return acc;
	}, {});

	let value = 0; // Reactive state variable for value
	let attribute = null;
	let grades = [];
	const allGrades = [4,5,6,7,8,9,10,11,12];

	$: {
		attribute = copy.story[value]?.attribute || null;
		grades = copy.story[value]?.grades.split(",").map(Number);
		marginLeft = (copy.story[value]?.start - 4)/3*100 || null;
		// offset = copy.story[value].start 
	}
</script>
<svelte:options runes="{false}" />
<div class="outsideContainer">
	<section id="scrolly">
		<div class="visualContainer">
			<div class="slidingContainer" style="left: -{marginLeft}%;">
				{#each allGrades as grade, i}
					{#if grades.indexOf(grade) !== -1}
					<div class="gradeContainer" style="left: {i * 33.3333333333}%;" transition:fade>
						<div class="gradeLevel">{grade}</div>
						<EyeContainer data={transformedData[grade]} {value} {attribute} />
					</div>
					{/if}
				{/each}
				<!-- <span class="panda">{value + "," + grades+ "," +  marginLeft + "," +  attribute}</span> -->
			</div>
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
		width:  200px;
		height:  100px;
		color:  white;
	}
	.gradeLevel {
		width:  100%;
		text-align:  center;
		color:  white;
		font-size:  20px;
	}
	.slidingContainer {
		transition: all 1200ms cubic-bezier(0.250, 0.100, 0.250, 1.000); /* ease (default) */
		transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000); /* ease (default) */
		position: absolute;
		width:  100%;
		left:  0;
		top:  0;
		height:  100vh;
	}
	.gradeContainer {
		width:  33.3333333%;
		position: absolute;
		top:  0px;
		height:  100vh;
	}
</style>