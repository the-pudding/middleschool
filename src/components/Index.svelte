<script>
	import { getContext } from "svelte";
	import MiddleSchool from "$components/MiddleSchool/MiddleSchool.svelte";
	import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
	// const videocopy = getContext("videocopy");
	import data from "$data/data.json";
	import proportions from "$data/proportions.json";
</script>

<MiddleSchool {copy} {data} {proportions}/>

<Footer recirc={true} />
