<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import Genre from "../components/Layouts/Genre.svelte";
  import { genresStore } from "../store/player";
  $: genres = $genresStore;
</script>

<div transition:fade>
  <Genre data={genres} />
</div>
