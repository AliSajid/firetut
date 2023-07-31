<script lang="ts">
  import type { PageData } from './$types';
  import { page } from '$app/stores';

  export let data: PageData;
</script>

<main class="max-w-lg prose text-center mx-auto my-6">
  <p>Current Bio: <span class="text-info">{data.bio}</span></p>
  <p>Status Code: {$page.status}</p>
  <p class="text-error">{$page.form?.problem ?? ''}</p>

  <form method="POST">
    <div class="form-control">
      <label for="bio" class="label">
        <span class="label-text"> Your Bio: </span>
      </label>
      <textarea name="bio" id="bio" class="textarea textarea-bordered textarea-accent" value={data.bio}></textarea>
    </div>
    <button class="btn btn-primary my-5">Update Bio</button>
  </form>
</main>
