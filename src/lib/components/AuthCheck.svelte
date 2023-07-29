<script lang="ts">
  import { user } from '$lib/firebase';
</script>

{#if $user}
  <slot />
{:else}
  <p class="text-error my-10">You are not authorized to view this page. Please sign in.</p>
  <p><a class="btn btn-primary btn-wide" href="/login">Sign in</a></p>
{/if}
