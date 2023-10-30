<script lang="ts">
	import { SignedOut, SignedIn } from 'sveltefire';
	import { auth, firestore } from '$lib/firebase';
	import Navbar from '$lib/components/Navbar.svelte';
	import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
	import OngoingCompetitions from '$lib/components/OngoingCompetitions.svelte';
	import type { FormEventHandler } from 'svelte/elements';
	import type { Competiton, Match, Points } from '$lib/types';

	let newCompetition: Competiton = {
		name: '',
		contenders_all: '', // comma separated between 4 and 8
		scoringType: '', // 3/1/0 example
		owner: auth.currentUser?.uid,
		docRef: ''
	};

	let showAddCompetitionUI = false;

	function validateContendors(
		event: FormEventHandler<HTMLInputElement> & { target: HTMLInputElement }
	) {
		const contendors = event.target.value.split(';').filter(Boolean);
		if (contendors.length < 4 || contendors.length > 8) {
			event.target.setCustomValidity(
				'Please enter between 4 and 8 contenders separated by semicolons'
			);
		} else {
			event.target.setCustomValidity('');
		}
	}

	function createMatch(contenders: Array<string>) {
		let roundsObject: Record<number, Match[]> = {};

		const rounds = contenders.length - 1;
		const half = Math.floor(contenders.length / 2);

		for (let r = 0; r < rounds; r++) {
			let matches: Match[] = [];

			const roundMatches: Match[] = [];

			for (let i = 0; i < half; i++) {
				const j = contenders.length - 1 - i;

				if (i === 0 && r % 2 === 1) {
					roundMatches.push({
						round: r,
						team1: contenders[j],
						team2: contenders[i]
					});
				} else {
					roundMatches.push({
						round: r,
						team1: contenders[i],
						team2: contenders[j]
					});
				}
			}

			matches.push(...roundMatches);
			roundsObject[r] = roundMatches;
			if (contenders.length > 1) {
				contenders.splice(0, 0, contenders.pop()!);
			}
		}

		return roundsObject;
	}

	function initilizePoints(contenders: Array<string>) {
		const roundsObject: Record<string, Points> = {};

		contenders.forEach((contender) => {
			roundsObject[contender] = { team_name: contender, points: 0, wins: 0, losses: 0, ties: 0 };
		});

		return roundsObject;
	}

	async function addCompetition() {
		const competitionsRef = collection(firestore, 'competitions');
		const matchRef = collection(firestore, 'matches');
		const pointsRef = collection(firestore, 'points');
		// const pointsRef = collection(firestore, 'points');
		const newCompetitionRef = doc(competitionsRef);
		const newMatchRef = doc(matchRef, newCompetitionRef.id);
		const newPointsRef = doc(pointsRef, newCompetitionRef.id);

		newCompetition.docRef = newCompetitionRef.id;

		// set points of all contendors to 0
		const contenders = newCompetition.contenders_all.split(';').filter(Boolean);

		// set the match array with all combinations of contenders
		let matches = createMatch(contenders);
		let points = initilizePoints(contenders);

		try {
			await setDoc(newCompetitionRef, newCompetition); // const pointsDocRef = doc(pointsRef, docRef.id);
			await setDoc(newMatchRef, matches);
			await setDoc(newPointsRef, points);
			// await setDoc(pointsDocRef, newCompetition.points);
			console.log('Document written with ID: ', newCompetitionRef.id);
		} catch (error) {
			console.error('Error adding competition:', error);
		}

		newCompetition = {
			name: '',
			contenders_all: '',
			scoringType: '',
			owner: auth.currentUser?.uid,
			docRef: ''
		};

		showAddCompetitionUI = false;
	}
</script>

<Navbar />

<div class="div text-left m-6 p-6 flex flex-col">
	<h1 class="text-5xl">Add competition</h1>
	<SignedOut><div class="my-4">You must sign in to add competitons</div></SignedOut>
	<SignedIn>
		{#if !showAddCompetitionUI}
			<div class="flex flex-row justify-center m-4">
				<button on:click={() => (showAddCompetitionUI = true)} class="btn btn-primary my-2 w-1/3"
					>Add competition</button
				>
			</div>
		{/if}
		{#if showAddCompetitionUI}
			<div class="text-left mt-6 flex flex-col max-w-lg">
				<form class="text-left flex flex-col mb-3" on:submit|preventDefault={addCompetition}>
					<label for="name">Competition name:</label>
					<input
						type="text"
						id="name"
						bind:value={newCompetition.name}
						class="input input-bordered my-2"
						required
						minlength="3"
					/>
					<label for="contendors">List of contendors:</label>
					<input
						type="text"
						id="contendors"
						bind:value={newCompetition.contenders_all}
						class="input input-bordered my-2"
						required
						minlength="3"
						on:input={validateContendors}
					/>
					<label for="scoringType">Scoring type:</label>
					<select
						id="scoringType"
						bind:value={newCompetition.scoringType}
						class="select select-bordered my-2"
						required
					>
						<option disabled value="">Select a scoring type</option>
						<option value="3/1/0">3/1/0 (football)</option>
						<option value="2/0/1">2/0/1 (basketball)</option>
						<option value="1/0.5/0">1/0.5/0 (chess)</option>
					</select>

					<div class="flex flex-col max-w-md">
						<button type="submit" class="btn btn-primary my-2">Save</button>
						<button
							type="button"
							class="btn btn-secondary my-2"
							on:click={() => (showAddCompetitionUI = false)}>Cancel</button
						>
					</div>
				</form>
			</div>
		{/if}
	</SignedIn>

	<h1 class="text-5xl">Ongoing competitions</h1>
	<OngoingCompetitions />
</div>
