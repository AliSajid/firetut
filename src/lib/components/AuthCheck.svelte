<script lang="ts">
    import { user } from "$lib/firebase";
</script>

{#if $user}
<slot></slot>
{:else}
    <p class="text-error">
        You are not authorized to view this page. Please sign in.
        <a class="btn btn-primary btn-wide" href="/login">Sign in</a>
    </p>
{/if}
