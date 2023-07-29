<!-- @format -->
<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { user, userData, db, storage } from '$lib/firebase';
  import { doc, updateDoc } from 'firebase/firestore';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

  let previewURL: string | null = null;
  let uploading = false;
  $: href = `/${$userData?.username}/edit`;

  async function upload(e: any) {
    uploading = true;

    const file = e.target.files[0];
    console.info('Uploading', file.name, file.type, file.size);
    previewURL = URL.createObjectURL(file);
    console.info('Preview URL', previewURL);
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
    console.info('Storage ref', storageRef);
    const result = await uploadBytes(storageRef, file);
    console.info('Upload result', result);
    const photoURL = await getDownloadURL(result.ref);
    console.info('Photo URL', photoURL);

    await updateDoc(doc(db, 'users', $user!.uid), { photoURL });
    uploading = false;
  }
</script>

<AuthCheck>
  <h2 class="card-title">Upload a profile photo</h2>

  <form class="w-full max-w-screen-md">
    <div class="form-control w-full mx-auto text-center max-w-xs">
      <img
        src={previewURL ?? $userData?.photoURL ?? 'https://placehold.co/256x256/png'}
        alt="Profile Photo"
        class="mx-auto"
        width="256"
        height="256"
        aria-hidden="true"
      />
    </div>
    <label for="profilePhoto" class="label">
      <span class="label-text">Pick a file</span>
    </label>
    <input
      type="file"
      class="file-input file-input-bordered w-full max-w-xs"
      accept="image/png, image/jpeg, image/gif, image/webp"
      name="profilePhoto"
      on:input={upload}
    />
  </form>

  {#if uploading}
    <p class="text-info">Uploading...</p>
    <progress class="progress progres-info w-56 mt-6"></progress>
  {/if}

  <a {href} class="btn btn-primary">Finish</a>
</AuthCheck>
