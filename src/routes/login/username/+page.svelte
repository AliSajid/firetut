<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db, user } from "$lib/firebase";
    import {doc, getDoc, writeBatch} from "firebase/firestore";

    let username = "";
    let isAvailable = false;
    let loading = false;

    let debounceTimer: NodeJS.Timeout;

/**
 * Checks the availability of a username by querying the "usernames" collection in Firestore.
 * Sets the `isAvailable` variable to `true` if the username is available, and `false` otherwise.
 * Sets the `loading` variable to `true` while the query is running, and `false` when the query is complete.
 * Uses a debouncing timer to prevent the query from running too frequently.
 */
 async function checkAvailability(): Promise<void> {
  isAvailable = false;
  clearTimeout(debounceTimer);

  loading = true;

  debounceTimer = setTimeout(async () => {
    console.log("Checking availability for", username);

    const ref = doc(db, "usernames", username);
    const exists = await getDoc(ref).then((doc) => doc.exists());

    isAvailable = !exists;
    loading = false;
  }, 500);
}

/**
 * Confirms the selected username by adding it to the "usernames" collection in Firestore.
 * Sets the `usernameConfirmed` variable to `true` if the username is successfully added, and `false` otherwise.
 * Sets the `loading` variable to `true` while the username is being added, and `false` when the operation is complete.
 * If the username is not available, sets the `usernameConfirmed` variable to `false` and displays an error message.
 */
async function confirmUsername() {
    console.info("Confirming username", username);

    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uid: $user?.uid });
    batch.set(
        doc(db, "users", $user!.uid), {
            username,
            photoURL: $user?.photoURL ?? null,
            published: true,
            bio: "Placeholder bio",
            links: [
                {
                    title: "Website",
                    url: "https://svelte.dev",
                    icon: "globe"
                }
            ]
        });

        await batch.commit();

        username = "";
        isAvailable = false;
}
</script>

<AuthCheck>
    <h2>
        Username
    </h2>

    <form on:submit|preventDefault={confirmUsername} class="w-2/5">
        <input type="text" placeholder="Username" class="input w-full" bind:value={username} on:input={checkAvailability} />

        {#if loading}
        <p class="text-info">Checking availability...</p>
        {:else if !isAvailable}
        <p>{username} is not available</p>
        {:else}
        <p>{username} is available</p>
        <button class="btn btn-success">Confirm username @{username}</button>
        {/if}
    </form>
</AuthCheck>
