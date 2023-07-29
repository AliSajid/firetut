<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';
  import UserLink from '$lib/components/UserLink.svelte';
  import { db, user, userData } from '$lib/firebase';
  import { writable } from 'svelte/store';
  import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';

  const icons = ['Twitter', 'Facebook', 'YouTube', 'TikTok', 'GitHub', 'LinkedIn', 'Custom'];

  const formDefaults = {
    icon: 'custom',
    url: 'https://example.com',
    title: '',
  };

  const formData = writable(formDefaults);

  let showForm = false;

  $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
  $: titleIsValid = $formData.title.length > 0 && $formData.title.length < 20;
  $: formIsValid = urlIsValid && titleIsValid;

  async function addLink(e: SubmitEvent) {
    const userRef = doc(db, 'users', $user!.uid);

    await updateDoc(userRef, {
      links: arrayUnion({
        ...$formData,
        id: Date.now().toString(),
      }),
    });

    formData.set({
      icon: '',
      title: '',
      url: '',
    });

    showForm = false;
  }

  async function deleteLink(item: any) {
    const userRef = doc(db, 'users', $user!.uid);

    await updateDoc(userRef, {
      links: arrayRemove(item),
    });
  }

  function cancelLink() {
    formData.set(formDefaults);
    showForm = false;
  }
</script>

<main class="max-w-xl mx-auto">
  {#if $userData?.username == $page.params.username}
    <h1 class="mx-2 text-2xl font-bold mt-8 mb-4 text-center">Edit Your Profile</h1>
    {#if showForm}
      <form class="bg-base-200 p-6 w-full mx-auto rounded-xl" on:submit|preventDefault={addLink}>
        <select name="icon" class="select select-sm" bind:value={$formData.icon}>
          {#each icons as icon}
            <option value={icon.toLowerCase()}>{icon}</option>
          {/each}
        </select>
        <input type="text" name="title" placeholder="Title" class="input input-sm" bind:value={$formData.title} />
        <input type="text" name="url" placeholder="URL" class="input input-sm" bind:value={$formData.url} />
        <div class="my-4">
          {#if !titleIsValid}
            <p class="text-sm text-error">Must have valid title.</p>
          {/if}
          {#if !urlIsValid}
            <p class="text-sm text-error">Must have valid URL.</p>
          {/if}
          {#if formIsValid}
            <p class="text-sm text-success">Form is valid.</p>
          {/if}
        </div>

        <button class="btn btn-success block" disabled={!formIsValid} type="submit">Add Link</button>
        <button class="btn btn-xs my-4" on:click={cancelLink}>Cancel</button>
      </form>
    {:else}
      <button class="btn btn-outline btn-info block mx-auto my-4" on:click={() => (showForm = true)}>Add a link</button>
    {/if}
  {/if}
</main>
