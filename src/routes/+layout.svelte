<script lang="ts">
	import '../app.css';

	import { FirebaseApp } from 'sveltefire';
	import { firestore, auth, storage } from '$lib/firebase';
</script>

<FirebaseApp {firestore} {auth} {storage}>
	<slot />
</FirebaseApp>
