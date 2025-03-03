<script>
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from "svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Text from "$components/MiddleSchool/MiddleSchool.Text.svelte";
	import EyeContainer from "$components/MiddleSchool/MiddleSchool.EyeContainer.svelte";

	export let data, copy, proportions; // Non-reactive copy
	let value = 0; // Reactive state variable for value
	let attribute = null;
	let sort_attribute = null;
	let grades = [];
	const allGrades = [4,5,6,7,8,9,10,11,12];
	let oWidth = 600;
	let oHeight = 600;

	let offset = 0;
	let marginLeft = 0;
	let kid_id = null;
	let sorted = 1;
	let excluded = [];
	let hlmiddle = "";
	let hl_kid = copy.hl_kid.split(",").map(Number)
	let displayedValues = Object.fromEntries(allGrades.map(g => [g, 0]));
	let prefersReducedMotion = false;

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

	let animationFrames = {}; // Store ongoing animations

	function animateValue(grade, newValue) {
	    if (typeof window === "undefined") return; // Prevent errors in SSR or non-browser contexts
	    if (prefersReducedMotion) {
	    	displayedValues[grade] = Math.round(newValue)
	    	return;
	    }
	    const duration = 1000; // Animation duration in ms
	    const startValue = displayedValues[grade] ?? 0;
	    const totalFrames = 60; // Assume 60 FPS
	    let step = (newValue - startValue) / totalFrames;
	    let frame = 0;

	    if (animationFrames[grade]) {
	    	cancelAnimationFrame(animationFrames[grade]);
	    }

	    function stepAnimation() {
	        if (typeof window === "undefined") return; // Ensure we’re in a browser

	        frame++;
	        displayedValues[grade] = Math.round(startValue + step * frame);

	        if (frame < totalFrames) {
	        	animationFrames[grade] = window.requestAnimationFrame(stepAnimation);
	        } else {
	            displayedValues[grade] = Math.round(newValue); // Ensure final value is exact
	            delete animationFrames[grade]; // Cleanup
	        }
	    }

	    stepAnimation(); // Start animation
	}



	
	function checkOpacity(grade) {
		if (grades.indexOf(grade) !== -1) {
			return 1;
		}
		return 0;
	}

	let pastHalfway = false;

    function checkScrollPosition() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        pastHalfway = (scrollPosition / totalHeight) > 0.5;
        console.log(pastHalfway)
    }


	onMount(() => {

		window.addEventListener("scroll", checkScrollPosition);
        checkScrollPosition(); // Run once in case page is already scrolled

        onDestroy(() => {
            window.removeEventListener("scroll", checkScrollPosition);
        });

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		function updatePreference(e) {
			prefersReducedMotion = e.matches;
		}

        // Add listener
		mediaQuery.addListener(updatePreference);

        // Set initial value
		prefersReducedMotion = mediaQuery.matches;

        // Cleanup function
		return () => {
			mediaQuery.removeListener(updatePreference);
		};
	});

	let intro = true;
	let quote = ""
	let quote_id = null;
	let hl = 0;
	let customSpeed = 200;
	let talkers = [];
	$: {
		if (typeof value !== "number") {
			intro = true;
			value = 0;
		} else {
			intro = false;
		}
		if (pastHalfway) {
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
<div class="outsideContainer reducedMotion{prefersReducedMotion}" bind:clientWidth={oWidth} bind:clientHeight={oHeight} >
	<section id="scrolly">
		<div class="visualContainer">
			{#if attribute != "id"}
			<div class="metricName" transition:fade>{attribute.replace("School ","")}</div>
			{/if}
			<div class="slidingContainer" style="transform: translate3d({marginLeft}%,0,0);">
				{#each allGrades as grade, i}
				{#if grades.indexOf(grade) !== -1}
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
				{oWidth}
				{oHeight}
				{hl}
				{prefersReducedMotion}
				proportions={proportions[(grade - 4)]}
				/>
			</div>
			{/if}
			{/each}
		</div>

		{#if intro}
		<div class="hedContainer" transition:fade>
			<div class="textBlock">
				<h1>{copy.hed}</h1>
				<h3>by <a href="https://pudding.cool/author/alvin-chang/">alvin chang</a></h3>
			</div>
			<div class="scrolldown">
				↓
			</div>
			<div class="videoTeaser">
				Don't like scrolling? <a href="https://youtu.be/b4zLknfk05Q">Watch the video instead!</a>
			</div>
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
<div class="methodology">
	<h3>Methodology and more</h3>
	<Text copy={copy.methodology} />
</div>
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

.slidingContainer {
	transform: translate3d(var(--x), 0, 0);
	transition: transform 2000ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
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
.videoTeaser {
	position: fixed;
	color: white;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;
	background: #000;
	padding: 20px;
	max-width: 500px;
	width: 90%;
	z-index: 999;
}
.videoTeaser a {
	color: #fb04d3;
}
.videoTeaser a:hover {
	opacity: 0.9;
}
</style>