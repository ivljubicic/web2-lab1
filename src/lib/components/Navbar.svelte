<script>
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { SignedIn, SignedOut } from 'sveltefire';
	import { auth } from '$lib/firebase';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<label tabindex="0" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a href="/">Homepage</a></li>
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		<a class="btn btn-ghost normal-case text-xl">Natjecanja</a>
	</div>
	<div class="navbar-end">
		<SignedOut>
			<button class="btn btn-primary" on:click={signInWithGoogle}>Sign in</button>
		</SignedOut>
		<SignedIn let:signOut let:user>
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img src={user.photoURL} />
					</div>
				</label>
				<ul
					tabindex="0"
					class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
				>
					<li><button on:click={signOut}>Sign Out</button></li>
				</ul>
			</div>
		</SignedIn>
	</div>
</div>
