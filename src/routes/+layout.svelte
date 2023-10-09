<script lang="ts">
	import { FirebaseApp } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import { getStorage } from 'firebase/storage';

	// Initialize Firebase
	const app = initializeApp({
		apiKey: 'AIzaSyB_9jJC66BUq0YD5WK3SAq9xULxZH3Yvy4',
		authDomain: 'web2-lab1-cadc8.firebaseapp.com',
		projectId: 'web2-lab1-cadc8',
		storageBucket: 'web2-lab1-cadc8.appspot.com',
		messagingSenderId: '246157628853',
		appId: '1:246157628853:web:7a350a501b1b351f5275fc'
	});
	const firestore = getFirestore(app);
	const auth = getAuth(app);
	const storage = getStorage(app);
</script>

<FirebaseApp {firestore} {auth} {storage}>
	<slot />
</FirebaseApp>
