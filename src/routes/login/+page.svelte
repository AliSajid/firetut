<script lang="ts">
  import { auth, user } from '$lib/firebase';
  import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

  /**
   * Signs in the user using Google OAuth authentication.
   * @returns A promise that resolves with the user credential object if the sign-in is successful.
   * The user credential object contains information about the signed-in user, such as their user ID and access token.
   * If the sign-in is unsuccessful, the promise is rejected with an error object that contains information about the error.
   */
  async function signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    console.log(credential.user.toJSON());

    const idToken = await credential.user.getIdToken();

    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
  }

  async function signOutSSR(): Promise<void> {
    const res = await fetch('/api/signin', {
      method: 'DELETE',
    });
    await signOut(auth);
  }
</script>

<h2 class="text-3xl text-center font-bold">Login</h2>

{#if $user}
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <p class="text-center text-success">You are successfully logged in</p>
  <button class="btn btn-circle btn-danger btn-wide" on:click={signOutSSR}>Sign out</button>
{:else}
  <button class="btn btn-circle btn-primary btn-wide" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
