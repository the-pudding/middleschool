<script>
	import { getContext } from "svelte";
	import MiddleSchool from "$components/MiddleSchool/MiddleSchool.svelte";
	import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
	import data from "$data/data.json";
</script>

<MiddleSchool {copy} {data} />

<!-- <Footer recirc={true} /> -->
