<script lang="ts">
	import { firestore } from '$lib/firebase';
	import type { Points } from '$lib/types';
	import { collectionStore, docStore } from 'sveltefire';

	export let docRef: string;

	const points = docStore<Points[]>(firestore, `points/${docRef}`);
</script>

<div class="overflow-x-auto">
	<table class="table table-lg">
		<thead>
			<tr>
				<th>Place</th>
				<th>Team name</th>
				<th>Score</th>
				<th>Wins</th>
				<th>Loses</th>
				<th>Ties</th>
			</tr>
		</thead>
		{#each $points as pointRow, index}
			<tr class="hover cursor-pointer">
				<th>{index + 1}</th>
				<td>{pointRow.team_name}</td>
				<td>{pointRow.points}</td>
				<td>{pointRow.wins}</td>
				<td>{pointRow.losses}</td>
				<td>{pointRow.ties}</td>
			</tr>
		{/each}
		<tbody />
	</table>
</div>
