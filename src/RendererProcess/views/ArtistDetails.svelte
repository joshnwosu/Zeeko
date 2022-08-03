<script>
  export let params = {};
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
</script>

<main class="page" transition:fade>
  <h1>{params.name}</h1>
</main>
