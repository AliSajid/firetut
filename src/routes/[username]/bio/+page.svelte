<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h2 class="text-6xl">Edit Bio</h2>

<p class="font-italic">Current Bio: <span class="text-grey">{data.bio}</span></p>
