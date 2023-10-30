<script lang="ts">
	import { collectionStore } from 'sveltefire';
	import { firestore } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import type { Competiton } from '$lib/types';

	const compet = collectionStore<Competiton>(firestore, 'competitions');
	const nesto = compet.ref;
</script>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th />
				<th>Name</th>
				<th>Type</th>
				<th>Contenders</th>
			</tr>
		</thead>
		{#each $compet as competition, index}
			<tr class="hover cursor-pointer" on:click={() => goto(`/competition/${competition.docRef}`)}>
				<th>{index + 1}</th>
				<td>{competition.name}</td>
				<td>{competition.scoringType.charAt(0).toUpperCase() + competition.scoringType.slice(1)}</td
				>
				<td>{competition.contenders_all}</td>
			</tr>
		{/each}
		<tbody />
	</table>
</div>
