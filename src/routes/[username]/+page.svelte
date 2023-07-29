<!-- @format -->
<script lang="ts">
  import type { PageData } from './$types';
  import UserLink from '$lib/components/UserLink.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
  <h1 class="text-7xl text-purple-500 mb-8">
    @{data.username}
  </h1>

  <img
    src={data.photoURL ?? 'https://placehold.co/256x256/png'}
    alt="Profile Photo"
    class="mx-auto"
    width="256"
    height="256"
    aria-hidden="true"
  />

  <p class="text-xl my-8">
    {data.bio ?? 'No bio yet...'}
  </p>

  <ul class="list-none">
    {#each data.links as item}
      <li>
        <UserLink {...item}></UserLink>
      </li>
    {/each}
  </ul>
</main>
