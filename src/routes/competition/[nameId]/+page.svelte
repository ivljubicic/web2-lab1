<script lang="ts">
	import PointsTable from '$lib/components/PointsTable.svelte';
	import RoundsTable from '$lib/components/RoundsTable.svelte';
	import { firestore } from '$lib/firebase';
	import type { Competiton } from '$lib/types';
	import { collection, getDocs } from 'firebase/firestore';

	export let data: Competiton;

	const competitionsRef = collection(firestore, 'competitions');
	// get all elements

	async function getCompetitions() {
		const data = await getDocs(competitionsRef);
		console.log(data.docs[0]?.data());
	}

	getCompetitions();
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<main class="prose text-center mx-auto mt-8">
	<h1 class="text-7xl text-purple-500">
		{data.name}
	</h1>
	<div class="badge badge-primary">https://web2natjecanja.vercel.app/{data.docRef}</div>

	<h2 class="text-3xl text-left mx-5">Ukupni bodovi</h2>
	<PointsTable docRef={data.docRef} />

	<RoundsTable competitionId={data.docRef} />
</main>
