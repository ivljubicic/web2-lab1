<script lang="ts">
	import type { Match } from '$lib/types';
	import { SignedIn, docStore } from 'sveltefire';
	import { firestore } from '$lib/firebase';
	import { collection, doc, updateDoc } from 'firebase/firestore';

	export let competitionId: string;
	export let round: number;

	const matches = docStore<Match>(firestore, `competitions/${competitionId}`);

	async function updateWinnerState(state: number, matchUpdate: Match, matchIndex: number) {
		if (state === 0) {
			matchUpdate.winner = matchUpdate.team1;
		} else if (state === 1) {
			matchUpdate.winner = matchUpdate.team2;
		} else if (state === 2) {
			matchUpdate.winner = 'tie';
		}

		// update firebase status
		const competitionsRef = collection(firestore, 'competitions');
		// const pointsRef = collection(firestore, 'points');
		const documentRef = doc(competitionsRef, competitionId);

		try {
			await updateDoc(documentRef, {
				[`matches.${round}.${matchIndex}`]: {
					matchUpdate
				}
			});
			console.log('Field updated successfully');
		} catch (error) {
			console.error('Error updating field:', error);
		}
	}
</script>

<h2 class="text-3xl text-left mx-5">Round {round}</h2>

<div class="overflow-x-auto flex flex-col items-center my-5">
	<table class="table-md">
		<thead>
			<tr>
				<th>Team 1</th>
				<th>vs</th>
				<th>Team 2</th>
			</tr>
		</thead>
		<SignedIn>
			{#if matches && Array.isArray(matches)}
				{#each $matches as match, index}
					{#if match.winner === undefined}
						<tr class="hover cursor-pointer">
							<td class="hover:bg-green-700" on:click={() => updateWinnerState(0, match, index)}
								>{match.team1}</td
							>
							<td class="hover:bg-yellow-400" />
							<td class="hover:bg-green-700">{match.team2}</td>
						</tr>
					{:else if match.winner == match.team1}
						<tr class="hover cursor-pointer">
							<td class="bg-green-700">{match.team1}</td>
							<td />
							<td class="bg-red-700">{match.team2}</td>
						</tr>
					{:else if match.winner == match.team2}
						<tr class="hover cursor-pointer">
							<td class="bg-red-700">{match.team1}</td>
							<td />
							<td class="bg-green-700">{match.team2}</td>
						</tr>
					{/if}
				{/each}
			{/if}
		</SignedIn>
		<tbody />
	</table>
</div>
