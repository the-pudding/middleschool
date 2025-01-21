<script>
	import { fade } from 'svelte/transition';
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Text from "$components/MiddleSchool/MiddleSchool.Text.svelte";
	import EyeContainer from "$components/MiddleSchool/MiddleSchool.EyeContainer.svelte";

	export let data, copy, proportions; // Non-reactive copy
	let offset = 0;
	let marginLeft = 0;
	let kid_id = null;
	let sorted = 1;
	let excluded = [];
	let hl_kid = copy.hl_kid;
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
	let sort_attribute = null;
	let grades = [];
	const allGrades = [4,5,6,7,8,9,10,11,12];
	
	function getGradeColor(g) {
		if (g < 6) {
			return "elementary"
		} else if (g < 9) {
			return "middle"
		} else {
			return "high"
		}
	}
	function addOrdinalSuffix(num) {
		if (typeof num !== "number" || isNaN(num)) {
			throw new Error("Input must be a valid number");
		}

		const remainder10 = num % 10;
		const remainder100 = num % 100;

		if (remainder100 >= 11 && remainder100 <= 13) {
			return `${num}th`;
		}

		switch (remainder10) {
		case 1:
			return `${num}st`;
		case 2:
			return `${num}nd`;
		case 3:
			return `${num}rd`;
		default:
			return `${num}th`;
		}
	}
	let intro = true;
	$: {
		if (typeof value != "number") {
			intro = true;
			value = 0;
		} else {
			intro = false;
		}
		attribute = copy.story[value]?.attribute || null;
		sort_attribute = copy.story[value]?.sort_attribute || attribute;
		excluded = copy.story[value]?.exclude_data ? copy.story[value].exclude_data.split(",").map(Number) : [];
		grades = copy.story[value]?.grades.split(",").map(Number);
		marginLeft = (copy.story[value]?.start - 4)/3 * -100;
		kid_id =  Number(copy.story[value]?.kid_id) || null;
		sorted = Number(copy.story[value]?.sorted) || 1;
	}
</script>
<svelte:options runes="{false}" />
<div class="outsideContainer">
	<section id="scrolly">
		<div class="visualContainer">
			<div class="slidingContainer" style="left: {marginLeft}%;">
				{#each allGrades as grade, i}
					{#if grades.indexOf(grade) !== -1}
						<div 
						class="gradeContainer {getGradeColor(grade)}" 
						style="left: {i * 33.3333333333}%;" 
						transition:fade>
							<div class="gradeLevel">
								{#if kid_id == null}
								<span transition:fade>{addOrdinalSuffix(grade)} grade</span>
								{/if}
							</div>

							<EyeContainer 
								data={transformedData[grade]} 
								{value} 
								{attribute} 
								{sort_attribute}
								{grade}
								exclude={excluded.includes(grade)} 
								{kid_id} 
								{hl_kid} 
								{sorted} 
								proportions={proportions[(grade - 4)]}
							/>
						</div>
					{/if}
				{/each}
		</div>

		{#if intro}
		<div class="hedContainer" transition:fade>
			<h1>{copy.hed}</h1>
			<h3>by <a href="https://pudding.cool/author/alvin-chang/">alvin chang</a></h3>
		</div>
		{/if}
	</div>
	<Scrolly bind:value top={0}>
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
	.gradeLevel {
		width:  100%;
		text-align:  center;
		color:  white;
		font-size:  30px;
		height:  40px;
		padding:  5px;
		margin-top: 20px;
		color: #b30089;
		font-weight: bold;
		text-transform: uppercase;
	}
	@media screen and (max-width: 860px) {
		.gradeLevel {
			font-size:  24px;
			height:  40px;
			padding:  8px 0;
		}
	}
	@media screen and (max-width: 600px) {
		.gradeLevel {
			font-size:  20px;
			height:  40px;
			padding:  10px 0;
		}
	}
	@media screen and (max-width: 500px) {
		.gradeLevel {
			font-size:  16px;
			height:  40px;
			padding:  12px 0;
		}
	}
	.slidingContainer {
		transition: left 1200ms cubic-bezier(0.250, 0.100, 0.250, 1.000); /* ease (default) */
		transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000); /* ease (default) */
		position: absolute;
		width:  100%;
		left:  0;
		top:  0;
		height:  100%;
		will-change: left;
		transform: translate3d(0,0,0);
	}
	.gradeContainer {
		width:  33.3333333%;
		position: absolute;
		top:  0px;
		height:  100%;
	}
	/* .gradeContainer.elementary {
		background:  var(--color-elementary);
	}
	.gradeContainer.middle {
		background:  var(--color-middle);
	}
	.gradeContainer.high {
		background:  var(--color-high);
	}
	.gradeContainer.middle .gradeLevel {
		color:  #aaa;
	} */
	
</style>