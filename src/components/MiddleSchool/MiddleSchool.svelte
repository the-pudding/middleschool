<script>
	import { fade } from 'svelte/transition';
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Text from "$components/MiddleSchool/MiddleSchool.Text.svelte";
	import EyeContainer from "$components/MiddleSchool/MiddleSchool.EyeContainer.svelte";

	export let data, copy, proportions; // Non-reactive copy
	let value = 0; // Reactive state variable for value
	let attribute = null;
	let sort_attribute = null;
	let grades = [];
	const allGrades = [4,5,6,7,8,9,10,11,12];


	let offset = 0;
	let marginLeft = 0;
	let kid_id = null;
	let sorted = 1;
	let excluded = [];
	let hlmiddle = "";
	let hl_kid = copy.hl_kid.split(",").map(Number)
	let displayedValues = Object.fromEntries(allGrades.map(g => [g, 0]));


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

	
	
	function getGradeColor(g) {
		if (g < 6) {
			return "elementary"
		} else if (g < 9) {
			return "middle"
		} else {
			return "high"
		}
	}

	let animationIntervals = {}; // Store ongoing animations

	function animateValue(grade, newValue) {
	    const duration = 1000; // Animation duration in ms
	    const frameRate = 30; // Frames per second
	    const steps = Math.round((duration / 1000) * frameRate);
	    const startValue = displayedValues[grade] ?? 0; // Ensure a defined value
	    let stepValue = (newValue - startValue) / steps;

	    if (stepValue === 0) return; // Prevent unnecessary animation

	    stepValue = stepValue > 0 ? Math.max(1, stepValue) : Math.min(-1, stepValue); // Ensure at least ±1 per step

	    if (animationIntervals[grade]) {
	        clearInterval(animationIntervals[grade]); // Stop previous animation
	    }

	    let currentStep = 0;
	    animationIntervals[grade] = setInterval(() => {
	        currentStep++;
	        displayedValues[grade] = Math.round(startValue + stepValue * currentStep);

	        if (currentStep >= steps) {
	            clearInterval(animationIntervals[grade]);
	            delete animationIntervals[grade]; // Cleanup
	            displayedValues[grade] = Math.round(newValue); // Ensure final value is exact
	        }
	    }, duration / steps);
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
	function checkOpacity(grade) {
		if (grades.indexOf(grade) !== -1) {
			return 1;
		}
		return 0;
	}

	function getSchoolType(grade) {
		if (grade < 6) {
			return "Elementary school";
		} else if (grade < 9) {
			return "Middle school";
		} else {
			return "High school"
		}
	}

	let intro = true;
	let quote = ""
	let quote_id = null;
	let hl = 0;
	let customSpeed = 200;
	$: {
	    if (typeof value !== "number") {
	        intro = true;
	        value = 0;
	    } else {
	        intro = false;
	    }

	    attribute = copy.story[value]?.attribute || null;
	    sort_attribute = copy.story[value]?.sort_attribute || attribute;
	    
	    excluded = copy.story[value]?.exclude_data ? copy.story[value].exclude_data.split(",").map(Number) : [];
	    grades = copy.story[value]?.grades.split(",").map(Number); // Ensure grades update before calling animateValue

	    marginLeft = (copy.story[value]?.start - 4) / 3 * -100;
	    kid_id = Number(copy.story[value]?.kid_id) || null;
	    quote_id = Number(copy.story[value]?.quote_id) || null;
	    quote = quote_id ? copy.story[value].text : null;
	    hl = copy.story[value].hl ? 1 : 0;
	    sorted = Number(copy.story[value]?.sorted) || 1;
	    customSpeed = Number(copy.story[value]?.speed) || null;

	    hlmiddle = kid_id ? "hlmiddle" : "no_hlmiddle";

	    allGrades.forEach((grade) => {
	        if (excluded.includes(grade)) {
	            animateValue(grade, 0);
	        } else if (grades.includes(grade) && attribute) {
	            const newValue = Math.round(proportions[grade - 4][attribute]) || 0;
				animateValue(grade, newValue);
	        }
	    });
	}

</script>
<svelte:options runes="{false}" />
<div class="outsideContainer">
	<section id="scrolly">
		<div class="visualContainer">
			{#if attribute != "id"}
			<div class="metricName" transition:fade>{attribute.replace("School ","")}</div>
			{/if}
			<div class="slidingContainer" style="left: {marginLeft}%;">
				{#each allGrades as grade, i}
				<!-- {#if grades.indexOf(grade) !== -1} -->
				<div 
				class="gradeContainer {hlmiddle} {getGradeColor(grade)}" 
				style="left: {i * 33.3333333333}%; opacity: {checkOpacity(grade)}" 
				transition:fade>
				{#key value}
				<div class="metricLevel">
					{#if kid_id == null && attribute != "id" && excluded.indexOf(grade) == -1}
					<span transition:fade>{displayedValues[grade] || 0}%</span>
					{/if}
				</div>
				{/key}
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
				{quote}
				{quote_id}
				{customSpeed}
				{grades}
				{hl}
				proportions={proportions[(grade - 4)]}
				/>
				<div class="gradeLevel">
					{#if kid_id == null}
						<span transition:fade>{addOrdinalSuffix(grade)}
							<br>
							<span class="schoolType">{getSchoolType(grade)}</span>
						</span>
					{/if}
				</div>
			</div>
			<!-- {/if} -->
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
			{#if step_obj.quote_id}
				<div class="step quoteStep" class:active>
					
				</div>
			{:else}
			<div class="step {step_obj.addclass ? step_obj.addclass : 'smallText'}" class:active>
				<Text copy={step_obj.text} type={step_obj.type} />
			</div>
			{/if}
		{/each}
	</Scrolly>
</section>
</div>

<style>
	.metricName {
		position: fixed;
		left:  0;
		text-align: center;
		top:  0;
/* 		background: black; */
		color: white;
		padding: 15px 0 15px;
		font-weight: bold;
		font-size: 17px;
		width: 100%;
	}
	.metricLevel {
		width:  100%;
		text-align:  center;
		font-size:  25px;
		height:  25px;
		padding:  0px;
/* 		color: #b30089; */
		color: black;
/* 		text-transform: uppercase; */
		position: absolute;
		top:  50px;
	}
	.metricLevel span {
		color: var(--color-yellow);
		padding: 0px 5px;
/* 		font-weight: bold; */
	}
	.gradeLevel {
		width:  100%;
		text-align:  center;
		font-size: 25px;
		height:  25px;
		padding:  0px;
		color: var(--color-light);
		font-weight: bold;
/* 		text-transform: uppercase; */
		position: absolute;
		bottom:  40px;
	}
	.schoolType {
		font-size: 15px;
		font-weight: normal;
		margin-top: -5px;
		display: block;
	}
	@media screen and (max-width: 500px) {
		.gradeLevel {
			font-size:  16px;
			height:  20px;
			padding:  2px 0;
		}
	}
	.slidingContainer {
		transition: left 2000ms cubic-bezier(0.250, 0.100, 0.250, 1.000); /* ease (default) */
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
		border-left: 2px solid rgba(0,0,0,0);
		transition: opacity 700ms linear;
	}
	.gradeContainer.grade6.no_hlmiddle {
		border-left: 2px solid rgba(255,255,255,0.5);
	}
	.gradeContainer.grade9.no_hlmiddle {
		border-left: 2px solid rgba(255,255,255,0.5);
	}
	/* .gradeContainer.elementary {
		background:  var(--color-elementary);
	} */
	/* .gradeContainer.high {
		background:  var(--color-high);
	} */
	/* .gradeContainer.middle .gradeLevel {
		color:  #aaa;
	} */
	
</style>