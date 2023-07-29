<script lang="ts">
  export let icon = 'custom';
  export let url = 'https://example.com';
  export let title = 'Custom';
</script>

<a
  href={url}
  class="stack w-full max-w-md text-center bg-blue-400 flex justify-center items-center p-4 rounded-lg not-prose no-underline border-2 dark:text-black dark:bg-blue-100"
>
  <img src={`/${icon}.svg`} alt={icon} width="32" height="32" class="w-8" />
  <span class="text-lg text-white font-bold dark:text-black">{title}</span>
</a>
